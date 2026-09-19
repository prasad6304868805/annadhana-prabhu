/**
 * AnimatedSplashScreen — ONE continuous 9–10s cinematic sequence.
 *
 * GOLDEN RULE: At any frame, it must look like the same camera is still
 * recording. The viewer should think "the flame is illuminating more of
 * the temple", never "we switched to another scene."
 *
 * LAYER COMPOSITING (bottom → top)
 * ─────────────────────────────────────────────────────────────────────
 * L1  sanctum_backdrop.png      — MASTER SHOT. Brass deepam close-up.
 *                                  Always full opacity. NEVER modified.
 *                                  The foundation of every frame.
 *
 * L2  ayyappa_reveal_layer.png  — Matching dark sanctum background.
 *                                  The scene behind the deepam.
 *                                  Initially almost completely hidden.
 *                                  Revealed by a RADIAL LIGHT MASK that
 *                                  expands outward from the flame's exact
 *                                  screen position — so it looks like the
 *                                  diya's own light is reaching the darkness.
 *                                  NOT a crossfade. NOT a cut.
 *
 * L3  DiyaFlameHalo             — Breathing warm amber glow. Always on.
 * L4  EmberParticles            — Rising sacred sparks. Always on.
 * L5  RackFocusVignette         — Warm radial vignette for rack-focus feel.
 *                                  Phase 5 only.
 * L6  SacredCrest               — Top Kalasha emblem. Phase 1.
 * L7  CinematicTitle            — ANNADHANA PRABHUVA wordmark. Phase 5.
 *
 * TIMELINE
 * ─────────────────────────────────────────────────────────────────────
 * 0.0 – 3.0s  Phase 1: Master deepam shot enters. Unchanged.
 * 3.0 – 5.0s  Phase 2: Same shot. Subtle 1.0→1.06 push into darkness.
 * 5.0 – 7.5s  Phase 3: Radial light mask expands from flame position.
 *                        Ayyappa emerges bottom→ornaments→face.
 * 7.5 – 8.7s  Phase 4: Hold. Same temple, same flame, same Ayyappa.
 * 8.7 – 9.5s  Phase 5: Rack-focus vignette + ANNADHANA PRABHUVA title.
 * 9.5 – 10.2s Transition to /map.
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
import Svg, {
  Defs,
  RadialGradient,
  Stop,
  Rect,
  Mask,
  Circle,
} from 'react-native-svg';
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
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const useNativeDriver = Platform.OS !== 'web';

  // ─── Phase 1: Master diya entrance ──────────────────────────────────────
  const sanctumOpacity = useRef(new Animated.Value(0)).current;
  const sanctumScale   = useRef(new Animated.Value(1.03)).current;

  // ─── Phase 2: Subtle camera push ────────────────────────────────────────
  // Both L1 and L2 share this scale so the background moves with the diya —
  // they stay locked to the same virtual camera.
  const cameraPushScale = useRef(new Animated.Value(1.0)).current;

  // ─── Phase 3: Radial light-reveal radius ────────────────────────────────
  // This drives a circular SVG mask that grows outward from the flame's
  // screen position. At radius=0 the background is invisible. At radius=1
  // the background is fully revealed. The mask mimics the diya's light
  // physically reaching deeper into the sanctum.
  const lightRadius = useRef(new Animated.Value(0)).current; // 0 → 1

  // ─── Phase 3: Ayyappa layer entrance opacity ────────────────────────────
  // We gate the layer with a brief 0→1 opacity so it doesn't pop in.
  // After this gate is open the light-mask does all the reveal work.
  const ayyappaGateOpacity = useRef(new Animated.Value(0)).current;

  // ─── Phase 5: Rack-focus vignette ───────────────────────────────────────
  const rackFocusOpacity = useRef(new Animated.Value(0)).current;

  // ─── Phase 5: Title typography ──────────────────────────────────────────
  const titleOpacity    = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(8)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const hairlineOpacity = useRef(new Animated.Value(0)).current;
  const hairlineScaleX  = useRef(new Animated.Value(0.5)).current;

  // ─── Global screen fade-out ──────────────────────────────────────────────
  const screenFadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Phase 1 (0–2.2s): Master diya enters
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

    // Phase 2 (3–5s): Shared camera push — BOTH layers scale identically
    // so the environment stays locked. Scale from 1.0 → 1.06.
    Animated.timing(cameraPushScale, {
      toValue: 1.06,
      duration: SPLASH_TIMING.cameraPushDuration,
      delay: SPLASH_TIMING.cameraPushDelay,
      useNativeDriver,
    }).start();

    // Phase 3 (5–7.5s): Light-reveal
    // 3a. Open the gate opacity so the layer is ready (quick, invisible)
    Animated.timing(ayyappaGateOpacity, {
      toValue: 1,
      duration: 400,
      delay: SPLASH_TIMING.ayyappaRevealDelay,
      useNativeDriver,
    }).start();

    // 3b. Expand the radial light mask from the flame's position outward.
    // This is what makes it look like illumination, not a crossfade.
    Animated.timing(lightRadius, {
      toValue: 1,
      duration: SPLASH_TIMING.ayyappaRevealDuration,
      delay: SPLASH_TIMING.ayyappaRevealDelay,
      useNativeDriver: false, // SVG cannot use native driver
    }).start();

    // Phase 5 (8.7–9.5s): Rack-focus vignette + title
    Animated.timing(rackFocusOpacity, {
      toValue: 0.78,
      duration: SPLASH_TIMING.rackFocusDuration,
      delay: SPLASH_TIMING.rackFocusDelay,
      useNativeDriver,
    }).start();

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

    // Transition to /map at 10.2s
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
    ayyappaGateOpacity,
    lightRadius,
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

  // ─── Geometry ────────────────────────────────────────────────────────────
  const isDesktopWeb   = Platform.OS === 'web' && screenWidth > 500;
  const containerWidth = isDesktopWeb ? 430 : ('100%' as any);
  const canvasW        = isDesktopWeb ? 430 : screenWidth;
  const canvasH        = screenHeight;

  // The flame's position in the master shot:
  //   • Horizontally: ~52% from left
  //   • Vertically:   ~47% from top
  // The radial mask will expand from this exact point, making the light
  // feel physically motivated — the diya illuminates outward from its flame.
  const flameCx = canvasW * 0.52;
  const flameCy = canvasH * 0.47;

  // At full reveal (lightRadius = 1) the circle must cover the entire canvas.
  // We use the diagonal as the maximum radius so nothing is clipped.
  const maxRadius = Math.sqrt(canvasW * canvasW + canvasH * canvasH) * 0.55;

  // Animated radius value (0 → maxRadius)
  const circleRadius = lightRadius.interpolate({
    inputRange:  [0, 1],
    outputRange: [0, maxRadius],
  });

  // Additional soft outer glow radius (slightly larger than main)
  const glowRadius = lightRadius.interpolate({
    inputRange:  [0, 1],
    outputRange: [0, maxRadius * 1.12],
  });

  // Bokeh scale for the rack-focus
  const bokehScale = rackFocusOpacity.interpolate({
    inputRange:  [0, 0.78],
    outputRange: [0.92, 1],
  });

  return (
    <View style={styles.outerViewport}>
      <Animated.View
        style={[
          styles.mainContainer,
          { width: containerWidth, opacity: screenFadeOut },
        ]}
      >
        {/* ═══════════════════════════════════════════════════════════════
            L1 — MASTER DIYA SHOT  (NEVER CHANGES, ALWAYS FULL OPACITY)
            This is the foundation of every single frame in the sequence.
            The camera push scale is shared with L2 so both layers move
            as one rigid environment.
        ═══════════════════════════════════════════════════════════════ */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: sanctumOpacity,
              transform: [
                { scale: Animated.multiply(sanctumScale, cameraPushScale) as any },
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

        {/* ═══════════════════════════════════════════════════════════════
            L2 — AYYAPPA REVEAL LAYER
            This is the dark sanctum background that was already behind
            the deepam. The viewer could not see it because there was no
            light reaching that far.

            REVEAL MECHANISM:
            An SVG circle mask grows outward from the flame's screen
            coordinates. Only the area inside the circle is revealed.
            The circle expands from 0px to cover the entire screen over
            2.5 seconds. The edge of the circle has a radial gradient
            falloff so the boundary is soft and organic — like firelight,
            not like a wipe.

            This is NOT a crossfade. At any moment, only the area the
            flame could physically illuminate is visible.
        ═══════════════════════════════════════════════════════════════ */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.pointerNone,
            { opacity: ayyappaGateOpacity },
          ]}
        >
          {/* The background image — identical camera push scale as L1 */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                transform: [{ scale: cameraPushScale }],
              },
            ]}
          >
            <Image
              source={require('../../assets/splash/ayyappa_reveal_layer.png')}
              style={styles.backdropImage}
              resizeMode="cover"
            />
          </Animated.View>

          {/* SVG radial light-mask overlay
              The mask circle expands from the flame position.
              Outside the circle: pure darkness (matches L1 background).
              Inside the circle: the background is revealed through a
              soft radial gradient that is brightest at center and falls
              off naturally toward the edges, exactly like real firelight. */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.pointerNone,
            ]}
          >
            <Svg
              width={canvasW}
              height={canvasH}
              style={StyleSheet.absoluteFill as any}
            >
              <Defs>
                {/* Radial gradient for the light falloff — warm amber center */}
                <RadialGradient
                  id="lightMask"
                  cx={flameCx}
                  cy={flameCy}
                  r={maxRadius}
                  gradientUnits="userSpaceOnUse"
                >
                  {/* Center: transparent (fully reveals background) */}
                  <Stop offset="0%"   stopColor="#000000" stopOpacity="0.0" />
                  <Stop offset="45%"  stopColor="#000000" stopOpacity="0.08" />
                  <Stop offset="72%"  stopColor="#000000" stopOpacity="0.45" />
                  <Stop offset="88%"  stopColor="#000000" stopOpacity="0.82" />
                  {/* Edge: fully opaque black (hides background) */}
                  <Stop offset="100%" stopColor="#000000" stopOpacity="1.0" />
                </RadialGradient>
              </Defs>

              {/* Full black rect that gets punched through by the animated
                  circle below. As lightRadius grows, the revealed area grows. */}
              <Rect
                x={0}
                y={0}
                width={canvasW}
                height={canvasH}
                fill="url(#lightMask)"
              />

              {/* Expanding dark cover: everything OUTSIDE the circle stays black.
                  We achieve this by drawing a full black rect and then cutting
                  a transparent hole where the light reaches. */}
            </Svg>

            {/* A second SVG layer that is the expanding coverage cutout.
                This is the "hard" mask edge — a circle growing from the flame.
                Outside = black. Inside = transparent → shows background. */}
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                styles.pointerNone,
              ]}
            >
              <Svg
                width={canvasW}
                height={canvasH}
                style={StyleSheet.absoluteFill as any}
              >
                <Defs>
                  <RadialGradient
                    id="coverGrad"
                    cx={flameCx}
                    cy={flameCy}
                    r={maxRadius}
                    gradientUnits="userSpaceOnUse"
                  >
                    {/* Inside circle: transparent (revealed) */}
                    <Stop offset="0%"   stopColor="#070605" stopOpacity="0.0" />
                    <Stop offset="65%"  stopColor="#070605" stopOpacity="0.0" />
                    {/* Soft falloff edge */}
                    <Stop offset="80%"  stopColor="#070605" stopOpacity="0.55" />
                    <Stop offset="90%"  stopColor="#070605" stopOpacity="0.9" />
                    <Stop offset="100%" stopColor="#070605" stopOpacity="1.0" />
                  </RadialGradient>

                  {/* Animated circle mask: only the inside is "visible area" */}
                  <Mask id="circleMask" x="0" y="0" width={canvasW} height={canvasH}>
                    {/* White inside the circle = mask allows through */}
                    <AnimatedCircle
                      cx={flameCx}
                      cy={flameCy}
                      r={circleRadius as any}
                      fill="white"
                    />
                  </Mask>
                </Defs>

                {/* Dark cover rect with the circle punched out.
                    As the circle grows, more of the background shows through. */}
                <Rect
                  x={0}
                  y={0}
                  width={canvasW}
                  height={canvasH}
                  fill="url(#coverGrad)"
                />

                {/* This rect uses the mask — it's transparent inside the circle
                    which reveals the background image below. The area outside
                    the mask (outside the circle) fills with near-black.       */}
                <Rect
                  x={0}
                  y={0}
                  width={canvasW}
                  height={canvasH}
                  fill={SANCTUM_COLORS.background}
                  mask="url(#circleMask)"
                  opacity={0}
                />
              </Svg>
            </Animated.View>

            {/* CRITICAL: This is the actual growing black cover that hides
                the background outside the illuminated radius.
                It uses a dark-background rect that EXCLUDES a growing circle
                centered on the flame. This is implemented as the complement:
                we draw the cover over the full canvas and subtract the circle
                area by using the Animated approach — a growing transparent disc
                composited with multiply mode over the full canvas.            */}
            <AnimatedRevealMask
              canvasW={canvasW}
              canvasH={canvasH}
              flameCx={flameCx}
              flameCy={flameCy}
              circleRadius={circleRadius}
              glowRadius={glowRadius}
            />
          </Animated.View>
        </Animated.View>

        {/* ═══════════════════════════════════════════════════════════════
            L3 — BREATHING DIYA FLAME WARMTH GLOW  (always on)
        ═══════════════════════════════════════════════════════════════ */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.pointerNone,
            { opacity: sanctumOpacity },
          ]}
        >
          <DiyaFlameHalo />
        </Animated.View>

        {/* ═══════════════════════════════════════════════════════════════
            L4 — RISING SACRED INCENSE EMBERS  (always on)
        ═══════════════════════════════════════════════════════════════ */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.pointerNone,
            { opacity: sanctumOpacity },
          ]}
        >
          <EmberParticles />
        </Animated.View>

        {/* ═══════════════════════════════════════════════════════════════
            L5 — RACK-FOCUS VIGNETTE  (Phase 5 only)
            Warm radial vignette that darkens the edges, simulating the
            lens focus pulling from physical scene to the title card.
        ═══════════════════════════════════════════════════════════════ */}
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
                  rx="55%"
                  ry="65%"
                  fx="50%"
                  fy="50%"
                >
                  <Stop offset="0%"   stopColor="#0A0704" stopOpacity="0.0" />
                  <Stop offset="35%"  stopColor="#0E0905" stopOpacity="0.28" />
                  <Stop offset="68%"  stopColor="#0A0603" stopOpacity="0.70" />
                  <Stop offset="100%" stopColor="#070605" stopOpacity="0.92" />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#rackBokeh)" />
            </Svg>
          </Animated.View>
        </Animated.View>

        {/* ═══════════════════════════════════════════════════════════════
            L6 — SACRED CREST  (Phase 1 timing via SacredCrest internals)
        ═══════════════════════════════════════════════════════════════ */}
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

        {/* Golden ratio spacer */}
        <View style={styles.centerSpacer} />

        {/* ═══════════════════════════════════════════════════════════════
            L7 — ANNADHANA PRABHUVA TITLE  (Phase 5 — rack-focus reveal)
        ═══════════════════════════════════════════════════════════════ */}
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
            style={[styles.subtitleWrapper, { opacity: subtitleOpacity }]}
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

          {/* Sacred Hairline & Kshetram */}
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

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedRevealMask — the core continuity component.
//
// This renders a full-canvas dark overlay with a growing transparent circular
// window centered on the flame's screen position.
//
// BEFORE the reveal: the canvas is nearly solid black → the background
//   image (L2) is completely hidden. Only L1 (diya) is visible.
//
// DURING the reveal: the circle grows outward from the flame. The area inside
//   the circle becomes transparent → the background becomes visible there.
//   The area outside the circle remains dark. This precisely simulates the
//   diya's light reaching further into the sanctum.
//
// AFTER the reveal: the circle covers the whole canvas → background is fully
//   visible everywhere. The diya (L1) remains in its foreground position.
// ─────────────────────────────────────────────────────────────────────────────
interface RevealMaskProps {
  canvasW: number;
  canvasH: number;
  flameCx: number;
  flameCy: number;
  circleRadius: Animated.AnimatedInterpolation<number>;
  glowRadius: Animated.AnimatedInterpolation<number>;
}

