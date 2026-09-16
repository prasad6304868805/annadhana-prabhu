import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';

interface SingleEmberProps {
  topPercent: number;
  leftPercent: number;
  size: number;
  color: string;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
}

const SingleEmber: React.FC<SingleEmberProps> = ({
  topPercent,
  leftPercent,
  size,
  color,
  driftX,
  driftY,
  duration,
  delay,
}) => {
  const anim = useRef(new Animated.Value(0)).current;
  const useNativeDriver = Platform.OS !== 'web';

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration,
          useNativeDriver,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, delay, duration, useNativeDriver]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [15, driftY],
  });

  const translateX = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, driftX * 0.4, driftX],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 0.25, 0.75, 1],
    outputRange: [0, 0.8, 0.6, 0],
  });

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1.1],
  });

  return (
    <Animated.View
      style={[
        styles.ember,
        {
          top: `${topPercent}%`,
          left: `${leftPercent}%`,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
          transform: [{ translateY }, { translateX }, { scale }],
        },
      ]}
    />
  );
};

export const EmberParticles: React.FC = () => {
  const embers = [
    { topPercent: 52, leftPercent: 48, size: 4, color: '#FFE5B4', driftX: 14, driftY: -95, duration: 4800, delay: 300 },
    { topPercent: 54, leftPercent: 44, size: 3, color: '#E6A15C', driftX: -10, driftY: -80, duration: 5400, delay: 1200 },
    { topPercent: 50, leftPercent: 53, size: 3.5, color: '#F3D599', driftX: 18, driftY: -110, duration: 5100, delay: 2000 },
    { topPercent: 48, leftPercent: 49, size: 4, color: '#FFE8C2', driftX: 8, driftY: -85, duration: 5800, delay: 800 },
    { topPercent: 56, leftPercent: 51, size: 2.5, color: '#FFB76B', driftX: 12, driftY: -70, duration: 4900, delay: 1600 },
  ];

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      {embers.map((e, idx) => (
        <SingleEmber key={idx} {...e} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    pointerEvents: 'none',
  },
  ember: {
    position: 'absolute',
    pointerEvents: 'none',
  },
});
