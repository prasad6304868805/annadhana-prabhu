import React from 'react';
import { useRouter } from 'expo-router';
import { AnimatedSplashScreen } from '../components/splash/AnimatedSplashScreen';

export default function IndexScreen() {
  const router = useRouter();

  const handleAnimationComplete = () => {
    router.replace('/map-placeholder');
  };

  return (
    <AnimatedSplashScreen
      onAnimationComplete={handleAnimationComplete}
    />
  );
}
