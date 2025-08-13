import React, { useRef, useEffect, useState } from 'react';
import { DoubleChecksOutline } from '@/assets/icons';

interface NotificationDropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const NotificationDropdownMenu: React.FC<NotificationDropdownMenuProps> = ({
  isOpen,
  onClose,
  buttonRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifications] = useState([
    {
      id: 1,
      title: 'New tenant application',
      message: 'John Doe submitted an application for Property A',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: 2,
      title: 'Payment received',
      message: 'Rent payment for Property B has been received',
      time: '1 day ago',
      isRead: true,
    },
  ]);

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
      className="fixed md:absolute inset-x-4 md:inset-x-auto md:right-0 top-16 md:top-full md:mt-2 w-auto md:w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
    >
      <div className="px-4 py-2 border-b border-purple-300">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
          <div className="flex gap-1.5 items-center group transition-colors duration-200 hover:text-primary-violet-dark/50">
            <DoubleChecksOutline className="w-4 h-4 text-primary-violet group-hover:text-primary-violet-dark/50" />
            <button className="cursor-pointer text-xs text-primary-violet group-hover:text-primary-violet-dark/50 font-semibold">
              Mark as read
            </button>
          </div>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 ${
              !notification.isRead ? 'bg-purple-50' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-2 h-2 rounded-full mt-2 ${
                  !notification.isRead ? 'bg-primary-violet' : 'bg-transparent'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-gray-100">
        <button className="w-full text-center text-sm text-primary-violet hover:text-primary-violet-dark/50 cursor-pointer transition-colors duration-200 font-semibold">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdownMenu;
