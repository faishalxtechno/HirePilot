import React, { useState } from 'react';
import { ResumeData, PersonalInfo, Experience, Education, Project, Skill, Certification } from '../../types/resumeBuilder';
import { Button } from '../ui/Button';
import { Wand2, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { resumeBuilderService } from '../../lib/resumeBuilderService';

interface Props {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const ResumeEditor: React.FC<Props> = ({ resume, setResume }) => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isImproving, setIsImproving] = useState(false);

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const handleImproveSummary = async () => {
    if (!resume.personalInfo.summary) return;
    setIsImproving(true);
    const improved = await resumeBuilderService.improveWithAI(resume.personalInfo.summary, 'professional summary');
    updatePersonalInfo('summary', improved);
    setIsImproving(false);
  };

  const handleImproveBullet = async (section: 'experience' | 'projects', index: number, text: string) => {
    if (!text) return;
    const improved = await resumeBuilderService.improveWithAI(text, 'resume bullet point');
    if (section === 'experience') {
      const newItems = [...resume.experience];
      newItems[index].description = improved;
      setResume({ ...resume, experience: newItems });
    } else {
      const newItems = [...resume.projects];
      newItems[index].description = improved;
      setResume({ ...resume, projects: newItems });
    }
  };

  // Generic List Handlers
  const addItem = <T extends { id: string }>(field: keyof ResumeData, defaultItem: T) => {
    setResume(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), defaultItem]
    }));
  };

  const updateItem = <T extends { id: string }>(field: keyof ResumeData, id: string, key: keyof T, value: any) => {
    setResume(prev => ({
      ...prev,
      [field]: (prev[field] as unknown as T[]).map(item => item.id === id ? { ...item, [key]: value } : item)
    }));
  };

  const removeItem = (field: keyof ResumeData, id: string) => {
    setResume(prev => ({
      ...prev,
      [field]: (prev[field] as unknown as any[]).filter(item => item.id !== id)
    }));
  };

  const SectionHeader = ({ id, title }: { id: string, title: string }) => (
    <div 
      className="flex justify-between items-center py-4 cursor-pointer border-b border-white/5"
      onClick={() => setActiveSection(activeSection === id ? '' : id)}
    >
      <h3 className="text-lg font-bold text-white">{title}</h3>
      {activeSection === id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
    </div>
  );

  return (
    <div className="bg-[#121212] rounded-2xl border border-white/10 p-6 space-y-2 h-[80vh] overflow-y-auto">
      
      {/* Personal Info */}
      <div>
        <SectionHeader id="personal" title="Personal Information" />
        {activeSection === 'personal' && (
          <div className="space-y-4 pt-4 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
                <input value={resume.personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Professional Title</label>
                <input value={resume.personalInfo.professionalTitle} onChange={e => updatePersonalInfo('professionalTitle', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                <input value={resume.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Phone</label>
                <input value={resume.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Location</label>
                <input value={resume.personalInfo.location} onChange={e => updatePersonalInfo('location', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">LinkedIn URL</label>
                <input value={resume.personalInfo.linkedin} onChange={e => updatePersonalInfo('linkedin', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-gray-400">Professional Summary</label>
                <button onClick={handleImproveSummary} disabled={isImproving || !resume.personalInfo.summary} className="text-[10px] text-brand-secondary flex items-center gap-1 hover:text-white transition-colors">
                  <Wand2 className="w-3 h-3" /> {isImproving ? 'Improving...' : 'Improve with AI'}
                </button>
              </div>
              <textarea 
                value={resume.personalInfo.summary} 
                onChange={e => updatePersonalInfo('summary', e.target.value)} 
                rows={4}
                className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Experience */}
      <div>
        <SectionHeader id="experience" title="Work Experience" />
        {activeSection === 'experience' && (
          <div className="space-y-6 pt-4 pb-6">
            {resume.experience.map((exp, index) => (
              <div key={exp.id} className="p-4 rounded-xl bg-black/50 border border-white/5 relative group">
                <button onClick={() => removeItem('experience', exp.id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 icon-button"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Job Title</label>
                    <input value={exp.jobTitle} onChange={e => updateItem<Experience>('experience', exp.id, 'jobTitle', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Company</label>
                    <input value={exp.company} onChange={e => updateItem<Experience>('experience', exp.id, 'company', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Start Date</label>
                    <input value={exp.startDate} onChange={e => updateItem<Experience>('experience', exp.id, 'startDate', e.target.value)} placeholder="e.g. Jan 2022" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">End Date</label>
                    <input value={exp.endDate} onChange={e => updateItem<Experience>('experience', exp.id, 'endDate', e.target.value)} disabled={exp.currentlyWorking} placeholder={exp.currentlyWorking ? 'Present' : 'e.g. Dec 2023'} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white disabled:opacity-50" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-gray-400">Description (Bullet points)</label>
                    <button onClick={() => handleImproveBullet('experience', index, exp.description)} className="text-[10px] text-brand-secondary flex items-center gap-1 hover:text-white transition-colors">
                      <Wand2 className="w-3 h-3" /> Improve with AI
                    </button>
                  </div>
                  <textarea value={exp.description} onChange={e => updateItem<Experience>('experience', exp.id, 'description', e.target.value)} rows={4} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addItem('experience', { id: crypto.randomUUID(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', currentlyWorking: false, description: '' })} leftIcon={<Plus className="w-4 h-4" />} className="w-full">
              Add Experience
            </Button>
          </div>
        )}
      </div>

      {/* Education */}
      <div>
        <SectionHeader id="education" title="Education" />
        {activeSection === 'education' && (
          <div className="space-y-6 pt-4 pb-6">
            {resume.education.map(edu => (
              <div key={edu.id} className="p-4 rounded-xl bg-black/50 border border-white/5 relative group">
                <button onClick={() => removeItem('education', edu.id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 icon-button"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Degree</label>
                    <input value={edu.degree} onChange={e => updateItem<Education>('education', edu.id, 'degree', e.target.value)} placeholder="e.g. B.S. Computer Science" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Institution</label>
                    <input value={edu.institution} onChange={e => updateItem<Education>('education', edu.id, 'institution', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Start Date</label>
                    <input value={edu.startDate} onChange={e => updateItem<Education>('education', edu.id, 'startDate', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">End Date</label>
                    <input value={edu.endDate} onChange={e => updateItem<Education>('education', edu.id, 'endDate', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addItem('education', { id: crypto.randomUUID(), degree: '', institution: '', location: '', startDate: '', endDate: '', grade: '', description: '' })} leftIcon={<Plus className="w-4 h-4" />} className="w-full">
              Add Education
            </Button>
          </div>
        )}
      </div>

      {/* Projects */}
      <div>
        <SectionHeader id="projects" title="Projects" />
        {activeSection === 'projects' && (
          <div className="space-y-6 pt-4 pb-6">
            {resume.projects.map((proj, index) => (
              <div key={proj.id} className="p-4 rounded-xl bg-black/50 border border-white/5 relative group">
                <button onClick={() => removeItem('projects', proj.id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 icon-button"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Project Name</label>
                    <input value={proj.projectName} onChange={e => updateItem<Project>('projects', proj.id, 'projectName', e.target.value)} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Technologies</label>
                    <input value={proj.technologies} onChange={e => updateItem<Project>('projects', proj.id, 'technologies', e.target.value)} placeholder="React, Node, etc." className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-gray-400">Description</label>
                    <button onClick={() => handleImproveBullet('projects', index, proj.description)} className="text-[10px] text-brand-secondary flex items-center gap-1 hover:text-white transition-colors">
                      <Wand2 className="w-3 h-3" /> Improve with AI
                    </button>
                  </div>
                  <textarea value={proj.description} onChange={e => updateItem<Project>('projects', proj.id, 'description', e.target.value)} rows={3} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addItem('projects', { id: crypto.randomUUID(), projectName: '', description: '', technologies: '', projectUrl: '', githubUrl: '', startDate: '', endDate: '' })} leftIcon={<Plus className="w-4 h-4" />} className="w-full">
              Add Project
            </Button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div>
        <SectionHeader id="skills" title="Skills" />
        {activeSection === 'skills' && (
          <div className="space-y-4 pt-4 pb-6">
            <div className="flex flex-wrap gap-2">
              {resume.skills.map(skill => (
                <div key={skill.id} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <input value={skill.name} onChange={e => updateItem<Skill>('skills', skill.id, 'name', e.target.value)} placeholder="Skill name" className="bg-transparent text-sm text-white outline-none w-24" />
                  <button onClick={() => removeItem('skills', skill.id)} className="text-gray-500 hover:text-red-500 icon-button"><X className="w-3 h-3" /></button>
                </div>
              ))}
              <button onClick={() => addItem('skills', { id: crypto.randomUUID(), name: '', level: '' })} className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors icon-button">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

// Add missing X icon
import { X } from 'lucide-react';
