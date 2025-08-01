import React from 'react';
import Head from 'next/head';
import AppLayout from '@/components/layout/AppLayout';
import DashboardContent from '@/components/features/dashboard/DashboardContent';
import { useUser } from '@/hooks/auth/useUser';

const DashboardPage = () => {
  const { data: userInfo, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Unable to load user information</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout userRole={userInfo.role} userInfo={userInfo}>
      <Head>
        <title>Dashboard | Property Manager</title>
      </Head>
      <DashboardContent userFirstName={userInfo.firstName} userRole={userInfo.role} />
    </AppLayout>
  );
};

export default DashboardPage;
