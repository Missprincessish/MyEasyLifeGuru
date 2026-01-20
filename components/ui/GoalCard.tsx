// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { Goal } from '../../services/mockData';

interface GoalCardProps {
  goal: Goal;
  onPress: () => void;
}

export default function GoalCard({ goal, onPress }: GoalCardProps) {
  const completedSteps = goal.steps.filter(s => s.completed).length;
  const totalSteps = goal.steps.length;
  const isCompleted = goal.status === 'completed';

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.categoryBadge, { backgroundColor: `${goal.categoryColor}20` }]}>
          <Text style={[styles.categoryText, { color: goal.categoryColor }]}>
            {goal.category}
          </Text>
        </View>
        {isCompleted && (
          <MaterialIcons name="check-circle" size={24} color={theme.success} />
        )}
      </View>

      {/* Title & Description */}
      <Text style={styles.title}>{goal.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{goal.description}</Text>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${goal.progress}%`,
                backgroundColor: isCompleted ? theme.success : goal.categoryColor,
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {completedSteps}/{totalSteps} steps
        </Text>
      </View>

      {/* Date */}
      <Text style={styles.date}>
        {isCompleted 
          ? `Completed ${goal.completedAt?.toLocaleDateString()}` 
          : `Started ${goal.createdAt.toLocaleDateString()}`
        }
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: theme.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    ...typography.goalTitle,
    color: theme.textPrimary,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.goalDescription,
    color: theme.textSecondary,
    marginBottom: spacing.md,
  },
  progressSection: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  date: {
    fontSize: 12,
    color: theme.textMuted,
  },
});
