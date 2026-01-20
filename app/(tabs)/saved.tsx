// Powered by OnSpace.AI
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { useApp } from '../../contexts/AppContext';
import GuruKai from '../../components/ui/GuruKai';

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const { savedChats } = useApp();

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
          <Text style={styles.title}>Saved Chats</Text>
          <Text style={styles.subtitle}>
            Pick up where we left off
          </Text>
        </View>

        {/* Saved chats list */}
        {savedChats.length > 0 ? (
          savedChats.map(chat => (
            <Pressable
              key={chat.id}
              style={styles.chatCard}
              onPress={() => console.log('Open chat:', chat.id)}
            >
              <View style={styles.chatHeader}>
                <MaterialIcons name="chat-bubble-outline" size={24} color={theme.primary} />
                <View style={styles.chatInfo}>
                  <Text style={styles.chatTitle}>{chat.toolName}</Text>
                  <Text style={styles.chatDate}>
                    Last updated {chat.lastUpdated.toLocaleDateString()}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={theme.textSecondary} />
              </View>

              {/* Progress bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${chat.progress}%` }]} 
                  />
                </View>
                <Text style={styles.progressText}>{chat.progress}% complete</Text>
              </View>

              {/* Message count */}
              <Text style={styles.messageCount}>
                {chat.messages.length} messages
              </Text>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="bookmark-outline" size={64} color={theme.textMuted} />
            <Text style={styles.emptyTitle}>No saved chats yet</Text>
            <Text style={styles.emptySubtitle}>
              When you're working on something with me, I'll save your progress here so you can come back anytime!
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
  chatCard: {
    backgroundColor: theme.surface,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: theme.border,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  chatInfo: {
    flex: 1,
  },
  chatTitle: {
    ...typography.subtitle,
    color: theme.textPrimary,
    marginBottom: 2,
  },
  chatDate: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  progressContainer: {
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  messageCount: {
    fontSize: 12,
    color: theme.textMuted,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyTitle: {
    ...typography.title,
    color: theme.textPrimary,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    color: theme.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 22,
  },
});
