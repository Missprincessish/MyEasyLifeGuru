// Powered by OnSpace.AI
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import { router } from 'expo-router';

interface GuruKaiProps {
  size?: 'small' | 'medium' | 'large';
  position?: 'topRight' | 'centered';
  isSpeaking?: boolean;
  onPress?: () => void;
}

const SIZES = {
  small: 60,
  medium: 100,
  large: 150,
};

export default function GuruKai({ 
  size = 'medium', 
  position = 'topRight',
  isSpeaking = false,
  onPress,
}: GuruKaiProps) {
  const { guruCustomization } = useApp();
  const floatAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1);
  const glowAnim = useSharedValue(0);

  const guruSize = SIZES[guruCustomization.size || size];

  useEffect(() => {
    // Floating animation
    const animDuration = guruCustomization.animationSpeed === 'fast' ? 2000 : 
                         guruCustomization.animationSpeed === 'slow' ? 4000 : 3000;
    
    floatAnim.value = withRepeat(
      withTiming(1, { duration: animDuration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // Glow pulse
    glowAnim.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [guruCustomization.animationSpeed]);

  useEffect(() => {
    if (isSpeaking) {
      scaleAnim.value = withSequence(
        withTiming(1.15, { duration: 300, easing: Easing.out(Easing.cubic) }),
        withTiming(1, { duration: 300, easing: Easing.in(Easing.cubic) })
      );
    }
  }, [isSpeaking]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatAnim.value, [0, 1], [0, -10]) },
      { scale: scaleAnim.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowAnim.value, [0, 1], [0.3, 0.7]),
  }));

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/guru-customize');
    }
  };

  const containerStyle = position === 'topRight' 
    ? styles.topRight 
    : styles.centered;

  return (
    <Pressable onPress={handlePress} style={containerStyle}>
      <Animated.View style={floatStyle}>
        <View style={[styles.container, { width: guruSize, height: guruSize }]}>
          {/* Glow effect */}
          <Animated.View 
            style={[
              styles.glow, 
              glowStyle,
              { 
                width: guruSize + 30, 
                height: guruSize + 30,
                backgroundColor: guruCustomization.bodyColor || theme.primary,
              }
            ]} 
          />
          
          {/* Guru Kai image */}
          <Image
            source={require('../../assets/images/guru-kai.png')}
            style={[styles.image, { width: guruSize, height: guruSize }]}
            resizeMode="contain"
          />

          {/* Speaking indicator */}
          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <MaterialIcons name="chat-bubble" size={16} color={theme.accent} />
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topRight: {
    position: 'absolute',
    top: 60,
    right: 16,
    zIndex: 100,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.3,
  },
  image: {
    zIndex: 2,
  },
  speakingIndicator: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: theme.background,
    borderRadius: 20,
    padding: 4,
    borderWidth: 2,
    borderColor: theme.accent,
  },
});
