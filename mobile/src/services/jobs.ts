import { Job, JobApplication, ApplicationStage } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_STORAGE_KEY_APPLICATIONS = 'hirepilot_mobile_job_applications';
const LOCAL_STORAGE_KEY_SAVED_JOBS = 'hirepilot_mobile_saved_jobs';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-01',
    title: 'Senior Frontend Engineer (React & TypeScript)',
    company: 'Stripe',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    workplaceType: 'Remote',
    salary: '$165,000 - $195,000 / yr',
    experienceLevel: 'Mid-Senior',
    targetRoles: ['Frontend Developer', 'Software Engineer', 'Full Stack Developer'],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Web Performance'],
    description: 'Build mission-critical dashboard interfaces and global checkout workflows with high responsiveness, sub-100ms latency, and rock-solid test coverage.',
    postedAt: '2 days ago',
    featured: true,
  },
  {
    id: 'job-02',
    title: 'Full Stack Engineer (AI Platform)',
    company: 'Vercel',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=80',
    location: 'New York, NY / Remote',
    type: 'Full-time',
    workplaceType: 'Remote',
    salary: '$150,000 - $185,000 / yr',
    experienceLevel: 'Junior-Mid',
    targetRoles: ['Full Stack Developer', 'Software Engineer', 'Backend Developer'],
    skills: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AI Agents', 'OpenAI'],
    description: 'Join the AI platform team to build real-time streaming interfaces, edge functions, and developer tooling for millions of engineers.',
    postedAt: 'Just now',
    featured: true,
  },
  {
    id: 'job-03',
    title: 'Backend Systems Engineer',
    company: 'Datadog',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    location: 'Boston, MA / Hybrid',
    type: 'Full-time',
    workplaceType: 'Hybrid',
    salary: '$160,000 - $190,000 / yr',
    experienceLevel: 'Mid-Senior',
    targetRoles: ['Backend Developer', 'Software Engineer'],
    skills: ['Go', 'PostgreSQL', 'Distributed Systems', 'Kafka', 'Redis', 'Docker'],
    description: 'Design and operate high-throughput telemetry ingestion pipelines handling trillions of events per day with extreme reliability.',
    postedAt: '3 days ago',
  },
  {
    id: 'job-04',
    title: 'AI / Machine Learning Engineer',
    company: 'Anthropic',
    companyLogo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA / Hybrid',
    type: 'Full-time',
    workplaceType: 'Hybrid',
    salary: '$180,000 - $230,000 / yr',
    experienceLevel: 'Mid-Senior',
    targetRoles: ['Machine Learning Engineer', 'Data Scientist', 'Software Engineer'],
    skills: ['Python', 'PyTorch', 'LLMs', 'Prompt Engineering', 'Vector DBs', 'Kubernetes'],
    description: 'Develop evaluation infrastructure and alignment benchmarks for next-generation conversational AI and reasoning systems.',
    postedAt: '1 day ago',
    featured: true,
  },
  {
    id: 'job-05',
    title: 'Junior Software Engineer',
    company: 'Supabase',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'Remote (Worldwide)',
    type: 'Full-time',
    workplaceType: 'Remote',
    salary: '$95,000 - $125,000 / yr',
    experienceLevel: 'Fresher / Junior',
    targetRoles: ['Software Engineer', 'Frontend Developer', 'Backend Developer'],
    skills: ['TypeScript', 'PostgreSQL', 'React', 'Git', 'REST APIs'],
    description: 'Build open-source database client libraries, dashboard components, and documentation examples for developers worldwide.',
    postedAt: '4 days ago',
  },
  {
    id: 'job-06',
    title: 'Staff Full Stack Architect',
    company: 'Figma',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    workplaceType: 'Remote',
    salary: '$210,000 - $260,000 / yr',
    experienceLevel: 'Senior / Staff',
    targetRoles: ['Full Stack Developer', 'Software Engineer', 'Frontend Developer'],
    skills: ['TypeScript', 'WebAssembly', 'WebGL', 'C++', 'System Design', 'React'],
    description: 'Lead architecture for collaborative multiplayer canvas engines, design systems, and developer-mode handoff workflows.',
    postedAt: '5 days ago',
  },
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-01',
    jobId: 'job-01',
    jobTitle: 'Senior Frontend Engineer (React & TypeScript)',
    company: 'Stripe',
    location: 'San Francisco, CA / Remote',
    salary: '$165,000 - $195,000 / yr',
    workplaceType: 'Remote',
    stage: 'interviewing',
    appliedDate: '3 days ago',
    lastUpdated: 'Yesterday',
    interviewDate: 'Tomorrow at 2:00 PM PST',
    notes: 'Technical round 2: System Design & Live Coding with the Core Dashboard team.',
  },
  {
    id: 'app-02',
    jobId: 'job-02',
    jobTitle: 'Full Stack Engineer (AI Platform)',
    company: 'Vercel',
    location: 'New York, NY / Remote',
    salary: '$150,000 - $185,000 / yr',
    workplaceType: 'Remote',
    stage: 'applied',
    appliedDate: '1 day ago',
    lastUpdated: '1 day ago',
    notes: 'Submitted customized resume generated through HirePilot ATS optimizer.',
  },
  {
    id: 'app-03',
    jobId: 'job-05',
    jobTitle: 'Junior Software Engineer',
    company: 'Supabase',
    location: 'Remote (Worldwide)',
    salary: '$95,000 - $125,000 / yr',
    workplaceType: 'Remote',
    stage: 'offer',
    appliedDate: '2 weeks ago',
    lastUpdated: '3 days ago',
    notes: 'Offer package received. Reviewing equity grant and start date options.',
  },
];

