import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Platform } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

export const DiyaFlameHalo: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const useNativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    // Breathing cycle for the flame warmth aura
    const breathing = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2600,
          useNativeDriver,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2600,
          useNativeDriver,
        }),
      ])
    );
    breathing.start();
    return () => breathing.stop();
  }, [pulseAnim, useNativeDriver]);

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0.85],
  });

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1.07],
  });

  return (
    <Animated.View
      style={[
        styles.haloContainer,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <Svg width={340} height={340} viewBox="0 0 340 340">
        <Defs>
          <RadialGradient
            id="flameHaloGrad"
            cx="50%"
            cy="52%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="52%"
          >
            <Stop offset="0%" stopColor="#FFE0A0" stopOpacity="0.38" />
            <Stop offset="25%" stopColor="#E6A15C" stopOpacity="0.22" />
            <Stop offset="55%" stopColor="#C5A059" stopOpacity="0.08" />
            <Stop offset="85%" stopColor="#080605" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="340" height="340" fill="url(#flameHaloGrad)" />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  haloContainer: {
    position: 'absolute',
    top: '46%',
    left: '50%',
    marginLeft: -170,
    marginTop: -170,
    width: 340,
    height: 340,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
});
