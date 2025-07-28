import React from 'react';
import EditableInput from '@/components/common/EditableInput';

interface AccountTabProps {
  formData: {
    email: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const AccountTab: React.FC<AccountTabProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-body-lg font-bold text-primary-black">
        My Account{' '}
        <span className="text-body-sm text-primary-black/50">
          (Nothing here yet)
        </span>
      </h3>
      <div>
        <EditableInput
          fieldName="email"
          label="Email"
          placeholder="Enter email address"
          type="email"
          value={formData.email}
          disabled
          onChange={(e) => onInputChange('email', e.target.value)}
        />
      </div>
    </div>
  );
};

export default AccountTab;