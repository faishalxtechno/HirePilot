import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { GlassButton } from '../../components/ui/GlassButton';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Bot, FileText, Briefcase, ArrowRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'AI Mock Interviews with Instant Feedback',
    desc: 'Simulate real technical, DSA, and behavioral interview loops with Gemini Pro AI evaluating your responses.',
    icon: Bot,
    color: '#38bdf8',
  },
  {
    id: '2',
    title: 'ATS Resume Scoring & AI Bullet Rewriter',
    desc: 'Scan your resume against real applicant tracking systems and optimize bullet points with Google XYZ formula.',
    icon: FileText,
    color: '#4cd7f6',
  },
  {
    id: '3',
    title: 'Matched Tech Jobs & 1-Tap Application Pipeline',
    desc: 'Discover verified engineering roles matched to your experience, apply directly, and track your active offers.',
    icon: Briefcase,
    color: '#ffb786',
  },
];

export const OnboardingScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const slide = SLIDES[currentSlide];
  const IconComponent = slide.icon;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* Top Skip Button */}
      <View style={styles.topBar}>
        <Text style={styles.brandText}>
          Hire<Text style={styles.brandHighlight}>Pilot</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Center Slide Illustration */}
      <View style={styles.centerContent}>
        <View style={[styles.iconOrb, { borderColor: `${slide.color}40` }]}>
          <IconComponent size={64} color={slide.color} />
        </View>

        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideDesc}>{slide.desc}</Text>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        {/* Pagination Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentSlide === i ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <GlassButton
          title={currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          size="lg"
          icon={<ArrowRight size={18} color="#001a42" />}
          style={styles.actionBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  brandHighlight: {
    color: '#38bdf8',
  },
  skipText: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    fontWeight: '600',
  },
  centerContent: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  iconOrb: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  slideDesc: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Inter',
  },
  bottomControls: {
    gap: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#38bdf8',
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionBtn: {
    width: '100%',
  },
});
