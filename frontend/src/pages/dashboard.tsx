import React from 'react';
import Head from 'next/head';
import AppLayout from '@/components/layout/AppLayout';
import DashboardContent from '@/components/features/dashboard/DashboardContent';

const userInfo = {
  firstName: 'Francis',
  lastName: 'Reynolds',
  email: 'francis@example.com',
  avatar: null,
};

const DashboardPage = () => {
  return (
    <AppLayout userRole="landlord" userInfo={userInfo}>
      <Head>
        <title>Dashboard | Property Manager</title>
      </Head>
      <DashboardContent 
        userFirstName={userInfo.firstName} 
        userRole="landlord" 
      />
    </AppLayout>
  );
};

export default DashboardPage;