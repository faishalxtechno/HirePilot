import { supabase, isSupabaseConfigured } from './supabase';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  experienceLevel: string;
  targetRoles: string[];
  skills: string[];
  description: string;
  postedAt: string;
  featured?: boolean;
}

export type ApplicationStage = 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  workplaceType: string;
  stage: ApplicationStage;
  appliedDate: string;
  lastUpdated: string;
  interviewDate?: string;
  notes?: string;
}

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

export const jobsService = {
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

  async getApplications(userId: string): Promise<JobApplication[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch applications', error);
        return [];
      }
      if (data) {
        return data.map(row => ({
          id: row.id,
          jobId: row.job_id,
          jobTitle: row.job_title,
          company: row.company,
          location: row.location,
          salary: row.salary,
          workplaceType: row.workplace_type,
          stage: row.stage as ApplicationStage,
          appliedDate: row.applied_date,
          lastUpdated: row.last_updated,
          interviewDate: row.interview_date,
          notes: row.notes,
        }));
      }
    } catch (err) {
      console.error('Exception fetching applications', err);
    }
    return [];
  },

  async saveApplication(userId: string, app: JobApplication): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      const { error } = await supabase.from('applications').upsert({
        id: app.id,
        user_id: userId,
        job_id: app.jobId,
        job_title: app.jobTitle,
        company: app.company,
        location: app.location,
        salary: app.salary,
        workplace_type: app.workplaceType,
        stage: app.stage,
        applied_date: app.appliedDate,
        last_updated: 'Just now',
        interview_date: app.interviewDate,
        notes: app.notes,
      });

      if (error) {
        console.error('Error saving application:', error);
      }
    } catch (err) {
      console.error('Exception saving application', err);
    }
  },

  async applyToJob(userId: string, job: Job): Promise<JobApplication> {
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
    await this.saveApplication(userId, newApp);
    return newApp;
  },

  async updateStage(userId: string, applicationId: string, stage: ApplicationStage): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('applications')
        .update({ stage, last_updated: 'Just now' })
        .eq('id', applicationId)
        .eq('user_id', userId);
    } catch (e) {
      console.error('Error updating stage:', e);
    }
  },

  async getSavedJobIds(userId: string): Promise<string[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', userId);
      
      if (!error && data) {
        return data.map(r => r.job_id);
      }
    } catch (err) {
      console.error('Exception fetching saved jobs', err);
    }
    return [];
  },

  async toggleSaveJob(userId: string, jobId: string): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('id')
        .eq('user_id', userId)
        .eq('job_id', jobId)
        .maybeSingle();

      if (data) {
        await supabase.from('saved_jobs').delete().eq('id', data.id);
      } else {
        await supabase.from('saved_jobs').insert({ user_id: userId, job_id: jobId });
      }
    } catch (e) {
      console.error('Error saving job:', e);
    }
  },
};
