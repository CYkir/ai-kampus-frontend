import React from 'react';
import SideBar from './SideBar';
import { ChatHeader } from '../../components/chat/ChatHeader';
import ChatBox from '../../components/ChatBot';

const AppLayout = () => {
  return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-72 xl:w-80 shrink-0">
        <SideBar />
      </div>
      <main className="flex flex-1 flex-col min-w-0">
        <ChatHeader />
        <ChatBox/>
      </main>
    </div>
  );
}

export default AppLayout;
