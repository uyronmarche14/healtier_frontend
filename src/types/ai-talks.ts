export interface AITalkMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'text' | 'file' | 'image' | 'error';
  tab?: AITalkTab;
  metadata?: {
    fileName?: string;
    fileSize?: number;
    fileType?: string;
  };
}

export interface AITalkSession {
  id: string;
  title: string;
  category: 'general' | 'fitness' | 'mental' | 'nutrition';
  messages: AITalkMessage[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived' | 'deleted';
  patientId: string;
}

export interface AIInstruction {
  id: string;
  name: string;
  description: string;
  content: string;
  category: 'general' | 'fitness' | 'mental' | 'nutrition';
  isActive: boolean;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AITalkTab = 'general' | 'fitness' | 'mental' | 'nutrition';

export interface AITalkTabConfig {
  id: string;
  label: string;
  category: 'general' | 'fitness' | 'mental' | 'nutrition';
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  isNew?: boolean;
  order: number;
  description: string;
}

export interface AITalkConfig {
  maxMessagesPerSession: number;
  enableFileUpload: boolean;
  enableVoiceInput: boolean;
  enableSuggestions: boolean;
  responseTimeout: number;
  systemInstructions: AIInstruction[];
}

export interface AITalkState {
  currentSession: AITalkSession | null;
  messages: AITalkMessage[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  activeTab: string;
  config: AITalkConfig;
  instructions: AIInstruction[];
  status: AITalkStateStatus;
}

export type AITalkStateStatus = 'idle' | 'loading' | 'error' | 'active';

export interface AITalkContextType extends AITalkState {
  sendMessage: (content: string, type?: AITalkMessage['type']) => Promise<void>;
  setActiveTab: (tabId: string) => void;
  updateInstructions: (instructions: AIInstruction[]) => void;
  createNewSession: (category: AITalkSession['category']) => void;
  clearMessages: () => void;
  exportConversation: () => void;
}