import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { jobsService } from '../../services/jobs';
import { Job } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import {
  Search,
  Building2,
  Bookmark,
  MapPin,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const JobDiscoveryScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { profile } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const targetRole = profile?.target_role || 'Software Engineer';

  const loadData = async () => {
    const list = jobsService.getJobs({
      search: searchQuery,
      role: selectedRole,
    });
    setJobs(list);
    const saved = await jobsService.getSavedJobIds();
    setSavedJobIds(saved);
  };

  useEffect(() => {
    loadData();
  }, [searchQuery, selectedRole]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleToggleSave = async (e: any, jobId: string) => {
    const isSaved = await jobsService.toggleSaveJob(jobId);
    const updated = await jobsService.getSavedJobIds();
    setSavedJobIds(updated);
  };

  const roleChips = ['All', 'Frontend', 'Backend', 'Full Stack', 'Software Engineer', 'Machine Learning'];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Jobs & Applications"
        subtitle="AI match scored against your experience"
        rightAction={
          <TouchableOpacity
            style={styles.trackerBtn}
            onPress={() => navigation.navigate('ApplicationTracker')}
          >
            <Layers size={18} color="#38bdf8" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38bdf8" />}
      >
        {/* Top Application Pipeline Banner */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ApplicationTracker')}
        >
          <GlassCard style={styles.pipelineBanner} variant="primary">
            <View style={styles.bannerRow}>
              <View style={styles.pipelineIconBadge}>
                <Briefcase size={20} color="#38bdf8" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.pipelineTitle}>Active Application Pipeline</Text>
                <Text style={styles.pipelineDesc}>Track interviews, offers, and submitted applications</Text>
              </View>
              <ChevronRight size={18} color="#38bdf8" />
            </View>
          </GlassCard>
        </TouchableOpacity>

        {/* Search Input */}
        <View style={styles.searchBox}>
          <Search size={16} color={COLORS.outline} />
          <TextInput
            placeholder="Search roles, companies, tech (e.g. Stripe, React)..."
            placeholderTextColor={COLORS.outline}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Role Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {roleChips.map((r) => (
            <TouchableOpacity
              key={r}
              activeOpacity={0.7}
              onPress={() => setSelectedRole(r)}
              style={[styles.roleChip, selectedRole === r && styles.roleChipActive]}
            >
              <Text style={[styles.roleChipText, selectedRole === r && styles.roleChipTextActive]}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Jobs List */}
        <View style={styles.jobsList}>
          {jobs.map((job) => {
            const isSaved = savedJobIds.includes(job.id);
            const matchScore = jobsService.calculateMatchScore(job, targetRole);

            return (
              <TouchableOpacity
                key={job.id}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('JobDetails', { job })}
              >
                <GlassCard style={styles.jobCard}>
                  <View style={styles.jobTopRow}>
                    <View style={styles.companyLogoBox}>
                      {job.companyLogo ? (
                        <Image source={{ uri: job.companyLogo }} style={styles.logoImg} />
                      ) : (
                        <Building2 size={18} color="#38bdf8" />
                      )}
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
                      <Text style={styles.jobCompany}>{job.company} • {job.location}</Text>
                    </View>
                    <View style={styles.matchScorePill}>
                      <Text style={styles.matchScoreText}>{matchScore}% Match</Text>
                    </View>
                  </View>

                  <Text style={styles.jobDesc} numberOfLines={2}>
                    {job.description}
                  </Text>

                  <View style={styles.jobFooter}>
                    <Text style={styles.salaryText}>{job.salary}</Text>
                    <TouchableOpacity
                      onPress={(e) => handleToggleSave(e, job.id)}
                      style={[styles.saveBtn, isSaved && styles.saveBtnActive]}
                    >
                      <Bookmark size={14} color={isSaved ? '#38bdf8' : COLORS.outline} fill={isSaved ? '#38bdf8' : 'none'} />
                    </TouchableOpacity>
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
  trackerBtn: {
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
  pipelineBanner: {
    padding: 12,
    marginBottom: 14,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pipelineIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipelineTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  pipelineDesc: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter',
  },
  chipScroll: {
    marginBottom: 16,
  },
  roleChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginRight: 8,
  },
  roleChipActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: '#38bdf8',
  },
  roleChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  roleChipTextActive: {
    color: '#38bdf8',
    fontWeight: '700',
  },
  jobsList: {
    gap: 10,
  },
  jobCard: {
    padding: 14,
  },
  jobTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogoBox: {
    width: 38,
    height: 38,
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
  jobCompany: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  matchScorePill: {
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    borderColor: 'rgba(74, 222, 128, 0.3)',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  matchScoreText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4ade80',
  },
  jobDesc: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    lineHeight: 16,
    marginTop: 8,
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
  salaryText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  saveBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  saveBtnActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
});
