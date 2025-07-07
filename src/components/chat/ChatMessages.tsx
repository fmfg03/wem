
import React, { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';

type MessageRole = 'user' | 'system' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const { t } = useLocale();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-wem-blue text-white rounded-tr-none' 
                  : 'bg-gray-100 rounded-tl-none'
              }`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 rounded-tl-none">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                <p className="text-sm text-gray-500">{t('chat.typing')}</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
