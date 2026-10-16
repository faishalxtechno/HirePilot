/**
 * HirePilot Resume & ATS Evaluation Service
 * Handles resume analysis, ATS compatibility scoring, keyword matching, and AI bullet point optimization.
 */

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  atsScore: number; // 0-100
  categoryScores: {
    keywords: number; // 0-100
    impact: number; // 0-100
    formatting: number; // 0-100
    actionVerbs: number; // 0-100
  };
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  detectedKeywords: string[];
  bulletPoints: {
    original: string;
    improved: string;
    reason: string;
  }[];
}

const LOCAL_STORAGE_KEY_RESUME = 'hirepilot_resume_analysis';

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
    'Clean, single-column ATS-compliant hierarchy without complex tables or textboxes.',
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
   * Retrieves saved resume analysis or default
   */
  getAnalysis(): ResumeAnalysis {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_RESUME);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Error reading resume analysis from localStorage:', e);
    }
    return DEFAULT_RESUME_ANALYSIS;
  },

  /**
   * Saves updated resume analysis
   */
  saveAnalysis(analysis: ResumeAnalysis): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY_RESUME, JSON.stringify(analysis));
      }
    } catch (e) {
      console.error('Error saving resume analysis:', e);
    }
  },

  /**
   * Simulates AI Resume parsing and evaluation from uploaded file or text
   */
  async analyzeResume(file: { name?: string; size?: number } = {}, targetRole = 'Software Engineer'): Promise<ResumeAnalysis> {
    const fileName = file?.name || 'resume.pdf';
    const fileSize = typeof file?.size === 'number' ? file.size : 120000;
    const fileSizeStr = fileSize > 1024 * 1024
      ? `${(fileSize / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(fileSize / 1024)} KB`;

    // Deterministic ATS Scoring based on file format, size, role matching, and structural compliance
    // 1. Formatting Score (max 100): PDF/DOCX standard format, clean naming, sensible file size
    const isPdf = fileName.toLowerCase().endsWith('.pdf');
    const isDocx = fileName.toLowerCase().endsWith('.docx');
    let formattingScore = isPdf ? 92 : isDocx ? 88 : 74;
    if (fileSize > 2 * 1024 * 1024) formattingScore -= 10; // Large files penalized for ATS parser speed

    // 2. Keywords Score: Role-based alignment
    const roleLower = targetRole.toLowerCase();
    let keywordsScore = 82;
    if (roleLower.includes('frontend') || roleLower.includes('software')) keywordsScore = 86;
    if (roleLower.includes('backend') || roleLower.includes('full stack')) keywordsScore = 88;
    if (roleLower.includes('machine learning') || roleLower.includes('data')) keywordsScore = 84;

    // 3. Impact & Action Verbs standard rubric baselines
    const impactScore = 80;
    const actionVerbsScore = 78;

    const atsScore = Math.round((keywordsScore * 0.35) + (impactScore * 0.25) + (formattingScore * 0.25) + (actionVerbsScore * 0.15));

    const result: ResumeAnalysis = {
      id: `resume-${Date.now()}`,
      fileName: fileName,
      fileSize: fileSizeStr,
      uploadedAt: new Date().toISOString(),
      atsScore,
      categoryScores: {
        keywords: keywordsScore,
        impact: impactScore,
        formatting: formattingScore,
        actionVerbs: actionVerbsScore,
      },
      strengths: [
        `Formatted as ${isPdf ? 'ATS-standard PDF' : 'document'} with single-column linear parsing hierarchy.`,
        `Includes relevant technology terminology suitable for ${targetRole} positions.`,
        'Clean section chronology with standard headers recognized by Workday, Greenhouse, and Lever.',
      ],
      improvements: [
        `Increase keyword alignment for specific ${targetRole} job descriptions.`,
        'Add more quantifiable percentage gains, latency reductions, and operational scale metrics.',
        'Convert passive task statements into active outcome statements (Accomplished [X] by doing [Z]).',
      ],
      missingKeywords: ['System Design', 'Microservices', 'Distributed Caching', 'Cloud Monitoring (Datadog/CloudWatch)', 'Terraform / IaC'],
      detectedKeywords: ['TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs', 'State Management', 'Testing'],
      bulletPoints: DEFAULT_RESUME_ANALYSIS.bulletPoints,
    };

    this.saveAnalysis(result);
    return result;
  },
};
