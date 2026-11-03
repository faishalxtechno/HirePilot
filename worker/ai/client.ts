export const DEFAULT_GEMINI_MODEL = 'gemini-3.8-flash';

export function getGeminiModel(env?: { GEMINI_MODEL?: string }): string {
  const model = (env?.GEMINI_MODEL || DEFAULT_GEMINI_MODEL).trim();
  return model.startsWith('models/') ? model.slice(7) : model;
}

export function buildGeminiEndpoint(apiKey: string, model?: string): string {
  const rawModel = (model || DEFAULT_GEMINI_MODEL).trim();
  const cleanModel = rawModel.startsWith('models/') ? rawModel.slice(7) : rawModel;
  return `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${apiKey}`;
}

export class GeminiApiError extends Error {
  status: number;
  retryAfterSeconds?: number;
  isRetryable: boolean;

  constructor(status: number, message: string, retryAfterSeconds?: number) {
    super(`Gemini API error (${status}): ${message}`);
    this.name = 'GeminiApiError';
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
    // 429 (Too Many Requests), 500, 502, 503 (Unavailable), 504 (Gateway Timeout) are retryable
    this.isRetryable = status === 429 || status === 503 || status === 502 || status === 504 || status === 500;
  }
}

export function parseRetryAfter(headerValue: string | null): number | undefined {
  if (!headerValue) return undefined;
  const numeric = Number(headerValue);
  if (!Number.isNaN(numeric) && numeric > 0) {
    return Math.min(numeric, 30); // Cap at 30 seconds
  }
  const dateTimestamp = Date.parse(headerValue);
  if (!Number.isNaN(dateTimestamp)) {
    const diffSeconds = Math.max(0, (dateTimestamp - Date.now()) / 1000);
    return Math.min(diffSeconds, 30);
  }
  return undefined;
}

export interface GeminiRequestOptions {
  apiKey: string;
  model?: string;
  systemInstruction?: string;
  contents: Array<{
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
  }>;
  temperature?: number;
  responseMimeType?: string;
}

export async function callGemini(options: GeminiRequestOptions, retries = 3): Promise<string> {
  const { apiKey, model, systemInstruction, contents, temperature = 0.4, responseMimeType } = options;

  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  // Use the configured Gemini API endpoint (defaults to gemini-3.8-flash)
  const endpoint = buildGeminiEndpoint(apiKey, model);

  const payload: any = {
    contents,
    generationConfig: {
      temperature,
      maxOutputTokens: 2048,
    },
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  if (responseMimeType) {
    payload.generationConfig.responseMimeType = responseMimeType;
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        const retryAfter = parseRetryAfter(response.headers.get('retry-after'));
        const apiError = new GeminiApiError(response.status, errorText, retryAfter);

        // Do not retry permanent errors (400, 401, 403, 404, etc.)
        if (!apiError.isRetryable) {
          console.error(
            `[Gemini AI] Non-retryable error (HTTP ${response.status}). Aborting without retry.`
          );
          throw apiError;
        }

        // Throw retryable error to trigger backoff
        throw apiError;
      }

      const data: any = await response.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!candidateText) {
        throw new Error('Empty or invalid response structure received from Gemini');
      }

      return candidateText;
    } catch (err: any) {
      lastError = err;

      // Abort immediately for non-retryable API errors
      if (err instanceof GeminiApiError && !err.isRetryable) {
        throw err;
      }

      if (attempt < retries) {
        const statusStr = err instanceof GeminiApiError ? `HTTP ${err.status}` : 'Network Failure';
        const retryAfterSec = err instanceof GeminiApiError ? err.retryAfterSeconds : undefined;

        // Exponential backoff: 1s, 2s, 4s with random jitter (0-300ms)
        const baseDelayMs = 1000 * Math.pow(2, attempt);
        const jitterMs = Math.floor(Math.random() * 300);
        const delayMs = retryAfterSec ? Math.max(retryAfterSec * 1000, 1000) + jitterMs : baseDelayMs + jitterMs;

        // Safe logging: Never log API key or candidate answer payload
        console.warn(
          `[Gemini AI] Temporary error (${statusStr}) on attempt ${attempt + 1}/${retries + 1}. Retrying in ${delayMs}ms...`
        );

        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }

  // Safe logging of final failure without exposing secrets
  const finalStatus = lastError instanceof GeminiApiError ? `HTTP ${lastError.status}` : 'Unknown';
  console.error(
    `[Gemini AI] All ${retries} retry attempts exhausted. Final failure status: ${finalStatus}. Reason: ${lastError?.message?.slice(0, 150)}`
  );

  throw lastError || new Error('Failed to generate response from Gemini AI after multiple retry attempts');
}

export function extractJsonFromAi<T>(rawText: string): T {
  if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
    throw new Error('AI returned an empty or non-string response');
  }

  const trimmed = rawText.trim();

  // 1. Try stripping markdown code fences
  const stripped = trimmed
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  try {
    return JSON.parse(stripped) as T;
  } catch {
    // 2. Extract substring between first '{' and last '}'
    const firstBrace = trimmed.indexOf('{');
    const lastBrace = trimmed.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const candidateJson = trimmed.substring(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(candidateJson) as T;
      } catch (innerErr: any) {
        throw new Error(`Failed to parse extracted JSON from AI: ${innerErr.message}`);
      }
    }
    throw new Error(`AI response did not contain a valid JSON object. Raw response: ${trimmed.slice(0, 150)}...`);
  }
}

export function parseJsonFromAi<T>(rawText: string, fallback: T): T {
  try {
    return extractJsonFromAi<T>(rawText);
  } catch (err) {
    console.error('Failed to parse JSON from AI response:', err);
    return fallback;
  }
}
