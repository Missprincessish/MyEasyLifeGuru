// Powered by OnSpace.AI
export const theme = {
  // Primary neon colors
  primary: '#A78BFA',           // Vibrant purple
  primaryLight: '#C4B5FD',      // Light purple
  primaryDark: '#7C3AED',       // Deep purple
  
  secondary: '#14B8A6',         // Neon teal
  secondaryLight: '#5EEAD4',    // Light teal
  secondaryDark: '#0F766E',     // Deep teal
  
  accent: '#10B981',            // Neon green
  accentLight: '#6EE7B7',       // Light green
  
  neonBlue: '#3B82F6',          // Electric blue
  neonPink: '#EC4899',          // Neon pink
  
  // Metallic
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  
  // Backgrounds
  background: '#0A0A0F',        // Very dark blue-black
  backgroundSecondary: '#1A1A2E', // Dark purple-black
  surface: '#16213E',           // Card background
  surfaceLight: '#1F2937',      // Lighter surface
  
  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  
  // Status
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  
  // UI Elements
  border: '#374151',
  borderLight: '#4B5563',
  
  // Gradients (as arrays for LinearGradient)
  gradientPrimary: ['#A78BFA', '#7C3AED'],
  gradientSecondary: ['#14B8A6', '#0F766E'],
  gradientAccent: ['#10B981', '#059669'],
  gradientGuru: ['#A78BFA', '#14B8A6'], // Purple to teal
  
  // Glow effects
  glowPurple: 'rgba(167, 139, 250, 0.3)',
  glowTeal: 'rgba(20, 184, 166, 0.3)',
  glowGreen: 'rgba(16, 185, 129, 0.3)',
};

export const typography = {
  // Buddy-like, encouraging tone (Playful side)
  heroTitle: { fontSize: 28, fontWeight: '700' as const },
  title: { fontSize: 20, fontWeight: '600' as const },
  subtitle: { fontSize: 16, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodyLarge: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  button: { fontSize: 16, fontWeight: '600' as const },
  
  // Chat specific
  chatBubble: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  promptSuggestion: { fontSize: 14, fontWeight: '500' as const },
  stepNumber: { fontSize: 32, fontWeight: '700' as const },
  
  // Goals
  goalTitle: { fontSize: 16, fontWeight: '600' as const },
  goalDescription: { fontSize: 14, fontWeight: '400' as const },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 24,
  full: 9999,
};

export const shadows = {
  card: {
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  glow: {
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 5,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
};
