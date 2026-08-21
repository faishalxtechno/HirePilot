import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { jobsService } from '../../services/jobs';
import { JobApplication, ApplicationStage } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import {
  Briefcase,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building2,
  ChevronRight,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ApplicationTrackerScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const list = await jobsService.getApplications();
    setApplications(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleStageChange = async (appId: string, currentStage: ApplicationStage) => {
    const nextStage: ApplicationStage =
      currentStage === 'applied'
        ? 'interviewing'
        : currentStage === 'interviewing'
        ? 'offer'
        : 'applied';

    await jobsService.updateStage(appId, nextStage);
    await loadData();
  };

  const stageCounts = {
    applied: applications.filter((a) => a.stage === 'applied').length,
    interviewing: applications.filter((a) => a.stage === 'interviewing').length,
    offer: applications.filter((a) => a.stage === 'offer').length,
    rejected: applications.filter((a) => a.stage === 'rejected').length,
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Application Pipeline"
        subtitle="Manage your active interview loops"
        showBack
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38bdf8" />}
      >
        {/* Pipeline Stage Summary 4-Col Grid */}
        <View style={styles.summaryGrid}>
          <GlassCard style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>APPLIED</Text>
            <Text style={styles.summaryVal}>{stageCounts.applied}</Text>
          </GlassCard>
          <GlassCard style={styles.summaryBox} variant="primary">
            <Text style={[styles.summaryLabel, { color: '#38bdf8' }]}>INTERVIEW</Text>
            <Text style={[styles.summaryVal, { color: '#38bdf8' }]}>{stageCounts.interviewing}</Text>
          </GlassCard>
          <GlassCard style={styles.summaryBox} variant="accent">
            <Text style={[styles.summaryLabel, { color: '#4ade80' }]}>OFFER</Text>
            <Text style={[styles.summaryVal, { color: '#4ade80' }]}>{stageCounts.offer}</Text>
          </GlassCard>
          <GlassCard style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>ARCHIVE</Text>
            <Text style={styles.summaryVal}>{stageCounts.rejected}</Text>
          </GlassCard>
        </View>

        {/* Applications List */}
        <Text style={styles.sectionTitle}>ACTIVE PIPELINE</Text>

        <View style={styles.list}>
          {applications.map((app) => (
            <GlassCard key={app.id} style={styles.appCard}>
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.appTitle}>{app.jobTitle}</Text>
                  <Text style={styles.appCompany}>{app.company} • {app.location}</Text>
                </View>

                {/* Stage Pill with 1-tap cycle */}
                <TouchableOpacity
                  onPress={() => handleStageChange(app.id, app.stage)}
                  style={[
                    styles.stageBtn,
                    app.stage === 'interviewing' && styles.stageBtnInterviewing,
                    app.stage === 'offer' && styles.stageBtnOffer,
                  ]}
                >
                  <Text
                    style={[
                      styles.stageBtnText,
                      app.stage === 'interviewing' && { color: '#38bdf8' },
                      app.stage === 'offer' && { color: '#4ade80' },
                    ]}
                  >
                    {app.stage.toUpperCase()} ⟳
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Interview scheduled notice */}
              {app.interviewDate && (
                <View style={styles.interviewNotice}>
                  <View style={styles.noticeLeft}>
                    <Calendar size={14} color="#a855f7" />
                    <Text style={styles.noticeText}>
                      Round: <Text style={{ color: '#ffffff', fontWeight: '700' }}>{app.interviewDate}</Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('InterviewSetup', {
                        role: 'Software Engineer',
                        type: 'technical',
                      })
                    }
                  >
                    <Text style={styles.practiceNowText}>Practice →</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Notes */}
              {app.notes && (
                <View style={styles.notesBox}>
                  <Text style={styles.notesText}>
                    <Text style={{ fontWeight: '700', color: '#ffffff' }}>Notes: </Text>
                    {app.notes}
                  </Text>
                </View>
              )}

              <View style={styles.cardFooter}>
                <Text style={styles.metaSalary}>{app.salary}</Text>
                <Text style={styles.metaApplied}>Applied {app.appliedDate}</Text>
              </View>
            </GlassCard>
          ))}
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  summaryBox: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  summaryVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 10,
  },
  list: {
    gap: 12,
  },
  appCard: {
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  appTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  appCompany: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  stageBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  stageBtnInterviewing: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  stageBtnOffer: {
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    borderColor: 'rgba(74, 222, 128, 0.3)',
  },
  stageBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  interviewNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderColor: 'rgba(168, 85, 247, 0.25)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
  },
  noticeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  noticeText: {
    fontSize: 11,
    color: '#e9d5ff',
  },
  practiceNowText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
  },
  notesBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  notesText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  metaSalary: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
  },
  metaApplied: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
  },
});
