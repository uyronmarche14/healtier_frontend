'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus,  User2} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Chat, User } from '@/types/chat';
import { useState } from 'react';

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  currentUser: User;
}

export function ChatSidebar({ chats, activeChat, onChatSelect, currentUser }: ChatSidebarProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }).format(date);
  };

  const getOtherParticipant = (chat: Chat) => {
    return chat.participants.find(p => p.id !== currentUser.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-gray-400';
      case 'busy':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredChats = chats.filter(chat => {
    const otherParticipant = getOtherParticipant(chat);
    const searchLower = searchQuery.toLowerCase();
    return (
      otherParticipant?.name.toLowerCase().includes(searchLower) ||
      chat.lastMessage?.content.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-80 border-r bg-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <User2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No conversations found</p>
            <p className="text-xs mt-1">Try adjusting your search or start a new chat</p>
          </div>
        ) : (
          filteredChats.map((chat) => {
            const otherUser = getOtherParticipant(chat);
            const isActive = activeChat === chat.id;
          
          return (
            <div
              key={chat.id}
              className={cn(
                "flex items-center gap-3 p-4 hover:bg-accent cursor-pointer transition-colors",
                isActive && "bg-accent"
              )}
              onClick={() => onChatSelect(chat.id)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={otherUser?.avatar} />
                  <AvatarFallback>
                    {otherUser?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={cn(
                  "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background",
                  getStatusColor(otherUser?.status || 'offline')
                )} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{otherUser?.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(chat.lastMessage.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage.content}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <Badge variant={otherUser?.role === 'doctor' ? 'default' : 'secondary'} className="text-xs">
                    {otherUser?.role}
                  </Badge>
                  {chat.unreadCount && chat.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })
        )}
      </div>
    </div>
  );
}