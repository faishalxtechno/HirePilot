import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';
import { Sparkles } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export const SplashScreen: React.FC<any> = ({ navigation }) => {
  const { user, isLoading } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 0.8,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.4,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    const timer = setTimeout(() => {
      if (user) {
        if (navigation.getParent()) {
          navigation.getParent()?.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } else {
          navigation.navigate('Main');
        }
      } else {
        navigation.replace('Onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, isLoading]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      
      {/* Atmospheric Radial Glow */}
      <Animated.View style={[styles.glowOrb, { opacity: glowAnim }]} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Brand Icon Badge */}
        <View style={styles.iconBadge}>
          <Sparkles size={36} color="#ffffff" />
        </View>

        <Text style={styles.brandTitle}>
          Hire<Text style={styles.brandHighlight}>Pilot</Text>
        </Text>
        
        <Text style={styles.brandSubtitle}>
          AI Career & Mock Interview Co-Pilot
        </Text>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>POWERED BY GEMINI PRO AI</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glowOrb: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(56, 189, 248, 0.25)',
    filter: 'blur(40px)',
  },
  content: {
    alignItems: 'center',
  },
  iconBadge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#0052cc',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
    fontFamily: 'Inter',
  },
  brandHighlight: {
    color: '#38bdf8',
  },
  brandSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    marginTop: 8,
    fontFamily: 'Inter',
    letterSpacing: 0.2,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: 'rgba(255, 255, 255, 0.4)',
  },
});
