'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Video, 
  MoreHorizontal, 
  Send, 
  Paperclip, 
  Smile,
  Bot,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Message, User, Chat } from '@/types/chat';

interface ChatAreaProps {
  chat: Chat | null;
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
  isTyping?: boolean;
  typingUser?: string;
}

export function ChatArea({ chat, messages, currentUser, onSendMessage, isTyping, typingUser }: ChatAreaProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle file upload - in a real app, this would upload to storage
        const fileMessage = `[File: ${file.name}]`;
        onSendMessage(fileMessage);
      }
    };
    input.click();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }).format(date);
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Welcome to Medical Chat</h3>
          <p className="text-muted-foreground">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  const otherUser = chat.participants.find(p => p.id !== currentUser.id);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherUser?.avatar} />
            <AvatarFallback>
              {otherUser?.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{otherUser?.name}</h3>
            <div className="flex items-center gap-2">
              <Badge variant={otherUser?.role === 'doctor' ? 'default' : 'secondary'} className="text-xs">
                {otherUser?.role}
              </Badge>
              <span className={cn(
                "text-xs",
                otherUser?.status === 'online' ? 'text-green-600' : 'text-muted-foreground'
              )}>
                {otherUser?.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === currentUser.id;
          return (
            <div
              key={message.id}
              className={cn(
                'flex',
                isOwnMessage ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
                  isOwnMessage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs opacity-70">
                    {formatTime(message.timestamp)}
                  </p>
                  {isOwnMessage && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 opacity-70" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {typingUser ? `${typingUser} is typing...` : 'Typing...'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleFileUpload}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-12"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleSend} disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}