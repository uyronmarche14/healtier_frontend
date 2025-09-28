import type { AITalkMessage, AITalkTab, AIInstruction } from '@/types/ai-talks'

export interface AIServiceConfig {
  apiEndpoint: string
  timeout: number
  retryAttempts: number
}

export class AIService {
  private config: AIServiceConfig

  constructor(config: AIServiceConfig) {
    this.config = config
  }

  async sendMessage(
    content: string, 
    tab: AITalkTab, 
    instructions: AIInstruction[] = [],
    context?: string
  ): Promise<AITalkMessage> {
    try {
      // Filter active instructions for the current tab
      const activeTabInstructions = instructions.filter(
        instruction => instruction.isActive && instruction.category === tab
      )

      // Build system prompt from instructions
      const systemPrompt = this.buildSystemPrompt(tab, activeTabInstructions, context)

      // TODO: Replace with actual API call to your AI service
      // This is a simulation that returns a response after a delay
      await this.simulateAPICall()

      const response = await this.generateResponse(content, tab, systemPrompt)

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        tab
      }
    } catch (error) {
      console.error('AI Service Error:', error)
      throw new Error('Failed to get AI response')
    }
  }

  private buildSystemPrompt(
    tab: AITalkTab, 
    instructions: AIInstruction[], 
    context?: string
  ): string {
    const basePrompts = {
      general: 'You are a helpful health assistant. Provide accurate, evidence-based health information while always reminding users to consult healthcare professionals for medical advice.',
      fitness: 'You are a fitness and exercise specialist. Provide personalized workout recommendations, track progress, and ensure all advice is safe and appropriate for the user\'s health condition.',
      mental: 'You are a mental wellness supporter. Provide coping strategies, mindfulness techniques, and emotional support while encouraging professional help when needed. Always be empathetic and non-judgmental.',
      nutrition: 'You are a nutrition advisor. Provide dietary recommendations, meal planning advice, and nutritional guidance based on health conditions and dietary restrictions.'
    }

    let prompt = basePrompts[tab] || basePrompts.general

    // Add custom instructions
    if (instructions.length > 0) {
      const instructionContent = instructions.map(i => i.content).join('\n')
      prompt += `\n\nAdditional Instructions:\n${instructionContent}`
    }

    // Add context if available
    if (context) {
      prompt += `\n\nUser Context:\n${context}`
    }

    return prompt
  }

  private async generateResponse(
    userMessage: string, 
    tab: AITalkTab, 
    systemPrompt: string
  ): Promise<string> {
    // TODO: Implement actual AI response generation
    // This is a placeholder that returns tab-specific responses
    
    const responses = {
      general: `I understand your question about "${userMessage}". Based on your medical records and health data, I can provide you with relevant information and insights. Please note that I'm an AI assistant and my responses should not replace professional medical advice.`,
      fitness: `Great question about fitness! Based on your health profile and current fitness level, I can help you with personalized exercise recommendations for "${userMessage}". Let's create a safe and effective workout plan tailored to your needs.`,
      mental: `Thank you for sharing about "${userMessage}". I'm here to support your mental wellness journey. Let me provide you with some coping strategies and techniques that might help, while also encouraging you to seek professional support when needed.`,
      nutrition: `Excellent question about nutrition! Let me analyze your dietary needs and health conditions to provide personalized nutrition advice for "${userMessage}". I'll consider any restrictions and health goals you have.`
    }

    return responses[tab] || responses.general
  }

  private async simulateAPICall(): Promise<void> {
    // Simulate network delay
    return new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
  }

  // Health data context methods
  async getHealthContext(userId: string): Promise<string> {
    // TODO: Implement actual health data retrieval from Supabase
    // This is a placeholder
    return `User ${userId} has access to their medical records, prescriptions, and test results.`
  }

  async analyzeMedicalRecord(pdfUrl: string): Promise<string> {
    // TODO: Implement PDF analysis using edge functions
    // This is a placeholder
    return `Medical record analysis completed for ${pdfUrl}`
  }

  // Error handling
  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error
    }
    return new Error('Unknown AI service error')
  }
}

// Singleton instance
let aiServiceInstance: AIService | null = null

export function getAIService(config?: AIServiceConfig): AIService {
  if (!aiServiceInstance) {
    const defaultConfig: AIServiceConfig = {
      apiEndpoint: '/api/ai/talks',
      timeout: 30000,
      retryAttempts: 3
    }
    aiServiceInstance = new AIService(config || defaultConfig)
  }
  return aiServiceInstance
}

// Utility functions
export function validateMessage(content: string): boolean {
  if (!content || content.trim().length === 0) return false
  if (content.length > 4000) return false // Reasonable message length limit
  return true
}

export function sanitizeMessage(content: string): string {
  // Basic sanitization - remove potential harmful content
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .trim()
}

export function formatMessageForDisplay(message: AITalkMessage): string {
  // Format message for UI display
  return message.content.replace(/\n/g, '<br>')
}