import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { interviewService } from '../../services/interviews';
import { jobsService } from '../../services/jobs';
import { resumeService } from '../../services/resume';
import { DashboardData, Job, ResumeAnalysis } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import {
  Play,
  Sparkles,
  Code2,
  Binary,
  MessageSquare,
  FileText,
  Briefcase,
  Flame,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Calendar,
  Building2,
  Bookmark,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { profile, user } = useAuth();

  const [data, setData] = useState<DashboardData | null>(null);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [resumeData, setResumeData] = useState<ResumeAnalysis | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const dashboard = await interviewService.getDashboardData();
      setData(dashboard);

      const targetRole = profile?.target_role || 'Software Engineer';
      const jobs = jobsService.getJobs({ role: targetRole }).slice(0, 3);
      setRecommendedJobs(jobs.length ? jobs : jobsService.getJobs().slice(0, 3));

      const resume = await resumeService.getAnalysis();
      setResumeData(resume);

      const saved = await jobsService.getSavedJobIds();
      setSavedJobIds(saved);
    } catch (e) {
      console.warn('Error loading home data:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, [profile]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const displayName = profile?.name || user?.email?.split('@')[0] || 'Candidate';
  const targetRole = profile?.target_role || 'Software Engineer';
  const careerScore = data?.stats.averageScore || 87;

  const quickActions = [
    {
      title: 'Technical Mock',
      desc: 'System design & architecture',
      type: 'technical',
      icon: Code2,
      color: '#38bdf8',
    },
    {
      title: 'DSA Practice',
      desc: 'Algorithms & complexities',
      type: 'dsa',
      icon: Binary,
      color: '#a855f7',
    },
    {
      title: 'Behavioral STAR',
      desc: 'Leadership stories',
      type: 'behavioral',
      icon: MessageSquare,
      color: '#4ade80',
    },
    {
      title: 'AI Resume Check',
      desc: 'ATS score & keywords',
      type: 'resume',
      icon: FileText,
      color: '#ffb786',
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <View style={styles.logoMini}>
            <Sparkles size={16} color="#ffffff" />
          </View>
          <Text style={styles.brandTitle}>
            Hire<Text style={styles.brandAccent}>Pilot</Text>
          </Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.quotaPill}>
            <Text style={styles.quotaText}>
              {data?.stats.monthlyRemaining ?? 2} Left
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Profile')}
            style={styles.avatarButton}
          >
            {profile?.avatar_url ? (
              <Image source={{ uri: profile.avatar_url }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarInitial}>{displayName.charAt(0)}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38bdf8" />}
      >
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <View style={styles.roleChipRow}>
            <GlassBadge label={targetRole} variant="primary" icon={<Sparkles size={10} color="#38bdf8" />} />
            <GlassBadge label="AI Ready" variant="success" />
          </View>
          <Text style={styles.greetingSub}>Welcome back,</Text>
          <Text style={styles.greetingName}>{displayName} 👋</Text>
        </View>

        {/* Hero Card: Career Score (Stitch Bento Design) */}
        <GlassCard style={styles.heroCard} variant="elevated">
          {/* Ambient Glow */}
          <View style={styles.heroGlow} />

          <View style={styles.heroContentRow}>
            <View style={styles.heroLeft}>
              <Text style={styles.heroTag}>YOUR CAREER SCORE</Text>
              <Text style={styles.heroDesc}>
                You're making great progress. Keep practicing to reach the top tier.
              </Text>
              <TouchableOpacity
                style={styles.viewDetailsBtn}
                onPress={() => navigation.navigate('CareerAnalytics')}
              >
                <Text style={styles.viewDetailsText}>VIEW ANALYTICS</Text>
                <ArrowRight size={12} color="#001a42" />
              </TouchableOpacity>
            </View>

            {/* Circular Progress Ring */}
            <View style={styles.heroRight}>
              <ProgressRing score={careerScore} size={96} strokeWidth={8} color="#adc6ff" />
            </View>
          </View>

          {/* Quick Streak & Stats Row */}
          <View style={styles.heroFooter}>
            <View style={styles.statChip}>
              <Flame size={14} color="#ffb786" />
              <Text style={styles.statChipText}>{data?.stats.currentStreak ?? 4}d Streak</Text>
            </View>
            <View style={styles.statChip}>
              <TrendingUp size={14} color="#4ade80" />
              <Text style={styles.statChipText}>{data?.stats.interviewsCompleted ?? 3} Completed</Text>
            </View>
          </View>
        </GlassCard>

        {/* Primary CTA: Start Mock Interview */}
        <GlassButton
          title="Start AI Mock Interview"
          onPress={() => navigation.navigate('InterviewSetup', { role: targetRole })}
          size="lg"
          icon={<Play size={18} color="#001a42" fill="#001a42" />}
          style={styles.primaryCta}
        />

        {/* Quick Practice 2x2 Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>QUICK PRACTICE</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Interview')}>
            <Text style={styles.seeAllText}>All Modes →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <TouchableOpacity
                key={act.title}
                activeOpacity={0.8}
                onPress={() => {
                  if (act.type === 'resume') {
                    navigation.navigate('Resume');
                  } else {
                    navigation.navigate('InterviewSetup', { role: targetRole, type: act.type as any });
                  }
                }}
                style={styles.gridItem}
              >
                <GlassCard style={styles.actionCard}>
                  <View style={styles.cardTopRow}>
                    <View style={[styles.actionIconBadge, { backgroundColor: `${act.color}15`, borderColor: `${act.color}35` }]}>
                      <Icon size={18} color={act.color} />
                    </View>
                    <ArrowRight size={14} color={COLORS.outline} />
                  </View>
                  <View>
                    <Text style={styles.actionTitle} numberOfLines={1}>{act.title}</Text>
                    <Text style={styles.actionDesc} numberOfLines={1}>{act.desc}</Text>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Resume ATS Status Preview */}
        {resumeData && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Resume')}
            style={styles.resumePreviewCard}
          >
            <GlassCard style={styles.resumeCardInner} variant="primary">
              <View style={styles.resumeRow}>
                <View style={styles.resumeIconBox}>
                  <FileText size={20} color="#38bdf8" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resumeCardTitle}>AI Resume Analysis</Text>
                  <Text style={styles.resumeFileName}>{resumeData.fileName}</Text>
                </View>
                <View style={styles.atsScoreBox}>
                  <Text style={styles.atsScoreVal}>{resumeData.atsScore}</Text>
                  <Text style={styles.atsScoreSub}>ATS Score</Text>
                </View>
              </View>
              <View style={styles.resumeDivider} />
              <View style={styles.resumeBottomRow}>
                <Text style={styles.resumeMissing}>
                  {resumeData.missingKeywords.length} suggested keywords to add
                </Text>
                <Text style={styles.resumeOptLink}>Optimize →</Text>
              </View>
            </GlassCard>
          </TouchableOpacity>
        )}

        {/* Recommended Jobs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Jobs')}>
            <Text style={styles.seeAllText}>Explore Jobs →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.jobsList}>
          {recommendedJobs.map((job) => {
            const matchScore = jobsService.calculateMatchScore(job, targetRole);
            return (
              <TouchableOpacity
                key={job.id}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('JobDetails', { job })}
              >
                <GlassCard style={styles.jobCard}>
                  <View style={styles.jobHeader}>
                    <View style={styles.jobCompanyLogo}>
                      {job.companyLogo ? (
                        <Image source={{ uri: job.companyLogo }} style={styles.logoImg} />
                      ) : (
                        <Building2 size={18} color="#38bdf8" />
                      )}
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
                      <Text style={styles.jobMeta}>{job.company} • {job.location}</Text>
                    </View>
                    <View style={styles.matchPill}>
                      <Text style={styles.matchText}>{matchScore}% Match</Text>
                    </View>
                  </View>

                  <View style={styles.jobFooter}>
                    <Text style={styles.jobSalary}>{job.salary}</Text>
                    <Text style={styles.jobApplyLink}>View Details →</Text>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            );
          })}
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoMini: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#0052cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  brandAccent: {
    color: '#38bdf8',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quotaPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  quotaText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
  },
  avatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0052cc',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarInitial: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  greetingSection: {
    marginBottom: 16,
  },
  roleChipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  greetingSub: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
  },
  greetingName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.4,
  },
  heroCard: {
    padding: 18,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  heroContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLeft: {
    flex: 1,
    paddingRight: 12,
  },
  heroTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#adc6ff',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroDesc: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 12,
  },
  viewDetailsBtn: {
    backgroundColor: '#adc6ff',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
  },
  viewDetailsText: {
    color: '#001a42',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  statChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  primaryCta: {
    width: '100%',
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38bdf8',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  gridItem: {
    width: (Dimensions.get('window').width - 42) / 2,
  },
  actionCard: {
    padding: 12,
    height: 94,
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  actionDesc: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  resumePreviewCard: {
    marginBottom: 20,
  },
  resumeCardInner: {
    padding: 14,
  },
  resumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resumeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  resumeFileName: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 1,
  },
  atsScoreBox: {
    alignItems: 'flex-end',
  },
  atsScoreVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#38bdf8',
  },
  atsScoreSub: {
    fontSize: 9,
    color: COLORS.onSurfaceVariant,
  },
  resumeDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 10,
  },
  resumeBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resumeMissing: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
  },
  resumeOptLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
  },
  jobsList: {
    gap: 10,
  },
  jobCard: {
    padding: 14,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobCompanyLogo: {
    width: 36,
    height: 36,
    borderRadius: 10,
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
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  jobMeta: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  matchPill: {
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    borderColor: 'rgba(74, 222, 128, 0.3)',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  matchText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4ade80',
  },
  jobFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  jobSalary: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  jobApplyLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
  },
});
