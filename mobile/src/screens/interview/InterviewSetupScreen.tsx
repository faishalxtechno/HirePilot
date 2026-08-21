import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { interviewService } from '../../services/interviews';
import { InterviewType, DifficultyLevel } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS, RADIUS } from '../../constants/theme';
import { Code2, Binary, MessageSquare, Users, Layers, Play, Check } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ROLES = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Scientist',
  'Machine Learning Engineer',
  'DevOps Engineer',
  'Custom Role',
];

const FORMATS: { type: InterviewType; label: string; icon: any }[] = [
  { type: 'technical', label: 'Technical', icon: Code2 },
  { type: 'dsa', label: 'DSA', icon: Binary },
  { type: 'behavioral', label: 'Behavioral', icon: MessageSquare },
  { type: 'hr', label: 'HR', icon: Users },
  { type: 'mixed', label: 'Mixed', icon: Layers },
];

const DIFFICULTIES: { level: DifficultyLevel; label: string; color: string }[] = [
  { level: 'easy', label: 'Easy (Junior)', color: '#4ade80' },
  { level: 'medium', label: 'Medium (Mid)', color: '#fbbf24' },
  { level: 'hard', label: 'Hard (Senior)', color: '#f43f5e' },
];

export const InterviewSetupScreen: React.FC<any> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const initialRole = route.params?.role || 'Software Engineer';
  const initialType = route.params?.type || 'technical';

  const [selectedRole, setSelectedRole] = useState(
    ROLES.includes(initialRole) ? initialRole : 'Custom Role'
  );
  const [customRoleText, setCustomRoleText] = useState(
    ROLES.includes(initialRole) ? '' : initialRole
  );
  const [selectedType, setSelectedType] = useState<InterviewType>(initialType);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('medium');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = async () => {
    const finalRole = selectedRole === 'Custom Role' ? customRoleText.trim() || 'Software Engineer' : selectedRole;
    setIsStarting(true);
    try {
      const { interview, firstQuestion } = await interviewService.createInterview({
        role: finalRole,
        interview_type: selectedType,
        difficulty: selectedDifficulty,
        total_questions: questionCount,
      });

      navigation.replace('LiveInterview', {
        interviewId: interview.id,
        firstQuestion,
      });
    } catch (e) {
      console.error('Failed to create interview:', e);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Setup Mock Round"
        subtitle="Tailor questions to your target position"
        showBack
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Target Role */}
        <Text style={styles.stepTitle}>1. TARGET ROLE</Text>
        <View style={styles.chipGrid}>
          {ROLES.map((r) => {
            const isSelected = selectedRole === r;
            return (
              <TouchableOpacity
                key={r}
                activeOpacity={0.7}
                onPress={() => setSelectedRole(r)}
                style={[styles.roleChip, isSelected && styles.roleChipActive]}
              >
                <Text style={[styles.roleChipText, isSelected && styles.roleChipTextActive]}>
                  {r}
                </Text>
                {isSelected && <Check size={14} color="#38bdf8" />}
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedRole === 'Custom Role' && (
          <View style={styles.customInputBox}>
            <TextInput
              placeholder="e.g. Lead iOS Engineer / Cloud Architect"
              placeholderTextColor={COLORS.outline}
              value={customRoleText}
              onChangeText={setCustomRoleText}
              style={styles.customInput}
            />
          </View>
        )}

        {/* Step 2: Format */}
        <Text style={styles.stepTitle}>2. INTERVIEW TYPE</Text>
        <View style={styles.formatRow}>
          {FORMATS.map((fmt) => {
            const isSelected = selectedType === fmt.type;
            const Icon = fmt.icon;
            return (
              <TouchableOpacity
                key={fmt.type}
                activeOpacity={0.7}
                onPress={() => setSelectedType(fmt.type)}
                style={[styles.formatChip, isSelected && styles.formatChipActive]}
              >
                <Icon size={18} color={isSelected ? '#38bdf8' : COLORS.outline} />
                <Text style={[styles.formatChipText, isSelected && styles.formatChipTextActive]}>
                  {fmt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Step 3: Difficulty */}
        <Text style={styles.stepTitle}>3. DIFFICULTY LEVEL</Text>
        <View style={styles.diffRow}>
          {DIFFICULTIES.map((d) => {
            const isSelected = selectedDifficulty === d.level;
            return (
              <TouchableOpacity
                key={d.level}
                activeOpacity={0.7}
                onPress={() => setSelectedDifficulty(d.level)}
                style={[styles.diffChip, isSelected && { borderColor: d.color, backgroundColor: `${d.color}15` }]}
              >
                <Text style={[styles.diffChipText, isSelected && { color: d.color, fontWeight: '700' }]}>
                  {d.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Step 4: Questions Count */}
        <Text style={styles.stepTitle}>4. NUMBER OF QUESTIONS</Text>
        <View style={styles.countRow}>
          {[3, 5, 10].map((c) => {
            const isSelected = questionCount === c;
            return (
              <TouchableOpacity
                key={c}
                activeOpacity={0.7}
                onPress={() => setQuestionCount(c)}
                style={[styles.countChip, isSelected && styles.countChipActive]}
              >
                <Text style={[styles.countChipText, isSelected && styles.countChipTextActive]}>
                  {c} Questions
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Fixed Sticky Launch CTA */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <GlassButton
          title="Launch AI Mock Interview"
          onPress={handleStart}
          isLoading={isStarting}
          size="lg"
          icon={<Play size={18} color="#001a42" fill="#001a42" />}
          style={styles.launchBtn}
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
  stepTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginTop: 14,
    marginBottom: 10,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  roleChipActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: '#38bdf8',
  },
  roleChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  roleChipTextActive: {
    color: '#38bdf8',
    fontWeight: '700',
  },
  customInputBox: {
    marginTop: 10,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  customInput: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter',
  },
  formatRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  formatChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  formatChipActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: '#38bdf8',
  },
  formatChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  formatChipTextActive: {
    color: '#38bdf8',
    fontWeight: '700',
  },
  diffRow: {
    flexDirection: 'row',
    gap: 8,
  },
  diffChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  diffChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  countRow: {
    flexDirection: 'row',
    gap: 8,
  },
  countChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  countChipActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: '#38bdf8',
  },
  countChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  countChipTextActive: {
    color: '#38bdf8',
    fontWeight: '700',
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
  launchBtn: {
    width: '100%',
  },
});
