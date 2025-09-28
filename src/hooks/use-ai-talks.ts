import { useState, useEffect, useCallback } from 'react'
import type { AITalkMessage, AITalkTab, AIInstruction, AITalkState, AITalkStateStatus } from '@/types/ai-talks'

interface UseAITalksOptions {
  initialMessages?: AITalkMessage[]
  defaultTab?: AITalkTab
  onMessageSend?: (message: AITalkMessage) => void
  onMessageReceive?: (message: AITalkMessage) => void
}

interface UseAITalksReturn {
  messages: AITalkMessage[]
  activeTab: AITalkTab
  isLoading: boolean
  isTyping: boolean
  error: string | null
  status: AITalkState['status']
  inputValue: string
  setInputValue: (value: string) => void
  setActiveTab: (tab: AITalkTab) => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
  getMessagesByTab: (tab: AITalkTab) => AITalkMessage[]
}

const TAB_RESPONSES = {
  general: 'I understand your concern. Based on your medical records, I can provide you with relevant information and insights. Please note that I\'m an AI assistant and my responses should not replace professional medical advice.',
  fitness: 'I\'d be happy to help you with fitness and exercise recommendations! Based on your health data, I can suggest personalized workout routines and track your progress towards your fitness goals.',
  mental: 'I\'m here to support your mental wellness journey. I can provide coping strategies, mindfulness techniques, and help you track your mood patterns while ensuring you get appropriate professional support when needed.',
  nutrition: 'I can help you with nutrition advice and meal planning based on your health conditions and dietary requirements. Let me analyze your current nutritional status and provide personalized recommendations.'
}

export function useAITalks(options: UseAITalksOptions = {}): UseAITalksReturn {
  const {
    initialMessages = [],
    defaultTab = 'general',
    onMessageSend,
    onMessageReceive
  } = options

  const [messages, setMessages] = useState<AITalkMessage[]>(initialMessages)
  const [activeTab, setActiveTab] = useState<AITalkTab>(defaultTab)
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<AITalkStateStatus>('idle')
  const [inputValue, setInputValue] = useState('')

  // Initialize with default message if no messages
  useEffect(() => {
    if (messages.length === 0) {
      const defaultMessage: AITalkMessage = {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your AI health assistant. I can help you understand your medical records, provide health summaries, and answer questions about your health data. How can I help you today?',
        timestamp: new Date(),
        tab: 'general'
      }
      setMessages([defaultMessage])
    }
  }, [])

  const getMessagesByTab = useCallback((tab: AITalkTab) => {
    return messages.filter(message => message.tab === tab)
  }, [messages])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    setIsLoading(true)
    setStatus('idle')

    // Create user message
    const userMessage: AITalkMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      tab: activeTab
    }

    // Add user message
    setMessages(prev => [...prev, userMessage])
    onMessageSend?.(userMessage)

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000))

      const aiMessage: AITalkMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: TAB_RESPONSES[activeTab] || TAB_RESPONSES.general,
        timestamp: new Date(),
        tab: activeTab
      }

      setMessages(prev => [...prev, aiMessage])
      onMessageReceive?.(aiMessage)
      setStatus('idle')
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }, [activeTab, isLoading, onMessageSend, onMessageReceive])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    activeTab,
    isLoading,
    isTyping,
    error,
    status,
    inputValue,
    setInputValue,
    setActiveTab,
    sendMessage,
    clearMessages,
    getMessagesByTab
  }
}

// Hook for managing AI instructions
interface UseAIInstructionsOptions {
  defaultInstructions?: AIInstruction[]
}

interface UseAIInstructionsReturn {
  instructions: AIInstruction[]
  activeInstructions: AIInstruction[]
  addInstruction: (instruction: Omit<AIInstruction, 'id' | 'createdAt'>) => void
  updateInstruction: (id: string, updates: Partial<AIInstruction>) => void
  deleteInstruction: (id: string) => void
  toggleInstruction: (id: string) => void
  getInstructionsByTab: (tab: AITalkTab) => AIInstruction[]
}

export function useAIInstructions(options: UseAIInstructionsOptions = {}): UseAIInstructionsReturn {
  const { defaultInstructions = [] } = options
  const [instructions, setInstructions] = useState<AIInstruction[]>(defaultInstructions)

  const addInstruction = useCallback((instruction: Omit<AIInstruction, 'id' | 'createdAt'>) => {
    const newInstruction: AIInstruction = {
      ...instruction,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    setInstructions(prev => [...prev, newInstruction])
  }, [])

  const updateInstruction = useCallback((id: string, updates: Partial<AIInstruction>) => {
    setInstructions(prev => prev.map(instruction => 
      instruction.id === id ? { ...instruction, ...updates } : instruction
    ))
  }, [])

  const deleteInstruction = useCallback((id: string) => {
    setInstructions(prev => prev.filter(instruction => instruction.id !== id))
  }, [])

  const toggleInstruction = useCallback((id: string) => {
    setInstructions(prev => prev.map(instruction => 
      instruction.id === id ? { ...instruction, isActive: !instruction.isActive } : instruction
    ))
  }, [])

  const activeInstructions = instructions.filter(instruction => instruction.isActive)
  const getInstructionsByTab = useCallback((tab: AITalkTab) => {
    return instructions.filter(instruction => instruction.category === tab)
  }, [instructions])

  return {
    instructions,
    activeInstructions,
    addInstruction,
    updateInstruction,
    deleteInstruction,
    toggleInstruction,
    getInstructionsByTab
  }
}