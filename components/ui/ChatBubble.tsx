// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { Message } from '../../services/mockData';

interface ChatBubbleProps {
  message: Message;
  onButtonPress?: (button: string) => void;
  onDownload?: () => void;
}

export default function ChatBubble({ message, onButtonPress, onDownload }: ChatBubbleProps) {
  const isGuru = message.sender === 'guru';

  return (
    <View style={[styles.container, isGuru ? styles.guruContainer : styles.userContainer]}>
      <View style={[styles.bubble, isGuru ? styles.guruBubble : styles.userBubble]}>
        <Text style={[styles.text, isGuru ? styles.guruText : styles.userText]}>
          {message.text}
        </Text>

        {/* Downloadable file indicator */}
        {message.downloadable && (
          <Pressable 
            style={styles.downloadButton}
            onPress={onDownload}
          >
            <MaterialIcons name="download" size={20} color={theme.accent} />
            <Text style={styles.downloadText}>Download {message.downloadable.filename}</Text>
          </Pressable>
        )}

        {/* Comprehension check buttons */}
        {message.hasComprehensionCheck && message.buttons && (
          <View style={styles.buttonsContainer}>
            {message.buttons.map((button, index) => (
              <Pressable
                key={index}
                style={styles.checkButton}
                onPress={() => onButtonPress?.(button)}
              >
                <Text style={styles.checkButtonText}>{button}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
    maxWidth: '85%',
  },
  guruContainer: {
    alignSelf: 'flex-start',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  bubble: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.large,
  },
  guruBubble: {
    backgroundColor: theme.surface,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: theme.primary,
    borderBottomRightRadius: 4,
  },
  text: {
    ...typography.chatBubble,
  },
  guruText: {
    color: theme.textPrimary,
  },
  userText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 11,
    color: theme.textMuted,
    marginTop: 4,
    marginHorizontal: spacing.sm,
  },
  buttonsContainer: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  checkButton: {
    backgroundColor: theme.backgroundSecondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  checkButtonText: {
    color: theme.accent,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: borderRadius.small,
  },
  downloadText: {
    color: theme.accent,
    fontSize: 13,
    fontWeight: '600',
  },
});
