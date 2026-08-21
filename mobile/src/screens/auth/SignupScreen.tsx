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
import { Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SignupScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { signUp, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignup = async () => {
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setErrorMsg(null);
    try {
      await signUp(email, password, name, targetRole);
      if (navigation.getParent()) {
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        navigation.navigate('Main');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create account. Please try again.');
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
        <View style={styles.header}>
          <Text style={styles.title}>
            Create your <Text style={styles.brandAccent}>HirePilot</Text> Account
          </Text>
          <Text style={styles.subtitle}>
            Start practicing AI mock interviews and get your ATS resume report in minutes.
          </Text>
        </View>

        <GlassCard style={styles.card} variant="elevated">
          {errorMsg && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{errorMsg}</Text>
            </View>
          )}

          <GlassInput
            label="Full Name"
            placeholder="Alex Morgan"
            value={name}
            onChangeText={setName}
            leftIcon={<User size={18} color={COLORS.outline} />}
          />

          <GlassInput
            label="Target Profession / Role"
            placeholder="Software Engineer"
            value={targetRole}
            onChangeText={setTargetRole}
            leftIcon={<Briefcase size={18} color={COLORS.outline} />}
          />

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

          <GlassButton
            title="Create Free Account"
            onPress={handleSignup}
            isLoading={isLoading}
            size="lg"
            style={styles.submitBtn}
            icon={<ArrowRight size={18} color="#001a42" />}
          />
        </GlassCard>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
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
  title: {
    fontSize: 24,
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
  submitBtn: {
    width: '100%',
    marginTop: 8,
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
  loginLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#38bdf8',
  },
});
