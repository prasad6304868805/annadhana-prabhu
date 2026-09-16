import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { DevotionalLocation } from '../../types/location';
import { SANCTUM_COLORS } from '../../constants/theme';

interface SelectedLocationPreviewProps {
  location: DevotionalLocation | null;
  onOpenDetails: (location: DevotionalLocation) => void;
  onClose: () => void;
}

export const SelectedLocationPreview: React.FC<SelectedLocationPreviewProps> = ({
  location,
  onOpenDetails,
  onClose,
}) => {
  const useNativeDriver = Platform.OS !== 'web';
  const translateY = useRef(new Animated.Value(220)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (location) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 380,
          useNativeDriver,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 380,
          useNativeDriver,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 220,
          duration: 300,
          useNativeDriver,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver,
        }),
      ]).start();
    }
  }, [location, translateY, opacity, useNativeDriver]);

  if (!location) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.previewContainer,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {/* Drag & Close Header Handle */}
      <View style={styles.handleRow}>
        <TouchableOpacity
          style={styles.handleTouch}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        >
          <View style={styles.handleBar} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={onClose}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Category Pill */}
      <View style={styles.categoryRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{location.categoryBadge}</Text>
        </View>
      </View>

      {/* Main Content Info Row */}
      <View style={styles.contentRow}>
        {/* Thumbnail Image */}
        <View style={styles.thumbnailWrapper}>
          <Image
            source={location.image}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <View style={styles.thumbnailOverlay} />
        </View>

        {/* Titles & Status */}
        <View style={styles.infoColumn}>
          <Text style={styles.titleEn} numberOfLines={1}>
            {location.name}
          </Text>
          <Text style={styles.titleTe} numberOfLines={1}>
            {location.nameTe} • {location.taglineTe}
          </Text>

          {/* Timing & Status Badges */}
          <View style={styles.metaRow}>
            <View style={styles.timingBox}>
              <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={SANCTUM_COLORS.gold} strokeWidth={2}>
                <Path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
              <Text style={styles.timingText}>{location.timings}</Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{location.status}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Main CTA Button */}
      <TouchableOpacity
        testID="view-seva-details-btn"
        accessibilityLabel="VIEW SEVA DETAILS"
        style={styles.ctaButton}
        activeOpacity={0.85}
        onPress={() => onOpenDetails(location)}
      >
        <Text style={styles.ctaText}>{location.ctaText}</Text>
        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#100e0c" strokeWidth={2.5}>
          <Path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    position: 'absolute',
    bottom: 64, // Positioned right above bottom navigation bar
    left: 12,
    right: 12,
    backgroundColor: '#161310',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(197, 160, 89, 0.45)',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 14,
    zIndex: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
  },
  handleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 16,
    marginBottom: 4,
  },
  handleTouch: {
    paddingVertical: 4,
  },
  handleBar: {
    width: 36,
    height: 3,
    backgroundColor: 'rgba(197, 160, 89, 0.4)',
    borderRadius: 2,
  },
  closeBtn: {
    position: 'absolute',
    right: 2,
    top: 0,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: 'rgba(197, 160, 89, 0.7)',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: 'rgba(197, 160, 89, 0.15)',
    borderColor: 'rgba(197, 160, 89, 0.4)',
    borderWidth: 0.8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 9.5,
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: SANCTUM_COLORS.goldBright,
    letterSpacing: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  thumbnailWrapper: {
    width: 64,
    height: 64,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(197, 160, 89, 0.4)',
    backgroundColor: '#000',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  infoColumn: {
    flex: 1,
  },
  titleEn: {
    fontSize: 13,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.ivory,
    letterSpacing: 0.5,
  },
  titleTe: {
    fontSize: 10.5,
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: SANCTUM_COLORS.gold,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 5,
  },
  timingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timingText: {
    fontSize: 10,
    color: 'rgba(245, 242, 235, 0.8)',
    fontFamily: 'Cinzel_400Regular',
  },
  statusBadge: {
    backgroundColor: 'rgba(6, 78, 59, 0.7)',
    borderColor: 'rgba(52, 211, 153, 0.4)',
    borderWidth: 0.8,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 9,
    color: SANCTUM_COLORS.emerald,
    fontWeight: '600',
  },
  ctaButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: SANCTUM_COLORS.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: SANCTUM_COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  ctaText: {
    fontSize: 11,
    fontFamily: 'Cinzel_700Bold',
    color: '#100e0c',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
