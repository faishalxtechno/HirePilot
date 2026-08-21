import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { COLORS, RADIUS } from '../../constants/theme';

interface GlassBadgeProps {
  label: string;
  variant?: 'primary' | 'cyan' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  label,
  variant = 'primary',
  size = 'sm',
  style,
  icon,
}) => {
  let badgeStyle = styles.primary;
  let textStyle = styles.textPrimary;

  if (variant === 'cyan') {
    badgeStyle = styles.cyan;
    textStyle = styles.textCyan;
  } else if (variant === 'success') {
    badgeStyle = styles.success;
    textStyle = styles.textSuccess;
  } else if (variant === 'warning') {
    badgeStyle = styles.warning;
    textStyle = styles.textWarning;
  } else if (variant === 'error') {
    badgeStyle = styles.error;
    textStyle = styles.textError;
  } else if (variant === 'outline') {
    badgeStyle = styles.outline;
    textStyle = styles.textOutline;
  }

  return (
    <View style={[styles.base, badgeStyle, size === 'md' && styles.md, style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, textStyle, size === 'md' && styles.textMd]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  md: {
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  textMd: {
    fontSize: 12,
  },
  primary: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  textPrimary: {
    color: COLORS.primaryBright,
  },
  cyan: {
    backgroundColor: 'rgba(76, 215, 246, 0.12)',
    borderColor: 'rgba(76, 215, 246, 0.3)',
  },
  textCyan: {
    color: COLORS.secondary,
  },
  success: {
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    borderColor: 'rgba(74, 222, 128, 0.3)',
  },
  textSuccess: {
    color: COLORS.success,
  },
  warning: {
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  textWarning: {
    color: COLORS.warning,
  },
  error: {
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    borderColor: 'rgba(244, 63, 94, 0.3)',
  },
  textError: {
    color: COLORS.errorBright,
  },
  outline: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  textOutline: {
    color: COLORS.onSurfaceVariant,
  },
});
