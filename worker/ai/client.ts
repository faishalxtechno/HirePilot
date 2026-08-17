export interface GeminiRequestOptions {
  apiKey: string;
  systemInstruction?: string;
  contents: Array<{
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
  }>;
  temperature?: number;
  responseMimeType?: string;
}

export async function callGemini(options: GeminiRequestOptions, retries = 2): Promise<string> {
  const { apiKey, systemInstruction, contents, temperature = 0.4, responseMimeType } = options;

  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  // Use the modern Gemini 1.5/2.0 API endpoint
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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
        throw new Error(`Gemini API error (${response.status}): ${errorText}`);
      }

      const data: any = await response.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!candidateText) {
        throw new Error('Empty or invalid response structure received from Gemini');
      }

      return candidateText;
    } catch (err: any) {
      lastError = err;
      if (attempt < retries) {
        // Exponential backoff
        await new Promise((res) => setTimeout(res, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  throw lastError || new Error('Failed to generate response from Gemini AI');
}

export function parseJsonFromAi<T>(rawText: string, fallback: T): T {
  try {
    // Strip markdown code fences if present
    const cleaned = rawText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*$/gi, '')
      .trim();
    return JSON.parse(cleaned) as T;
  } catch (err) {
    console.error('Failed to parse JSON from AI response:', err, 'Raw:', rawText);
    return fallback;
  }
}
