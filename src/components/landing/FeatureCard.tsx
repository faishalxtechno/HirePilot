import React from 'react';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  to: string;
  badge?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  to,
  badge,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className="group cursor-pointer h-full transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(to);
        }
      }}
    >
      <Card className="h-full !rounded-2xl sm:!rounded-3xl !border !border-slate-200/90 hover:!border-[#8750FF]/40 !bg-white hover:!shadow-[0_20px_45px_rgba(135,80,255,0.1)] transition-all duration-300 !p-2 sm:!p-3">
        <div className="flex flex-col h-full justify-between p-3 sm:p-4 space-y-5">
          
          {/* Top row: Icon Container & Badge */}
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 group-hover:bg-[#8750FF] border border-purple-100 flex items-center justify-center text-[#8750FF] group-hover:text-white transition-all duration-300 shadow-sm">
              <i className={`pi ${icon} text-lg transition-transform duration-300 group-hover:scale-110`} />
            </div>

            {badge && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-purple-50 text-[#8750FF] border border-purple-200/60">
                {badge}
              </span>
            )}
          </div>

          {/* Middle: Title & Description */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#8750FF] transition-colors tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Bottom: Subtle Link with Animated Arrow */}
          <div className="pt-2 flex items-center text-xs font-semibold text-[#8750FF] group-hover:text-[#723DE8] gap-1.5 border-t border-slate-100">
            <span>Explore feature</span>
            <i className="pi pi-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1" />
          </div>

        </div>
      </Card>
    </div>
  );
};

export const FeatureSection: React.FC = () => {
  const features = [
    {
      title: 'AI Mock Interviews',
      description: 'Practice realistic interview questions and receive personalized AI feedback.',
      icon: 'pi-microphone',
      to: '/interview/setup',
      badge: 'Interactive',
    },
    {
      title: 'Resume Builder',
      description: 'Create, edit, and improve your resume with intelligent suggestions.',
      icon: 'pi-file-edit',
      to: '/resume',
      badge: 'ATS Scanner',
    },
    {
      title: 'Career Insights',
      description: 'Review your interview performance and identify areas for improvement.',
      icon: 'pi-chart-bar',
      to: '/history',
      badge: 'Analytics',
    },
    {
      title: 'Job-Ready Skills',
      description: 'Strengthen communication, data structures, technical knowledge, and interview confidence.',
      icon: 'pi-graduation-cap',
      to: '/jobs',
      badge: 'Match Engine',
    },
  ];

  return (
    <section id="features" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feat) => (
            <FeatureCard
              key={feat.title}
              title={feat.title}
              description={feat.description}
              icon={feat.icon}
              to={feat.to}
              badge={feat.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
