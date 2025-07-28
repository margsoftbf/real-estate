import React, { useState } from 'react';
import { UserInfo } from '@/types/types';
import Header from './Header';
import Sidebar from './Sidebar';
import { menu } from '@/config/menuConfig';

interface AppLayoutProps {
  children: React.ReactNode;
  userRole: keyof typeof menu;
  userInfo: UserInfo;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  userRole,
  userInfo,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        role={userRole}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          userInfo={userInfo}
        />
        <main className="flex-1 md:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
