// Powered by OnSpace.AI
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import GoalCard from '../../components/ui/GoalCard';
import GuruKai from '../../components/ui/GuruKai';

export default function GoalsScreen() {
  const insets = useSafeAreaInsets();
  const { goals } = useApp();
  const [filter, setFilter] = useState<'active' | 'completed' | 'all'>('active');

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');
  
  const displayGoals = filter === 'active' 
    ? activeGoals 
    : filter === 'completed' 
    ? completedGoals 
    : goals;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <GuruKai size="small" position="topRight" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: insets.bottom + spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Journey</Text>
          <Text style={styles.subtitle}>
            Keep track of everything we're working on together
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{activeGoals.length}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: theme.success }]}>
              {completedGoals.length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{goals.length}</Text>
            <Text style={styles.statLabel}>Total Goals</Text>
          </View>
        </View>

        {/* Filter */}
        <View style={styles.filterContainer}>
          <Pressable
            style={[styles.filterButton, filter === 'active' && styles.filterButtonActive]}
            onPress={() => setFilter('active')}
          >
            <Text style={[styles.filterText, filter === 'active' && styles.filterTextActive]}>
              Active
            </Text>
          </Pressable>
          <Pressable
            style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
              Completed
            </Text>
          </Pressable>
          <Pressable
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              All
            </Text>
          </Pressable>
        </View>

        {/* Goals List */}
        {displayGoals.length > 0 ? (
          displayGoals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onPress={() => console.log('Open goal:', goal.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Image
              source={require('../../assets/images/goals-empty.png')}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>
              {filter === 'active' 
                ? "No active goals yet" 
                : filter === 'completed'
                ? "No completed goals yet"
                : "No goals yet"
              }
            </Text>
            <Text style={styles.emptySubtitle}>
              Start chatting with me to create your first goal!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heroTitle,
    color: theme.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: theme.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.surface,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  filterButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.medium,
    backgroundColor: theme.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  filterButtonActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  filterText: {
    ...typography.button,
    color: theme.textSecondary,
    fontSize: 14,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyImage: {
    width: 200,
    height: 150,
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    ...typography.title,
    color: theme.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    color: theme.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
});
