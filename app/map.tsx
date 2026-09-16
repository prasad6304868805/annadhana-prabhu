import React, { useState } from 'react';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DevotionalLocation, LocationCategory } from '../types/location';
import { MOCK_DEVOTIONAL_LOCATIONS } from '../data/mockLocations';
import { DevotionalMapCanvas } from '../components/map/DevotionalMapCanvas';
import { MapHeader } from '../components/map/MapHeader';
import { MapCategoryFilters } from '../components/map/MapCategoryFilters';
import { SelectedLocationPreview } from '../components/map/SelectedLocationPreview';
import { BottomNavBar, NavTab } from '../components/map/BottomNavBar';
import { SevaDetailSheet } from '../components/seva/SevaDetailSheet';
import { SANCTUM_COLORS } from '../constants/theme';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  // State
  const [activeCategory, setActiveCategory] = useState<LocationCategory>('ALL');
  const [selectedLocation, setSelectedLocation] = useState<DevotionalLocation | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<NavTab>('MAP');
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  // Filtered locations
  const visibleLocations = MOCK_DEVOTIONAL_LOCATIONS.filter(
    (loc) => activeCategory === 'ALL' || loc.category === activeCategory
  );

  // Actions
  const handleSelectLocation = (location: DevotionalLocation) => {
    setSelectedLocation(location);
  };

  const handleDeselect = () => {
    if (!isDetailOpen) {
      setSelectedLocation(null);
    }
  };

  const handleRecenter = () => {
    setSelectedLocation(null);
    setResetTrigger((prev) => prev + 1);
  };

  const handleCategoryChange = (cat: LocationCategory) => {
    setActiveCategory(cat);
    // If current selected location is not in the new category, deselect it
    if (selectedLocation && cat !== 'ALL' && selectedLocation.category !== cat) {
      setSelectedLocation(null);
    }
  };

  const handleOpenDetails = (loc: DevotionalLocation) => {
    setSelectedLocation(loc);
    setIsDetailOpen(true);
  };

  const handleCloseDetails = () => {
    // Closes the full detail sheet while strictly preserving the selected marker and preview on the map
    setIsDetailOpen(false);
  };

  const handlePressSummaryPill = () => {
    // Select first active Seva (e.g. Simhachalam or Jagadamba)
    handleSelectLocation(MOCK_DEVOTIONAL_LOCATIONS[0]);
  };

  // Responsive desktop web framing (maintains pristine 9:16 mobile canvas)
  const isDesktopWeb = Platform.OS === 'web' && screenWidth > 500;
  const containerWidth = isDesktopWeb ? 430 : '100%';

  return (
    <View style={styles.outerViewport}>
      <View
        style={[
          styles.mainContainer,
          {
            width: containerWidth as any,
            paddingTop: Math.max(insets.top, 0),
          },
        ]}
      >
        {/* Top Sacred Header */}
        <MapHeader onRecenter={handleRecenter} />

        {/* Category Filters Bar */}
        <MapCategoryFilters
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />

        {/* Interactive Devotional Map Canvas */}
        <View style={styles.mapArea}>
          <DevotionalMapCanvas
            locations={visibleLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocation}
            onDeselect={handleDeselect}
            resetTrigger={resetTrigger}
          />
        </View>

        {/* Compact Selected Location Preview Panel */}
        <SelectedLocationPreview
          location={selectedLocation}
          onOpenDetails={handleOpenDetails}
          onClose={handleDeselect}
        />

        {/* Persistent Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          showSummaryPill={selectedLocation === null}
          onPressSummary={handlePressSummaryPill}
        />

        {/* Spatial Seva Detail Experience Sheet */}
        <SevaDetailSheet
          location={selectedLocation}
          isOpen={isDetailOpen}
          onClose={handleCloseDetails}
        />
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
    backgroundColor: '#0c0a09',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 28,
  },
  mapArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
});
