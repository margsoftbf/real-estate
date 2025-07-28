import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { HelpOutline, LogoutOutline, UserOutline } from '@/assets/icons';

const userMenuItems = [
  {
    title: 'My Profile',
    url: '/settings',
    icon: <UserOutline className="w-4 h-4 " />,
  },
  {
    title: 'Help',
    url: '/help',
    icon: <HelpOutline className="w-4 h-4" />,
  },
  {
    title: 'Logout',
    url: '/logout',
    icon: <LogoutOutline className="w-4 h-4 text-red-600" />,
    className: 'text-red-600 hover:bg-red-50',
  },
];

interface UserDropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({
  isOpen,
  onClose,
  buttonRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickOnButton =
        buttonRef.current && buttonRef.current.contains(target);
      const isClickOnDropdown =
        dropdownRef.current && dropdownRef.current.contains(target);

      if (!isClickOnButton && !isClickOnDropdown) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-48 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl border border-purple-300 p-3 z-50"
    >
      {userMenuItems.map((item, index) => (
        <div key={item.title}>
          <Link
            href={item.url}
            onClick={onClose}
            className={`w-full px-2 py-2 text-left text-sm  flex items-center space-x-3 rounded-md transition-colors ${
              item.className || 'text-primary-black hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span className="text-body-sm">{item.title}</span>
          </Link>
          {index < userMenuItems.length - 1 && (
            <div className="my-1 mx-1 border-t border-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserDropdownMenu;
