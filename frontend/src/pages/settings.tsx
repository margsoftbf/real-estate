import React from 'react';
import Head from 'next/head';
import AppLayout from '@/components/layout/AppLayout';
import Toast from '@/components/ui/Toast/Toast';
import { useSettings } from '@/hooks/settings/useSettings';
import {
  ProfileTab,
  AccountTab,
  NotificationsTab,
  SettingsLayout,
} from '@/components/features/settings';

const SettingsPage = () => {
  const {
    userInfo,
    isLoading,
    isPending,
    activeTab,
    formData,
    notifications,
    toasts,
    setActiveTab,
    handleInputChange,
    handleNotificationChange,
    handleSaveChanges,
    removeToast,
  } = useSettings();

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

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'account', label: 'My Account' },
    { id: 'notifications', label: 'Notifications' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileTab
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 'account':
        return (
          <AccountTab
            formData={{ email: formData.email }}
            onInputChange={handleInputChange}
          />
        );
      case 'notifications':
        return (
          <NotificationsTab
            notifications={notifications}
            onNotificationChange={handleNotificationChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout userRole={userInfo.role} userInfo={userInfo}>
      <Head>
        <title>Settings | Property Manager</title>
      </Head>

      <SettingsLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        onSave={handleSaveChanges}
        isPending={isPending}
      >
        {renderTabContent()}
      </SettingsLayout>

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={2000}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </AppLayout>
  );
};

export default SettingsPage;