import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { SANCTUM_COLORS } from '../../constants/theme';

interface MapHeaderProps {
  onRecenter: () => void;
}

export const MapHeader: React.FC<MapHeaderProps> = ({ onRecenter }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleColumn}>
        <View style={styles.titleRow}>
          <Text style={styles.omSymbol}>ॐ</Text>
          <Text style={styles.titleText}>ANNADHANA PRABHUVA</Text>
        </View>

        <View style={styles.subtitleRow}>
          <Text style={styles.subtitleText}>విశాఖపట్నం క్షేత్ర నిత్య అన్నదానములు</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
      </View>

      {/* Recenter / Compass Action */}
      <TouchableOpacity
        style={styles.recenterButton}
        activeOpacity={0.75}
        onPress={onRecenter}
        accessibilityLabel="Recenter Map"
      >
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={SANCTUM_COLORS.gold} strokeWidth={1.8}>
          <Circle cx={12} cy={12} r={8} strokeDasharray="3 2" />
          <Circle cx={12} cy={12} r={3} fill={SANCTUM_COLORS.gold} />
          <Path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    zIndex: 30,
    backgroundColor: 'rgba(11, 10, 9, 0.85)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 44, 37, 0.4)',
  },
  titleColumn: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  omSymbol: {
    fontSize: 14,
    color: SANCTUM_COLORS.gold,
    fontWeight: '700',
  },
  titleText: {
    fontSize: 15,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.ivory,
    letterSpacing: 2,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  subtitleText: {
    fontSize: 10.5,
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: 'rgba(197, 160, 89, 0.9)',
    letterSpacing: 0.5,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(197, 160, 89, 0.15)',
    borderColor: 'rgba(197, 160, 89, 0.4)',
    borderWidth: 0.8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
  },
  liveDot: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.5,
    backgroundColor: SANCTUM_COLORS.emerald,
  },
  liveText: {
    fontSize: 8.5,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.goldBright,
    letterSpacing: 0.8,
  },
  recenterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(21, 19, 17, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(197, 160, 89, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
