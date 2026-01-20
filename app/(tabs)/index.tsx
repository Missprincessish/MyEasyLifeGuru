// Powered by OnSpace.AI
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, typography, spacing, borderRadius } from '../../constants/theme';
import { config } from '../../constants/config';
import { useApp } from '../../contexts/AppContext';
import GuruKai from '../../components/ui/GuruKai';
import ChatBubble from '../../components/ui/ChatBubble';
import PromptSuggestion from '../../components/ui/PromptSuggestion';
import { Message } from '../../services/mockData';
import * as Haptics from 'expo-haptics';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { isFirstLaunch, setIsFirstLaunch } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Show welcome message on first launch
    if (isFirstLaunch) {
      setTimeout(() => {
        addGuruMessage(
          "Hey! I'm Guru Kai, your buddy for leveling up in life. We're a team now!\n\nI can help you with over 100 different things - from applying for government help, to building meal plans, to getting your important documents.\n\nPick one below or type anything you need help with!"
        );
        setIsFirstLaunch(false);
      }, 1000);
    }
  }, []);

  const addGuruMessage = (text: string, options?: Partial<Message>) => {
    setIsSpeaking(true);
    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: 'guru',
      text,
      timestamp: new Date(),
      ...options,
    };
    setMessages(prev => [...prev, newMessage]);
    
    setTimeout(() => {
      setIsSpeaking(false);
      scrollToBottom();
    }, text.length * 20); // Simulate typing
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    setShowSuggestions(false);
    scrollToBottom();
    
    // Simulate Guru response
    setTimeout(() => {
      handleUserInput(text.toLowerCase());
    }, 800);
  };

  const handleUserInput = (input: string) => {
    Haptics.selectionAsync();
    
    // Simple routing logic
    if (input.includes('menu') || input.includes('list') || input.includes('what can you')) {
      addGuruMessage(
        "Great! Let's check out all the ways I can help. Tap 'Menu' at the bottom to see everything organized by category.\n\nOr tell me what you're trying to do and we can jump right in!",
        { hasComprehensionCheck: false }
      );
    } else if (input.includes('ebt') || input.includes('food stamp')) {
      addGuruMessage(
        "Let's get you signed up for EBT (food benefits)! I'll walk you through it step by step.\n\nFirst, what state do you live in?",
        { hasComprehensionCheck: false }
      );
    } else if (input.includes('meal') || input.includes('food') || input.includes('grocery')) {
      addGuruMessage(
        "I can help you build a super affordable meal plan! Here's what I need:\n\n1. What's your weekly budget?\n2. What city do you shop in?\n3. Any foods you don't like or can't eat?",
        { hasComprehensionCheck: false }
      );
    } else if (input.includes('resume')) {
      addGuruMessage(
        "Let's build your resume together! We'll make it look professional and highlight all your strengths.\n\nFirst question: Have you had any jobs before? (Yes/No)",
        { 
          hasComprehensionCheck: true,
          buttons: ['Yes', 'No', 'Not sure'],
        }
      );
    } else if (input.includes('tax')) {
      addGuruMessage(
        "Taxes can feel tricky but we've got this! I'll show you how to file for FREE.\n\nQuick question: Have you filed taxes before?",
        { 
          hasComprehensionCheck: true,
          buttons: ['Yes', 'No'],
        }
      );
    } else {
      addGuruMessage(
        "I want to make sure I understand what you need. Can you tell me more? Or type 'menu' to see everything I can help with.",
        { hasComprehensionCheck: false }
      );
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      addUserMessage(inputText.trim());
      setInputText('');
    }
  };

  const handlePromptSelect = (prompt: string) => {
    Haptics.selectionAsync();
    addUserMessage(prompt);
  };

  const handleButtonPress = (button: string) => {
    Haptics.selectionAsync();
    addUserMessage(button);
  };

  const handleDownload = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      'Download Started',
      'Your document will be saved to your device.',
      [{ text: 'OK' }]
    );
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Guru Kai - Always visible */}
      <GuruKai size="small" position="topRight" isSpeaking={isSpeaking} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Guru Kai</Text>
        <Text style={styles.headerSubtitle}>Your Life Guide</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            paddingBottom: insets.bottom + spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map(message => (
            <ChatBubble
              key={message.id}
              message={message}
              onButtonPress={handleButtonPress}
              onDownload={handleDownload}
            />
          ))}

          {/* Example prompts */}
          {showSuggestions && messages.length <= 1 && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Try asking me about:</Text>
              {config.examplePrompts.slice(0, 4).map((prompt, index) => (
                <PromptSuggestion
                  key={index}
                  text={prompt}
                  icon={index === 0 ? 'restaurant' : index === 1 ? 'shopping-cart' : index === 2 ? 'receipt' : 'work'}
                  onPress={() => handlePromptSelect(prompt)}
                />
              ))}
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor={theme.textMuted}
            multiline
            maxLength={config.chat.maxMessageLength}
          />
          <Pressable 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <MaterialIcons 
              name="send" 
              size={24} 
              color={inputText.trim() ? theme.textPrimary : theme.textMuted} 
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {/* Small ad space */}
      {config.ui.showAds && (
        <View style={styles.adContainer}>
          <Text style={styles.adText}>Ad Space</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    ...typography.heroTitle,
    color: theme.textPrimary,
  },
  headerSubtitle: {
    ...typography.body,
    color: theme.textSecondary,
  },
  messagesContainer: {
    flex: 1,
  },
  suggestionsContainer: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  suggestionsTitle: {
    ...typography.subtitle,
    color: theme.textSecondary,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: theme.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    gap: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: theme.surface,
    borderRadius: borderRadius.large,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.body,
    color: theme.textPrimary,
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: theme.surface,
  },
  adContainer: {
    height: 50,
    backgroundColor: theme.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  adText: {
    fontSize: 12,
    color: theme.textMuted,
  },
});
