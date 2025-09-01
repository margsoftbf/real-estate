import React from 'react';

interface PropertyInfo {
  createdAt: string;
  updatedAt: string;
}

interface EditListingInformationSectionProps {
  property: PropertyInfo;
}

const EditListingInformationSection: React.FC<EditListingInformationSectionProps> = ({
  property,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-6">Listing Information</h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Created:</span>{' '}
          {new Date(property.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Last Updated:</span>{' '}
          {new Date(property.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default EditListingInformationSection;