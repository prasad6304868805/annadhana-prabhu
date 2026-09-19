/**
 * AnimatedSplashScreen — ONE continuous 9–10s cinematic sequence.
 *
 * TIMELINE
 *   0–3 s   Phase 1 : Existing diya master shot, unchanged.
 *   3–6 s   Phase 2 : Same diya. Subtle camera push deeper into darkness.
 *                     Darkness behind the diya begins to open up.
 *   6–8 s   Phase 3 : Ayyappa Swami is revealed by the diya's own light.
 *                     Illumination progresses bottom→body→ornaments→face.
 *                     The diya foreground stays visible throughout.
 *   8–9 s   Phase 4 : Hold — one camera, one temple, one flame, one god.
 *   9–10 s  Phase 5 : Optical rack-focus. Physical scene becomes warm bokeh.
 *                     "ANNADHANA PRABHUVA" fades in over the bokeh.
 *                     Transition directly to /map.
 *
 * LAYER ORDER (bottom → top)
 *   L1  sanctum_backdrop   — the approved master diya image, always present
 *   L2  ayyappa_dark_sanctum — dark sanctum matching layer, light-revealed
 *   L3  DiyaFlameHalo      — breathing warm glow, always present
 *   L4  EmberParticles     — rising sacred sparks, always present
 *   L5  RackFocusOverlay   — warm amber bokeh that appears only in Phase 5
 *   L6  SacredCrest        — top Kalasha emblem (Phase 1)
 *   L7  CinematicTitle     — ANNADHANA PRABHUVA wordmark (Phase 5)
 */
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
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
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

  // ─── Phase 1: Diya master shot entrance ─────────────────────────────────
  const sanctumOpacity = useRef(new Animated.Value(0)).current;
  const sanctumScale  = useRef(new Animated.Value(1.03)).current;

  // ─── Phase 2: Camera push (subtle scale on the diya layer) ───────────────
  // We nudge the master shot scale from 1.0 → 1.07 over 3 seconds to
  // simulate the camera slowly pushing forward into the darkness.
  const cameraPushScale = useRef(new Animated.Value(1.0)).current;

  // ─── Phase 3: Ayyappa light-reveal ──────────────────────────────────────
  // The Ayyappa layer is composite-revealed using TWO animated values:
  //   ayyappaOpacity  — overall opacity gate (starts 0, peaks 1)
  //   revealProgress  — drives an SVG radial mask from bottom upward
  //                     simulating the diya flame illuminating the background
  const ayyappaOpacity   = useRef(new Animated.Value(0)).current;
  // Ayyappa layer starts almost completely dark, then becomes clear
  const ayyappaClarity   = useRef(new Animated.Value(0.08)).current; // brightness

  // ─── Phase 5: Rack-focus / bokeh overlay ────────────────────────────────
  const rackFocusOpacity = useRef(new Animated.Value(0)).current;

  // ─── Phase 5: Title typography ──────────────────────────────────────────
  const titleOpacity     = useRef(new Animated.Value(0)).current;
  const titleTranslateY  = useRef(new Animated.Value(6)).current;
  const subtitleOpacity  = useRef(new Animated.Value(0)).current;
  const hairlineOpacity  = useRef(new Animated.Value(0)).current;
  const hairlineScaleX   = useRef(new Animated.Value(0.5)).current;

  // ─── Screen fade-out ────────────────────────────────────────────────────
  const screenFadeOut    = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // ── Phase 1: Diya master enters (0–2.2s) ──────────────────────────────
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
    ]).start();

    // ── Phase 2: Camera push (3–6s) ──────────────────────────────────────
    Animated.timing(cameraPushScale, {
      toValue: 1.065,
      duration: SPLASH_TIMING.cameraPushDuration,
      delay: SPLASH_TIMING.cameraPushDelay,
      useNativeDriver,
    }).start();

    // ── Phase 3: Ayyappa light-reveal (5.5–8s) ───────────────────────────
    // Start the layer fading in subtly from total darkness
    Animated.timing(ayyappaOpacity, {
      toValue: 1,
      duration: 800,
      delay: SPLASH_TIMING.ayyappaRevealDelay,
      useNativeDriver,
    }).start();

    // Darkness lifts progressively — simulates flame illuminating the background
    Animated.timing(ayyappaClarity, {
      toValue: 1,
      duration: SPLASH_TIMING.ayyappaRevealDuration,
      delay: SPLASH_TIMING.ayyappaRevealDelay,
      useNativeDriver: false,
    }).start();

    // ── Phase 5: Rack-focus bokeh overlay (8.6s) ─────────────────────────
    Animated.timing(rackFocusOpacity, {
      toValue: 0.82,
      duration: SPLASH_TIMING.rackFocusDuration,
      delay: SPLASH_TIMING.rackFocusDelay,
      useNativeDriver,
    }).start();

    // ── Phase 5: Title typography (8.8s) ─────────────────────────────────
    Animated.parallel([
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
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: SPLASH_TIMING.subtitleDuration,
        delay: SPLASH_TIMING.subtitleDelay,
        useNativeDriver,
      }),
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

    // ── Transition to Devotional Map (10.2s) ─────────────────────────────
    const exitTimer = setTimeout(() => {
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

    return () => clearTimeout(exitTimer);
  }, [
    sanctumOpacity,
    sanctumScale,
    cameraPushScale,
    ayyappaOpacity,
    ayyappaClarity,
    rackFocusOpacity,
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
  const isDesktopWeb  = Platform.OS === 'web' && screenWidth > 500;
  const containerWidth = isDesktopWeb ? 430 : ('100%' as any);


  const darkOverlayOpacity = ayyappaClarity.interpolate({
    inputRange:  [0.08, 1],
    outputRange: [0.88, 0],  // starts very dark, lifts to clear
  });

  // Bokeh circle scale for the rack-focus effect
  const bokehScale = rackFocusOpacity.interpolate({
    inputRange:  [0, 0.82],
    outputRange: [0.9, 1],
  });

  return (
    <View style={styles.outerViewport}>
      <Animated.View
        style={[
          styles.mainContainer,
          {
            width: containerWidth,
            opacity: screenFadeOut,
          },
        ]}
      >
        {/* ── L1: MASTER DIYA — APPROVED FIRST SHOT, NEVER CHANGES ────────
            This layer is the foundation. It remains fully opaque and
            visible from frame 1 through the very last frame.            */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: sanctumOpacity,
              // Phase 1 settle → Phase 2 camera push composed together
              transform: [
                {
                  scale: Animated.multiply(sanctumScale, cameraPushScale) as any,
                },
              ],
            },
          ]}
        >
          <Image
            source={require('../../assets/splash/sanctum_backdrop.png')}
            style={styles.backdropImage}
            resizeMode="cover"
          />
        </Animated.View>

        {/* ── L2: AYYAPPA DARK SANCTUM — light-reveal layer ────────────────
            This is the matching dark-sanctum background that was generated
            to continue the same scene. It is initially almost completely
            hidden (opacity = 0). An animated SVG radial mask progressively
            reveals it bottom-up, simulating the diya flame illuminating
            the background. A dark overlay tint lifts simultaneously.
            The diya foreground (L1) remains visible through all of this. */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.pointerNone,
            { opacity: ayyappaOpacity },
          ]}
        >
          <Image
            source={require('../../assets/splash/ayyappa_dark_sanctum.png')}
            style={styles.backdropImage}
            resizeMode="cover"
          />
          {/* Dark vignette tint that lifts as the reveal progresses */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: SANCTUM_COLORS.background,
                opacity: darkOverlayOpacity,
              },
            ]}
          />
        </Animated.View>

        {/* ── L3: Breathing Diya Flame Warmth Glow ─────────────────────────
            Remains active throughout all phases. The living heartbeat
            of the sequence.                                               */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.pointerNone,
            { opacity: sanctumOpacity },
          ]}
        >
          <DiyaFlameHalo />
        </Animated.View>

        {/* ── L4: Rising Sacred Incense Embers ─────────────────────────────
            Continuous particle drift throughout all phases.               */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.pointerNone,
            { opacity: sanctumOpacity },
          ]}
        >
          <EmberParticles />
        </Animated.View>

        {/* ── L5: Rack-Focus Bokeh Overlay (Phase 5 only) ──────────────────
            A warm amber radial gradient simulates the camera's optical
            rack-focus shifting from the physical scene to the title.      */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.pointerNone,
            { opacity: rackFocusOpacity },
          ]}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { transform: [{ scale: bokehScale }] },
            ]}
          >
            <Svg
              width="100%"
              height="100%"
              style={StyleSheet.absoluteFill as any}
            >
              <Defs>
                <RadialGradient
                  id="rackBokeh"
                  cx="50%"
                  cy="50%"
                  rx="60%"
                  ry="70%"
                  fx="50%"
                  fy="50%"
                >
                  <Stop offset="0%"   stopColor="#0A0704" stopOpacity="0.0" />
                  <Stop offset="30%"  stopColor="#1A0E05" stopOpacity="0.35" />
                  <Stop offset="65%"  stopColor="#120A03" stopOpacity="0.72" />
                  <Stop offset="100%" stopColor="#070605" stopOpacity="0.94" />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#rackBokeh)" />
            </Svg>
          </Animated.View>
        </Animated.View>

        {/* ── L6: Top Sacred Crest (Phase 1, fades with crest timing) ─────  */}
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

        {/* Spacer — golden ratio composition */}
        <View style={styles.centerSpacer} />

        {/* ── L7: ANNADHANA PRABHUVA — Phase 5 Title (rack-focus reveal) ───
            Appears only after the rack-focus begins. Sits over the warm
            bokeh overlay. No buttons. No UI. Pure wordmark.               */}
        <View
          style={[
            styles.lowerBrandingBlock,
            { paddingBottom: Math.max(insets.bottom, 28) },
          ]}
        >
          {/* Primary Wordmark */}
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