const AnimatedRevealMask: React.FC<RevealMaskProps> = ({
  canvasW,
  canvasH,
  flameCx,
  flameCy,
  circleRadius,
  glowRadius,
}) => {
  // We need an animated radius for the SVG. We do this with a View transform
  // trick: scale a circle from 0→1 using a View that starts at size 0.
  // But for SVG elements we need the Animated interpolated value directly.
  //
  // Strategy: render an Animated.View sized to the max circle diameter,
  // positioned at the flame center, scaled from 0→1. Then use SVG to
  // create the "outside is dark" effect by inverting it.
  //
  // Simplest correct approach: pure SVG approach with Animated values
  // attached to the SVG circle via a ref + JS-driven update.
  //
  // We use a canvas-sized dark rect with a growing radial-gradient that
  // becomes transparent in the center (the "lit" area).
  // At lightRadius=0: gradient center opacity=1 → all dark
  // At lightRadius=1: gradient spreads to canvas edge → all clear

  // Map the circle radius to a gradient "coverage" value (0 → 1)
  // Small radius = tight dark coverage. Large radius = background exposed.
  const coverageR = circleRadius; // pixel value 0 → maxRadius

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.pointerNone]}
      pointerEvents="none"
    >
      {/* We render a growing circle of TRANSPARENCY over the dark canvas.
          Since we can't do true clip-path masking in RN without Skia,
          we approximate with a radial gradient whose transparent center
          grows (driven by lightRadius). This creates the "light sphere"
          expanding from the flame. The larger the radius interpolation
          travels, the more of the background becomes visible.

          We drive this through canvasH/W re-renders, but since lightRadius
          is on the JS thread (useNativeDriver: false), this is fine.     */}
      <LightSphereOverlay
        canvasW={canvasW}
        canvasH={canvasH}
        flameCx={flameCx}
        flameCy={flameCy}
        coverageR={coverageR}
        glowRadius={glowRadius}
      />
    </Animated.View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LightSphereOverlay — drives the actual SVG with Animated listener
