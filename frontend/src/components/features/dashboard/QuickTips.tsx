import React from 'react';

export const QuickTips = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
      <div className="space-y-3">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 Add high-quality photos to increase views by 40%
          </p>
        </div>
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            🎯 Complete property descriptions perform better
          </p>
        </div>
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-800">
            📈 Regular price updates keep listings competitive
          </p>
        </div>
      </div>
    </div>
  );
};