
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Avatar } from '@/components/ui/avatar';
import { useLocale } from '@/contexts/LocaleContext';
import { useToast } from '@/hooks/use-toast';
import ChatMessages, { ChatMessage } from './ChatMessages';
import ChatInput from './ChatInput';
import { sendChatMessage } from '@/services/chatService';

// Explicitly type the initial messages array
const DEMO_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'system',
    content: 'Bienvenido a WEM México. ¿En qué podemos ayudarte hoy?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

const ChatDrawer = () => {
  const { t, locale } = useLocale();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(DEMO_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update welcome message on language change
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'system') {
      setMessages([
        {
          id: '1',
          role: 'system',
          content: locale === 'es-MX' 
            ? 'Bienvenido a WEM México. ¿En qué podemos ayudarte hoy?' 
            : 'Welcome to WEM Mexico. How can we help you today?',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        }
      ]);
    }
  }, [locale, messages]);

  const handleSendMessage = async (messageContent: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      // Send message and get response
      const data = await sendChatMessage(messages, userMessage, locale);

      // Add AI response to messages
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message.content,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add fallback message in case of error
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: locale === 'es-MX' 
          ? 'Lo siento, estamos experimentando problemas técnicos. Por favor, intenta de nuevo más tarde.'
          : 'Sorry, we are experiencing technical issues. Please try again later.',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      
      toast({
        title: t('errors.title'),
        description: t('errors.api'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="default" 
          size="icon" 
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-wem-green hover:bg-wem-darkgreen shadow-lg z-40"
          aria-label={t('chat.open')}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] sm:h-[70vh] sm:max-w-[400px] sm:ml-auto sm:mr-8 rounded-t-lg sm:rounded-lg">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-wem-blue">
                <div className="text-white font-bold">WM</div>
              </Avatar>
              <div>
                <DrawerTitle>{t('chat.title')}</DrawerTitle>
                <DrawerDescription>{t('chat.description')}</DrawerDescription>
              </div>
            </div>
            <DrawerClose className="p-2">
              <X className="h-5 w-5" />
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <ChatMessages messages={messages} isLoading={isLoading} />
        
        <DrawerFooter className="border-t">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          <p className="text-xs text-gray-500 text-center mt-2">{t('chat.privacy_notice')}</p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;
