import React, { ReactNode } from 'react';
import Header from '@/components/features/landing/Header';
import Footer from '@/components/features/landing/Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header variant="default" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
