// Powered by OnSpace.AI
export interface Message {
  id: string;
  sender: 'guru' | 'user';
  text: string;
  timestamp: Date;
  hasComprehensionCheck?: boolean;
  buttons?: string[];
  downloadable?: {
    type: 'pdf' | 'doc' | 'txt';
    filename: string;
  };
}

export interface Goal {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  description: string;
  status: 'active' | 'completed';
  progress: number; // 0-100
  steps: GoalStep[];
  createdAt: Date;
  completedAt?: Date;
}

export interface GoalStep {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
}

export interface SavedChat {
  id: string;
  toolId: string;
  toolName: string;
  messages: Message[];
  lastUpdated: Date;
  progress: number;
}

export interface GuruCustomization {
  bodyColor: string;
  accentColor: string;
  size: 'small' | 'medium' | 'large';
  animationSpeed: 'slow' | 'normal' | 'fast';
}

// Mock conversation data
export const mockConversations: SavedChat[] = [
  {
    id: '1',
    toolId: 'ebt',
    toolName: 'EBT Application',
    lastUpdated: new Date('2024-01-15'),
    progress: 45,
    messages: [
      {
        id: 'm1',
        sender: 'guru',
        text: "Let's get you set up with EBT! First, what state do you live in?",
        timestamp: new Date('2024-01-15T10:00:00'),
        hasComprehensionCheck: false,
      },
      {
        id: 'm2',
        sender: 'user',
        text: 'California',
        timestamp: new Date('2024-01-15T10:01:00'),
      },
      {
        id: 'm3',
        sender: 'guru',
        text: "Great! In California, we call it CalFresh. Let me find the form for us...",
        timestamp: new Date('2024-01-15T10:01:30'),
      },
    ],
  },
];

// Mock goals data
export const mockGoals: Goal[] = [
  {
    id: 'g1',
    title: 'Apply for EBT',
    category: 'Government Help',
    categoryColor: '#A78BFA',
    description: 'Get food assistance through the EBT program',
    status: 'active',
    progress: 60,
    createdAt: new Date('2024-01-10'),
    steps: [
      { id: 's1', title: 'Gather required documents', completed: true },
      { id: 's2', title: 'Fill out application', completed: true },
      { id: 's3', title: 'Schedule interview', completed: false },
      { id: 's4', title: 'Attend interview', completed: false },
      { id: 's5', title: 'Receive EBT card', completed: false },
    ],
  },
  {
    id: 'g2',
    title: 'Create Resume',
    category: 'Jobs & Career',
    categoryColor: '#10B981',
    description: 'Build a professional resume to apply for jobs',
    status: 'active',
    progress: 30,
    createdAt: new Date('2024-01-12'),
    steps: [
      { id: 's1', title: 'List work experience', completed: true },
      { id: 's2', title: 'Add education', completed: true },
      { id: 's3', title: 'Write skills section', completed: false },
      { id: 's4', title: 'Format resume', completed: false },
      { id: 's5', title: 'Save and download', completed: false },
    ],
  },
  {
    id: 'g3',
    title: 'Get Birth Certificate',
    category: 'Important Documents',
    categoryColor: '#3B82F6',
    description: 'Obtain official birth certificate copy',
    status: 'completed',
    progress: 100,
    createdAt: new Date('2024-01-05'),
    completedAt: new Date('2024-01-14'),
    steps: [
      { id: 's1', title: 'Find county office', completed: true },
      { id: 's2', title: 'Gather ID documents', completed: true },
      { id: 's3', title: 'Fill out request form', completed: true },
      { id: 's4', title: 'Pay fee', completed: true },
      { id: 's5', title: 'Receive certificate', completed: true },
    ],
  },
];

// Mock meal plan data
export interface MealPlan {
  id: string;
  budget: number;
  store: string;
  weekStart: Date;
  meals: DailyMeal[];
  shoppingList: ShoppingItem[];
}

export interface DailyMeal {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  estimatedCost: number;
}

export interface ShoppingItem {
  item: string;
  quantity: string;
  price: number;
  category: string;
}

export const mockMealPlan: MealPlan = {
  id: 'mp1',
  budget: 50,
  store: 'Walmart',
  weekStart: new Date('2024-01-15'),
  meals: [
    {
      day: 'Monday',
      breakfast: 'Scrambled eggs with toast',
      lunch: 'Peanut butter sandwich',
      dinner: 'Chicken pasta',
      estimatedCost: 6.5,
    },
    {
      day: 'Tuesday',
      breakfast: 'Oatmeal with banana',
      lunch: 'Leftover pasta',
      dinner: 'Bean burritos',
      estimatedCost: 5.8,
    },
    {
      day: 'Wednesday',
      breakfast: 'Toast with peanut butter',
      lunch: 'Cheese quesadilla',
      dinner: 'Rice and beans bowl',
      estimatedCost: 5.2,
    },
    {
      day: 'Thursday',
      breakfast: 'Scrambled eggs with toast',
      lunch: 'Leftover rice bowl',
      dinner: 'Spaghetti with sauce',
      estimatedCost: 6.0,
    },
    {
      day: 'Friday',
      breakfast: 'Oatmeal with banana',
      lunch: 'Peanut butter sandwich',
      dinner: 'Chicken tacos',
      estimatedCost: 7.2,
    },
    {
      day: 'Saturday',
      breakfast: 'Toast with jam',
      lunch: 'Bean burritos',
      dinner: 'Fried rice with veggies',
      estimatedCost: 6.8,
    },
    {
      day: 'Sunday',
      breakfast: 'Scrambled eggs',
      lunch: 'Cheese quesadilla',
      dinner: 'Pasta with veggies',
      estimatedCost: 6.5,
    },
  ],
  shoppingList: [
    { item: 'Eggs (dozen)', quantity: '1 carton', price: 3.99, category: 'Dairy' },
    { item: 'Bread loaf', quantity: '1 loaf', price: 1.99, category: 'Bakery' },
    { item: 'Peanut butter', quantity: '1 jar', price: 3.49, category: 'Pantry' },
    { item: 'Pasta', quantity: '2 boxes', price: 2.00, category: 'Pantry' },
    { item: 'Rice (2lb bag)', quantity: '1 bag', price: 2.99, category: 'Pantry' },
    { item: 'Black beans (cans)', quantity: '3 cans', price: 2.97, category: 'Pantry' },
    { item: 'Chicken breast (1lb)', quantity: '1 lb', price: 4.99, category: 'Meat' },
    { item: 'Tortillas', quantity: '1 pack', price: 2.49, category: 'Bakery' },
    { item: 'Cheese (8oz)', quantity: '1 block', price: 3.99, category: 'Dairy' },
    { item: 'Bananas', quantity: '1 bunch', price: 1.99, category: 'Produce' },
    { item: 'Onion', quantity: '1', price: 0.89, category: 'Produce' },
    { item: 'Carrots (1lb)', quantity: '1 bag', price: 1.29, category: 'Produce' },
    { item: 'Pasta sauce (jar)', quantity: '1 jar', price: 2.49, category: 'Pantry' },
    { item: 'Oatmeal (canister)', quantity: '1', price: 3.99, category: 'Pantry' },
    { item: 'Cooking oil', quantity: '1 bottle', price: 4.99, category: 'Pantry' },
  ],
};

// Default Guru customization
export const defaultGuruCustomization: GuruCustomization = {
  bodyColor: '#A78BFA',
  accentColor: '#14B8A6',
  size: 'medium',
  animationSpeed: 'normal',
};
