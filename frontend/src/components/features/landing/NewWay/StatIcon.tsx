import React from 'react';

interface StatIconProps {
  mainIcon: React.ReactNode;
  secondaryIcon: React.ReactNode;
}

const StatIcon: React.FC<StatIconProps> = ({ mainIcon, secondaryIcon }) => {
  return (
    <div className="relative inline-block">
      <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full border-2 border-purple-300">
        <div className="w-12 h-12 flex items-center justify-center bg-purple-300 rounded-full">
          {mainIcon}
        </div>
      </div>
      <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-7 h-7 bg-primary-violet rounded-full border-2 border-white">
        {secondaryIcon}
      </div>
    </div>
  );
};

export default StatIcon;
