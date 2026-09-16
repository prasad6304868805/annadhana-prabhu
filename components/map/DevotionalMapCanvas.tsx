import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Path,
  Rect,
  Circle,
  Text as SvgText,
  G,
} from 'react-native-svg';
import { DevotionalLocation } from '../../types/location';
import { DevotionalMarker } from './DevotionalMarker';
import { SANCTUM_COLORS } from '../../constants/theme';

interface DevotionalMapCanvasProps {
  locations: DevotionalLocation[];
  selectedLocation: DevotionalLocation | null;
  onSelectLocation: (loc: DevotionalLocation) => void;
  onDeselect: () => void;
  resetTrigger: number;
}

export const DevotionalMapCanvas: React.FC<DevotionalMapCanvasProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  onDeselect,
  resetTrigger,
}) => {
  const useNativeDriver = Platform.OS !== 'web';

  // Camera Animated Values
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // Track last committed pan positions for interactive dragging
  const panOffset = useRef({ x: 0, y: 0 });

  // Reset or focus camera when selection changes
  useEffect(() => {
    if (selectedLocation) {
      const focus = selectedLocation.cameraFocus;
      panOffset.current = { x: focus.x, y: focus.y };

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: focus.x,
          duration: 650,
          useNativeDriver,
        }),
        Animated.timing(translateY, {
          toValue: focus.y,
          duration: 650,
          useNativeDriver,
        }),
        Animated.timing(scale, {
          toValue: focus.scale,
          duration: 650,
          useNativeDriver,
        }),
      ]).start();
    } else {
      panOffset.current = { x: 0, y: 0 };
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 550,
          useNativeDriver,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 550,
          useNativeDriver,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 550,
          useNativeDriver,
        }),
      ]).start();
    }
  }, [selectedLocation, resetTrigger, translateX, translateY, scale, useNativeDriver]);

  // Pan Responder for fluid dragging
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4;
      },
      onPanResponderMove: (_, gesture) => {
        translateX.setValue(panOffset.current.x + gesture.dx);
        translateY.setValue(panOffset.current.y + gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        panOffset.current.x += gesture.dx;
        panOffset.current.y += gesture.dy;
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <TouchableWithoutFeedback onPress={onDeselect}>
        <Animated.View
          style={[
            styles.mapTransformContainer,
            {
              transform: [{ translateX }, { translateY }, { scale }],
            },
          ]}
        >
          {/* Sacred Cartography SVG Layer */}
          <Svg
            width={750}
            height={950}
            viewBox="0 0 750 950"
            style={styles.svgMap}
          >
            <Defs>
              {/* Sacred Temple Landmass Gradient */}
              <RadialGradient
                id="sanctumLand"
                cx="35%"
                cy="45%"
                rx="65%"
                ry="65%"
              >
                <Stop offset="0%" stopColor="#181512" />
                <Stop offset="60%" stopColor="#12100e" />
                <Stop offset="100%" stopColor="#0b0a09" />
              </RadialGradient>

              {/* Bay of Bengal Coastal Water Gradient */}
              <LinearGradient
                id="bayWater"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="50%"
              >
                <Stop offset="0%" stopColor="#0a121c" stopOpacity={0.9} />
                <Stop offset="40%" stopColor="#081018" stopOpacity={0.95} />
                <Stop offset="100%" stopColor="#050a10" stopOpacity={1} />
              </LinearGradient>

              {/* Simhachalam Sacred Hills Glow */}
              <RadialGradient
                id="simhaHills"
                cx="50%"
                cy="50%"
                rx="50%"
                ry="50%"
              >
                <Stop offset="0%" stopColor="#2e251a" stopOpacity={0.65} />
                <Stop offset="65%" stopColor="#1a1510" stopOpacity={0.3} />
                <Stop offset="100%" stopColor="#12100e" stopOpacity={0} />
              </RadialGradient>
            </Defs>

            {/* Base Land Canvas */}
            <Rect x={0} y={0} width={750} height={950} fill="url(#sanctumLand)" />

            {/* Bay of Bengal Ocean Boundary & Water Body */}
            <Path
              d="M 520,0 C 490,140 470,220 460,320 C 445,440 435,580 410,720 C 390,830 360,950 340,1050 L 750,1050 L 750,0 Z"
              fill="url(#bayWater)"
              stroke="#55442e"
              strokeWidth={1.5}
            />

            {/* Ocean Shoreline Tidal Ripples */}
            <Path
              d="M 560,200 Q 620,210 680,205"
              fill="none"
              stroke="#1c2c3e"
              strokeWidth={1.5}
              opacity={0.4}
            />
            <Path
              d="M 530,360 Q 600,370 660,355"
              fill="none"
              stroke="#1c2c3e"
              strokeWidth={1.5}
              opacity={0.4}
            />
            <Path
              d="M 500,560 Q 570,575 640,560"
              fill="none"
              stroke="#1c2c3e"
              strokeWidth={1.5}
              opacity={0.4}
            />

            {/* Bay of Bengal Inscription */}
            <SvgText
              x={650}
              y={440}
              fill="#344d66"
              fontSize={13}
              fontFamily="Cinzel_600SemiBold"
              letterSpacing={3.5}
              transform="rotate(78, 650, 440)"
            >
              BAY OF BENGAL • బంగాళాఖాతం
            </SvgText>

            {/* Simhachalam Sacred Hills Topography */}
            <Circle cx={285} cy={275} r={155} fill="url(#simhaHills)" />
            <Path
              d="M 180,275 C 210,210 330,190 390,265 C 370,335 230,355 180,275 Z"
              fill="none"
              stroke="#3a2f22"
              strokeDasharray="3 3"
              strokeWidth={1.5}
            />
            <Path
              d="M 210,275 C 230,235 310,220 350,265 C 340,310 250,320 210,275 Z"
              fill="none"
              stroke="#4c3c2b"
              strokeWidth={1}
            />
            <Path
              d="M 240,275 C 255,250 295,240 320,265 C 310,290 265,295 240,275 Z"
              fill="none"
              stroke="#715938"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
            <SvgText
              x={210}
              y={215}
              fill="#7a6345"
              fontSize={11}
              fontFamily="Cinzel_600SemiBold"
              letterSpacing={2}
            >
              SIMHACHALAM SACRED HILLS
            </SvgText>
            <SvgText
              x={238}
              y={232}
              fill="#634f36"
              fontSize={10}
              fontFamily="NotoSerifTelugu_400Regular"
            >
              సింహాచల క్షేత్ర శ్రేణి
            </SvgText>

            {/* Sacred Transit Arteries (Roads / Devotional Corridors) */}
            <Path
              d="M 285,275 L 340,430 L 400,600 L 430,730"
              fill="none"
              stroke="#312920"
              strokeWidth={3}
            />
            <Path
              d="M 340,430 L 490,470"
              fill="none"
              stroke="#282119"
              strokeWidth={2}
            />
            <Path
              d="M 340,430 L 485,260"
              fill="none"
              stroke="#282119"
              strokeWidth={2.2}
            />
            <Path
              d="M 285,275 L 170,380"
              fill="none"
              stroke="#282119"
              strokeWidth={2}
            />
            <Path
              d="M 400,600 L 320,720"
              fill="none"
              stroke="#261f18"
              strokeWidth={2}
            />

            {/* Geographical Area Markers */}
            <SvgText
              x={495}
              y={245}
              fill="#5e4f3e"
              fontSize={10}
              fontFamily="Cinzel_600SemiBold"
              letterSpacing={1}
            >
              RUSHIKONDA • ఋషికొండ
            </SvgText>
            <SvgText
              x={440}
              y={460}
              fill="#5e4f3e"
              fontSize={10}
              fontFamily="Cinzel_600SemiBold"
              letterSpacing={1}
            >
              MVP COLONY • ఎం.వి.పి
            </SvgText>
            <SvgText
              x={360}
              y={625}
              fill="#5e4f3e"
              fontSize={10}
              fontFamily="Cinzel_600SemiBold"
              letterSpacing={1}
            >
              JAGADAMBA • జగదాంబ
            </SvgText>
            <SvgText
              x={390}
              y={760}
              fill="#5e4f3e"
              fontSize={10}
              fontFamily="Cinzel_600SemiBold"
              letterSpacing={1}
            >
              OLD TOWN • పాత విశాఖ
            </SvgText>

            {/* Coordinate Grid Dots */}
            <G fill="#382e23">
              <Circle cx={200} cy={150} r={1.5} />
              <Circle cx={350} cy={150} r={1.5} />
              <Circle cx={500} cy={150} r={1.5} />
              <Circle cx={200} cy={450} r={1.5} />
              <Circle cx={350} cy={450} r={1.5} />
              <Circle cx={200} cy={750} r={1.5} />
              <Circle cx={350} cy={750} r={1.5} />
            </G>

            {/* Coastal Coordinate Indicator */}
            <G transform="translate(620, 840)">
              <SvgText
                x={0}
                y={0}
                fill="#554432"
                fontSize={10}
                fontFamily="Cinzel_600SemiBold"
                letterSpacing={1}
                textAnchor="middle"
              >
                N • ఉత్తరం
              </SvgText>
              <Path
                d="M 0,8 L 6,16 L 0,24 L -6,16 Z"
                fill="#443628"
                stroke={SANCTUM_COLORS.gold}
                strokeWidth={0.8}
              />
              <SvgText
                x={0}
                y={36}
                fill="#554432"
                fontSize={9}
                fontFamily="Cinzel_400Regular"
                letterSpacing={0.5}
                textAnchor="middle"
              >
                17.6868° N
              </SvgText>
            </G>
          </Svg>

          {/* Devotional Markers Layer */}
          {locations.map((loc) => (
            <DevotionalMarker
              key={loc.id}
              location={loc}
              isSelected={selectedLocation?.id === loc.id}
              isAnySelected={selectedLocation !== null}
              onSelect={onSelectLocation}
            />
          ))}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SANCTUM_COLORS.background,
    overflow: 'hidden',
    position: 'relative',
  },
  mapTransformContainer: {
    width: 750,
    height: 950,
    position: 'absolute',
    left: -170,
    top: -60,
  },
  svgMap: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
