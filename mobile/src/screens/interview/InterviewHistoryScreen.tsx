import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { interviewService } from '../../services/interviews';
import { Interview } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import { Search, ChevronRight, FileText, Play } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const InterviewHistoryScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const list = await interviewService.getInterviews();
      setInterviews(list);
    } catch (e) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const filtered = interviews.filter((item) => {
    const matchQ = item.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchT = selectedType === 'all' || item.interview_type === selectedType;
    return matchQ && matchT;
  });

  const typeChips = ['all', 'technical', 'dsa', 'behavioral', 'hr'];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Session History"
        subtitle="Review past AI evaluations & reports"
        showBack
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38bdf8" />}
      >
        {/* Search */}
        <View style={styles.searchBox}>
          <Search size={16} color={COLORS.outline} />
          <TextInput
            placeholder="Search by role title..."
            placeholderTextColor={COLORS.outline}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {typeChips.map((t) => (
            <TouchableOpacity
              key={t}
              activeOpacity={0.7}
              onPress={() => setSelectedType(t)}
              style={[styles.typeChip, selectedType === t && styles.typeChipActive]}
            >
              <Text style={[styles.typeChipText, selectedType === t && styles.typeChipTextActive]}>
                {t === 'all' ? 'All Types' : t.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* History List */}
        <View style={styles.list}>
          {filtered.length === 0 ? (
            <GlassCard style={styles.emptyCard}>
              <FileText size={32} color={COLORS.outline} />
              <Text style={styles.emptyTitle}>No matching sessions found</Text>
              <Text style={styles.emptyDesc}>Launch a new mock interview to see it recorded here.</Text>
            </GlassCard>
          ) : (
            filtered.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => {
                  if (item.status === 'completed') {
                    navigation.navigate('InterviewResult', { interviewId: item.id });
                  } else {
                    navigation.navigate('LiveInterview', { interviewId: item.id });
                  }
                }}
              >
                <GlassCard style={styles.historyCard}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.roleTitle}>{item.role}</Text>
                      <Text style={styles.dateMeta}>
                        {new Date(item.started_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Text>
                    </View>

                    {item.score != null ? (
                      <View style={styles.scorePill}>
                        <Text style={styles.scoreText}>{item.score}%</Text>
                      </View>
                    ) : (
                      <GlassBadge label="In Progress" variant="warning" />
                    )}
                  </View>

                  <View style={styles.cardFooter}>
                    <View style={styles.tagGroup}>
                      <GlassBadge label={item.interview_type} variant="primary" />
                      <GlassBadge
                        label={item.difficulty}
                        variant={item.difficulty === 'hard' ? 'error' : item.difficulty === 'medium' ? 'warning' : 'success'}
                      />
                    </View>

                    <View style={styles.viewLinkRow}>
                      <Text style={styles.viewLinkText}>
                        {item.status === 'completed' ? 'View Report' : 'Resume'}
                      </Text>
                      <ChevronRight size={14} color="#38bdf8" />
                    </View>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            ))
          )}
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
  typeChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginRight: 8,
  },
  typeChipActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: '#38bdf8',
  },
  typeChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  typeChipTextActive: {
    color: '#38bdf8',
    fontWeight: '700',
  },
  list: {
    gap: 10,
  },
  emptyCard: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  emptyDesc: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
  },
  historyCard: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  roleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  dateMeta: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  scorePill: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#38bdf8',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  tagGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  viewLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
  },
});
