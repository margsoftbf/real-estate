import React from 'react';

interface ListingSettingsSectionProps {
  isPopular: boolean;
  isActive: boolean;
  onIsPopularChange: (value: boolean) => void;
  onIsActiveChange: (value: boolean) => void;
}

const ListingSettingsSection: React.FC<ListingSettingsSectionProps> = ({
  isPopular,
  isActive,
  onIsPopularChange,
  onIsActiveChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-6">Listing Settings</h2>
      <div className="space-y-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isPopular || false}
            onChange={(e) => onIsPopularChange(e.target.checked)}
            className="rounded border-purple-300 text-primary-violet focus:ring-primary-violet h-4 w-4"
          />
          <span className="text-sm text-primary-black">Mark as Popular</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isActive !== false}
            onChange={(e) => onIsActiveChange(e.target.checked)}
            className="rounded border-purple-300 text-primary-violet focus:ring-primary-violet h-4 w-4"
          />
          <span className="text-sm text-primary-black">
            Active (visible to tenants)
          </span>
        </label>
      </div>
    </div>
  );
};

export default ListingSettingsSection;