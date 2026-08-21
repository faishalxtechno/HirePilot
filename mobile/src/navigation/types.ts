import { NavigatorScreenParams } from '@react-navigation/native';
import { Job, InterviewType, DifficultyLevel } from '../types';

export type MainTabParamList = {
  Home: undefined;
  Interview: undefined;
  Resume: undefined;
  Jobs: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  InterviewSetup: { role?: string; type?: InterviewType };
  LiveInterview: { interviewId: string; firstQuestion?: any };
  InterviewResult: { interviewId: string };
  InterviewHistory: undefined;
  ResumeAnalysis: undefined;
  JobDetails: { job: Job };
  ApplicationTracker: undefined;
  CareerAnalytics: undefined;
  Settings: undefined;
  Subscription: undefined;
};
