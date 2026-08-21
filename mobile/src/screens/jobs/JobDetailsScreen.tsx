import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { jobsService } from '../../services/jobs';
import { Job } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import {
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  Play,
  Send,
  Check,
  Bookmark,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const JobDetailsScreen: React.FC<any> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { job }: { job: Job } = route.params;

  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await jobsService.applyToJob(job);
      setApplied(true);
      Alert.alert(
        'Application Submitted!',
        `Your 1-tap application to ${job.company} for "${job.title}" has been recorded in your Application Tracker.`
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to submit application.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={job.company}
        subtitle={job.location}
        showBack
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Job Header Card */}
        <GlassCard style={styles.headerCard} variant="elevated">
          <View style={styles.logoRow}>
            <View style={styles.companyLogo}>
              {job.companyLogo ? (
                <Image source={{ uri: job.companyLogo }} style={styles.logoImg} />
              ) : (
                <Building2 size={24} color="#38bdf8" />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.companyName}>{job.company}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.metaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>SALARY</Text>
              <Text style={styles.metaVal}>{job.salary}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>WORKPLACE</Text>
              <Text style={styles.metaVal}>{job.workplaceType}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>EXPERIENCE</Text>
              <Text style={styles.metaVal}>{job.experienceLevel}</Text>
            </View>
          </View>
        </GlassCard>

        {/* Practice Interview CTA */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('InterviewSetup', {
              role: job.targetRoles[0] || 'Software Engineer',
              type: 'technical',
            })
          }
        >
          <GlassCard style={styles.practiceBanner} variant="primary">
            <View style={styles.bannerContent}>
              <View style={styles.practiceIconBox}>
                <Play size={18} color="#38bdf8" fill="#38bdf8" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.practiceTitle}>Practice Mock for {job.company}</Text>
                <Text style={styles.practiceDesc}>Simulate technical and behavioral questions expected at {job.company}.</Text>
              </View>
            </View>
          </GlassCard>
        </TouchableOpacity>

        {/* Required Skills */}
        <GlassCard style={styles.skillsCard}>
          <Text style={styles.sectionHeading}>REQUIRED SKILLS & STACK</Text>
          <View style={styles.skillsWrap}>
            {job.skills.map((s) => (
              <View key={s} style={styles.skillPill}>
                <Text style={styles.skillText}>{s}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Job Description */}
        <GlassCard style={styles.descCard}>
          <Text style={styles.sectionHeading}>ABOUT THE ROLE</Text>
          <Text style={styles.descParagraph}>{job.description}</Text>
          <Text style={[styles.descParagraph, { marginTop: 10 }]}>
            As an engineer at {job.company}, you will collaborate directly with cross-functional product designers, backend infrastructure leads, and platform architects to build resilient, sub-100ms services.
          </Text>
        </GlassCard>
      </ScrollView>

      {/* Bottom Sticky 1-Tap Apply Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <GlassButton
          title={applied ? 'Application Submitted' : '1-Tap Apply with HirePilot'}
          onPress={handleApply}
          isLoading={isApplying}
          disabled={applied}
          size="lg"
          icon={applied ? <Check size={18} color="#4ade80" /> : <Send size={18} color="#001a42" />}
          style={styles.applyBtn}
        />
      </View>
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
  headerCard: {
    padding: 16,
    marginBottom: 14,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  companyName: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 14,
  },
  metaRow: {
    flexDirection: 'row',
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  metaVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
    marginTop: 2,
  },
  practiceBanner: {
    padding: 12,
    marginBottom: 14,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  practiceIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  practiceDesc: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 1,
  },
  skillsCard: {
    padding: 14,
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 10,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  skillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  descCard: {
    padding: 16,
    marginBottom: 20,
  },
  descParagraph: {
    fontSize: 13,
    color: COLORS.onSurface,
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(2, 6, 23, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  applyBtn: {
    width: '100%',
  },
});
