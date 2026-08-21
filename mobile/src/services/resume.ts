import { ResumeAnalysis } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_STORAGE_KEY_RESUME = 'hirepilot_mobile_resume_analysis';

export const DEFAULT_RESUME_ANALYSIS: ResumeAnalysis = {
  id: 'resume-default-01',
  fileName: 'Alex_Morgan_Resume_2026.pdf',
  fileSize: '142 KB',
  uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  atsScore: 84,
  categoryScores: {
    keywords: 88,
    impact: 82,
    formatting: 92,
    actionVerbs: 76,
  },
  strengths: [
    'Clean, single-column ATS-compliant hierarchy without complex tables.',
    'Strong technical skill grouping (Languages, Frameworks, Cloud, Databases).',
    'Quantifiable metrics included in recent software engineering achievements.',
    'Clear chronology with accurate start and end dates.',
  ],
  improvements: [
    'Add more system design & architecture keywords for Senior/Mid-level engineering roles.',
    'Strengthen weaker bullet points with the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z].',
    'Include direct links to live GitHub repositories or deployed production demo links.',
  ],
  missingKeywords: ['Docker', 'CI/CD Pipelines', 'GraphQL', 'Kubernetes', 'Redis Caching', 'Unit Testing / Jest'],
  detectedKeywords: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'Supabase', 'REST APIs', 'Git', 'Agile'],
  bulletPoints: [
    {
      original: 'Worked on backend APIs for user authentication and payments.',
      improved: 'Architected and deployed 12+ RESTful microservices with Node.js and PostgreSQL, reducing payment processing latency by 38% for 15,000+ daily active users.',
      reason: 'Replaces passive verb "worked on" with active verb "Architected" and quantifies latency reduction and scale.',
    },
    {
      original: 'Created frontend components using React and styled them with CSS.',
      improved: 'Engineered 25+ reusable, accessible React components with Tailwind CSS, improving Lighthouse performance scores from 72 to 98.',
      reason: 'Specifies accessibility, exact technologies, and measurable Lighthouse performance impact.',
    },
    {
      original: 'Helped fix bugs and improved database query times.',
      improved: 'Optimized PostgreSQL queries and database indexing strategies, reducing median API response times by 45% and eliminating query timeouts.',
      reason: 'Provides technical specificity (indexing strategies) and concrete benchmark improvement.',
    },
  ],
};

export const resumeService = {
  /**
   * Retrieves saved resume analysis
   */
  async getAnalysis(): Promise<ResumeAnalysis> {
    try {
      const raw = await AsyncStorage.getItem(LOCAL_STORAGE_KEY_RESUME);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Error reading resume analysis from storage:', e);
    }
    return DEFAULT_RESUME_ANALYSIS;
  },

  /**
   * Saves updated resume analysis
   */
  async saveAnalysis(analysis: ResumeAnalysis): Promise<void> {
    try {
      await AsyncStorage.setItem(LOCAL_STORAGE_KEY_RESUME, JSON.stringify(analysis));
    } catch (e) {
      console.error('Error saving resume analysis:', e);
    }
  },

  /**
   * Analyzes an uploaded document
   */
  async analyzeUploadedDocument(fileName: string, fileSize = '160 KB', targetRole = 'Software Engineer'): Promise<ResumeAnalysis> {
    // Simulate AI parsing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result: ResumeAnalysis = {
      id: `resume-${Date.now()}`,
      fileName,
      fileSize,
      uploadedAt: new Date().toISOString(),
      atsScore: 86,
      categoryScores: {
        keywords: 90,
        impact: 84,
        formatting: 94,
        actionVerbs: 80,
      },
      strengths: [
        `Tailored for ${targetRole} positions with concise structure.`,
        'High density of modern technology keywords and relevant tooling.',
        'Proper date hierarchy and standard section headers recognized by major ATS systems.',
      ],
      improvements: [
        `Increase keyword alignment for specific ${targetRole} job descriptions.`,
        'Add more quantifiable percentage gains and operational metrics.',
        'Consolidate single-line bullet points into high-impact impact statements.',
      ],
      missingKeywords: ['System Design', 'Microservices', 'Distributed Caching', 'Cloud Monitoring (Datadog/CloudWatch)', 'Terraform / IaC'],
      detectedKeywords: ['TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs', 'State Management', 'Testing'],
      bulletPoints: DEFAULT_RESUME_ANALYSIS.bulletPoints,
    };

    await this.saveAnalysis(result);
    return result;
  },
};
