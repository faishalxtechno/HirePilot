export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface Project {
  id: string;
  projectName: string;
  description: string;
  technologies: string;
  projectUrl: string;
  githubUrl: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | '';
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Fluent' | 'Native' | '';
}

export type TemplateType = 'modern' | 'classic' | 'minimal';

export interface ResumeData {
  id: string;
  userId: string;
  name: string;
  template: TemplateType;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: Language[];
  createdAt: string;
  updatedAt: string;
}

export const createEmptyResume = (userId: string, id: string = crypto.randomUUID()): ResumeData => ({
  id,
  userId,
  name: 'Untitled Resume',
  template: 'modern',
  personalInfo: {
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  achievements: [],
  languages: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
