import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  HouseOutline,
  ApartmentOutline,
  IncomeToRentOutline,
} from '@/assets/icons';
import logoImage from '@/assets/logo.png';
import Button from '@/components/ui/Button';

type HeaderProps = {
  variant?: 'default' | 'auth';
};

const Header = ({ variant = 'default' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Rent', href: '/rent', icon: HouseOutline },
    { name: 'Buy', href: '/buy', icon: ApartmentOutline },
    { name: 'Sell', href: '/sell', icon: IncomeToRentOutline },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:relative">
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center space-x-1 w-8 h-8">
              <Image
                src={logoImage}
                alt="Rentsmart"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-bold text-secondary-violet font-jakarta leading-4 tracking-wide">
                RentSmart<span className="text-red-500">.</span>
              </span>
            </div>
          </Link>

          {variant === 'default' && (
            <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 text-primary-black hover:text-primary-violet hover:bg-purple-200 transition-all duration-200 font-medium px-4 py-2 rounded-md"
                  >
                    <IconComponent size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {variant === 'default' && (
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" size="md" className="text-black">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="md">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          {variant === 'default' && (
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 cursor-pointer" />
                ) : (
                  <Menu className="w-6 h-6 cursor-pointer" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && variant === 'default' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-20 left-0 right-0 bottom-0 bg-black/40 bg-opacity-20 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-20 left-0 right-0 bg-white shadow-xl z-50 md:hidden"
            >
              <div className="px-4 py-6">
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-3 text-secondary-violet opacity-50 hover:text-primary-violet hover:opacity-100 hover:bg-purple-50 transition-all duration-200 font-medium py-3 px-3 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent size={20} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" size="md" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="primary" size="md" className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
