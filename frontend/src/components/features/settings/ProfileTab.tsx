import React from 'react';
import EditableInput from '@/components/common/EditableInput';

interface ProfileTabProps {
  formData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-body-lg font-bold text-primary-black">
        Personal Info
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <EditableInput
            fieldName="firstName"
            label="First Name"
            placeholder="Enter first name"
            type="text"
            value={formData.firstName}
            onChange={(e) => onInputChange('firstName', e.target.value)}
          />
        </div>
        <div>
          <EditableInput
            fieldName="lastName"
            label="Last Name"
            placeholder="Enter last name"
            type="text"
            value={formData.lastName}
            onChange={(e) => onInputChange('lastName', e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <EditableInput
            fieldName="phoneNumber"
            label="Phone Number"
            placeholder="Enter phone number"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => onInputChange('phoneNumber', e.target.value)}
          />
        </div>
        <div>
          <EditableInput
            fieldName="address"
            label="Address"
            placeholder="Enter address"
            type="text"
            value={formData.address}
            onChange={(e) => onInputChange('address', e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <EditableInput
            fieldName="city"
            label="City"
            placeholder="Enter city"
            type="text"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
          />
        </div>
        <div>
          <EditableInput
            fieldName="postalCode"
            label="Postal Code"
            placeholder="Enter postal code"
            type="text"
            value={formData.postalCode}
            onChange={(e) => onInputChange('postalCode', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;