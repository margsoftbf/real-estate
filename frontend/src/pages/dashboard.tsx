import React from 'react';
import Head from 'next/head';
import AppLayout from '@/components/layout/AppLayout';
import DashboardContent from '@/components/features/dashboard/DashboardContent';
import { useUser } from '@/hooks/auth/useUser';
import { PageLoading } from '@/components/ui/Loading';

const DashboardPage = () => {
  const { data: userInfo, isLoading } = useUser();

  if (isLoading) {
    return <PageLoading />;
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
        <title>Dashboard | Property Management | RentSmart</title>
        <meta
          name="description"
          content="Manage your properties, view analytics, and track performance. Complete property management dashboard for landlords and property managers."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <DashboardContent />
    </AppLayout>
  );
};

export default DashboardPage;
