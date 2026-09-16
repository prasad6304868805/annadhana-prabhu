import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { DevotionalLocation } from '../../types/location';
import { SANCTUM_COLORS } from '../../constants/theme';

interface SevaDetailSheetProps {
  location: DevotionalLocation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SevaDetailSheet: React.FC<SevaDetailSheetProps> = ({
  location,
  isOpen,
  onClose,
}) => {
  const useNativeDriver = Platform.OS !== 'web';
  const translateY = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    if (isOpen && location) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 420,
        useNativeDriver,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 1000,
        duration: 350,
        useNativeDriver,
      }).start();
    }
  }, [isOpen, location, translateY, useNativeDriver]);

  if (!location) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          pointerEvents: isOpen ? 'auto' : 'none',
        },
      ]}
    >
      {/* Fixed Sanctum Top Navigation Bar */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          testID="back-to-map-btn"
          accessibilityLabel="SANCTUM DETAILS"
          style={styles.backButton}
          activeOpacity={0.75}
          onPress={onClose}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={SANCTUM_COLORS.gold} strokeWidth={2.2}>
            <Path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text style={styles.backText}>SANCTUM DETAILS</Text>
        </TouchableOpacity>

        <View style={styles.topBadge}>
          <Text style={styles.topBadgeText}>{location.topBadge}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sacred Hero Image Section */}
        <View style={styles.heroWrapper}>
          <Image source={location.image} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroGradientBottom} />

          {/* Devotional Overlay Labels */}
          <View style={styles.heroLabels}>
            <View style={styles.heroCategoryPill}>
              <View style={styles.categoryDot} />
              <Text style={styles.heroCategoryText}>{location.categoryBadge}</Text>
            </View>
            <Text style={styles.heroTitleEn}>{location.name}</Text>
            <Text style={styles.heroTitleTe}>{location.nameTe} • {location.areaTe}</Text>
          </View>
        </View>

        {/* Sacred Shloka Card */}
        <View style={styles.shlokaCard}>
          <View style={styles.shlokaCornerGlow} />
          <Text style={styles.shlokaTe}>"{location.shloka}"</Text>
          <Text style={styles.shlokaEn}>"{location.shlokaMeaning}"</Text>
        </View>

        {/* Daily Seva & Batch Timings */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={SANCTUM_COLORS.gold} strokeWidth={2}>
              <Circle cx={12} cy={12} r={9} />
              <Path d="M12 6v6l4 2" />
            </Svg>
            <Text style={styles.sectionTitle}>
              DAILY SEVA & BATCH TIMINGS • సమయాలు
            </Text>
          </View>

          <View style={styles.batchesGrid}>
            {location.batches.map((b, idx) => (
              <View key={idx} style={styles.batchCard}>
                <View style={styles.batchTopRow}>
                  <Text style={styles.batchName}>{b.name}</Text>
                  <Text style={[styles.batchStatus, b.statusType === 'emerald' ? styles.statusActive : styles.statusUpcoming]}>
                    {b.status}
                  </Text>
                </View>
                <Text style={styles.batchTime}>{b.time}</Text>
                <Text style={styles.batchDesc}>{b.descTe}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Consecrated Maha Prasadam Menu */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.leafIcon}>🍃</Text>
            <Text style={styles.sectionTitle}>
              CONSECRATED MAHA PRASADAM • పవిత్ర నైవేద్యం
            </Text>
          </View>

          <View style={styles.prasadamCard}>
            {location.prasadamMenu.map((p, idx) => (
              <View key={idx} style={styles.prasadamRow}>
                <Text style={styles.itemEmoji}>{p.icon}</Text>
                <View style={styles.itemTextCol}>
                  <Text style={styles.itemNameEn}>{p.nameEn}</Text>
                  <Text style={styles.itemNameTe}>{p.nameTe}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Kshetram Description & Area Info */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.templeIcon}>🛕</Text>
            <Text style={styles.sectionTitle}>
              ABOUT THE KSHETRAM • క్షేత్ర విశేషాలు
            </Text>
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>{location.description}</Text>
            <View style={styles.areaRow}>
              <Text style={styles.areaLabel}>LOCATION:</Text>
              <Text style={styles.areaValue}>{location.area} ({location.areaTe})</Text>
            </View>
          </View>
        </View>

        {/* Close Button at bottom of scroll */}
        <TouchableOpacity
          style={styles.returnButton}
          activeOpacity={0.8}
          onPress={onClose}
        >
          <Text style={styles.returnButtonText}>← RETURN TO DEVOTIONAL MAP</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#100E0C',
    zIndex: 60,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#141210',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 44, 37, 0.6)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    fontSize: 11,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.gold,
    letterSpacing: 1.2,
  },
  topBadge: {
    backgroundColor: 'rgba(197, 160, 89, 0.15)',
    borderColor: 'rgba(197, 160, 89, 0.35)',
    borderWidth: 0.8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  topBadgeText: {
    fontSize: 9.5,
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: SANCTUM_COLORS.goldBright,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroWrapper: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: '#000',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradientBottom: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(16, 14, 12, 0.45)',
  },
  heroLabels: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
  },
  heroCategoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderColor: 'rgba(197, 160, 89, 0.5)',
    borderWidth: 0.8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  categoryDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: SANCTUM_COLORS.goldBright,
  },
  heroCategoryText: {
    fontSize: 9.5,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.goldBright,
    letterSpacing: 1,
  },
  heroTitleEn: {
    fontSize: 16,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.ivory,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroTitleTe: {
    fontSize: 11.5,
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: SANCTUM_COLORS.gold,
    marginTop: 2,
  },
  shlokaCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#151311',
    borderWidth: 1,
    borderColor: 'rgba(197, 160, 89, 0.3)',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  shlokaCornerGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(229, 193, 120, 0.08)',
  },
  shlokaTe: {
    fontSize: 12,
    fontFamily: 'NotoSerifTelugu_500Medium',
    color: SANCTUM_COLORS.goldBright,
    textAlign: 'center',
    lineHeight: 18,
  },
  shlokaEn: {
    fontSize: 10,
    fontFamily: 'Cinzel_400Regular',
    color: 'rgba(251, 249, 245, 0.75)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 15,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  leafIcon: {
    fontSize: 12,
  },
  templeIcon: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.gold,
    letterSpacing: 1,
  },
  batchesGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  batchCard: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#1d1b19',
    borderWidth: 1,
    borderColor: 'rgba(51, 44, 37, 0.8)',
  },
  batchTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  batchName: {
    fontSize: 9,
    fontFamily: 'Cinzel_700Bold',
    color: 'rgba(251, 249, 245, 0.6)',
  },
  batchStatus: {
    fontSize: 9,
    fontWeight: '700',
  },
  statusActive: {
    color: SANCTUM_COLORS.emerald,
  },
  statusUpcoming: {
    color: SANCTUM_COLORS.amber,
  },
  batchTime: {
    fontSize: 12,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.goldBright,
  },
  batchDesc: {
    fontSize: 9.5,
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: 'rgba(251, 249, 245, 0.7)',
    marginTop: 3,
  },
  prasadamCard: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#151311',
    borderWidth: 1,
    borderColor: 'rgba(51, 44, 37, 0.8)',
    gap: 10,
  },
  prasadamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemEmoji: {
    fontSize: 16,
  },
  itemTextCol: {
    flex: 1,
  },
  itemNameEn: {
    fontSize: 11.5,
    fontFamily: 'Cinzel_600SemiBold',
    color: SANCTUM_COLORS.ivory,
  },
  itemNameTe: {
    fontSize: 10,
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: SANCTUM_COLORS.gold,
    marginTop: 1,
  },
  descriptionCard: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#151311',
    borderWidth: 1,
    borderColor: 'rgba(51, 44, 37, 0.8)',
  },
  descriptionText: {
    fontSize: 11.5,
    color: 'rgba(251, 249, 245, 0.8)',
    lineHeight: 18,
  },
  areaRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(51, 44, 37, 0.5)',
  },
  areaLabel: {
    fontSize: 9.5,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.gold,
  },
  areaValue: {
    fontSize: 9.5,
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: SANCTUM_COLORS.ivory,
  },
  returnButton: {
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(197, 160, 89, 0.15)',
    borderWidth: 1,
    borderColor: SANCTUM_COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnButtonText: {
    fontSize: 11,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.goldBright,
    letterSpacing: 1,
  },
});
