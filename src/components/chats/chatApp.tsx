'use client';
import { useState, useCallback } from 'react';
import { ChatSidebar } from './chatSidebar';
import { ChatArea } from './chatArea';
import type { Chat, Message, User } from '@/types/chat';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    avatar: '/api/placeholder/40/40',
    status: 'online'
  },
  {
    id: '2', 
    name: 'John Smith',
    role: 'patient',
    status: 'online'
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    role: 'doctor',
    status: 'offline'
  }
];

const mockMessages: Record<string, Message[]> = {
  'chat-1': [
    {
      id: '1',
      content: 'Good morning! How are you feeling today?',
      senderId: '1',
      timestamp: new Date(Date.now() - 60000),
      type: 'text'
    },
    {
      id: '2', 
      content: 'Hi Dr. Johnson, I\'m feeling much better. The medication is working well.',
      senderId: '2',
      timestamp: new Date(Date.now() - 30000),
      type: 'text'
    }
  ]
};

const mockChats: Chat[] = [
  {
    id: 'chat-1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: '2',
      content: 'Hi Dr. Johnson, I\'m feeling much better. The medication is working well.',
      senderId: '2',
      timestamp: new Date(Date.now() - 30000),
      type: 'text'
    },
    unreadCount: 0
  }
];

export function MedicalChatApp() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]); // Default to doctor, can be switched
  const [availableChats, setAvailableChats] = useState<Chat[]>(mockChats);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string>('');

  const handleSendMessage = useCallback((content: string) => {
    if (!activeChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: currentUser.id,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));

    // Simulate typing indicator
    const currentChat = availableChats.find(c => c.id === activeChat);
    const otherParticipant = currentChat?.participants.find(p => p.id !== currentUser.id);
    if (otherParticipant) {
      setIsTyping(true);
      setTypingUser(otherParticipant.name);
    }

    // Simulate AI response for medical queries
    if (content.toLowerCase().includes('symptom') || content.toLowerCase().includes('pain')) {
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Based on the symptoms described, I recommend scheduling a follow-up appointment. Please monitor your symptoms and contact us if they worsen.',
          senderId: 'ai',
          timestamp: new Date(),
          type: 'ai_response'
        };

        setMessages(prev => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), aiResponse]
        }));
      }, 1000);
    }
  }, [activeChat, currentUser.id]);

  const activeChatData = activeChat ? availableChats.find(c => c.id === activeChat) ?? null : null;
  const chatMessages = activeChat ? messages[activeChat] || [] : [];

  // Filter chats based on current user role
  const filteredChats = availableChats.filter(chat => 
    chat.participants.some(p => p.id === currentUser.id)
  );


  return (
    <div className="h-screen flex bg-background">
      
      <ChatSidebar
        chats={filteredChats}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        currentUser={currentUser}
      />
      <ChatArea
        chat={activeChatData}
        messages={chatMessages}
        currentUser={currentUser}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
        typingUser={typingUser}
      />
    </div>
  );
}