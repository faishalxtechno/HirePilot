import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassInput } from '../../components/ui/GlassInput';
import { GlassButton } from '../../components/ui/GlassButton';
import { COLORS } from '../../constants/theme';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ForgotPasswordScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleReset = async () => {
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    try {
      await supabase.auth.resetPasswordForEmail(email.trim());
      setSentSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send password reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}
    >
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={20} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter the email associated with your account and we'll send you instructions to reset your password.
          </Text>
        </View>

        <GlassCard style={styles.card} variant="elevated">
          {sentSuccess ? (
            <View style={styles.successBox}>
              <CheckCircle2 size={48} color={COLORS.success} />
              <Text style={styles.successTitle}>Reset Email Sent</Text>
              <Text style={styles.successDesc}>
                We've sent password reset instructions to <Text style={{ color: '#fff' }}>{email}</Text>. Please check your inbox.
              </Text>
              <GlassButton
                title="Back to Sign In"
                onPress={() => navigation.navigate('Login')}
                style={{ width: '100%', marginTop: 16 }}
              />
            </View>
          ) : (
            <>
              {errorMsg && (
                <View style={styles.errorBanner}>
                  <Text style={styles.errorBannerText}>{errorMsg}</Text>
                </View>
              )}

              <GlassInput
                label="Email Address"
                placeholder="alex.morgan@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                leftIcon={<Mail size={18} color={COLORS.outline} />}
              />

              <GlassButton
                title="Send Reset Instructions"
                onPress={handleReset}
                isLoading={isLoading}
                size="lg"
                style={styles.submitBtn}
              />
            </>
          )}
        </GlassCard>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
    paddingHorizontal: 12,
  },
  card: {
    padding: 20,
  },
  errorBanner: {
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    borderColor: 'rgba(244, 63, 94, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  errorBannerText: {
    color: COLORS.errorBright,
    fontSize: 12,
    fontWeight: '600',
  },
  submitBtn: {
    width: '100%',
    marginTop: 8,
  },
  successBox: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
  },
  successDesc: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
