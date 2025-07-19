import React from 'react';

interface DashboardContentProps {
  userFirstName: string;
  userRole: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ 
  userFirstName, 
  userRole 
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back, {userFirstName}!
        </h1>
        <p className="text-gray-600 mt-1">
          Role: <span className="capitalize font-semibold">{userRole}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">12</div>
          <div className="text-gray-500 mt-1">Properties</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">28</div>
          <div className="text-gray-500 mt-1">Tenants</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">$45,600</div>
          <div className="text-gray-500 mt-1">Revenue</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-red-600">3</div>
          <div className="text-gray-500 mt-1">Issues</div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Dashboard Content</h2>
        <p className="text-gray-600">
          Your dashboard content will go here...
        </p>
      </div>
    </div>
  );
};

export default DashboardContent;