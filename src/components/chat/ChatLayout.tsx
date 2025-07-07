
import React from 'react';
import ChatDrawer from './ChatDrawer';

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <>
      {children}
      <ChatDrawer />
    </>
  );
};

export default ChatLayout;
