import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from 'react-native';
import { COLORS, RADIUS, TYPOGRAPHY } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface GlassButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) => {
  const handlePress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    onPress();
  };

  const getContainerStyle = () => {
    const s: ViewStyle[] = [styles.base];

    if (size === 'sm') s.push(styles.sm);
    else if (size === 'lg') s.push(styles.lg);
    else s.push(styles.md);

    if (variant === 'primary') s.push(styles.primary);
    else if (variant === 'secondary') s.push(styles.secondary);
    else if (variant === 'outline') s.push(styles.outline);
    else if (variant === 'danger') s.push(styles.danger);
    else if (variant === 'ghost') s.push(styles.ghost);

    if (disabled || isLoading) s.push(styles.disabled);

    return s;
  };

  const getTextStyle = () => {
    const s: TextStyle[] = [styles.textBase];

    if (variant === 'primary') s.push(styles.textPrimary);
    else if (variant === 'secondary') s.push(styles.textSecondary);
    else if (variant === 'outline') s.push(styles.textOutline);
    else if (variant === 'danger') s.push(styles.textDanger);
    else if (variant === 'ghost') s.push(styles.textGhost);

    if (size === 'sm') s.push(styles.textSm);
    else if (size === 'lg') s.push(styles.textLg);

    return s;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled || isLoading}
      style={[getContainerStyle(), style]}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#001a42' : COLORS.primaryBright} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.md,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: RADIUS.lg,
  },
  primary: {
    backgroundColor: '#adc6ff',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  secondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primaryBright,
    borderWidth: 1,
  },
  danger: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderColor: 'rgba(244, 63, 94, 0.3)',
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  textBase: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  textPrimary: {
    color: '#001a42',
  },
  textSecondary: {
    color: COLORS.white,
  },
  textOutline: {
    color: COLORS.primaryBright,
  },
  textDanger: {
    color: COLORS.errorBright,
  },
  textGhost: {
    color: COLORS.onSurfaceVariant,
  },
  textSm: {
    fontSize: 12,
  },
  textLg: {
    fontSize: 16,
  },
});
