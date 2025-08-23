import React from 'react';
import { PropertyType } from '@/types/properties/public-types';

interface PropertyTypeTabsProps {
  totalCount: number;
  rentCount: number;
  saleCount: number;
  activeTab: PropertyType | 'all';
  onTabChange: (tab: PropertyType | 'all') => void;
}

const PropertyTypeTabs = ({
  totalCount,
  rentCount,
  saleCount,
  activeTab,
  onTabChange,
}: PropertyTypeTabsProps) => {
  const getTabCount = (tab: PropertyType | 'all') => {
    switch (tab) {
      case 'all':
        return totalCount;
      case PropertyType.RENT:
        return rentCount;
      case PropertyType.SELL:
        return saleCount;
      default:
        return 0;
    }
  };

  const getTabLabel = (tab: PropertyType | 'all') => {
    switch (tab) {
      case 'all':
        return 'All Properties';
      case PropertyType.RENT:
        return 'For Rent';
      case PropertyType.SELL:
        return 'For Sale';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-4 md:px-6 py-4">
        <nav className="flex flex-col md:flex-row space-x-2 md:space-x-8">
          {(['all', PropertyType.RENT, PropertyType.SELL] as const).map(
            (tab) => {
              const isActive = activeTab === tab;
              const count = getTabCount(tab);

              return (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`py-2 px-3 md:py-3 md:px-4 rounded-lg font-medium text-xs md:text-sm transition-all duration-200 flex items-center gap-1 md:gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-primary-violet text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  {getTabLabel(tab)}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      isActive
                        ? 'bg-white text-primary-violet'
                        : 'bg-white text-gray-700 shadow-sm'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            }
          )}
        </nav>
      </div>
    </div>
  );
};

export default PropertyTypeTabs;
