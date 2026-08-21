import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { COLORS, RADIUS } from '../../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'primary' | 'accent';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  variant = 'default',
}) => {
  let cardStyle = styles.default;
  if (variant === 'elevated') cardStyle = styles.elevated;
  if (variant === 'primary') cardStyle = styles.primary;
  if (variant === 'accent') cardStyle = styles.accent;

  return <View style={[styles.base, cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.xl,
    padding: 16,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: COLORS.glassBg,
    borderColor: COLORS.glassBorder,
    borderWidth: 1,
  },
  elevated: {
    backgroundColor: COLORS.glassBgElevated,
    borderColor: COLORS.glassBorderElevated,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  primary: {
    backgroundColor: 'rgba(77, 142, 255, 0.08)',
    borderColor: COLORS.glassBorderPrimary,
    borderWidth: 1,
  },
  accent: {
    backgroundColor: 'rgba(76, 215, 246, 0.08)',
    borderColor: 'rgba(76, 215, 246, 0.3)',
    borderWidth: 1,
  },
});
