// Powered by OnSpace.AI
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { toolCategories } from '../../constants/config';
import ToolCategoryCard from '../../components/ui/ToolCategoryCard';
import GuruKai from '../../components/ui/GuruKai';

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = toolCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.tools.some(tool => tool.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <Text style={styles.title}>What Can I Help With?</Text>
          <Text style={styles.subtitle}>
            Over 100 ways to make your life easier
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for help..."
            placeholderTextColor={theme.textMuted}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={20} color={theme.textSecondary} />
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {filteredCategories.map(category => (
            <ToolCategoryCard
              key={category.id}
              name={category.name}
              icon={category.icon as any}
              color={category.color}
              toolCount={category.tools.length}
              onPress={() => {
                // Navigate to category detail - to be implemented
                console.log('Open category:', category.name);
              }}
            />
          ))}
        </View>

        {filteredCategories.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={64} color={theme.textMuted} />
            <Text style={styles.emptyText}>
              No results found for "{searchQuery}"
            </Text>
            <Text style={styles.emptySubtext}>
              Try a different search or browse all categories
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.xl,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: theme.border,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: theme.textPrimary,
  },
  categoriesContainer: {
    gap: 0,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyText: {
    ...typography.subtitle,
    color: theme.textSecondary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  emptySubtext: {
    ...typography.body,
    color: theme.textMuted,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
