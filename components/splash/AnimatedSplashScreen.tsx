import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  useWindowDimensions,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SANCTUM_COLORS, SPLASH_TIMING } from '../../constants/theme';
import { SacredCrest } from './SacredCrest';
import { DiyaFlameHalo } from './DiyaFlameHalo';
import { EmberParticles } from './EmberParticles';

interface AnimatedSplashScreenProps {
  onAnimationComplete?: () => void;
  fontsLoaded?: boolean;
}

export const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({
  onAnimationComplete,
  fontsLoaded = true,
}) => {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const useNativeDriver = Platform.OS !== 'web';

  // Animation drivers
  const sanctumOpacity = useRef(new Animated.Value(0)).current;
  const sanctumScale = useRef(new Animated.Value(1.03)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(8)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const hairlineOpacity = useRef(new Animated.Value(0)).current;
  const hairlineScaleX = useRef(new Animated.Value(0.5)).current;
  const screenFadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Sanctum atmosphere emerges (0.2s - 2.2s)
    Animated.parallel([
      Animated.timing(sanctumOpacity, {
        toValue: 1,
        duration: SPLASH_TIMING.sanctumDuration,
        delay: 200,
        useNativeDriver,
      }),
      Animated.timing(sanctumScale, {
        toValue: 1,
        duration: SPLASH_TIMING.sanctumDuration,
        delay: 200,
        useNativeDriver,
      }),
      // 2. Title "ANNADHANA PRABHUVA" reveal (1.8s - 2.8s)
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: SPLASH_TIMING.titleDuration,
        delay: SPLASH_TIMING.titleDelay,
        useNativeDriver,
      }),
      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: SPLASH_TIMING.titleDuration,
        delay: SPLASH_TIMING.titleDelay,
        useNativeDriver,
      }),
      // 3. Subtitles reveal (2.1s - 2.9s)
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: SPLASH_TIMING.subtitleDuration,
        delay: SPLASH_TIMING.subtitleDelay,
        useNativeDriver,
      }),
      // 4. Sacred hairline & Kshetram label (2.4s - 3.0s)
      Animated.timing(hairlineOpacity, {
        toValue: 0.65,
        duration: SPLASH_TIMING.hairlineDuration,
        delay: SPLASH_TIMING.hairlineDelay,
        useNativeDriver,
      }),
      Animated.timing(hairlineScaleX, {
        toValue: 1,
        duration: SPLASH_TIMING.hairlineDuration,
        delay: SPLASH_TIMING.hairlineDelay,
        useNativeDriver,
      }),
    ]).start();

    // 5. Total hold and transition to main app (at ~3.2s)
    const timer = setTimeout(() => {
      Animated.timing(screenFadeOut, {
        toValue: 0,
        duration: SPLASH_TIMING.transitionDuration,
        useNativeDriver,
      }).start(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      });
    }, SPLASH_TIMING.totalDuration);

    return () => clearTimeout(timer);
  }, [
    sanctumOpacity,
    sanctumScale,
    titleOpacity,
    titleTranslateY,
    subtitleOpacity,
    hairlineOpacity,
    hairlineScaleX,
    screenFadeOut,
    useNativeDriver,
    onAnimationComplete,
  ]);

  // Maintain 9:16 mobile canvas on desktop web
  const isDesktopWeb = Platform.OS === 'web' && screenWidth > 500;
  const containerWidth = isDesktopWeb ? 430 : '100%';

  return (
    <View style={styles.outerViewport}>
      <Animated.View
        style={[
          styles.mainContainer,
          {
            width: containerWidth as any,
            opacity: screenFadeOut,
          },
        ]}
      >
        {/* Layer 1: Sacred Sanctum Diya & Incense Atmosphere */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: sanctumOpacity,
              transform: [{ scale: sanctumScale }],
            },
          ]}
        >
          <Image
            source={require('../../assets/splash/sanctum_backdrop.png')}
            style={styles.backdropImage}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Layer 2: Breathing Diya Flame Warmth Glow */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.pointerNone,
            { opacity: sanctumOpacity },
          ]}
        >
          <DiyaFlameHalo />
        </Animated.View>

        {/* Layer 3: Rising Sacred Incense Embers */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.pointerNone,
            { opacity: sanctumOpacity },
          ]}
        >
          <EmberParticles />
        </Animated.View>

        {/* Layer 4: Top Sacred Crest */}
        <View
          style={[
            styles.topCrestWrapper,
            { paddingTop: Math.max(insets.top, 24) },
          ]}
        >
          <SacredCrest
            cinzelFontLoaded={fontsLoaded}
            teluguFontLoaded={fontsLoaded}
          />
        </View>

        {/* Spacer for Golden Ratio Composition */}
        <View style={styles.centerSpacer} />

        {/* Layer 5: Lower Third Devotional Typography */}
        <View
          style={[
            styles.lowerBrandingBlock,
            { paddingBottom: Math.max(insets.bottom, 24) },
          ]}
        >
          {/* Primary Wordmark: ANNADHANA PRABHUVA */}
          <Animated.View
            style={[
              styles.titleWrapper,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslateY }],
              },
            ]}
          >
            <Text
              style={[
                styles.titleText,
                fontsLoaded && { fontFamily: 'Cinzel_600SemiBold' },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              accessibilityRole="header"
            >
              ANNADHANA PRABHUVA
            </Text>
          </Animated.View>

          {/* Devotional Subtitles */}
          <Animated.View
            style={[
              styles.subtitleWrapper,
              { opacity: subtitleOpacity },
            ]}
          >
            <Text
              style={[
                styles.teluguSubtitle,
                fontsLoaded && { fontFamily: 'NotoSerifTelugu_400Regular' },
              ]}
              numberOfLines={1}
            >
              అన్నదాత సుఖీభవ • సేవా సమర్పణం
            </Text>
            <Text
              style={[
                styles.englishSubtitle,
                fontsLoaded && { fontFamily: 'Cinzel_400Regular' },
              ]}
              numberOfLines={1}
            >
              DIVINE SANCTUM OF ETERNAL GRACE
            </Text>
          </Animated.View>

          {/* Micro Sanctum Indicator & Kshetram */}
          <Animated.View
            style={[
              styles.indicatorWrapper,
              {
                opacity: hairlineOpacity,
                transform: [{ scaleX: hairlineScaleX }],
              },
            ]}
          >
            <View style={styles.hairlineBar} />
            <Text
              style={[
                styles.kshetramText,
                fontsLoaded && { fontFamily: 'NotoSerifTelugu_400Regular' },
              ]}
            >
              విశాఖపట్నం క్షేత్రం
            </Text>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerViewport: {
    flex: 1,
    backgroundColor: SANCTUM_COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    height: '100%',
    backgroundColor: SANCTUM_COLORS.background,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
  },
  pointerNone: {
    pointerEvents: 'none',
  },
  backdropImage: {
    width: '100%',
    height: '100%',
  },
  topCrestWrapper: {
    zIndex: 10,
    width: '100%',
    alignItems: 'center',
  },
  centerSpacer: {
    flex: 1,
  },
  lowerBrandingBlock: {
    zIndex: 10,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleWrapper: {
    marginBottom: 8,
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: SANCTUM_COLORS.ivory,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subtitleWrapper: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  teluguSubtitle: {
    fontSize: 12,
    color: SANCTUM_COLORS.gold,
    letterSpacing: 1.2,
    marginBottom: 6,
    textAlign: 'center',
  },
  englishSubtitle: {
    fontSize: 8.5,
    color: SANCTUM_COLORS.sand,
    letterSpacing: 2.8,
    textTransform: 'uppercase',
    opacity: 0.85,
    textAlign: 'center',
  },
  indicatorWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  hairlineBar: {
    width: 48,
    height: 1,
    backgroundColor: SANCTUM_COLORS.gold,
    opacity: 0.5,
    borderRadius: 1,
  },
  kshetramText: {
    fontSize: 10,
    color: SANCTUM_COLORS.goldMuted,
    letterSpacing: 2,
    fontWeight: '300',
  },
});
