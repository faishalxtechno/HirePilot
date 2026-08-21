import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { interviewService } from '../../services/interviews';
import { Interview, InterviewType } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import {
  Play,
  Code2,
  Binary,
  MessageSquare,
  Users,
  Layers,
  Sparkles,
  History,
  ArrowRight,
  ChevronRight,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const InterviewHomeScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { profile } = useAuth();
  const [recentInterviews, setRecentInterviews] = useState<Interview[]>([]);

  const targetRole = profile?.target_role || 'Software Engineer';

  useEffect(() => {
    interviewService.getInterviews().then((list) => {
      setRecentInterviews(list.slice(0, 3));
    });
  }, []);

  const formats: { type: InterviewType; title: string; desc: string; icon: any; color: string }[] = [
    {
      type: 'technical',
      title: 'Technical Core',
      desc: 'System architecture, API design, frameworks, edge cases',
      icon: Code2,
      color: '#38bdf8',
    },
    {
      type: 'dsa',
      title: 'Algorithms & DSA',
      desc: 'Data structures, Big-O complexity, optimal trade-offs',
      icon: Binary,
      color: '#a855f7',
    },
    {
      type: 'behavioral',
      title: 'Behavioral STAR',
      desc: 'Conflict resolution, leadership stories, team collaboration',
      icon: MessageSquare,
      color: '#4ade80',
    },
    {
      type: 'hr',
      title: 'HR & Cultural Fit',
      desc: 'Career goals, company alignment, communication nuance',
      icon: Users,
      color: '#ffb786',
    },
    {
      type: 'mixed',
      title: 'Full Loop Simulation',
      desc: 'Comprehensive round covering technical, DSA, and leadership',
      icon: Layers,
      color: '#ec4899',
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="AI Interview Studio"
        subtitle="Simulate real hiring rounds with Gemini Pro"
        rightAction={
          <TouchableOpacity
            style={styles.historyBtn}
            onPress={() => navigation.navigate('InterviewHistory')}
          >
            <History size={18} color="#38bdf8" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Hero Banner */}
        <GlassCard style={styles.heroCard} variant="primary">
          <View style={styles.heroRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.roleTagRow}>
                <GlassBadge label={targetRole} variant="primary" />
                <GlassBadge label="Unlimited" variant="cyan" />
              </View>
              <Text style={styles.heroTitle}>Practice Makes Placement</Text>
              <Text style={styles.heroDesc}>
                Select a format below to test your technical depth and get real-time actionable feedback.
              </Text>
            </View>
          </View>
          <GlassButton
            title="Configure Custom Round"
            onPress={() => navigation.navigate('InterviewSetup', { role: targetRole })}
            size="md"
            icon={<Play size={16} color="#001a42" fill="#001a42" />}
            style={styles.heroActionBtn}
          />
        </GlassCard>

        {/* Formats Section */}
        <Text style={styles.sectionTitle}>SELECT INTERVIEW FORMAT</Text>

        <View style={styles.formatList}>
          {formats.map((fmt) => {
            const Icon = fmt.icon;
            return (
              <TouchableOpacity
                key={fmt.type}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('InterviewSetup', { role: targetRole, type: fmt.type })}
              >
                <GlassCard style={styles.formatCard}>
                  <View style={styles.formatCardLeft}>
                    <View style={[styles.formatIconBox, { backgroundColor: `${fmt.color}15`, borderColor: `${fmt.color}30` }]}>
                      <Icon size={22} color={fmt.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.formatTitle}>{fmt.title}</Text>
                      <Text style={styles.formatDesc}>{fmt.desc}</Text>
                    </View>
                  </View>
                  <ChevronRight size={18} color={COLORS.outline} />
                </GlassCard>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Recent Attempts */}
        {recentInterviews.length > 0 && (
          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.sectionTitle}>RECENT SESSIONS</Text>
              <TouchableOpacity onPress={() => navigation.navigate('InterviewHistory')}>
                <Text style={styles.seeAllText}>View All History →</Text>
              </TouchableOpacity>
            </View>

            <View style={{ gap: 8 }}>
              {recentInterviews.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('InterviewResult', { interviewId: item.id })}
                >
                  <GlassCard style={styles.recentItemCard}>
                    <View>
                      <Text style={styles.recentRole}>{item.role}</Text>
                      <Text style={styles.recentMeta}>{item.interview_type} • {item.difficulty}</Text>
                    </View>
                    <View style={styles.recentScoreBadge}>
                      <Text style={styles.recentScoreVal}>{item.score ?? 85}%</Text>
                    </View>
                  </GlassCard>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  historyBtn: {
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
  heroCard: {
    padding: 16,
    marginBottom: 20,
  },
  heroRow: {
    flexDirection: 'row',
  },
  roleTagRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  heroDesc: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 14,
  },
  heroActionBtn: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 12,
  },
  formatList: {
    gap: 10,
    marginBottom: 24,
  },
  formatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  formatCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  formatIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  formatDesc: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
  recentSection: {
    marginTop: 4,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38bdf8',
  },
  recentItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  recentRole: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  recentMeta: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    textTransform: 'capitalize',
    marginTop: 2,
  },
  recentScoreBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  recentScoreVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#38bdf8',
  },
});
