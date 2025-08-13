import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 mb-4">
        No properties found matching your criteria.
      </p>
      <p className="text-sm text-gray-500">
        Try adjusting your search or filters.
      </p>
    </div>
  );
};

export default EmptyState;