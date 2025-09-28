'use client'
import React, { useState, useRef, useEffect } from 'react'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
  Message,
  MessageContent,
  MessageAvatar,
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSubmit,
  Loader
} from '@/components/ai/talks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Brain, MessageCircle, User, Bot, Sparkles, X } from 'lucide-react'
import { AITalkTabs } from '@/components/ai/talks/ai-talks-tabs'
import { AIInstructionManager } from '@/components/ai/talks/ai-instruction-manager'
import { NewFeatureBadge } from '@/components/ai/talks/new-feature-badge'
import type { AITalkMessage, AITalkTab, AIInstruction } from '@/types/ai-talks'
export default function PatientAITalksPage() {
  const [messages, setMessages] = useState<AITalkMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI health assistant. I can help you understand your medical records, provide health summaries, and answer questions about your health data. How can I help you today?',
      timestamp: new Date(),
      type: 'text',
      tab: 'general'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'submitted' | 'streaming' | 'error' | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<AITalkTab>('general')
  const [aiInstructions, setAiInstructions] = useState<AIInstruction[]>([])
  const [showInstructionManager, setShowInstructionManager] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load AI instructions on component mount
  useEffect(() => {
    // TODO: Load instructions from Supabase
    const defaultInstructions: AIInstruction[] = [
      {
        id: '1',
        name: 'General Health Assistant',
        description: 'Provides general health information and guidance',
        content: 'You are a helpful health assistant. Provide accurate, evidence-based health information while always reminding users to consult healthcare professionals for medical advice.',
        category: 'general',
        isActive: true,
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    setAiInstructions(defaultInstructions)
  }, [])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: AITalkMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      tab: activeTab
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setStatus('streaming')

    // Get active instructions for current tab
    const activeTabInstructions = aiInstructions.filter(
      instruction => instruction.isActive && instruction.category === activeTab
    )

    // Simulate AI response with tab-specific content
    setTimeout(() => {
      const tabResponses = {
        general: 'I understand your concern. Based on your medical records, I can provide you with relevant information and insights. Please note that I\'m an AI assistant and my responses should not replace professional medical advice.',
        fitness: 'I\'d be happy to help you with fitness and exercise recommendations! Based on your health data, I can suggest personalized workout routines and track your progress towards your fitness goals.',
        mental: 'I\'m here to support your mental wellness journey. I can provide coping strategies, mindfulness techniques, and help you track your mood patterns while ensuring you get appropriate professional support when needed.',
        nutrition: 'I can help you with nutrition advice and meal planning based on your health conditions and dietary requirements. Let me analyze your current nutritional status and provide personalized recommendations.'
      }

      const aiMessage: AITalkMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: tabResponses[activeTab as keyof typeof tabResponses] || tabResponses.general,
        timestamp: new Date(),
        type: 'text',
        tab: activeTab
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
      setStatus('submitted')
    }, 1000)
  }
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            AI Health Assistant
            <NewFeatureBadge feature="general" />
          </h1>
          <p className="text-muted-foreground">
            Chat with your AI assistant to understand your health data better
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowInstructionManager(true)}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            AI Instructions
          </Button>
          <Badge variant="outline" className="bg-primary/10">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* AI Talks Tabs */}
      <AITalkTabs 
        activeTab={activeTab} 
        onTabChange={(tab) => setActiveTab(tab as AITalkTab)}
        messages={messages}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card className="flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
            <CardHeader className="border-b flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <CardTitle>Conversation</CardTitle>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {activeTab}
                  </Badge>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {messages.filter(m => m.tab === activeTab).length} messages
                </Badge>
              </div>
              <CardDescription>
                {activeTab === 'general' && 'Your AI assistant has access to your medical records and can provide personalized insights.'}
                {activeTab === 'fitness' && 'Get personalized fitness recommendations and track your exercise progress with AI guidance.'}
                {activeTab === 'mental' && 'Support your mental wellness with AI-powered coping strategies and mood tracking.'}
                {activeTab === 'nutrition' && 'Receive personalized nutrition advice and meal planning based on your health data.'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 overflow-hidden">
              <Conversation className="h-full">
                <ConversationContent className="h-full overflow-y-auto">
                  <div className="space-y-4 min-h-full flex flex-col justify-end">
                    <div className="flex-1" />
                    {messages
                      .filter(message => message.tab === activeTab)
                      .map((message) => (
                        <Message key={message.id} from={message.role} className="group">
                          <MessageAvatar
                            src={message.role === 'user' 
                              ? '/api/placeholder/32/32' 
                              : '/api/placeholder/32/32'
                            }
                            name={message.role === 'user' ? 'You' : 'AI'}
                          />
                          <MessageContent className="max-w-[80%]">
                            <div className="space-y-2">
                              <div className="font-medium text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                                <span>{message.role === 'user' ? 'You' : 'AI Assistant'}</span>
                                <span>{message.timestamp.toLocaleTimeString()}</span>
                                {message.tab !== 'general' && (
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {message.tab}
                                  </Badge>
                                )}
                              </div>
                              <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                                {message.content}
                              </div>
                            </div>
                          </MessageContent>
                        </Message>
                      ))}
                    
                    {isLoading && (
                      <Message from="assistant" className="group">
                        <MessageAvatar
                          src="/api/placeholder/32/32"
                          name="AI"
                        />
                        <MessageContent className="max-w-[80%]">
                          <div className="flex items-center gap-3">
                            <Loader size={16} className="animate-spin" />
                            <span className="text-sm text-muted-foreground">
                              AI is thinking...
                            </span>
                          </div>
                        </MessageContent>
                      </Message>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
            </CardContent>
            <div className="border-t flex-shrink-0">
              <PromptInput onSubmit={handleSubmit}>
                <PromptInputTextarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    activeTab === 'general' ? 'Ask about your health records, symptoms, or medications...' :
                    activeTab === 'fitness' ? 'Ask about exercise routines, fitness goals, or workout plans...' :
                    activeTab === 'mental' ? 'Share how you\'re feeling or ask about mental wellness strategies...' :
                    'Ask about nutrition, diet plans, or meal recommendations...'
                  }
                  className="min-h-[80px] max-h-[200px] resize-none"
                  rows={3}
                />
                <PromptInputToolbar>
                  <div className="flex items-center justify-between w-full px-3 py-2">
                    <div className="text-xs text-muted-foreground">
                      Press Enter to send, Shift+Enter for new line
                    </div>
                    <PromptInputSubmit 
                      status={status}
                      disabled={!inputValue.trim() || isLoading}
                    />
                  </div>
                </PromptInputToolbar>
              </PromptInput>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>AI Capabilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div className="text-sm">
                  <div className="font-medium">Health Record Analysis</div>
                  <div className="text-muted-foreground">
                    Understand your medical history and test results
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div className="text-sm">
                  <div className="font-medium">Medication Information</div>
                  <div className="text-muted-foreground">
                    Get details about your prescriptions and interactions
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div className="text-sm">
                  <div className="font-medium">Appointment Summaries</div>
                  <div className="text-muted-foreground">
                    Review past appointments and doctor notes
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div className="text-sm">
                  <div className="font-medium">Health Reminders</div>
                  <div className="text-muted-foreground">
                    Get personalized health tips and reminders
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Your Health Data</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Medical Records</span>
                <Badge variant="outline" className="text-xs">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Prescriptions</span>
                <Badge variant="outline" className="text-xs">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Appointments</span>
                <Badge variant="outline" className="text-xs">Connected</Badge>
              </div>
              
              <Separator className="my-2" />
              
              <div className="text-xs text-muted-foreground">
                Your AI assistant has secure access to your health data and can provide personalized insights based on your medical history.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Important Notice</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                This AI assistant provides information based on your medical records but should not replace professional medical advice.
              </p>
              <p>
                Always consult with your healthcare provider for medical decisions and emergency situations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Instruction Manager Modal */}
      {showInstructionManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">AI Instructions Manager</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowInstructionManager(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              <AIInstructionManager
                instructions={aiInstructions}
                onUpdateInstructions={setAiInstructions}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}