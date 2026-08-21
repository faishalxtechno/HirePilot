import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS, RADIUS } from '../../constants/theme';
import {
  User,
  Briefcase,
  Zap,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  Shield,
  Edit2,
  Check,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { profile, user, signOut, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name || 'Alex Morgan');
  const [targetRole, setTargetRole] = useState(profile?.target_role || 'Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState(profile?.experience_level || 'Mid-Senior');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        name,
        target_role: targetRole,
        experience_level: experienceLevel,
      });
      setIsEditing(false);
      Alert.alert('Profile Updated', 'Your career preferences have been saved successfully.');
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of HirePilot?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          if (navigation.getParent()) {
            navigation.getParent()?.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          } else {
            navigation.navigate('Auth');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Candidate Profile"
        subtitle="Manage your identity and career target"
        rightAction={
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => navigation.navigate('Settings')}
          >
            <Settings size={18} color="#ffffff" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Header */}
        <GlassCard style={styles.profileHeaderCard} variant="elevated">
          <View style={styles.avatarRow}>
            <View style={styles.avatarBox}>
              {profile?.avatar_url ? (
                <Image source={{ uri: profile.avatar_url }} style={styles.avatarImg} />
              ) : (
                <Text style={styles.avatarInitial}>{name.charAt(0)}</Text>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileRole}>{targetRole}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'alex.morgan@example.com'}</Text>
            </View>

            <TouchableOpacity
              style={styles.editIconBtn}
              onPress={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Check size={16} color="#4ade80" /> : <Edit2 size={16} color="#38bdf8" />}
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Subscription / Quota Card */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Subscription')}
        >
          <GlassCard style={styles.quotaCard} variant="primary">
            <View style={styles.quotaRow}>
              <View style={styles.quotaIconBox}>
                <Zap size={20} color="#ffb786" fill="#ffb786" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.quotaTitle}>Free Plan Allowance</Text>
                <Text style={styles.quotaDesc}>
                  {profile?.monthly_interviews_used ?? 1} / {profile?.monthly_interviews_limit ?? 3} mock sessions used this month
                </Text>
              </View>
              <GlassBadge label="Upgrade" variant="warning" />
            </View>
          </GlassCard>
        </TouchableOpacity>

        {/* Edit Career Preferences Section */}
        {isEditing ? (
          <GlassCard style={styles.editCard}>
            <Text style={styles.sectionHeading}>EDIT PREFERENCES</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholderTextColor={COLORS.outline}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Target Role</Text>
              <TextInput
                style={styles.textInput}
                value={targetRole}
                onChangeText={setTargetRole}
                placeholderTextColor={COLORS.outline}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Experience Level</Text>
              <TextInput
                style={styles.textInput}
                value={experienceLevel}
                onChangeText={setExperienceLevel}
                placeholderTextColor={COLORS.outline}
              />
            </View>

            <GlassButton
              title="Save Profile"
              onPress={handleSave}
              isLoading={isSaving}
              size="md"
              style={{ marginTop: 6 }}
            />
          </GlassCard>
        ) : null}

        {/* Target Companies Card */}
        <GlassCard style={styles.companiesCard}>
          <Text style={styles.sectionHeading}>TARGET COMPANIES</Text>
          <View style={styles.chipRow}>
            {(profile?.target_companies || ['Google', 'Stripe', 'Anthropic', 'Vercel', 'Figma']).map((c) => (
              <View key={c} style={styles.companyPill}>
                <Text style={styles.companyPillText}>{c}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Primary Skills */}
        <GlassCard style={styles.skillsCard}>
          <Text style={styles.sectionHeading}>CORE SKILLS</Text>
          <View style={styles.chipRow}>
            {(profile?.skills || ['React', 'TypeScript', 'Node.js', 'System Design', 'PostgreSQL', 'Cloud']).map((s) => (
              <View key={s} style={styles.skillPill}>
                <Text style={styles.skillPillText}>{s}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Menu Links */}
        <GlassCard style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('CareerAnalytics')}
          >
            <View style={styles.menuItemLeft}>
              <Sparkles size={18} color="#38bdf8" />
              <Text style={styles.menuItemText}>Career Analytics & Benchmarks</Text>
            </View>
            <ChevronRight size={16} color={COLORS.outline} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Subscription')}
          >
            <View style={styles.menuItemLeft}>
              <Zap size={18} color="#ffb786" />
              <Text style={styles.menuItemText}>HirePilot Pro Upgrade</Text>
            </View>
            <ChevronRight size={16} color={COLORS.outline} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={styles.menuItemLeft}>
              <Settings size={18} color="#ffffff" />
              <Text style={styles.menuItemText}>App Settings & Privacy</Text>
            </View>
            <ChevronRight size={16} color={COLORS.outline} />
          </TouchableOpacity>
        </GlassCard>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <LogOut size={16} color="#f43f5e" />
          <Text style={styles.logoutText}>Sign Out of HirePilot</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileHeaderCard: {
    padding: 16,
    marginBottom: 14,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#0052cc',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarInitial: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  profileRole: {
    fontSize: 12,
    color: '#38bdf8',
    marginTop: 2,
    fontWeight: '600',
  },
  profileEmail: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 1,
  },
  editIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quotaCard: {
    padding: 14,
    marginBottom: 14,
  },
  quotaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quotaIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 183, 134, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quotaTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  quotaDesc: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  editCard: {
    padding: 16,
    marginBottom: 14,
    gap: 10,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 8,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#ffffff',
    fontSize: 13,
  },
  companiesCard: {
    padding: 14,
    marginBottom: 14,
  },
  skillsCard: {
    padding: 14,
    marginBottom: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  companyPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  companyPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  skillPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderColor: 'rgba(56, 189, 248, 0.25)',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  skillPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#38bdf8',
  },
  menuCard: {
    padding: 6,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.25)',
    marginBottom: 20,
  },
  logoutText: {
    color: '#f43f5e',
    fontSize: 13,
    fontWeight: '700',
  },
});
