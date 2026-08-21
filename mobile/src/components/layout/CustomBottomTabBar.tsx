import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  LayoutDashboard,
  PlayCircle,
  FileText,
  Briefcase,
  User,
} from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const getIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? '#adc6ff' : COLORS.outline;
    const size = 22;

    switch (routeName) {
      case 'Home':
        return <LayoutDashboard size={size} color={color} />;
      case 'Interview':
        return <PlayCircle size={size} color={color} />;
      case 'Resume':
        return <FileText size={size} color={color} />;
      case 'Jobs':
        return <Briefcase size={size} color={color} />;
      case 'Profile':
        return <User size={size} color={color} />;
      default:
        return <LayoutDashboard size={size} color={color} />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      <View style={styles.tabBarInner}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              try {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              } catch {}
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.7}
              onPress={onPress}
              style={styles.tabButton}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={route.name}
            >
              {/* Active Glow Pill */}
              {isFocused && <View style={styles.activePill} />}

              <View style={[styles.iconWrapper, isFocused && styles.iconWrapperActive]}>
                {getIcon(route.name, isFocused)}
              </View>

              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(6, 11, 24, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 8,
  },
  tabBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 4,
  },
  activePill: {
    position: 'absolute',
    top: -8,
    width: 32,
    height: 3,
    backgroundColor: '#38bdf8',
    borderRadius: 2,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  iconWrapper: {
    width: 38,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#adc6ff',
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: COLORS.outline,
  },
});
