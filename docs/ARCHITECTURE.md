# Annadhana Prabhuva — Architecture Document

## Overview
Annadhana Prabhuva is a premium mobile-first devotional seva and discovery application tailored for Visakhapatnam and Andhra Pradesh.

## Step 1 Architecture Summary
1. **Clean Project Boundary**: Built entirely as a modern React Native + Expo + TypeScript app. The legacy Flask/Jinja application has been archived into `_legacy_flask_reference/` and is strictly decoupled from the codebase.
2. **Launch Architecture**:
   - **Native Layer**: `expo-splash-screen` provides an instant `#070605` background and visual anchor while the JavaScript engine boots.
   - **Custom Choreography Layer**: Once fonts and assets resolve, `AnimatedSplashScreen` orchestrates multi-layer sacred animations (depth settle, flame warmth aura pulse, rising incense embers, crest descent, and typography reveals).
   - **Routing Layer**: Expo Router handles routing between the animated splash screen and future modules.
3. **Multiplatform Responsiveness**:
   - Web: Renders a centered 9:16 mobile canvas (`max-w: 430px`, `100dvh`) surrounded seamlessly by the deep `#070605` background.
   - Native: Adapts to system insets (`useSafeAreaInsets`) across iOS and Android flagships.
