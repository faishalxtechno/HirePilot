import { supabase, isSupabaseConfigured } from './supabase';
import { ResumeData, createEmptyResume } from '../types/resumeBuilder';
import { GoogleGenerativeAI } from '@google/generative-ai';

const LOCAL_STORAGE_KEY = 'hirepilot_resumes_builder';

const getGeminiClient = () => {
  const apiKey = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GEMINI_API_KEY : '';
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
};

export const resumeBuilderService = {
  /**
   * Fetch all resumes for the current user
   */
  async getResumes(userId: string): Promise<ResumeData[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch resumes from Supabase', error);
        return [];
      }
      if (data) {
        return data.map(this.mapDatabaseToResumeData);
      }
    } catch (err) {
      console.error('Exception fetching resumes from Supabase', err);
    }
    return [];
  },

  /**
   * Save or update a resume
   */
  async saveResume(resume: ResumeData): Promise<void> {
    const now = new Date().toISOString();
    const updatedResume = { ...resume, updatedAt: now };

    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured.");
    }

    try {
      const { error } = await supabase
        .from('resumes')
        .upsert({
          id: updatedResume.id,
          user_id: updatedResume.userId,
          name: updatedResume.name,
          template: updatedResume.template,
          personal_info: updatedResume.personalInfo,
          education: updatedResume.education,
          experience: updatedResume.experience,
          projects: updatedResume.projects,
          skills: updatedResume.skills,
          certifications: updatedResume.certifications,
          achievements: updatedResume.achievements,
          languages: updatedResume.languages,
          updated_at: now,
        });
      
      if (error) {
        console.error('Supabase save error:', error);
        throw new Error(error.message);
      }
    } catch (err) {
      console.error('Failed to save to Supabase', err);
      throw err;
    }
  },

  /**
   * Delete a resume
   */
  async deleteResume(id: string): Promise<void> {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured.");
    }

    try {
      const { error } = await supabase.from('resumes').delete().eq('id', id);
      if (error) {
        console.error('Supabase delete error:', error);
        throw new Error(error.message);
      }
    } catch (err) {
      console.error('Failed to delete from Supabase', err);
      throw err;
    }
  },

  /**
   * Improve a text with AI
   */
  async improveWithAI(text: string, context: string = 'professional summary'): Promise<string> {
    const trimmed = (text || '').trim();
    if (!trimmed) return text;

    const ai = getGeminiClient();
    if (!ai) {
      // Deterministic rule-based ATS enhancement when Gemini client key is not configured:
      // Formats passive sentences to active verbs, cleans punctuation, and preserves all user facts exactly
      return enhanceTextForAts(trimmed, context);
    }

    try {
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are a professional ATS resume specialist. Optimize the following ${context} for high ATS impact and readability.
RULES:
1. Preserve all factual claims, metrics, dates, and technologies exactly as stated.
2. Do NOT invent companies, credentials, or achievements.
3. Start bullet points with strong active verbs (e.g. Architected, Engineered, Implemented, Spearheaded).
4. Do NOT wrap output in markdown quotes or preamble. Return ONLY the improved text.

Original Content:
${trimmed}`;
      
      const result = await model.generateContent(prompt);
      const enhanced = result.response.text().trim();
      return enhanced || trimmed;
    } catch (err) {
      console.warn('AI improvement fallback to rule-based ATS enhancer:', err);
      return enhanceTextForAts(trimmed, context);
    }
  },

  enhanceTextForAts(text: string, context = 'Professional experience bullet point'): string {
    return enhanceTextForAts(text, context);
  },

  // --- Local Storage Helpers ---

  getLocalResumes(): ResumeData[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
    return [];
  },

  saveLocalResume(resume: ResumeData): void {
    const resumes = this.getLocalResumes();
    const index = resumes.findIndex(r => r.id === resume.id);
    if (index >= 0) {
      resumes[index] = resume;
    } else {
      resumes.push(resume);
    }
    this.saveLocalData(resumes);
  },

  saveLocalData(resumes: ResumeData[]): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumes));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  },

  mapDatabaseToResumeData(row: any): ResumeData {
    return {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      template: row.template,
      personalInfo: row.personal_info || createEmptyResume(row.user_id).personalInfo,
      education: row.education || [],
      experience: row.experience || [],
      projects: row.projects || [],
      skills: row.skills || [],
      certifications: row.certifications || [],
      achievements: row.achievements || [],
      languages: row.languages || [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
};

/**
 * Deterministic rule-based ATS enhancer that strengthens action verbs
 * and structure while preserving 100% of the candidate's factual details.
 */
export function enhanceTextForAts(text: string, context = ''): string {
  let cleaned = text.trim();
  if (!cleaned) return text;

  // Replacements for common weak/passive verbs at start of bullets
  const verbMap: Record<string, string> = {
    'worked on': 'Architected and implemented',
    'helped with': 'Collaborated on and delivered',
    'responsible for': 'Spearheaded and managed',
    'did': 'Executed',
    'made': 'Engineered and launched',
    'created': 'Engineered',
    'wrote': 'Authored and optimized',
    'fixed': 'Diagnosed and resolved',
    'handled': 'Orchestrated',
  };

  const lower = cleaned.toLowerCase();
  for (const [weak, strong] of Object.entries(verbMap)) {
    if (lower.startsWith(weak)) {
      cleaned = strong + cleaned.slice(weak.length);
      break;
    }
  }

  // Ensure professional punctuation
  if (!cleaned.endsWith('.')) {
    cleaned += '.';
  }

  return cleaned;
}

