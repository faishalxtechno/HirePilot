import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../constants/theme';

interface AudioWaveformProps {
  isActive?: boolean;
  color?: string;
  barCount?: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isActive = true,
  color = COLORS.primaryBright,
  barCount = 7,
}) => {
  const animatedValues = useRef(
    Array.from({ length: barCount }, () => new Animated.Value(0.3))
  ).current;

  useEffect(() => {
    if (!isActive) return;

    const animations = animatedValues.map((val, i) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(val, {
            toValue: 0.3 + Math.random() * 0.7,
            duration: 300 + (i % 3) * 120,
            useNativeDriver: false,
          }),
          Animated.timing(val, {
            toValue: 0.2 + Math.random() * 0.3,
            duration: 300 + (i % 3) * 120,
            useNativeDriver: false,
          }),
        ])
      );
    });

    Animated.parallel(animations).start();

    return () => {
      animations.forEach((anim) => anim.stop());
    };
  }, [isActive]);

  return (
    <View style={styles.container}>
      {animatedValues.map((val, idx) => {
        const heightInterpolated = val.interpolate({
          inputRange: [0, 1],
          outputRange: [4, 24],
        });

        return (
          <Animated.View
            key={idx}
            style={[
              styles.bar,
              {
                backgroundColor: color,
                height: heightInterpolated,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    gap: 3,
  },
  bar: {
    width: 3.5,
    borderRadius: 2,
  },
});
