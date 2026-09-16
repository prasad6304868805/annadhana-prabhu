export interface SplashProps {
  onAnimationComplete?: () => void;
}

export interface EmberParticleProps {
  delay: number;
  initialX: number; // percentage
  initialY: number; // percentage
  size: number;
  color: string;
}
