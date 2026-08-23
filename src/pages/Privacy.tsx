import React from 'react';
import { Triangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Privacy: React.FC = () => {
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
      <div className="max-w-[800px] mx-auto px-6 pt-32 pb-24 w-full">
        <h1 className="text-white font-display text-4xl md:text-5xl mb-4">Privacy Policy</h1>
        <p className="text-brand-muted text-sm mb-12 uppercase tracking-widest">Last updated: August 23, 2026</p>

        <div className="space-y-10 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-display text-white mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to HirePilot. We respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform 
              to practice interviews, build resumes, and search for jobs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">2. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us, information automatically collected when you use our services, 
              and information from third-party sources (if applicable).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">3. Account Information</h2>
            <p className="leading-relaxed">
              When you create an account, we may collect your name, email address, password, and other necessary 
              registration details to provide you with secure access to our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">4. Resume Information</h2>
            <p className="leading-relaxed">
              We store the data you provide to generate your resume, including your work history, education, skills, 
              projects, and contact details. This data is used solely to generate your documents and match you with 
              relevant interview practices or job searches.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">5. Interview and Usage Data</h2>
            <p className="leading-relaxed">
              During mock interviews, we collect your textual responses, the questions generated, and the resulting 
              performance analytics and feedback. We use this to provide you with a history of your performance and 
              adaptive learning paths.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">6. Job Search Data</h2>
            <p className="leading-relaxed">
              We may collect data regarding the job titles, industries, and locations you search for within our platform, 
              which helps tailor our recommendations and content to your career goals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">7. How We Use Information</h2>
            <p className="leading-relaxed">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Provide, maintain, and improve our services.</li>
              <li>Generate AI-driven feedback for your interview sessions.</li>
              <li>Process transactions and send related information.</li>
              <li>Respond to your comments, questions, and customer service requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">8. AI Processing</h2>
            <p className="leading-relaxed">
              HirePilot uses advanced AI models to simulate interview environments and evaluate your responses. 
              The data processed by these models is used strictly for generating your personalized feedback. 
              We do not use your personal data to train public AI models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">9. Data Storage</h2>
            <p className="leading-relaxed">
              Your data is stored securely using industry-standard database providers. We employ measures to ensure 
              your data remains accessible to you and protected against unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">10. Data Security</h2>
            <p className="leading-relaxed">
              We implement reasonable administrative, technical, and physical security measures to protect your 
              personal information. However, no method of transmission over the Internet or electronic storage is 
              100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">11. Third-Party Services</h2>
            <p className="leading-relaxed">
              We may utilize third-party services for payments, authentication, and analytics. These providers 
              have their own privacy policies governing how they handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">12. Cookies and Similar Technologies</h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain 
              information, ensuring you remain logged in and providing a customized user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">13. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your personal information only for as long as is necessary for the purposes set out in this 
              Privacy Policy, or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">14. Your Rights</h2>
            <p className="leading-relaxed">
              You have the right to access, update, or delete the personal information we have on you. 
              You can manage most of this directly from your account settings. For specific requests, you may 
              contact us directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">15. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our service does not address anyone under the age of 13. We do not knowingly collect personally 
              identifiable information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">16. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-white mb-4">17. Contact</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please reach out to us via our Contact page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
