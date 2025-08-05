import { useState, useEffect } from 'react';
import { useUser, useUpdateUser } from '@/hooks/auth/useUser';
import { useToast } from '@/hooks/useToast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export const useSettings = () => {
  const { data: userInfo, isLoading } = useUser();
  const { mutate: updateUser, isPending, isSuccess } = useUpdateUser();
  const { toasts, removeToast, showSuccess } = useToast();

  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
        phoneNumber: userInfo.phoneNumber || '',
        address: userInfo.address || '',
        city: userInfo.city || '',
        postalCode: userInfo.postalCode || '',
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (isSuccess) {
      showSuccess('Profile updated successfully!');
    }
  }, [isSuccess, showSuccess]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = () => {
    updateUser(formData);
  };

  return {
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
  };
};
