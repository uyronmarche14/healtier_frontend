'use client';

import { useState, useCallback } from "react";
import { ChatSidebar } from "./chatSidebar";
import { ChatArea } from "./chatArea";
import type { Chat, Message, User } from "@/types/chat";

// ✅ Import mock data
import { mockChats, mockMessages, mockUsers } from "@/data/response";

export function MedicalChatApp() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]); // Default to doctor
  const [availableChats, setAvailableChats] = useState<Chat[]>(mockChats);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string>("");

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!activeChat) return;

      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        senderId: currentUser.id,
        timestamp: new Date(),
        type: "text",
      };

      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMessage],
      }));

      const currentChat = availableChats.find((c) => c.id === activeChat);
      const otherParticipant = currentChat?.participants.find(
        (p) => p.id !== currentUser.id
      );
      if (otherParticipant) {
        setIsTyping(true);
        setTypingUser(otherParticipant.name);
      }

      if (content.toLowerCase().includes("symptom") || content.toLowerCase().includes("pain")) {
        setTimeout(() => {
          setIsTyping(false);
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            content:
              "Based on the symptoms described, I recommend scheduling a follow-up appointment. Please monitor your symptoms and contact us if they worsen.",
            senderId: "ai",
            timestamp: new Date(),
            type: "ai_response",
          };

          setMessages((prev) => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), aiResponse],
          }));
        }, 1000);
      }
    },
    [activeChat, currentUser.id]
  );

  const activeChatData = activeChat
    ? availableChats.find((c) => c.id === activeChat) ?? null
    : null;
  const chatMessages = activeChat ? messages[activeChat] || [] : [];

  const filteredChats = availableChats.filter((chat) =>
    chat.participants.some((p) => p.id === currentUser.id)
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
