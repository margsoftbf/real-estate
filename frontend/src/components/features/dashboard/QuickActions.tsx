import React from 'react';
import Link from 'next/link';
import {
  HouseOutline,
  SettingOutline,
  AddOutline,
  DocumentOutline,
} from '@/assets/icons';

export const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <SettingOutline className="w-5 h-5 mr-2" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/landlord/add-listing" className="group">
          <div className="p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
            <AddOutline className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Add Property</h3>
            <p className="text-sm text-gray-500">List a new property</p>
          </div>
        </Link>

        <Link href="/landlord/my-listings" className="group">
          <div className="p-4 border rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors">
            <HouseOutline className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">Manage Properties</h3>
            <p className="text-sm text-gray-500">View & edit listings</p>
          </div>
        </Link>

        <Link href="/settings" className="group">
          <div className="p-4 border rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors">
            <SettingOutline className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900">Settings</h3>
            <p className="text-sm text-gray-500">Account settings</p>
          </div>
        </Link>

        <div className="p-4 border rounded-lg bg-gray-50 opacity-60">
          <DocumentOutline className="w-8 h-8 text-gray-400 mb-2" />
          <h3 className="font-medium text-gray-500">Analytics</h3>
          <p className="text-sm text-gray-400">Coming soon</p>
        </div>
      </div>
    </div>
  );
};