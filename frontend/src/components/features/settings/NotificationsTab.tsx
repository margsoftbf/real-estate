import Switch from '@/components/ui/Switch/Switch';
import React from 'react';

interface NotificationsTabProps {
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  onNotificationChange: (key: string, value: boolean) => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({
  notifications,
  onNotificationChange,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Notification Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-gray-600">
              Receive notifications via email
            </p>
          </div>
          <Switch
            checked={notifications.emailNotifications}
            onCheckedChange={(checked) =>
              onNotificationChange('emailNotifications', checked)
            }
            aria-label="Enable email notifications"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Push Notifications</h4>
            <p className="text-sm text-gray-600">Receive push notifications</p>
          </div>
          <Switch
            checked={notifications.pushNotifications}
            onCheckedChange={(checked) =>
              onNotificationChange('pushNotifications', checked)
            }
            aria-label="Enable push notifications"
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
