import React from 'react';
import { TemplateType } from '../../types/resumeBuilder';
import { LayoutTemplate } from 'lucide-react';

interface Props {
  currentTemplate: TemplateType;
  onChange: (template: TemplateType) => void;
}

export const TemplateSelector: React.FC<Props> = ({ currentTemplate, onChange }) => {
  const templates: { id: TemplateType; name: string }[] = [
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'minimal', name: 'Minimal' }
  ];

  return (
    <div className="flex gap-2">
      {templates.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`template-card flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors border ${
            currentTemplate === t.id 
              ? 'active bg-white/10 border-white/20 text-white font-medium' 
              : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <LayoutTemplate className="w-4 h-4" />
          {t.name}
        </button>
      ))}
    </div>
  );
};