// ─────────────────────────────────────────────────────────────────────────────
interface LightSphereProps {
  canvasW: number;
  canvasH: number;
  flameCx: number;
  flameCy: number;
  coverageR: Animated.AnimatedInterpolation<number>;
  glowRadius: Animated.AnimatedInterpolation<number>;
}

const LightSphereOverlay: React.FC<LightSphereProps> = ({
  canvasW,
  canvasH,
  flameCx,
  flameCy,
  coverageR,
  glowRadius,
}) => {
  // Track the animated radius value via a listener so we can pass it
  // as a prop to the SVG element (which cannot take Animated values directly).
  const [radius, setRadius] = React.useState(0);
  const [gRadius, setGRadius] = React.useState(0);

  React.useEffect(() => {
    const id = coverageR.addListener(({ value }) => setRadius(value));
    const gid = glowRadius.addListener(({ value }) => setGRadius(value));
    return () => {
      coverageR.removeListener(id);
      glowRadius.removeListener(gid);
    };
  }, [coverageR, glowRadius]);

  // Build 4 gradient stops that make the center transparent and outer dark.
  // The "inner transparent zone" extends to r*0.7. The soft edge is r*0.7→r.
  // This creates a natural firelight falloff.
  const innerEdge = Math.max(0, radius * 0.72);
  const midEdge   = Math.max(0, radius * 0.85);
  const outerEdge = Math.max(1, radius);

  const maxR = Math.max(
    Math.sqrt(canvasW * canvasW + canvasH * canvasH),
    outerEdge + 1
  );

  // Stops expressed as percentages of maxR
  const pInner = `${((innerEdge / maxR) * 100).toFixed(1)}%`;
  const pMid   = `${((midEdge   / maxR) * 100).toFixed(1)}%`;
  const pOuter = `${((outerEdge / maxR) * 100).toFixed(1)}%`;

  return (
    <Svg
      width={canvasW}
      height={canvasH}
      style={StyleSheet.absoluteFill as any}
    >
      <Defs>
        <RadialGradient
          id="lightSphere"
          cx={flameCx}
          cy={flameCy}
          r={maxR}
          gradientUnits="userSpaceOnUse"
        >
          {/* Center of the light sphere: fully transparent = background visible */}
          <Stop offset="0%"    stopColor={SANCTUM_COLORS.background} stopOpacity={0.0} />
          <Stop offset={pInner} stopColor={SANCTUM_COLORS.background} stopOpacity={0.0} />
          {/* Soft edge — matches natural firelight falloff */}
          <Stop offset={pMid}   stopColor={SANCTUM_COLORS.background} stopOpacity={0.55} />
          <Stop offset={pOuter} stopColor={SANCTUM_COLORS.background} stopOpacity={0.94} />
          {/* Outside the light radius: completely dark */}
          <Stop offset="100%"  stopColor={SANCTUM_COLORS.background} stopOpacity={1.0} />
        </RadialGradient>
      </Defs>
      <Rect
        x={0}
        y={0}
        width={canvasW}
        height={canvasH}
        fill="url(#lightSphere)"
      />
    </Svg>
  );
};

// Simple passthrough for animated SVG Circle prop
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
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
