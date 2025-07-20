import React, { useState } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import {
  CloseOutline,
  DashboardBold,
  DocumentOutline,
  HeartOutline,
  InsightOutline,
  MessageOutline,
  NotificationOutline,
  PropertiesOutline,
  QuestionMarkOutline,
  RentPaymentOutline,
  SettingOutline,
  TenantsOutline,
  UserOutline,
} from '@/assets/icons';
import Image from 'next/image';
import logoImage from '@/assets/logo-white.png';
import { UserInfo } from '@/types/types';

const menu = {
  landlord: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <DashboardBold className="w-5 h-5" />,
    },
    {
      title: 'Insight',
      url: '/insight',
      icon: <InsightOutline className="w-5 h-5" />,
    },
    {
      title: 'My Listings',
      url: '/listings',
      icon: <PropertiesOutline className="w-5 h-5" />,
    },
    {
      title: 'Tenants',
      url: '/tenants',
      icon: <TenantsOutline className="w-5 h-5" />,
    },
    {
      title: 'Rent Payment',
      url: '/payments',
      icon: <RentPaymentOutline className="w-5 h-5" />,
    },
    {
      title: 'Messages',
      url: '/messages',
      icon: <MessageOutline className="w-5 h-5" />,
    },
  ],
  tenant: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <DashboardBold className="w-5 h-5" />,
    },
    {
      title: 'Tenancy Applications',
      url: '/tenancy-applications',
      icon: <DocumentOutline className="w-5 h-5" />,
    },
    {
      title: 'Favorited',
      url: '/payments',
      icon: <HeartOutline className="w-5 h-5" />,
    },
  ],
  admin: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <DashboardBold className="w-5 h-5" />,
    },
    {
      title: 'Users',
      url: '/users',
      icon: <TenantsOutline className="w-5 h-5" />,
    },
  ],
};

const commonMenuItems = [
  {
    title: 'Help',
    url: '/help',
    icon: <QuestionMarkOutline className="w-5 h-5" />,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: <SettingOutline className="w-5 h-5" />,
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
  userRole: keyof typeof menu;
  userInfo: UserInfo;
}

const Header = ({
  onMenuToggle,
  userInfo,
}: {
  onMenuToggle: () => void;
  userInfo: UserInfo;
}) => (
  <header className="bg-white text-white h-16 flex items-center px-4 md:px-6 border-b border-purple-100">
    <button
      onClick={onMenuToggle}
      className="md:hidden mr-3 p-2 text-black rounded"
    >
      <Menu className="w-6 h-6 cursor-pointer" />
    </button>
    <div className="ml-auto flex items-center space-x-4">
      <div className="w-10 h-10 bg-purple-50 rounded-md p-1 flex items-center justify-center cursor-pointer">
        <NotificationOutline className="w-5 h-5" />
      </div>
      <div className="flex items-center space-x-1 border-2 h-10 border-purple-100 rounded-md px-1.5 py-1 w-16 sm:w-fit">
        <UserOutline className="w-5 h-5" />
        <span className="font-medium hidden sm:block text-body-sm-medium text-primary-black">
          {userInfo.email}
        </span>
        <ChevronDown className="w-4 h-4 text-black flex-shrink-0" />
      </div>
    </div>
  </header>
);

const Sidebar = ({
  role,
  isOpen,
  onClose,
}: {
  role: keyof typeof menu;
  isOpen: boolean;
  onClose: () => void;
}) => (
  <aside
    className={`
      fixed md:static inset-y-0 left-0 z-50 w-full md:w-64 bg-gray-100 transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}
  >
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 w-12 h-12 bg-primary-violet rounded-md justify-center">
          <Image
            src={logoImage}
            alt="Rentsmart"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <div>
          <div className="font-bold text-lg text-gray-900">
            RentSmart<span className="text-red-500">.</span>
          </div>
          <div className="text-body-xs text-gray-600">Property Manager</div>
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-primary-black md:hidden cursor-pointer hover:text-gray-400"
        >
          <CloseOutline className="w-5 h-5" />
        </button>
      </div>
    </div>

    <nav className="mt-6 px-4">
      <ul className="space-y-2">
        {menu[role].map((item, index) => (
          <li key={item.title}>
            <a
              href={item.url}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                index === 0
                  ? 'bg-purple-100 text-primary-violet'
                  : 'text-secondary-violet opacity-50 hover:bg-gray-200'
              }`}
              onClick={onClose}
            >
              <span>{item.icon}</span>
              <span className="text-body-md-medium font-semibold">
                {item.title}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ul className="space-y-2">
          {commonMenuItems.map((item) => (
            <li key={item.title}>
              <a
                href={item.url}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-secondary-violet opacity-50 hover:bg-gray-200 transition-colors"
                onClick={onClose}
              >
                <span>{item.icon}</span>
                <span className="text-body-md-medium font-semibold">
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </aside>
);

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
        <main className="flex-1 p-4 md:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
