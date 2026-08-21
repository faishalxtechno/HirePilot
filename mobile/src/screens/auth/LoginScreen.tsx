import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassInput } from '../../components/ui/GlassInput';
import { GlassButton } from '../../components/ui/GlassButton';
import { COLORS } from '../../constants/theme';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LoginScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { signIn, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigateToDashboard = () => {
    console.log('[AUTH] Navigation to Dashboard started');
    if (navigation.getParent()) {
      navigation.getParent()?.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } else {
      navigation.navigate('Main');
    }
    console.log('[AUTH] Navigation completed');
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setErrorMsg(null);
    console.log('[AUTH] Login button pressed');
    try {
      await signIn(email, password);
      navigateToDashboard();
    } catch (err: any) {
      console.error('[AUTH] Login error:', err);
      setErrorMsg(err.message || 'Invalid email or password. Please try again.');
    }
  };

  const handleDemoLogin = async () => {
    setErrorMsg(null);
    console.log('[AUTH] Demo login button pressed');
    try {
      await signIn('demo@hirepilot.ai', 'demo123');
      navigateToDashboard();
    } catch (err: any) {
      console.error('[AUTH] Demo login error:', err);
      setErrorMsg('Failed to launch demo account.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Sparkles size={28} color="#ffffff" />
          </View>
          <Text style={styles.title}>
            Welcome to <Text style={styles.brandAccent}>HirePilot</Text>
          </Text>
          <Text style={styles.subtitle}>
            Sign in to access your AI mock interviews, ATS resume score, and job pipeline.
          </Text>
        </View>

        {/* Form Card */}
        <GlassCard style={styles.card} variant="elevated">
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

          <GlassInput
            label="Password"
            placeholder="••••••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={<Lock size={18} color={COLORS.outline} />}
          />

          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <GlassButton
            title="Sign In to HirePilot"
            onPress={handleLogin}
            isLoading={isLoading}
            size="lg"
            style={styles.submitBtn}
            icon={<ArrowRight size={18} color="#001a42" />}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR TRY INSTANTLY</Text>
            <View style={styles.dividerLine} />
          </View>

          <GlassButton
            title="Explore with Demo Account"
            onPress={handleDemoLogin}
            variant="secondary"
            size="md"
          />
        </GlassCard>

        {/* Footer Link to Signup */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scrollContent: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#0052cc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Inter',
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: '#38bdf8',
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
    marginBottom: 20,
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
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: 18,
    marginTop: -6,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: '#38bdf8',
    fontWeight: '600',
  },
  submitBtn: {
    width: '100%',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.outline,
    marginHorizontal: 12,
    letterSpacing: 0.8,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
  },
  signupLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#38bdf8',
  },
});
