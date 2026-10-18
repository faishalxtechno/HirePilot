import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Cursor } from './components/layout/Cursor';

// Lazy-loaded Pages for Route-Level Code Splitting
const Landing = React.lazy(() => import('./pages/Landing').then((m) => ({ default: m.Landing })));
const Login = React.lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const Signup = React.lazy(() => import('./pages/Signup').then((m) => ({ default: m.Signup })));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword').then((m) => ({ default: m.ForgotPassword })));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword').then((m) => ({ default: m.ResetPassword })));
const Dashboard = React.lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const InterviewSetup = React.lazy(() => import('./pages/InterviewSetup').then((m) => ({ default: m.InterviewSetup })));
const Interview = React.lazy(() => import('./pages/Interview').then((m) => ({ default: m.Interview })));
const InterviewResult = React.lazy(() => import('./pages/InterviewResult').then((m) => ({ default: m.InterviewResult })));
const HistoryPage = React.lazy(() => import('./pages/History').then((m) => ({ default: m.HistoryPage })));
const Profile = React.lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })));
const ResumePage = React.lazy(() => import('./pages/Resume').then((m) => ({ default: m.ResumePage })));
const JobsPage = React.lazy(() => import('./pages/Jobs').then((m) => ({ default: m.JobsPage })));
const Privacy = React.lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })));
const Terms = React.lazy(() => import('./pages/Terms').then((m) => ({ default: m.Terms })));
const Contact = React.lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const FigmaDesignSystem = React.lazy(() => import('./pages/FigmaDesignSystem').then((m) => ({ default: m.FigmaDesignSystem })));
const NotFound = React.lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

import { PageTransition } from './components/layout/PageTransition';

const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#080B14] text-slate-400 gap-3">
    <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
    <span className="text-xs font-mono text-slate-400">Loading HirePilot...</span>
  </div>
);

const AppContent: React.FC = () => {
  return (
    <PageTransition>
      <React.Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/design-system" element={<FigmaDesignSystem />} />
          <Route path="/figma" element={<FigmaDesignSystem />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/setup"
            element={
              <ProtectedRoute>
                <InterviewSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:id"
            element={
              <ProtectedRoute>
                <Interview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:id/result"
            element={
              <ProtectedRoute>
                <InterviewResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <ResumePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </PageTransition>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Cursor />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
