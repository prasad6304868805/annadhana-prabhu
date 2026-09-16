import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SANCTUM_COLORS } from '../constants/theme';

export default function MapPlaceholderScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  const isDesktopWeb = Platform.OS === 'web' && screenWidth > 500;
  const containerWidth = isDesktopWeb ? 430 : '100%';

  const handleReplay = () => {
    router.replace('/splash');
  };

  return (
    <View style={styles.outerViewport}>
      <View
        style={[
          styles.mainContainer,
          {
            width: containerWidth as any,
            paddingTop: Math.max(insets.top, 24),
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>STEP 1 COMPLETE</Text>
          </View>

          <Text style={styles.title}>DEVOTIONAL MAP — NEXT STEP</Text>

          <Text style={styles.subtitle}>
            Temporary post-splash verification screen for Annadhana Prabhuva.
          </Text>

          <TouchableOpacity
            style={styles.replayButton}
            onPress={handleReplay}
            activeOpacity={0.8}
          >
            <Text style={styles.replayButtonText}>Replay Splash Animation</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Visakhapatnam, Andhra Pradesh</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerViewport: {
    flex: 1,
    backgroundColor: SANCTUM_COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    height: '100%',
    backgroundColor: SANCTUM_COLORS.sanctumMid,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: 'rgba(197, 160, 89, 0.15)',
    borderColor: SANCTUM_COLORS.gold,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 24,
  },
  badgeText: {
    color: SANCTUM_COLORS.gold,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
  },
  title: {
    color: SANCTUM_COLORS.ivory,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: SANCTUM_COLORS.sand,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 36,
  },
  replayButton: {
    backgroundColor: SANCTUM_COLORS.gold,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  replayButtonText: {
    color: SANCTUM_COLORS.background,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerText: {
    color: SANCTUM_COLORS.goldMuted,
    fontSize: 11,
    letterSpacing: 1,
  },
});
