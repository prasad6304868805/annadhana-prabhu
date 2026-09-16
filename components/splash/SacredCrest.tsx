import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { SANCTUM_COLORS, SPLASH_TIMING } from '../../constants/theme';

interface SacredCrestProps {
  cinzelFontLoaded: boolean;
  teluguFontLoaded: boolean;
}

export const SacredCrest: React.FC<SacredCrestProps> = ({ teluguFontLoaded }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-12)).current;
  const useNativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.9,
        duration: SPLASH_TIMING.crestDuration,
        delay: SPLASH_TIMING.crestDelay,
        useNativeDriver,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: SPLASH_TIMING.crestDuration,
        delay: SPLASH_TIMING.crestDelay,
        useNativeDriver,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [fadeAnim, translateYAnim, useNativeDriver]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
    >
      {/* Sacred Antique Gold Emblem */}
      <View style={styles.iconContainer}>
        <Svg width={32} height={32} viewBox="0 0 48 48">
          {/* Outer Sacred Glow Ring Arc (Dashed) */}
          <Path
            d="M14 26C14 18.5 24 8 24 8C24 8 34 18.5 34 26C34 31.5 29.5 36 24 36C18.5 36 14 31.5 14 26Z"
            stroke={SANCTUM_COLORS.gold}
            strokeWidth={1.35}
            strokeDasharray="2 3"
            opacity={0.45}
            fill="none"
          />
          {/* Pure Inner Flame */}
          <Path
            d="M24 13C24 13 28 20 28 24.5C28 26.8 26.2 28.5 24 28.5C21.8 28.5 20 26.8 20 24.5C20 20 24 13 24 13Z"
            stroke={SANCTUM_COLORS.gold}
            strokeWidth={1.35}
            fill={SANCTUM_COLORS.gold}
            fillOpacity={0.25}
          />
          {/* Antique Brass Base */}
          <Path
            d="M17 33H31M21 33L19 39H29L27 33M16 39H32"
            stroke={SANCTUM_COLORS.gold}
            strokeWidth={1.35}
            strokeLinecap="round"
          />
          {/* Subtle Divine Ray Ping */}
          <Circle cx={24} cy={6} r={1.2} fill={SANCTUM_COLORS.ivory} opacity={0.8} />
        </Svg>
      </View>

      {/* Sacred Location Micro Badge */}
      <View style={styles.badgeRow}>
        <View style={styles.hairline} />
        <Text
          style={[
            styles.badgeText,
            teluguFontLoaded && { fontFamily: 'NotoSerifTelugu_400Regular' },
          ]}
        >
          విశాఖపట్నం
        </Text>
        <View style={styles.hairline} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    zIndex: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    opacity: 0.75,
  },
  hairline: {
    width: 14,
    height: 1,
    backgroundColor: SANCTUM_COLORS.gold,
    opacity: 0.6,
  },
  badgeText: {
    fontSize: 10,
    color: SANCTUM_COLORS.gold,
    letterSpacing: 3,
    fontWeight: '400',
  },
});
