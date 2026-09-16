import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { SANCTUM_COLORS } from '../../constants/theme';

export type NavTab = 'MAP' | 'SEVA' | 'KNOWLEDGE' | 'PROFILE';

interface BottomNavBarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  showSummaryPill?: boolean;
  onPressSummary?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  showSummaryPill = false,
  onPressSummary,
}) => {
  return (
    <View style={styles.container}>
      {/* Optional Active Sevas Summary Pill */}
      {showSummaryPill && (
        <TouchableOpacity
          style={styles.summaryCard}
          activeOpacity={0.85}
          onPress={onPressSummary}
        >
          <View style={styles.diyaIconCircle}>
            <Text style={styles.diyaEmoji}>🪔</Text>
          </View>
          <View style={styles.summaryTextColumn}>
            <View style={styles.summaryLiveRow}>
              <View style={styles.greenDot} />
              <Text style={styles.summaryTitle}>5 SACRED SEVAS ACTIVE TODAY</Text>
            </View>
            <Text style={styles.summarySubtitle}>
              విశాఖపట్నం క్షేత్రములు • నిత్య అన్నదానములు చూడండి
            </Text>
          </View>
          <View style={styles.chevronCircle}>
            <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={SANCTUM_COLORS.gold} strokeWidth={2.5}>
              <Path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
        </TouchableOpacity>
      )}

      {/* Main Tab Dock */}
      <View style={styles.dockBar}>
        {/* Tab 1: Map (Active) */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onSelectTab('MAP')}
          activeOpacity={0.7}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'MAP' ? SANCTUM_COLORS.gold : 'rgba(245, 242, 235, 0.4)'} strokeWidth={1.8}>
            <Circle cx={12} cy={12} r={9} />
            <Path d="M12 3v18M3 12h18" />
            <Circle cx={12} cy={12} r={3} fill={activeTab === 'MAP' ? SANCTUM_COLORS.gold : 'none'} />
          </Svg>
          <Text style={[styles.tabLabel, activeTab === 'MAP' && styles.tabLabelActive]}>
            MAP • క్షేత్రం
          </Text>
        </TouchableOpacity>

        {/* Tab 2: Seva */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onSelectTab('SEVA')}
          activeOpacity={0.7}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'SEVA' ? SANCTUM_COLORS.gold : 'rgba(245, 242, 235, 0.4)'} strokeWidth={1.8}>
            <Path d="M12 2a4 4 0 0 1 4 4c0 1.8-.8 3.5-2 4.6v2.4h3c1.7 0 3 1.3 3 3v6h-2v-5a1 1 0 0 0-1-1h-4v6h-2v-6H7a1 1 0 0 0-1 1v5H4v-6c0-1.7 1.3-3 3-3h3v-2.4c-1.2-1.1-2-2.8-2-4.6a4 4 0 0 1 4-4z" />
          </Svg>
          <Text style={[styles.tabLabel, activeTab === 'SEVA' && styles.tabLabelActive]}>
            SEVA • సేవ
          </Text>
        </TouchableOpacity>

        {/* Tab 3: Knowledge */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onSelectTab('KNOWLEDGE')}
          activeOpacity={0.7}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'KNOWLEDGE' ? SANCTUM_COLORS.gold : 'rgba(245, 242, 235, 0.4)'} strokeWidth={1.8}>
            <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </Svg>
          <Text style={[styles.tabLabel, activeTab === 'KNOWLEDGE' && styles.tabLabelActive]}>
            NIYAMALU • జ్ఞానం
          </Text>
        </TouchableOpacity>

        {/* Tab 4: Profile */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onSelectTab('PROFILE')}
          activeOpacity={0.7}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={activeTab === 'PROFILE' ? SANCTUM_COLORS.gold : 'rgba(245, 242, 235, 0.4)'} strokeWidth={1.8}>
            <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <Circle cx={12} cy={7} r={4} />
          </Svg>
          <Text style={[styles.tabLabel, activeTab === 'PROFILE' && styles.tabLabelActive]}>
            PROFILE • సంకల్పం
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 35,
    backgroundColor: '#0c0a09',
    borderTopWidth: 1,
    borderTopColor: 'rgba(51, 44, 37, 0.5)',
  },
  summaryCard: {
    marginHorizontal: 12,
    marginBottom: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(22, 19, 16, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(197, 160, 89, 0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  diyaIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(197, 160, 89, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(197, 160, 89, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diyaEmoji: {
    fontSize: 16,
  },
  summaryTextColumn: {
    flex: 1,
  },
  summaryLiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greenDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: SANCTUM_COLORS.emerald,
  },
  summaryTitle: {
    fontSize: 10.5,
    fontFamily: 'Cinzel_700Bold',
    color: SANCTUM_COLORS.goldBright,
    letterSpacing: 1,
  },
  summarySubtitle: {
    fontSize: 9.5,
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: 'rgba(245, 242, 235, 0.75)',
    marginTop: 1,
  },
  chevronCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(197, 160, 89, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dockBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingBottom: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingHorizontal: 12,
  },
  tabLabel: {
    fontSize: 8.5,
    fontFamily: 'Cinzel_600SemiBold',
    color: 'rgba(245, 242, 235, 0.4)',
    letterSpacing: 0.8,
  },
  tabLabelActive: {
    color: SANCTUM_COLORS.gold,
    fontFamily: 'Cinzel_700Bold',
  },
});
