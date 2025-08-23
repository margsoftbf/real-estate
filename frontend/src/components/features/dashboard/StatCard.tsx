import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

export const StatCard = ({ title, value, subtitle, className = "" }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className={`text-2xl font-bold ${className}`}>
        {value}
      </div>
      <div className="text-gray-500 text-sm">{title}</div>
      {subtitle && (
        <div className="text-xs text-gray-400 mt-2">
          {subtitle}
        </div>
      )}
    </div>
  );
};