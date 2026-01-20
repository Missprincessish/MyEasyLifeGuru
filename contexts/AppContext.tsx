// Powered by OnSpace.AI
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal, SavedChat, GuruCustomization, defaultGuruCustomization, mockGoals, mockConversations } from '../services/mockData';

interface AppContextType {
  // User preferences
  hasAccount: boolean;
  userLocation: { city?: string; county?: string; state?: string };
  setUserLocation: (location: { city?: string; county?: string; state?: string }) => void;
  
  // Goals
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  updateGoalProgress: (goalId: string, stepId: string, completed: boolean) => void;
  completeGoal: (goalId: string) => void;
  deleteGoal: (goalId: string) => void;
  
  // Saved chats
  savedChats: SavedChat[];
  saveChat: (chat: SavedChat) => void;
  deleteChat: (chatId: string) => void;
  
  // Guru customization
  guruCustomization: GuruCustomization;
  updateGuruCustomization: (customization: Partial<GuruCustomization>) => void;
  
  // First time user
  isFirstLaunch: boolean;
  setIsFirstLaunch: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [hasAccount, setHasAccount] = useState(false);
  const [userLocation, setUserLocationState] = useState<{ city?: string; county?: string; state?: string }>({});
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [savedChats, setSavedChats] = useState<SavedChat[]>(mockConversations);
  const [guruCustomization, setGuruCustomization] = useState<GuruCustomization>(defaultGuruCustomization);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save goals whenever they change
  useEffect(() => {
    AsyncStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  // Save chats whenever they change
  useEffect(() => {
    AsyncStorage.setItem('savedChats', JSON.stringify(savedChats));
  }, [savedChats]);

  // Save guru customization
  useEffect(() => {
    AsyncStorage.setItem('guruCustomization', JSON.stringify(guruCustomization));
  }, [guruCustomization]);

  const loadData = async () => {
    try {
      const [goalsData, chatsData, guruData, firstLaunch, location] = await Promise.all([
        AsyncStorage.getItem('goals'),
        AsyncStorage.getItem('savedChats'),
        AsyncStorage.getItem('guruCustomization'),
        AsyncStorage.getItem('isFirstLaunch'),
        AsyncStorage.getItem('userLocation'),
      ]);

      if (goalsData) setGoals(JSON.parse(goalsData));
      if (chatsData) setSavedChats(JSON.parse(chatsData));
      if (guruData) setGuruCustomization(JSON.parse(guruData));
      if (firstLaunch !== null) setIsFirstLaunch(JSON.parse(firstLaunch));
      if (location) setUserLocationState(JSON.parse(location));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const setUserLocation = (location: { city?: string; county?: string; state?: string }) => {
    setUserLocationState(location);
    AsyncStorage.setItem('userLocation', JSON.stringify(location));
  };

  const addGoal = (goalData: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: `g${Date.now()}`,
      createdAt: new Date(),
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const updateGoalProgress = (goalId: string, stepId: string, completed: boolean) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const updatedSteps = goal.steps.map(step =>
          step.id === stepId ? { ...step, completed } : step
        );
        const completedSteps = updatedSteps.filter(s => s.completed).length;
        const progress = Math.round((completedSteps / updatedSteps.length) * 100);
        
        return {
          ...goal,
          steps: updatedSteps,
          progress,
        };
      }
      return goal;
    }));
  };

  const completeGoal = (goalId: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          status: 'completed' as const,
          progress: 100,
          completedAt: new Date(),
          steps: goal.steps.map(step => ({ ...step, completed: true })),
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const saveChat = (chat: SavedChat) => {
    setSavedChats(prev => {
      const existing = prev.findIndex(c => c.id === chat.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = chat;
        return updated;
      }
      return [chat, ...prev];
    });
  };

  const deleteChat = (chatId: string) => {
    setSavedChats(prev => prev.filter(chat => chat.id !== chatId));
  };

  const updateGuruCustomization = (customization: Partial<GuruCustomization>) => {
    setGuruCustomization(prev => ({ ...prev, ...customization }));
  };

  const value: AppContextType = {
    hasAccount,
    userLocation,
    setUserLocation,
    goals,
    addGoal,
    updateGoalProgress,
    completeGoal,
    deleteGoal,
    savedChats,
    saveChat,
    deleteChat,
    guruCustomization,
    updateGuruCustomization,
    isFirstLaunch,
    setIsFirstLaunch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
