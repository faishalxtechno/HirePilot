import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { CustomBottomTabBar } from '../components/layout/CustomBottomTabBar';

// Screens
import { HomeScreen } from '../screens/home/HomeScreen';
import { InterviewHomeScreen } from '../screens/interview/InterviewHomeScreen';
import { ResumeHubScreen } from '../screens/resume/ResumeHubScreen';
import { JobDiscoveryScreen } from '../screens/jobs/JobDiscoveryScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Interview" component={InterviewHomeScreen} />
      <Tab.Screen name="Resume" component={ResumeHubScreen} />
      <Tab.Screen name="Jobs" component={JobDiscoveryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
