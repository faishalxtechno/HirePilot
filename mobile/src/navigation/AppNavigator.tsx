import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';

// Modals / Nested Flow Screens
import { InterviewSetupScreen } from '../screens/interview/InterviewSetupScreen';
import { LiveInterviewScreen } from '../screens/interview/LiveInterviewScreen';
import { InterviewResultScreen } from '../screens/interview/InterviewResultScreen';
import { InterviewHistoryScreen } from '../screens/interview/InterviewHistoryScreen';
import { ResumeAnalysisScreen } from '../screens/resume/ResumeAnalysisScreen';
import { JobDetailsScreen } from '../screens/jobs/JobDetailsScreen';
import { ApplicationTrackerScreen } from '../screens/jobs/ApplicationTrackerScreen';
import { CareerAnalyticsScreen } from '../screens/analytics/CareerAnalyticsScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { ProSubscriptionScreen } from '../screens/profile/ProSubscriptionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#020617' },
      }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={TabNavigator} />
      
      {/* Nested Stacks */}
      <Stack.Screen name="InterviewSetup" component={InterviewSetupScreen} />
      <Stack.Screen
        name="LiveInterview"
        component={LiveInterviewScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="InterviewResult" component={InterviewResultScreen} />
      <Stack.Screen name="InterviewHistory" component={InterviewHistoryScreen} />
      <Stack.Screen name="ResumeAnalysis" component={ResumeAnalysisScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      <Stack.Screen name="ApplicationTracker" component={ApplicationTrackerScreen} />
      <Stack.Screen name="CareerAnalytics" component={CareerAnalyticsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Subscription" component={ProSubscriptionScreen} />
    </Stack.Navigator>
  );
};
