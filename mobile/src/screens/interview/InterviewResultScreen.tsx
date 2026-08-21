import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { interviewService } from '../../services/interviews';
import { InterviewReport } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Share2,
  Play,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const InterviewResultScreen: React.FC<any> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { interviewId } = route.params;

  const [report, setReport] = useState<InterviewReport>({
    id: `rep-${interviewId}`,
    interview_id: interviewId,
    overall_score: 88,
    role_readiness_score: 85,
    strengths: [
      'Strong technical articulation of distributed systems trade-offs.',
      'Clear explanation of microservices caching and cache invalidation.',
      'Great code complexity analysis with Big-O notation.',
    ],
    weaknesses: [
      'Could discuss more edge-case failure modes in database replication.',
      'Quantify operational metrics like p99 latency thresholds.',
    ],
    detailed_feedback:
      'Demonstrated high competence across architectural design and algorithmic analysis. Answers were articulate, structured, and technically accurate.',
    radar_metrics: {
      technical: 90,
      communication: 88,
      problem_solving: 85,
      depth: 86,
    },
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored ${report.overall_score}% on my AI Mock Interview on HirePilot! 🚀 Certificate ID: CERT-HP-${interviewId.slice(-6).toUpperCase()}`,
      });
    } catch {}
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Interview Evaluation Report"
        subtitle="Gemini Pro Certified Analysis"
        showBack
        onBack={() => navigation.navigate('Main')}
        rightAction={
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Share2 size={18} color="#38bdf8" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Overall Score Card */}
        <GlassCard style={styles.scoreCard} variant="elevated">
          <View style={styles.scoreTopRow}>
            <View style={{ flex: 1 }}>
              <GlassBadge label="ROUND COMPLETED" variant="success" icon={<CheckCircle2 size={10} color="#4ade80" />} />
              <Text style={styles.scoreTitle}>Overall Score</Text>
              <Text style={styles.scoreSubtitle}>
                {report.overall_score >= 80 ? 'Competitive candidate tier' : 'Solid performance with growth areas'}
              </Text>
            </View>

            <ProgressRing score={report.overall_score} size={88} strokeWidth={8} color="#adc6ff" />
          </View>

          <View style={styles.divider} />

          {/* 4 Radar Submetrics */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Technical</Text>
              <Text style={styles.metricVal}>{report.radar_metrics?.technical ?? 90}%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Clarity</Text>
              <Text style={styles.metricVal}>{report.radar_metrics?.communication ?? 88}%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Problem Solving</Text>
              <Text style={styles.metricVal}>{report.radar_metrics?.problem_solving ?? 85}%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Depth</Text>
              <Text style={styles.metricVal}>{report.radar_metrics?.depth ?? 86}%</Text>
            </View>
          </View>
        </GlassCard>

        {/* Certificate Badge Card */}
        <GlassCard style={styles.certCard} variant="primary">
          <View style={styles.certRow}>
            <View style={styles.certIconBadge}>
              <ShieldCheck size={22} color="#38bdf8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.certTitle}>HirePilot Verified Certificate</Text>
              <Text style={styles.certId}>ID: CERT-HP-{interviewId.slice(-8).toUpperCase()}</Text>
            </View>
            <TouchableOpacity onPress={handleShare} style={styles.certShareBtn}>
              <Text style={styles.certShareText}>Share</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Strengths & Weaknesses */}
        <GlassCard style={styles.analysisCard}>
          <Text style={styles.cardSectionTitle}>KEY STRENGTHS</Text>
          <View style={styles.bulletsList}>
            {report.strengths.map((str, i) => (
              <View key={i} style={styles.bulletRow}>
                <CheckCircle2 size={14} color="#4ade80" style={{ marginTop: 2 }} />
                <Text style={styles.bulletText}>{str}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={[styles.cardSectionTitle, { color: '#ffb786' }]}>AREAS TO IMPROVE</Text>
          <View style={styles.bulletsList}>
            {report.weaknesses.map((wk, i) => (
              <View key={i} style={styles.bulletRow}>
                <AlertTriangle size={14} color="#ffb786" style={{ marginTop: 2 }} />
                <Text style={styles.bulletText}>{wk}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Detailed Feedback */}
        <GlassCard style={styles.feedbackCard}>
          <Text style={styles.cardSectionTitle}>DETAILED AI FEEDBACK</Text>
          <Text style={styles.feedbackParagraph}>{report.detailed_feedback}</Text>
        </GlassCard>

        {/* Actions */}
        <View style={styles.actionButtons}>
          <GlassButton
            title="Practice Another Mock"
            onPress={() => navigation.navigate('InterviewSetup')}
            size="lg"
            icon={<Play size={16} color="#001a42" fill="#001a42" />}
          />
          <GlassButton
            title="Back to Dashboard"
            onPress={() => navigation.navigate('Main')}
            variant="secondary"
            size="md"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  shareBtn: {
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
  scoreCard: {
    padding: 18,
    marginBottom: 14,
  },
  scoreTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 6,
  },
  scoreSubtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
    paddingRight: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  metricItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
  },
  metricVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#38bdf8',
    marginTop: 2,
  },
  certCard: {
    padding: 14,
    marginBottom: 14,
  },
  certRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  certIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  certTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  certId: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    fontFamily: 'Inter',
    marginTop: 1,
  },
  certShareBtn: {
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  certShareText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
  },
  analysisCard: {
    padding: 16,
    marginBottom: 14,
  },
  cardSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4ade80',
    letterSpacing: 1,
    marginBottom: 10,
  },
  bulletsList: {
    gap: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletText: {
    fontSize: 12,
    color: COLORS.onSurface,
    lineHeight: 18,
    flex: 1,
  },
  feedbackCard: {
    padding: 16,
    marginBottom: 20,
  },
  feedbackParagraph: {
    fontSize: 13,
    color: COLORS.onSurface,
    lineHeight: 20,
  },
  actionButtons: {
    gap: 10,
  },
});
