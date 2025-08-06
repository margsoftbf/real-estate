import React, { useState, useRef } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { useRouter } from 'next/router';
import { NewNotificationOutline, UserOutline } from '@/assets/icons';
import { UserInfo } from '@/types/types';
import UserDropdownMenu from './UserDropdownMenu';
import NotificationDropdownMenu from './NotificationDropdownMenu';

interface HeaderProps {
  onMenuToggle: () => void;
  userInfo: UserInfo;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, userInfo }) => {
  const router = useRouter();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  const getPageTitle = () => {
    switch (router.pathname) {
      case '/settings':
        return 'Settings';
      case '/dashboard':
        return 'Dashboard';
      default:
        return '';
    }
  };

  return (
    <header className="bg-white text-white h-16 flex items-center px-4 md:px-6 border-b border-purple-100">
      <button
        onClick={onMenuToggle}
        className="md:hidden mr-3 p-2 text-black rounded"
      >
        <Menu className="w-6 h-6 cursor-pointer" />
      </button>

      {getPageTitle() && (
        <div className="hidden md:block">
          <h1 className="text-body-xl text-primary-black font-bold">
            {getPageTitle()}
          </h1>
        </div>
      )}

      <div className="ml-auto flex items-center space-x-4">
        <div className="relative">
          <button
            ref={notificationButtonRef}
            onClick={() => {
              setNotificationDropdownOpen((prev) => !prev);
              if (userDropdownOpen) setUserDropdownOpen(false);
            }}
            className="w-10 h-10 bg-purple-50 rounded-md p-1 flex items-center justify-center cursor-pointer hover:bg-purple-100 transition-colors relative"
          >
            <NewNotificationOutline className="w-5 h-5 text-gray-600" />
          </button>
          <NotificationDropdownMenu
            isOpen={notificationDropdownOpen}
            onClose={() => setNotificationDropdownOpen(false)}
            buttonRef={notificationButtonRef}
          />
        </div>

        <div className="relative">
          <button
            ref={userButtonRef}
            onClick={() => {
              setUserDropdownOpen((prev) => !prev);
              if (notificationDropdownOpen) setNotificationDropdownOpen(false);
            }}
            className="flex items-center space-x-1 border-2 h-10 border-purple-100 rounded-md px-1.5 py-1 w-16 sm:w-fit hover:border-purple-200 transition-colors cursor-pointer"
          >
            <UserOutline className="w-5 h-5 text-gray-600" />
            <span className="font-medium hidden sm:block text-body-sm-medium text-primary-black">
              {userInfo.email}
            </span>
            <ChevronDown className="w-4 h-4 text-black flex-shrink-0" />
          </button>
          <UserDropdownMenu
            isOpen={userDropdownOpen}
            onClose={() => setUserDropdownOpen(false)}
            buttonRef={userButtonRef}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
