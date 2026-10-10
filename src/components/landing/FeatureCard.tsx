import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollReveal } from '../ui/ScrollReveal';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  to: string;
  footerTag: string;
  accentColor: string;
  delayMs?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  to,
  footerTag,
  accentColor,
  delayMs = 0,
}) => {
  const navigate = useNavigate();

  return (
    <ScrollReveal delayMs={delayMs} className="h-full">
      <div
        onClick={() => navigate(to)}
        className="glass-card glass-card-interactive p-6 rounded-3xl flex flex-col justify-between h-full group cursor-pointer focus:outline-none"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            navigate(to);
          }
        }}
      >
        <div className="space-y-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${accentColor}`}>
            <i className={`pi ${icon} text-xl`} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight group-hover:text-[#c9beff] transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#9AA4B7] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[#9AA4B7] group-hover:text-white transition-colors">
          <span className="text-[11px] uppercase tracking-wider font-semibold font-mono">{footerTag}</span>
          <i className="pi pi-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </ScrollReveal>
  );
};

export const FeatureSection: React.FC = () => {
  const features = [
    {
      title: 'AI Mock Interviews',
      description: 'Practice technical and behavioral interviews through real-time dynamic text or responsive low-latency voice mode.',
      icon: 'pi-microphone',
      to: '/interview/setup',
      footerTag: 'Voice & Text Capable',
      accentColor: 'bg-[#7657FF]/20 border border-[#7657FF]/40 text-[#c9beff]',
    },
    {
      title: 'Smart Resume Builder',
      description: 'Generate ATS-compliant CVs customized to job specifications with instant keyword gap insights and formatting checks.',
      icon: 'pi-file',
      to: '/resume',
      footerTag: 'ATS Score 99%+',
      accentColor: 'bg-[#00c3eb]/20 border border-[#00c3eb]/40 text-[#36D6FF]',
    },
    {
      title: 'Interview Performance Analysis',
      description: 'Unpack granular breakdown rubrics covering concise delivery, filler word frequency, technical rigor, and pacing.',
      icon: 'pi-chart-line',
      to: '/history',
      footerTag: 'Instant Heatmaps',
      accentColor: 'bg-[#00865d]/20 border border-[#00865d]/40 text-[#36D399]',
    },
    {
      title: 'Personalized Career Roadmap',
      description: 'Step-by-step skill gap mapping and curated benchmarks that pivot dynamically as your competency levels scale up.',
      icon: 'pi-compass',
      to: '/profile',
      footerTag: 'Role Benchmarks',
      accentColor: 'bg-white/[0.08] border border-white/15 text-[#c9beff]',
    },
    {
      title: 'Coding Interview Sandbox',
      description: 'Interactive problem practice with complexity analysis, test case validations, and structured architectural hints.',
      icon: 'pi-code',
      to: '/interview/setup',
      footerTag: 'Multi-Language Tracks',
      accentColor: 'bg-white/[0.08] border border-white/15 text-[#36D6FF]',
    },
    {
      title: 'Achievement Certificates',
      description: 'Earn verified performance milestone certificates shareable directly to LinkedIn and hiring portals to validate capability.',
      icon: 'pi-verified',
      to: '/history',
      footerTag: 'Verifiable Credentials',
      accentColor: 'bg-white/[0.08] border border-white/15 text-[#36D399]',
    },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
      <ScrollReveal className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="glass-pill px-3.5 py-1.5 rounded-full text-[#36D6FF] font-semibold uppercase tracking-widest text-xs mb-3 border border-white/10">
          Engineered For Rapid Mastery
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Everything You Need to Ace The Room
        </h2>
        <p className="text-sm sm:text-base text-[#9AA4B7] mt-3 leading-relaxed">
          A full-spectrum career suite designed to remove guesswork, sharpen communication, and fast-track offer letters.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <FeatureCard
            key={feat.title}
            title={feat.title}
            description={feat.description}
            icon={feat.icon}
            to={feat.to}
            footerTag={feat.footerTag}
            accentColor={feat.accentColor}
            delayMs={idx * 60}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
