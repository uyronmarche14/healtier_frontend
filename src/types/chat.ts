export interface User {
    id: string;
    name: string;
    role: 'doctor' | 'patient';
    avatar?: string;
    status: 'online' | 'offline';
  }
  
  export interface Message {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date;
    type: 'text' | 'file' | 'ai_response';
  }
  
  export interface Chat {
    id: string;
    participants: User[];
    lastMessage: Message;
    unreadCount?: number;
  }