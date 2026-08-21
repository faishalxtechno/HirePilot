import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { interviewService } from '../../services/interviews';
import { Question, AnswerEvaluation } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { AudioWaveform } from '../../components/ui/AudioWaveform';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS, RADIUS } from '../../constants/theme';
import {
  Bot,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  HelpCircle,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LiveInterviewScreen: React.FC<any> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { interviewId, firstQuestion } = route.params;

  const [questionOrder, setQuestionOrder] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    firstQuestion || {
      id: `q-${interviewId}-1`,
      interview_id: interviewId,
      question_order: 1,
      question_text:
        'Explain the differences between optimistic and pessimistic locking in distributed databases, and provide a real-world use case for each.',
      category: 'technical',
    }
  );

  const [answerText, setAnswerText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);

  const handleSubmitAnswer = async () => {
    if (!answerText.trim() || answerText.trim().length < 10) {
      Alert.alert(
        'Answer too short',
        'Please provide a detailed technical answer (at least a couple sentences) for Gemini AI evaluation.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await interviewService.submitAnswer({
        interview_id: interviewId,
        question_id: currentQuestion.id,
        answer_text: answerText,
      });
      setEvaluation(res.evaluation);
    } catch (e) {
      Alert.alert('Error', 'Failed to submit answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = async () => {
    if (questionOrder >= totalQuestions) {
      // Complete interview
      setIsSubmitting(true);
      try {
        await interviewService.completeInterview(interviewId);
        navigation.replace('InterviewResult', { interviewId });
      } catch (e) {
        Alert.alert('Error', 'Failed to generate final report.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Advance question
      const nextOrder = questionOrder + 1;
      setQuestionOrder(nextOrder);
      setEvaluation(null);
      setAnswerText('');
      setCurrentQuestion({
        id: `q-${interviewId}-${nextOrder}`,
        interview_id: interviewId,
        question_order: nextOrder,
        question_text:
          nextOrder === 2
            ? 'How does the JavaScript event loop prioritize microtasks (Promises) versus macrotasks (setTimeout)?'
            : nextOrder === 3
            ? 'Describe how you would design a scalable rate-limiting service capable of handling 50,000 req/sec with Redis.'
            : nextOrder === 4
            ? 'Explain CAP theorem trade-offs when designing a globally distributed payment transaction ledger.'
            : 'What observability tools and metrics (p99 latency, error rates) do you monitor in production?',
        category: 'technical',
      });
    }
  };

  const isLastQuestion = questionOrder >= totalQuestions;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScreenHeader
        title={`Question ${questionOrder} of ${totalQuestions}`}
        subtitle="Gemini AI Mock Evaluation"
        showBack
        onBack={() => {
          Alert.alert(
            'Exit Interview?',
            'Your progress will be saved in your session history.',
            [
              { text: 'Continue Interview', style: 'cancel' },
              { text: 'Exit to Dashboard', onPress: () => navigation.navigate('Main') },
            ]
          );
        }}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Interviewer Question Card */}
        <GlassCard style={styles.questionCard} variant="elevated">
          <View style={styles.interviewerHeader}>
            <View style={styles.interviewerLeft}>
              <View style={styles.botIconBadge}>
                <Bot size={18} color="#ffffff" />
              </View>
              <View>
                <View style={styles.aiNameRow}>
                  <Text style={styles.aiName}>AI Interviewer</Text>
                  <View style={styles.pulseDot} />
                </View>
                <Text style={styles.aiSub}>Gemini Pro Live Session</Text>
              </View>
            </View>

            {/* Sound Waveform */}
            <View style={styles.waveformBox}>
              <AudioWaveform isActive={!evaluation} />
            </View>
          </View>

          <View style={styles.questionDivider} />

          <Text style={styles.questionText}>{currentQuestion.question_text}</Text>

          <View style={styles.tipRow}>
            <Sparkles size={13} color="#38bdf8" />
            <Text style={styles.tipText}>
              Be thorough. Mention architectural trade-offs, edge cases, and principles.
            </Text>
          </View>
        </GlassCard>

        {/* Answer Input Box */}
        {!evaluation ? (
          <GlassCard style={styles.answerBoxCard}>
            <Text style={styles.answerLabel}>YOUR RESPONSE</Text>
            <TextInput
              multiline
              placeholder="Type your response clearly here... Explain your thought process step by step."
              placeholderTextColor={COLORS.outline}
              value={answerText}
              onChangeText={setAnswerText}
              style={styles.answerInput}
              textAlignVertical="top"
            />

            <View style={styles.charCountRow}>
              <Text style={styles.charCountText}>
                {answerText.length} characters • {answerText.trim().split(/\s+/).filter(Boolean).length} words
              </Text>
            </View>

            <GlassButton
              title="Submit Answer for AI Scoring"
              onPress={handleSubmitAnswer}
              isLoading={isSubmitting}
              size="lg"
              icon={<Send size={16} color="#001a42" />}
              style={styles.submitBtn}
            />
          </GlassCard>
        ) : (
          /* Instant Evaluation Card */
          <GlassCard style={styles.evalCard} variant="primary">
            <View style={styles.evalHeader}>
              <View style={styles.evalHeaderLeft}>
                <Sparkles size={18} color="#38bdf8" />
                <Text style={styles.evalTitle}>Answer Evaluation</Text>
              </View>
              <View style={styles.evalScoreBadge}>
                <Text style={styles.evalScoreText}>
                  {Math.round(
                    ((evaluation.relevance +
                      evaluation.accuracy +
                      evaluation.completeness +
                      evaluation.clarity) /
                      4) *
                      10
                  )}
                  % Score
                </Text>
              </View>
            </View>

            {/* 4 Score Gauges */}
            <View style={styles.scoresGrid}>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreItemLabel}>Relevance</Text>
                <Text style={styles.scoreItemVal}>{evaluation.relevance}/10</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreItemLabel}>Accuracy</Text>
                <Text style={styles.scoreItemVal}>{evaluation.accuracy}/10</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreItemLabel}>Completeness</Text>
                <Text style={styles.scoreItemVal}>{evaluation.completeness}/10</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreItemLabel}>Clarity</Text>
                <Text style={styles.scoreItemVal}>{evaluation.clarity}/10</Text>
              </View>
            </View>

            {/* Feedback summary */}
            <Text style={styles.feedbackText}>{evaluation.feedback}</Text>

            {/* What you did well */}
            {evaluation.what_went_well && (
              <View style={styles.feedbackSection}>
                <View style={styles.feedbackSectionHeader}>
                  <CheckCircle2 size={14} color="#4ade80" />
                  <Text style={[styles.sectionHeading, { color: '#4ade80' }]}>What You Did Well</Text>
                </View>
                {evaluation.what_went_well.map((point, i) => (
                  <Text key={i} style={styles.bulletItem}>• {point}</Text>
                ))}
              </View>
            )}

            {/* How to improve */}
            {evaluation.how_to_improve && (
              <View style={styles.feedbackSection}>
                <View style={styles.feedbackSectionHeader}>
                  <Lightbulb size={14} color="#38bdf8" />
                  <Text style={[styles.sectionHeading, { color: '#38bdf8' }]}>How to Improve</Text>
                </View>
                {evaluation.how_to_improve.map((point, i) => (
                  <Text key={i} style={styles.bulletItem}>• {point}</Text>
                ))}
              </View>
            )}

            <GlassButton
              title={isLastQuestion ? 'Complete Interview & View Report' : 'Next Question'}
              onPress={handleNextQuestion}
              isLoading={isSubmitting}
              size="lg"
              icon={<ArrowRight size={18} color="#001a42" />}
              style={styles.nextBtn}
            />
          </GlassCard>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
  questionCard: {
    padding: 16,
    marginBottom: 16,
  },
  interviewerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  interviewerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  botIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#0052cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ade80',
  },
  aiSub: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
  },
  waveformBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 8,
  },
  questionDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 12,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 23,
    fontFamily: 'Inter',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.04)',
  },
  tipText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    flex: 1,
  },
  answerBoxCard: {
    padding: 16,
    marginBottom: 16,
  },
  answerLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#adc6ff',
    letterSpacing: 1,
    marginBottom: 8,
  },
  answerInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderRadius: RADIUS.md,
    color: '#ffffff',
    fontSize: 14,
    minHeight: 140,
    padding: 12,
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  charCountRow: {
    alignItems: 'flex-end',
    marginTop: 6,
    marginBottom: 14,
  },
  charCountText: {
    fontSize: 11,
    color: COLORS.outline,
  },
  submitBtn: {
    width: '100%',
  },
  evalCard: {
    padding: 16,
    marginBottom: 16,
  },
  evalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  evalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  evalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  evalScoreBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  evalScoreText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#38bdf8',
  },
  scoresGrid: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },
  scoreItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  scoreItemLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
  },
  scoreItemVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 2,
  },
  feedbackText: {
    fontSize: 12,
    color: COLORS.onSurface,
    lineHeight: 18,
    marginBottom: 12,
  },
  feedbackSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  feedbackSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bulletItem: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    lineHeight: 16,
    marginBottom: 2,
  },
  nextBtn: {
    width: '100%',
    marginTop: 8,
  },
});
