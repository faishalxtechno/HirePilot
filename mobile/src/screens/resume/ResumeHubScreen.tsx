import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { resumeService } from '../../services/resume';
import { ResumeAnalysis } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import {
  FileText,
  UploadCloud,
  Wand2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Target,
} from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ResumeHubScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { profile } = useAuth();
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const targetRole = profile?.target_role || 'Software Engineer';

  useEffect(() => {
    resumeService.getAnalysis().then(setAnalysis);
  }, []);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setIsUploading(true);

        const newAnalysis = await resumeService.analyzeUploadedDocument(
          file.name,
          `${Math.round((file.size || 140000) / 1024)} KB`,
          targetRole
        );
        setAnalysis(newAnalysis);
        Alert.alert('Upload Successful', `Evaluated ${file.name}! ATS Score: ${newAnalysis.atsScore}%.`);
      }
    } catch (e) {
      console.warn('Document picker error:', e);
    } finally {
      setIsUploading(false);
    }
  };

  if (!analysis) return null;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="AI Resume Intelligence"
        subtitle="ATS screening & bullet optimizer"
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ATS Score Hero Card (Stitch Liquid Glass) */}
        <GlassCard style={styles.heroCard} variant="elevated">
          <View style={styles.heroTopRow}>
            <View style={{ flex: 1 }}>
              <GlassBadge label="ATS COMPATIBILITY" variant="primary" icon={<Sparkles size={10} color="#38bdf8" />} />
              <Text style={styles.heroTitle}>{analysis.atsScore}% Score</Text>
              <Text style={styles.heroDesc}>
                {analysis.atsScore >= 80 ? 'Optimized for high-tier tech ATS filters' : 'Optimization required for recruiter reach'}
              </Text>
            </View>

            <ProgressRing score={analysis.atsScore} size={88} strokeWidth={8} color="#adc6ff" />
          </View>

          <View style={styles.divider} />

          {/* Submetrics */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Keywords</Text>
              <Text style={styles.metricVal}>{analysis.categoryScores.keywords}%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Impact</Text>
              <Text style={styles.metricVal}>{analysis.categoryScores.impact}%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Format</Text>
              <Text style={styles.metricVal}>{analysis.categoryScores.formatting}%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Action Verbs</Text>
              <Text style={styles.metricVal}>{analysis.categoryScores.actionVerbs}%</Text>
            </View>
          </View>
        </GlassCard>

        {/* Current Uploaded Resume Info & Re-upload CTA */}
        <GlassCard style={styles.fileInfoCard}>
          <View style={styles.fileRow}>
            <View style={styles.fileIconBadge}>
              <FileText size={20} color="#38bdf8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fileName}>{analysis.fileName}</Text>
              <Text style={styles.fileMeta}>{analysis.fileSize} • Uploaded recently</Text>
            </View>
          </View>

          <GlassButton
            title="Upload New Resume (PDF / Word)"
            onPress={handlePickDocument}
            isLoading={isUploading}
            variant="secondary"
            size="md"
            icon={<UploadCloud size={16} color="#ffffff" />}
            style={{ marginTop: 12 }}
          />
        </GlassCard>

        {/* AI Bullet Optimizer Action Banner */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ResumeAnalysis')}
        >
          <GlassCard style={styles.bannerCard} variant="accent">
            <View style={styles.bannerRow}>
              <View style={styles.bannerIconBox}>
                <Wand2 size={22} color="#4cd7f6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>AI High-Impact Bullet Rewriter</Text>
                <Text style={styles.bannerDesc}>
                  Transform passive phrases into quantified achievements with Google XYZ formula.
                </Text>
              </View>
              <ArrowRight size={18} color="#4cd7f6" />
            </View>
          </GlassCard>
        </TouchableOpacity>

        {/* Missing Keywords Section */}
        <GlassCard style={styles.keywordsCard}>
          <View style={styles.keywordsHeader}>
            <View style={styles.keywordTitleRow}>
              <Target size={16} color="#ffb786" />
              <Text style={styles.keywordsTitle}>Suggested Target Keywords</Text>
            </View>
            <Text style={styles.keywordsSub}>Add to match {targetRole} roles</Text>
          </View>

          <View style={styles.chipWrap}>
            {analysis.missingKeywords.map((kw) => (
              <View key={kw} style={styles.missingChip}>
                <Text style={styles.missingChipText}>+ {kw}</Text>
              </View>
            ))}
          </View>
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
  heroCard: {
    padding: 18,
    marginBottom: 14,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 6,
  },
  heroDesc: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
    paddingRight: 10,
    lineHeight: 17,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 14,
  },
  metricsRow: {
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
  fileInfoCard: {
    padding: 14,
    marginBottom: 14,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  fileMeta: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  bannerCard: {
    padding: 14,
    marginBottom: 14,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(76, 215, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(76, 215, 246, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  bannerDesc: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
  keywordsCard: {
    padding: 14,
    marginBottom: 20,
  },
  keywordsHeader: {
    marginBottom: 12,
  },
  keywordTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  keywordsTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffb786',
    letterSpacing: 0.5,
  },
  keywordsSub: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  missingChip: {
    backgroundColor: 'rgba(255, 183, 134, 0.12)',
    borderColor: 'rgba(255, 183, 134, 0.25)',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  missingChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffb786',
  },
});
