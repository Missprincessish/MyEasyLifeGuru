// Powered by OnSpace.AI
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';

interface PromptSuggestionProps {
  text: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}

export default function PromptSuggestion({ text, icon, onPress }: PromptSuggestionProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {icon && <MaterialIcons name={icon} size={20} color={theme.primary} />}
      <Text style={styles.text} numberOfLines={2}>{text}</Text>
      <MaterialIcons name="chevron-right" size={20} color={theme.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: theme.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.border,
    ...theme.shadows?.card,
  },
  text: {
    flex: 1,
    ...typography.promptSuggestion,
    color: theme.textPrimary,
  },
});
