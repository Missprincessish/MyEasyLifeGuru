// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';

interface ToolCategoryCardProps {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  toolCount: number;
  onPress: () => void;
}

export default function ToolCategoryCard({ 
  name, 
  icon, 
  color, 
  toolCount, 
  onPress 
}: ToolCategoryCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <MaterialIcons name={icon} size={32} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.count}>{toolCount} tools</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={theme.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: theme.border,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.subtitle,
    color: theme.textPrimary,
    marginBottom: 2,
  },
  count: {
    fontSize: 13,
    color: theme.textSecondary,
  },
});
