import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import Svg, { Path, Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { DevotionalLocation } from '../../types/location';
import { SANCTUM_COLORS } from '../../constants/theme';

interface DevotionalMarkerProps {
  location: DevotionalLocation;
  isSelected: boolean;
  isAnySelected: boolean;
  onSelect: (location: DevotionalLocation) => void;
}

export const DevotionalMarker: React.FC<DevotionalMarkerProps> = ({
  location,
  isSelected,
  isAnySelected,
  onSelect,
}) => {
  const useNativeDriver = Platform.OS !== 'web';
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Breathing halo pulse when selected
  useEffect(() => {
    if (isSelected) {
      const breathing = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2200,
            useNativeDriver,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 2200,
            useNativeDriver,
          }),
        ])
      );
      breathing.start();
      return () => breathing.stop();
    } else {
      pulseAnim.setValue(0);
    }
  }, [isSelected, pulseAnim, useNativeDriver]);

  // Opacity & scale transitions based on selection state
  useEffect(() => {
    const targetOpacity = isSelected ? 1 : isAnySelected ? 0.25 : 1;
    const targetScale = isSelected ? 1.08 : 1;

    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: targetOpacity,
        duration: 350,
        useNativeDriver,
      }),
      Animated.timing(scaleAnim, {
        toValue: targetScale,
        duration: 350,
        useNativeDriver,
      }),
    ]).start();
  }, [isSelected, isAnySelected, opacityAnim, scaleAnim, useNativeDriver]);

  const haloScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.35],
  });

  const haloOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.8],
  });

  // Render Category Icon
  const renderCategoryIcon = () => {
    switch (location.category) {
      case 'POOJA':
        return (
          // Sacred Flame / Deepam
          <Svg width={18} height={18} viewBox="0 0 24 24" fill={SANCTUM_COLORS.gold}>
            <Path d="M12 2c1.5 3 4.5 5.5 4.5 9.5 0 3.3-2.7 6-6 6s-6-2.7-6-6c0-4 3-6.5 4.5-9.5.5 1.5 1.5 2.5 3 2.5s2.5-1 3-2.5zm0 17c3.9 0 7 1.3 7 3v1H5v-1c0-1.7 3.1-3 7-3z" />
          </Svg>
        );
      case 'BIKSHA':
        return (
          // Annadhana Prasadam Bowl
          <Svg width={18} height={18} viewBox="0 0 24 24" fill={SANCTUM_COLORS.gold}>
            <Path d="M12 4a3.5 3.5 0 0 0-3.5 3.5c0 .3.05.58.12.86C5.03 9.17 2 12.06 2 15.67 2 19.17 6.48 22 12 22s10-2.83 10-6.33c0-3.61-3.03-6.5-6.62-7.31.07-.28.12-.56.12-.86A3.5 3.5 0 0 0 12 4zm0 2c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5S11.17 6 12 6z" />
          </Svg>
        );
      case 'ALPAHARAM':
        return (
          // Sacred Tulsi / Leaf
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={SANCTUM_COLORS.emerald} strokeWidth={2}>
            <Path d="M12 21C7.03 21 3 16.97 3 12c0-5 5-9 9-9s9 4 9 9c0 4.97-4.03 9-9 9zm0-16v14" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        );
      case 'SEVA':
        return (
          // Dedicated Seva Hands / Mudra
          <Svg width={18} height={18} viewBox="0 0 24 24" fill={SANCTUM_COLORS.gold}>
            <Path d="M12 2a4 4 0 0 1 4 4c0 1.8-.8 3.5-2 4.6v2.4h3c1.7 0 3 1.3 3 3v6h-2v-5a1 1 0 0 0-1-1h-4v6h-2v-6H7a1 1 0 0 0-1 1v5H4v-6c0-1.7 1.3-3 3-3h3v-2.4c-1.2-1.1-2-2.8-2-4.6a4 4 0 0 1 4-4z" />
          </Svg>
        );
    }
  };

  return (
    <Animated.View
      style={[
        styles.markerAnchor,
        {
          left: location.mapX,
          top: location.mapY,
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
          zIndex: isSelected ? 40 : 20,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onSelect(location)}
        testID={`marker-${location.id}`}
        accessibilityLabel={location.name}
        style={styles.touchable}
      >
        {/* Pulsing Sacred Aura Halo */}
        {isSelected && (
          <Animated.View
            style={[
              styles.haloContainer,
              {
                opacity: haloOpacity,
                transform: [{ scale: haloScale }],
              },
            ]}
          >
            <Svg width={64} height={64} viewBox="0 0 64 64">
              <Defs>
                <RadialGradient id={`markerHalo-${location.id}`} cx="50%" cy="50%" rx="50%" ry="50%">
                  <Stop offset="0%" stopColor="#FFE0A0" stopOpacity="0.8" />
                  <Stop offset="40%" stopColor="#E6A15C" stopOpacity="0.4" />
                  <Stop offset="70%" stopColor="#C5A059" stopOpacity="0.15" />
                  <Stop offset="100%" stopColor="#080605" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Rect x={0} y={0} width={64} height={64} fill={`url(#markerHalo-${location.id})`} />
            </Svg>
          </Animated.View>
        )}

        {/* Outer Ring & Badge */}
        <View
          style={[
            styles.markerBadge,
            isSelected && styles.markerBadgeSelected,
          ]}
        >
          {renderCategoryIcon()}
        </View>

        {/* Location Label Tag */}
        <View
          style={[
            styles.labelTag,
            isSelected && styles.labelTagSelected,
          ]}
        >
          <Text style={styles.labelTextEn} numberOfLines={1}>
            {location.area.toUpperCase()}
          </Text>
          <Text style={styles.labelTextTe} numberOfLines={1}>
            {location.nameTe}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  markerAnchor: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -40,
    marginTop: -40,
    width: 80,
    height: 80,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloContainer: {
    position: 'absolute',
    top: -12,
    left: 8,
    width: 64,
    height: 64,
    pointerEvents: 'none',
  },
  markerBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1b1713',
    borderColor: SANCTUM_COLORS.gold,
    borderWidth: 1.75,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.85,
    shadowRadius: 10,
  },
  markerBadgeSelected: {
    borderColor: '#FFE0A0',
    borderWidth: 2.2,
    backgroundColor: '#261f18',
  },
  labelTag: {
    marginTop: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(21, 18, 15, 0.94)',
    borderColor: 'rgba(197, 160, 89, 0.35)',
    borderWidth: 1,
    alignItems: 'center',
    maxWidth: 130,
  },
  labelTagSelected: {
    borderColor: SANCTUM_COLORS.gold,
    backgroundColor: 'rgba(28, 24, 20, 0.98)',
  },
  labelTextEn: {
    fontSize: 9,
    fontFamily: 'Cinzel_600SemiBold',
    color: SANCTUM_COLORS.gold,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  labelTextTe: {
    fontSize: 8.5,
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: 'rgba(251, 249, 245, 0.85)',
    textAlign: 'center',
    marginTop: 1,
  },
});
