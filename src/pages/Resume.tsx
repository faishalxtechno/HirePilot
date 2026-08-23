import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Plus, Download, Save, ChevronLeft, UploadCloud, Edit3, Trash2 } from 'lucide-react';
import { resumeBuilderService } from '../lib/resumeBuilderService';
import { ResumeData, createEmptyResume } from '../types/resumeBuilder';
import { ResumeEditor } from '../components/resume/ResumeEditor';
import { ResumePreview } from '../components/resume/ResumePreview';
import { TemplateSelector } from '../components/resume/TemplateSelector';
import { exportResumeToPDF } from '../lib/pdfExport';
import { resumeService } from '../lib/resumeService';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/ui/Modal';

export const ResumePage: React.FC = () => {
  const { profile } = useAuth();
  
  // Dashboard state
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Builder state
  const [activeResume, setActiveResume] = useState<ResumeData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
  
  // Mobile toggle state
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast, success, error, info } = useToast();
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.id) {
      loadResumes();
    }
  }, [profile?.id]);

  const loadResumes = async () => {
    if (!profile?.id) return;
    setIsLoading(true);
    const data = await resumeBuilderService.getResumes(profile.id);
    setResumes(data);
    setIsLoading(false);
  };

  const handleCreateNew = () => {
    if (!profile?.id) return;
    const newResume = createEmptyResume(profile.id);
    setActiveResume(newResume);
  };

  const handleEdit = (resume: ResumeData) => {
    setActiveResume(resume);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResumeToDelete(id);
  };

  const confirmDelete = async () => {
    if (resumeToDelete) {
      await resumeBuilderService.deleteResume(resumeToDelete);
      await loadResumes();
      setResumeToDelete(null);
      success('Resume deleted successfully');
    }
  };

  const handleSave = async () => {
    if (!activeResume) return;
    setIsSaving(true);
    setSaveStatus('Saving...');
    await resumeBuilderService.saveResume(activeResume);
    setIsSaving(false);
    setSaveStatus('Saved');
    success('Resume saved successfully');
    setTimeout(() => setSaveStatus(''), 2000);
    // Reload dashboard list in background
    if (profile?.id) {
      const data = await resumeBuilderService.getResumes(profile.id);
      setResumes(data);
    }
  };

  const handleDownload = () => {
    if (!activeResume) return;
    const filename = activeResume.personalInfo.fullName 
      ? `HirePilot-Resume-${activeResume.personalInfo.fullName.replace(/\s+/g, '-')}.pdf`
      : 'HirePilot-Resume.pdf';
    exportResumeToPDF('resume-preview-content', filename);
    success('Resume downloaded successfully');
  };

  // Legacy analysis upload (just to fulfill requirement of keeping existing upload)
  const handleLegacyUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    info('Resume uploaded successfully.');
    e.target.value = '';
  };

  const handleAnalyzeUpload = async () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);
    try {
      await resumeService.analyzeResume(uploadedFile, profile?.target_role || 'Software Engineer');
      success('Analysis complete! Check the ATS Analyzer section.');
      setUploadedFile(null); // Clear after analysis
    } catch (err) {
      console.error(err);
      error('Unable to process resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Auto-save effect
  useEffect(() => {
    if (!activeResume) return;
    const timeout = setTimeout(() => {
      handleSave();
    }, 5000); // Auto save after 5s of inactivity
    return () => clearTimeout(timeout);
  }, [activeResume]);

  // -------------------------------------------------------------------------
  // RENDER: DASHBOARD VIEW
  // -------------------------------------------------------------------------
  if (!activeResume) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Resume Builder</h1>
              <p className="text-brand-muted text-sm">Create, edit, and export ATS-friendly professional resumes.</p>
            </div>
            
            <div className="flex gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleLegacyUpload}
                className="hidden"
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} leftIcon={<UploadCloud className="w-4 h-4" />}>
                Analyze Existing PDF
              </Button>
              <Button variant="primary" onClick={handleCreateNew} leftIcon={<Plus className="w-4 h-4" />}>
                Create New Resume
              </Button>
            </div>
          </div>

          {uploadedFile && (
            <Card className="p-6 bg-[#1a1a1c] border-white/10 animate-fade-in flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Resume uploaded</h3>
                  <p className="text-sm text-brand-muted">{uploadedFile.name} • PDF • Ready for analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => setUploadedFile(null)}>
                  Remove
                </Button>
                <Button variant="primary" size="sm" isLoading={isAnalyzing} onClick={handleAnalyzeUpload}>
                  Analyze Resume
                </Button>
              </div>
            </Card>
          )}

          {isLoading ? (
            <div className="text-center py-20 text-brand-muted">Loading your resumes...</div>
          ) : resumes.length === 0 ? (
            <Card className="p-12 text-center bg-[#121212] border-white/5 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No resumes yet</h3>
              <p className="text-brand-muted text-sm mb-6 max-w-sm mx-auto">Create your first professional resume to start standing out to recruiters and ATS systems.</p>
              <Button variant="primary" onClick={handleCreateNew} leftIcon={<Plus className="w-4 h-4" />}>
                Start from scratch
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumes.map(resume => (
                <Card key={resume.id} onClick={() => handleEdit(resume)} className="p-6 bg-[#121212] border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white">
                      <FileText className="w-5 h-5" />
                    </div>
                    <button onClick={(e) => handleDeleteClick(resume.id, e)} className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{resume.personalInfo.fullName || 'Untitled Resume'}</h3>
                  <p className="text-sm text-brand-muted mb-4">{resume.personalInfo.professionalTitle || 'No Title'}</p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-white/5">
                    <span>{resume.template} template</span>
                    <span>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}

        </div>

        <Modal isOpen={!!resumeToDelete} onClose={() => setResumeToDelete(null)} title="Delete Resume">
          <div className="space-y-4">
            <p className="text-brand-muted">Are you sure you want to delete this resume? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setResumeToDelete(null)}>Cancel</Button>
              <Button variant="primary" onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
            </div>
          </div>
        </Modal>
      </DashboardLayout>
    );
  }

  // -------------------------------------------------------------------------
  // RENDER: BUILDER VIEW
  // -------------------------------------------------------------------------
  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-64px)] flex flex-col -mt-6 -mx-4 sm:-mx-8 relative">
        
        {/* Builder Toolbar */}
        <div className="h-16 border-b border-white/10 bg-[#0a0a0b] flex items-center justify-between px-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveResume(null)} className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <div className="hidden sm:block h-4 w-px bg-white/10" />
            <TemplateSelector currentTemplate={activeResume.template} onChange={(t) => setActiveResume({ ...activeResume, template: t })} />
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 mr-2">{saveStatus}</span>
            <Button variant="outline" size="sm" onClick={handleSave} isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
              Save
            </Button>
            <Button variant="primary" size="sm" onClick={handleDownload} leftIcon={<Download className="w-4 h-4" />}>
              Download PDF
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex border-b border-white/10 bg-[#0a0a0b] shrink-0">
          <button 
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${mobileView === 'editor' ? 'border-brand-secondary text-white' : 'border-transparent text-gray-500'}`}
            onClick={() => setMobileView('editor')}
          >
            Editor
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${mobileView === 'preview' ? 'border-brand-secondary text-white' : 'border-transparent text-gray-500'}`}
            onClick={() => setMobileView('preview')}
          >
            Live Preview
          </button>
        </div>

        {/* Builder Workspace */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          
          {/* Left Panel: Editor */}
          <div className={`w-full lg:w-[45%] xl:w-[40%] flex-col bg-[#0a0a0b] border-r border-white/10 ${mobileView === 'editor' ? 'flex' : 'hidden lg:flex'}`}>
            <div className="p-4 sm:p-6 h-full">
              <ResumeEditor resume={activeResume} setResume={setActiveResume as React.Dispatch<React.SetStateAction<ResumeData>>} />
            </div>
          </div>

          {/* Right Panel: Preview */}
          <div className={`w-full lg:w-[55%] xl:w-[60%] flex-col bg-[#1a1a1c] overflow-y-auto relative ${mobileView === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
            <div className="p-4 sm:p-8 flex justify-center min-w-full">
              {/* Scale down slightly on small screens to fit */}
              <div className="transform scale-[0.6] sm:scale-[0.8] lg:scale-[0.9] xl:scale-100 origin-top flex justify-center pb-20">
                <ResumePreview resume={activeResume} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
