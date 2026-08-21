import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { interviewService } from '../../services/interviews';
import { DashboardData } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import {
  TrendingUp,
  Award,
  Flame,
  CheckCircle2,
  Code2,
  Binary,
  MessageSquare,
  Sparkles,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CareerAnalyticsScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    interviewService.getDashboardData().then(setData);
  }, []);

  if (!data) return null;

  const skillBars = [
    { label: 'Technical Depth', score: data.performance.technical, color: '#38bdf8' },
    { label: 'DSA & Algorithms', score: data.performance.dsa, color: '#a855f7' },
    { label: 'System Design', score: data.performance.systemDesign, color: '#4cd7f6' },
    { label: 'Communication Clarity', score: data.performance.communication, color: '#4ade80' },
    { label: 'Behavioral STAR', score: data.performance.behavioral, color: '#ffb786' },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Career Analytics"
        subtitle="Skill readiness and score trajectory"
        showBack
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Overall Readiness Ring */}
        <GlassCard style={styles.readinessCard} variant="elevated">
          <View style={styles.readinessRow}>
            <View style={{ flex: 1 }}>
              <GlassBadge label="AI READINESS SCORE" variant="primary" icon={<Sparkles size={10} color="#38bdf8" />} />
              <Text style={styles.readinessScore}>{data.stats.averageScore}%</Text>
              <Text style={styles.readinessDesc}>
                Top 8% percentile among {data.stats.interviewsCompleted} completed mock sessions.
              </Text>
            </View>
            <ProgressRing score={data.stats.averageScore} size={92} strokeWidth={8} color="#adc6ff" />
          </View>
        </GlassCard>

        {/* 3 Metric Cards */}
        <View style={styles.statsGrid}>
          <GlassCard style={styles.statBox}>
            <Award size={18} color="#a855f7" />
            <Text style={styles.statVal}>{data.stats.bestScore}%</Text>
            <Text style={styles.statLabel}>Best Score</Text>
          </GlassCard>

          <GlassCard style={styles.statBox}>
            <Flame size={18} color="#ffb786" />
            <Text style={styles.statVal}>{data.stats.currentStreak} Days</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </GlassCard>

          <GlassCard style={styles.statBox}>
            <CheckCircle2 size={18} color="#4ade80" />
            <Text style={styles.statVal}>{data.stats.interviewsCompleted}</Text>
            <Text style={styles.statLabel}>Interviews</Text>
          </GlassCard>
        </View>

        {/* Skill Progression Bars */}
        <Text style={styles.sectionTitle}>SKILL COMPETENCY BREAKDOWN</Text>

        <GlassCard style={styles.skillsCard}>
          {skillBars.map((item) => (
            <View key={item.label} style={styles.skillRow}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillLabel}>{item.label}</Text>
                <Text style={[styles.skillPercent, { color: item.color }]}>{item.score}%</Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${item.score}%`, backgroundColor: item.color }]} />
              </View>
            </View>
          ))}
        </GlassCard>

        {/* AI Recommendations */}
        <Text style={styles.sectionTitle}>NEXT MILESTONE RECOMMENDATION</Text>
        <GlassCard style={styles.recCard} variant="primary">
          <Text style={styles.recTitle}>{data.recommendation.title}</Text>
          <Text style={styles.recDesc}>{data.recommendation.description}</Text>
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
  readinessCard: {
    padding: 18,
    marginBottom: 14,
  },
  readinessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  readinessScore: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 6,
  },
  readinessDesc: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    lineHeight: 17,
    marginTop: 2,
    paddingRight: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 10,
  },
  skillsCard: {
    padding: 16,
    gap: 14,
    marginBottom: 16,
  },
  skillRow: {
    gap: 6,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skillLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  skillPercent: {
    fontSize: 12,
    fontWeight: '700',
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  recCard: {
    padding: 16,
    marginBottom: 20,
  },
  recTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  recDesc: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
    marginTop: 4,
  },
});
