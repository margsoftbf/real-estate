import React from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AppLayout from '@/components/layout/AppLayout';
import DashboardContent from '@/components/features/dashboard/DashboardContent';
import { useUser } from '@/hooks/auth/useUser';

const DashboardPage = () => {
  const { status } = useSession();
  const { data: userInfo, isLoading: userLoading } = useUser();
  const router = useRouter();

  if (status === 'loading' || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Unable to load user information</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Login
          </button>
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
