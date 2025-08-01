import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CloseOutline } from '@/assets/icons';
import logoImage from '@/assets/logo-white.png';
import { menu, commonMenuItems } from '@/config/menuConfig';

interface SidebarProps {
  role: keyof typeof menu;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onClose }) => {
  const router = useRouter();
  
  const isActive = (url: string) => router.pathname === url;
  
  return (
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
        {menu[role].map((item) => (
          <li key={item.title}>
            <a
              href={item.url}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.url)
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
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.url)
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
      </div>
    </nav>
  </aside>
  );
};

export default Sidebar;