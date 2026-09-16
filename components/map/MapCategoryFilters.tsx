import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LocationCategory } from '../../types/location';
import { SANCTUM_COLORS } from '../../constants/theme';

interface CategoryFilterItem {
  id: LocationCategory;
  labelEn: string;
  labelTe: string;
}

const CATEGORIES: CategoryFilterItem[] = [
  { id: 'ALL', labelEn: 'ALL', labelTe: 'సర్వ' },
  { id: 'POOJA', labelEn: 'POOJA', labelTe: 'పూజ' },
  { id: 'BIKSHA', labelEn: 'BIKSHA', labelTe: 'భిక్ష' },
  { id: 'ALPAHARAM', labelEn: 'ALPAHARAM', labelTe: 'అల్పాహారం' },
  { id: 'SEVA', labelEn: 'SEVA', labelTe: 'సేవ' },
];

interface MapCategoryFiltersProps {
  activeCategory: LocationCategory;
  onSelectCategory: (cat: LocationCategory) => void;
}

export const MapCategoryFilters: React.FC<MapCategoryFiltersProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.8}
              onPress={() => onSelectCategory(cat.id)}
              style={[
                styles.pill,
                isActive ? styles.pillActive : styles.pillInactive,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  isActive ? styles.pillTextActive : styles.pillTextInactive,
                ]}
              >
                {cat.labelEn} • {cat.labelTe}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    zIndex: 25,
    backgroundColor: 'rgba(11, 10, 9, 0.75)',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: SANCTUM_COLORS.gold,
    borderColor: SANCTUM_COLORS.goldBright,
    shadowColor: SANCTUM_COLORS.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  pillInactive: {
    backgroundColor: 'rgba(21, 19, 17, 0.9)',
    borderColor: 'rgba(51, 44, 37, 0.8)',
  },
  pillText: {
    fontSize: 10.5,
    letterSpacing: 1,
  },
  pillTextActive: {
    fontFamily: 'Cinzel_700Bold',
    color: '#100e0c',
    fontWeight: '700',
  },
  pillTextInactive: {
    fontFamily: 'NotoSerifTelugu_400Regular',
    color: 'rgba(245, 242, 235, 0.8)',
  },
});
