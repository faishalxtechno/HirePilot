import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { GlassCard } from '../../components/ui/GlassCard';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import {
  Bell,
  Moon,
  Shield,
  Volume2,
  HelpCircle,
  FileCode2,
  ChevronRight,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SettingsScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [voiceSpeech, setVoiceSpeech] = useState(true);
  const [haptics, setHaptics] = useState(true);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Settings & Privacy"
        subtitle="App preferences and configurations"
        showBack
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>PREFERENCES</Text>

        <GlassCard style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Bell size={18} color="#38bdf8" />
              <View>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingDesc}>Interview reminders & job match alerts</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#334155', true: '#38bdf8' }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Volume2 size={18} color="#4ade80" />
              <View>
                <Text style={styles.settingTitle}>AI Voice Readout</Text>
                <Text style={styles.settingDesc}>Read mock interview questions aloud</Text>
              </View>
            </View>
            <Switch
              value={voiceSpeech}
              onValueChange={setVoiceSpeech}
              trackColor={{ false: '#334155', true: '#4ade80' }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Moon size={18} color="#a855f7" />
              <View>
                <Text style={styles.settingTitle}>Dark Liquid Glass Theme</Text>
                <Text style={styles.settingDesc}>Enabled by default</Text>
              </View>
            </View>
            <Switch
              value={true}
              disabled
              trackColor={{ false: '#334155', true: '#a855f7' }}
              thumbColor="#ffffff"
            />
          </View>
        </GlassCard>

        <Text style={styles.sectionTitle}>ABOUT & PRIVACY</Text>

        <GlassCard style={styles.card}>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Alert.alert('Privacy Policy', 'HirePilot respects your privacy. All interview transcripts and resumes are securely encrypted.')}
          >
            <View style={styles.settingLeft}>
              <Shield size={18} color="#38bdf8" />
              <Text style={styles.linkTitle}>Privacy Policy</Text>
            </View>
            <ChevronRight size={16} color={COLORS.outline} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Alert.alert('Terms of Service', 'HirePilot terms of service available at hirepilotapp.com')}
          >
            <View style={styles.settingLeft}>
              <FileCode2 size={18} color="#38bdf8" />
              <Text style={styles.linkTitle}>Terms of Service</Text>
            </View>
            <ChevronRight size={16} color={COLORS.outline} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Alert.alert('HirePilot Version', 'HirePilot Android Mobile v1.0.0 (Build 1)')}
          >
            <View style={styles.settingLeft}>
              <HelpCircle size={18} color="#38bdf8" />
              <Text style={styles.linkTitle}>App Version</Text>
            </View>
            <Text style={styles.versionText}>1.0.0</Text>
          </TouchableOpacity>
        </GlassCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 4,
  },
  card: {
    padding: 14,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  settingDesc: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginVertical: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  linkTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  versionText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: '700',
  },
});
