import React from 'react';
import { ResumeData } from '../../types/resumeBuilder';

interface Props {
  resume: ResumeData;
  scale?: number;
}

export const ResumePreview: React.FC<Props> = ({ resume, scale = 1 }) => {
  const isModern = resume.template === 'modern';
  const isMinimal = resume.template === 'minimal';
  const isClassic = resume.template === 'classic';

  const { personalInfo, education, experience, projects, skills, certifications, achievements, languages } = resume;

  // A4 aspect ratio wrapper with scaling
  return (
    <div 
      className="bg-white resume-paper origin-top-left transition-transform duration-200 ease-out resume-a4-container"
      style={{ 
        width: '210mm', 
        minHeight: '297mm', 
        transform: `scale(${scale})`,
        margin: '0 auto',
        fontFamily: isClassic ? '"Times New Roman", serif' : '"Inter", sans-serif',
        color: '#1a1a1c'
      }}
      id="resume-preview-content"
    >
      <div className={`p-10 ${isModern ? 'pt-12' : 'pt-10'}`}>
        {/* Header */}
        <header className={`mb-6 ${isModern ? 'text-center border-b-2 border-[#1a1a1c] pb-6' : isClassic ? 'text-center border-b border-gray-300 pb-4' : 'mb-8'}`}>
          <h1 className={`${isModern ? 'text-4xl font-black tracking-tight' : isClassic ? 'text-4xl font-normal' : 'text-3xl font-bold tracking-tight'} uppercase text-[#1a1a1c] mb-1`}>
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          {personalInfo.professionalTitle && (
            <div className={`text-lg ${isModern ? 'font-bold text-gray-500 uppercase tracking-widest mt-2' : isClassic ? 'italic text-gray-600' : 'text-gray-600 font-medium'}`}>
              {personalInfo.professionalTitle}
            </div>
          )}
          
          <div className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 ${isModern || isClassic ? 'justify-center' : ''}`}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.email && personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.location && <span>•</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          
          <div className={`mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 ${isModern || isClassic ? 'justify-center' : ''}`}>
            {personalInfo.linkedin && <a href={personalInfo.linkedin} className="text-blue-600">LinkedIn</a>}
            {personalInfo.linkedin && personalInfo.github && <span>•</span>}
            {personalInfo.github && <a href={personalInfo.github} className="text-blue-600">GitHub</a>}
            {personalInfo.github && personalInfo.portfolio && <span>•</span>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} className="text-blue-600">Portfolio</a>}
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className={`text-sm font-bold uppercase tracking-widest text-[#1a1a1c] mb-2 ${isClassic ? 'border-b border-gray-300 pb-1' : ''}`}>
              Professional Summary
            </h2>
            <p className="text-[13px] leading-relaxed text-gray-800">
              {personalInfo.summary}
            </p>
          </section>
        )}

        <div className={isMinimal ? 'grid grid-cols-3 gap-8' : ''}>
          
          {/* Main Content (Left column on minimal) */}
          <div className={isMinimal ? 'col-span-2' : ''}>
            
            {/* Experience */}
            {experience.length > 0 && (
              <section className="mb-6">
                <h2 className={`text-sm font-bold uppercase tracking-widest text-[#1a1a1c] mb-3 ${isClassic ? 'border-b border-gray-300 pb-1' : ''}`}>
                  Experience
                </h2>
                <div className="space-y-4">
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-[14px] text-[#1a1a1c]">{exp.jobTitle}</h3>
                        <span className="text-[12px] text-gray-600 font-medium">
                          {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-[13px] text-gray-700 italic">{exp.company}</span>
                        <span className="text-[12px] text-gray-500">{exp.location}</span>
                      </div>
                      <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-wrap ml-4 list-disc" style={{ display: 'list-item' }}>
                        {exp.description}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="mb-6">
                <h2 className={`text-sm font-bold uppercase tracking-widest text-[#1a1a1c] mb-3 ${isClassic ? 'border-b border-gray-300 pb-1' : ''}`}>
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map(proj => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-[14px] text-[#1a1a1c]">
                          {proj.projectName}
                          {proj.projectUrl && <span className="font-normal text-gray-500 ml-2 text-xs">({proj.projectUrl})</span>}
                        </h3>
                        <span className="text-[12px] text-gray-600 font-medium">
                          {proj.startDate} {proj.endDate && `- ${proj.endDate}`}
                        </span>
                      </div>
                      {proj.technologies && (
                        <div className="text-[12px] text-gray-600 italic mb-1">
                          Technologies: {proj.technologies}
                        </div>
                      )}
                      <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-wrap ml-4 list-disc" style={{ display: 'list-item' }}>
                        {proj.description}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (Right column on minimal) */}
          <div className={isMinimal ? 'col-span-1' : ''}>
            
            {/* Education */}
            {education.length > 0 && (
              <section className="mb-6">
                <h2 className={`text-sm font-bold uppercase tracking-widest text-[#1a1a1c] mb-3 ${isClassic ? 'border-b border-gray-300 pb-1' : ''}`}>
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[14px] text-[#1a1a1c]">{edu.degree}</h3>
                        {!isMinimal && <span className="text-[12px] text-gray-600 font-medium">{edu.startDate} - {edu.endDate}</span>}
                      </div>
                      <div className="flex justify-between items-baseline mt-0.5">
                        <span className="text-[13px] text-gray-700">{edu.institution}</span>
                        {!isMinimal && <span className="text-[12px] text-gray-500">{edu.location}</span>}
                      </div>
                      {isMinimal && <div className="text-[12px] text-gray-500 mt-0.5">{edu.startDate} - {edu.endDate}</div>}
                      {edu.grade && <div className="text-[12px] text-gray-600 mt-1">Grade: {edu.grade}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-6">
                <h2 className={`text-sm font-bold uppercase tracking-widest text-[#1a1a1c] mb-3 ${isClassic ? 'border-b border-gray-300 pb-1' : ''}`}>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {skills.map(skill => (
                    <div key={skill.id} className="text-[13px] text-gray-800 flex items-center">
                      <span className="font-medium">{skill.name}</span>
                      {skill.level && <span className="text-gray-500 ml-1 text-[11px]">({skill.level})</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="mb-6">
                <h2 className={`text-sm font-bold uppercase tracking-widest text-[#1a1a1c] mb-3 ${isClassic ? 'border-b border-gray-300 pb-1' : ''}`}>
                  Certifications
                </h2>
                <div className="space-y-2">
                  {certifications.map(cert => (
                    <div key={cert.id} className="text-[13px] text-gray-800">
                      <div className="font-bold">{cert.name}</div>
                      <div className="text-gray-600">{cert.issuingOrganization} • {cert.issueDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