export const jobsService = {
  /**
   * Retrieves available jobs
   */
  getJobs(filter?: { search?: string; role?: string; workplace?: string }): Job[] {
    let result = INITIAL_JOBS;

    if (filter?.search && filter.search.trim()) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filter?.role && filter.role !== 'All') {
      result = result.filter((j) =>
        j.targetRoles.some((r) => r.toLowerCase().includes(filter.role!.toLowerCase()))
      );
    }

    if (filter?.workplace && filter.workplace !== 'All') {
      result = result.filter((j) => j.workplaceType === filter.workplace);
    }

    return result;
  },

  /**
   * Calculates dynamic match percentage against user's profile
   */
  calculateMatchScore(job: Job, candidateRole = 'Software Engineer'): number {
    let score = 75;

    if (job.targetRoles.some((r) => r.toLowerCase() === candidateRole.toLowerCase())) {
      score += 15;
    } else if (job.targetRoles.some((r) => candidateRole.toLowerCase().includes(r.toLowerCase()) || r.toLowerCase().includes(candidateRole.toLowerCase()))) {
      score += 10;
    }

    if (job.featured) {
      score += 5;
    }

    return Math.min(98, score + (job.id.charCodeAt(job.id.length - 1) % 7));
  },

  /**
   * Retrieves saved job applications
   */
  async getApplications(): Promise<JobApplication[]> {
    try {
      const raw = await AsyncStorage.getItem(LOCAL_STORAGE_KEY_APPLICATIONS);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Error reading applications from storage:', e);
    }
    return INITIAL_APPLICATIONS;
  },

  /**
   * Creates or updates a job application
   */
  async saveApplication(app: JobApplication): Promise<void> {
    const all = await this.getApplications();
    const existingIndex = all.findIndex((a) => a.id === app.id || a.jobId === app.jobId);

    if (existingIndex >= 0) {
      all[existingIndex] = { ...all[existingIndex], ...app, lastUpdated: 'Just now' };
    } else {
      all.unshift(app);
    }

    try {
      await AsyncStorage.setItem(LOCAL_STORAGE_KEY_APPLICATIONS, JSON.stringify(all));
    } catch (e) {
      console.error('Error saving application:', e);
    }
  },

  /**
   * Quick Apply to a job
   */
  async applyToJob(job: Job): Promise<JobApplication> {
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      workplaceType: job.workplaceType,
      stage: 'applied',
      appliedDate: 'Just now',
      lastUpdated: 'Just now',
      notes: 'Applied via HirePilot 1-Tap Application with AI-tailored profile.',
    };
    await this.saveApplication(newApp);
    return newApp;
  },

  /**
   * Updates application stage
   */
  async updateStage(applicationId: string, stage: ApplicationStage): Promise<void> {
    const all = await this.getApplications();
    const target = all.find((a) => a.id === applicationId);
    if (target) {
      target.stage = stage;
      target.lastUpdated = 'Just now';
      try {
        await AsyncStorage.setItem(LOCAL_STORAGE_KEY_APPLICATIONS, JSON.stringify(all));
      } catch (e) {
        console.error('Error updating stage:', e);
      }
    }
  },

  /**
   * Saved Jobs management
   */
  async getSavedJobIds(): Promise<string[]> {
    try {
      const raw = await AsyncStorage.getItem(LOCAL_STORAGE_KEY_SAVED_JOBS);
      return raw ? JSON.parse(raw) : ['job-01', 'job-04'];
    } catch {
      return ['job-01'];
    }
  },

  async toggleSaveJob(jobId: string): Promise<boolean> {
    const saved = await this.getSavedJobIds();
    const index = saved.indexOf(jobId);
    let isSaved = false;

    if (index >= 0) {
      saved.splice(index, 1);
      isSaved = false;
    } else {
      saved.push(jobId);
      isSaved = true;
    }

    try {
      await AsyncStorage.setItem(LOCAL_STORAGE_KEY_SAVED_JOBS, JSON.stringify(saved));
    } catch (e) {
      console.error('Error saving saved jobs:', e);
    }
    return isSaved;
  },
};
