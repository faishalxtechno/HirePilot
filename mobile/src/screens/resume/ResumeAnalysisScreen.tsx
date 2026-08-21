import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { resumeService } from '../../services/resume';
import { ResumeAnalysis } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import {
  Wand2,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ResumeAnalysisScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    resumeService.getAnalysis().then(setAnalysis);
  }, []);

  const handleCopy = (text: string, idx: number) => {
    setCopiedIdx(idx);
    Alert.alert('Copied to Clipboard', 'You can now paste this optimized bullet into your resume document.');
    setTimeout(() => setCopiedIdx(null), 3000);
  };

  if (!analysis) return null;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="AI Bullet Optimizer"
        subtitle="Google XYZ Formula Analysis"
        showBack
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro formula banner */}
        <GlassCard style={styles.formulaBanner} variant="primary">
          <View style={styles.formulaHeader}>
            <Wand2 size={16} color="#38bdf8" />
            <Text style={styles.formulaTitle}>Google XYZ High-Impact Formula</Text>
          </View>
          <Text style={styles.formulaDesc}>
            "Accomplished <Text style={{ color: '#fff', fontWeight: '700' }}>[X]</Text> as measured by <Text style={{ color: '#fff', fontWeight: '700' }}>[Y]</Text>, by doing <Text style={{ color: '#fff', fontWeight: '700' }}>[Z]</Text>."
          </Text>
        </GlassCard>

        {/* Bullets List */}
        <Text style={styles.sectionTitle}>TRANSFORMED BULLET POINTS</Text>

        <View style={styles.bulletsList}>
          {analysis.bulletPoints.map((bp, i) => (
            <GlassCard key={i} style={styles.bulletCard}>
              {/* Original Bullet */}
              <View style={styles.bulletSection}>
                <View style={styles.bulletTagRow}>
                  <View style={styles.redDot} />
                  <Text style={styles.originalTag}>ORIGINAL (PASSIVE / WEAK)</Text>
                </View>
                <Text style={styles.originalText}>"{bp.original}"</Text>
              </View>

              <View style={styles.divider} />

              {/* Improved Bullet */}
              <View style={styles.bulletSection}>
                <View style={styles.bulletTopActionRow}>
                  <View style={styles.bulletTagRow}>
                    <Sparkles size={12} color="#4ade80" />
                    <Text style={styles.improvedTag}>AI OPTIMIZED (HIGH-IMPACT)</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.copyBtn}
                    onPress={() => handleCopy(bp.improved, i)}
                  >
                    {copiedIdx === i ? (
                      <Check size={14} color="#4ade80" />
                    ) : (
                      <Copy size={14} color="#38bdf8" />
                    )}
                    <Text style={[styles.copyBtnText, copiedIdx === i && { color: '#4ade80' }]}>
                      {copiedIdx === i ? 'Copied' : 'Copy'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.improvedText}>"{bp.improved}"</Text>
              </View>

              {/* Why it works */}
              <View style={styles.reasonBox}>
                <Text style={styles.reasonLabel}>Why it works: </Text>
                <Text style={styles.reasonText}>{bp.reason}</Text>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* Strengths & Checklist */}
        <Text style={styles.sectionTitle}>ATS PARSE CHECKLIST</Text>
        <GlassCard style={styles.checklistCard}>
          {analysis.strengths.map((str, i) => (
            <View key={i} style={styles.checkItem}>
              <CheckCircle2 size={14} color="#4ade80" style={{ marginTop: 2 }} />
              <Text style={styles.checkText}>{str}</Text>
            </View>
          ))}
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
  formulaBanner: {
    padding: 14,
    marginBottom: 16,
  },
  formulaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  formulaTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#38bdf8',
    letterSpacing: 0.5,
  },
  formulaDesc: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 10,
  },
  bulletsList: {
    gap: 12,
    marginBottom: 20,
  },
  bulletCard: {
    padding: 16,
  },
  bulletSection: {
    gap: 6,
  },
  bulletTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f43f5e',
  },
  originalTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#f43f5e',
    letterSpacing: 0.5,
  },
  originalText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    lineHeight: 17,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 12,
  },
  bulletTopActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  improvedTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4ade80',
    letterSpacing: 0.5,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
  },
  improvedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 19,
  },
  reasonBox: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.04)',
  },
  reasonLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
  },
  reasonText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    flex: 1,
    lineHeight: 16,
  },
  checklistCard: {
    padding: 14,
    gap: 10,
    marginBottom: 20,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  checkText: {
    fontSize: 12,
    color: COLORS.onSurface,
    lineHeight: 18,
    flex: 1,
  },
});
