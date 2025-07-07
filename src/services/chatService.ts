
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from '@/components/chat/ChatMessages';
import { Locale } from '@/contexts/LocaleContext';

export interface ChatApiMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export const sendChatMessage = async (
  messages: ChatMessage[],
  userMessage: ChatMessage,
  locale: Locale
) => {
  // Format messages for the API (excluding timestamps and IDs)
  const formattedMessages = messages
    .concat(userMessage)
    .map(({ role, content }) => ({ role, content } as ChatApiMessage));
  
  // Call the Supabase Edge Function
  const { data, error } = await supabase.functions.invoke('chat-ai', {
    body: { 
      messages: formattedMessages,
      language: locale === 'es-MX' ? 'es' : 'en'
    }
  });

  if (error) {
    console.error('Error calling chat-ai function:', error);
    throw new Error(error.message);
  }

  return data;
};
