import React from 'react';
import { Triangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../lib/useScrollReveal';

export const Terms: React.FC = () => {
  useScrollReveal();
  return (
    <main className="min-h-screen w-full bg-brand-background text-[#d0d0d0] relative flex flex-col font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1000px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Triangle className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="font-display text-white text-xl hidden sm:block">HirePilot</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to HirePilot
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-6 pt-32 pb-24 w-full reveal-hidden">
        <h1 className="text-white font-display text-4xl md:text-5xl mb-4">Terms & Conditions</h1>
        <p className="text-brand-muted text-sm mb-12 uppercase tracking-widest">Last updated: August 23, 2026</p>

        <div className="space-y-10 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-display text-white mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using the HirePilot platform, you agree to be bound by these Terms & Conditions. 
              If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">2. Description of HirePilot</h2>
            <p className="leading-relaxed">
              HirePilot provides an AI-powered career copilot platform offering services such as resume building, 
              mock interviews, and job search tools. The platform is designed to simulate realistic interview 
              environments for educational and preparation purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">3. User Accounts</h2>
            <p className="leading-relaxed">
              You must create an account to use certain features. You are responsible for maintaining the confidentiality 
              of your account credentials and for all activities that occur under your account. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">4. Acceptable Use</h2>
            <p className="leading-relaxed">
              You agree not to use HirePilot for any unlawful purpose or in any way that interrupts, damages, or impairs 
              the service. This includes not attempting to reverse engineer the AI models or scrape data from the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">5. Resume Builder</h2>
            <p className="leading-relaxed">
              The resume builder tool helps format the data you provide. We do not guarantee employment or specific 
              outcomes from using the resumes generated on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">6. AI-Generated Content</h2>
            <p className="leading-relaxed">
              The feedback and questions generated during mock interviews are powered by artificial intelligence. 
              While we strive for accuracy, the AI may sometimes generate incorrect or irrelevant information. 
              You should use your judgment when interpreting the feedback.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">7. Interview Practice</h2>
            <p className="leading-relaxed">
              The interview practice module is a simulation. Scores and feedback are estimations of performance based 
              on generalized metrics and do not represent the opinions of real-world hiring managers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">8. Job Search Features</h2>
            <p className="leading-relaxed">
              Job search recommendations are provided based on your profile and interactions. We do not verify the 
              availability or legitimacy of third-party job listings that may be referenced.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">9. Payments and Subscriptions</h2>
            <p className="leading-relaxed">
              Certain features may require a paid subscription. Prices are clearly displayed, including applicable taxes 
              (such as GST). Subscriptions are billed in advance on a recurring basis as selected during purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">10. Free Usage</h2>
            <p className="leading-relaxed">
              We offer a free tier with limited access (e.g., 3 interview sessions). We reserve the right to modify 
              or terminate free usage limits at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">11. Refunds and Cancellation</h2>
            <p className="leading-relaxed">
              You may cancel your subscription at any time. Cancellations will apply to the next billing cycle. 
              We do not provide refunds for partial months of service or unused interview quotas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">12. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on the platform, including design, text, graphics, and underlying code, is the property of 
              HirePilot and protected by intellectual property laws. You may not reproduce or distribute this content 
              without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">13. User Content</h2>
            <p className="leading-relaxed">
              You retain ownership of the data you input (such as your resume details). By using the service, you grant us 
              a license to process and display this data for the purpose of providing the service to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">14. Third-Party Services</h2>
            <p className="leading-relaxed">
              HirePilot may link to or integrate with third-party services. We are not responsible for the content or 
              practices of these third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">15. Service Availability</h2>
            <p className="leading-relaxed">
              We strive to keep the platform available 24/7, but we do not guarantee uninterrupted access. The service 
              may be temporarily unavailable for maintenance or due to circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">16. Disclaimer</h2>
            <p className="leading-relaxed">
              HirePilot is provided "as is" without any warranties, express or implied. We do not guarantee that the 
              service will meet your specific requirements or result in employment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">17. Limitation of Liability</h2>
            <p className="leading-relaxed">
              In no event shall HirePilot or its operators be liable for any indirect, incidental, special, consequential, 
              or punitive damages arising out of your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">18. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms & Conditions at any time. We will provide notice of significant 
              changes by updating the date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">19. Contact</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms & Conditions, please contact us via our Contact page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Terms;
