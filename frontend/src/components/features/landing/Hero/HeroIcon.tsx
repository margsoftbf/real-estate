import React from 'react';

interface HeroIconProps {
  mainIcon: React.ReactNode;
  secondaryIcon: React.ReactNode;
  title: string;
  description: string;
}

const HeroIcon = ({
  mainIcon,
  secondaryIcon,
  title,
  description,
}: HeroIconProps) => {
  return (
    <div className="flex-1 flex flex-col items-center lg:items-start">
      <div className="relative flex items-center justify-center mb-2">
        <div className="rounded-full border-2 border-purple-300 bg-white w-20 h-20 p-1.5 flex items-center justify-center">
          <div className="rounded-full bg-purple-300 w-full h-full flex items-center justify-center">
            {mainIcon}
          </div>
        </div>
        <div className="absolute -bottom-0.5 right-0">
          <div className="bg-primary-violet rounded-md p-1.5 flex items-center justify-center">
            {secondaryIcon}
          </div>
        </div>
      </div>
      <div className="text-body-xl font-bold text-primary-violet text-center mb-0.5">
        {title}
      </div>
      <div className="text-body-sm-medium text-primary-black text-center">
        {description}
      </div>
    </div>
  );
};

export default HeroIcon;
