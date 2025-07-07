
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const { t } = useLocale();
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <Input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder={t('chat.placeholder')}
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" size="icon" disabled={!newMessage.trim() || isLoading}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
