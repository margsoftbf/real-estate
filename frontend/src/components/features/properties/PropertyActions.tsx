import React from 'react';
import { ShareOutline, HeartOutline } from '@/assets/icons';
import Button from '@/components/ui/Button/Button';

const PropertyActions = () => {
  return (
    <div className="flex justify-between lg:justify-end items-center mb-4 lg:mb-0 w-full lg:w-auto gap-2 lg:gap-2">
      <Button 
        size="lg" 
        variant="gray" 
        className="gap-1.5 w-full lg:w-auto lg:!px-3 lg:!py-2 lg:text-sm"
      >
        <ShareOutline className="w-4 h-4 text-primary-violet-dark" />
        <span>Share</span>
      </Button>
      <Button 
        size="lg" 
        variant="gray" 
        className="gap-1.5 w-full lg:w-auto lg:!px-3 lg:!py-2 lg:text-sm"
      >
        <HeartOutline className="w-4 h-4 text-primary-violet-dark" />
        <span>Favorite</span>
      </Button>
    </div>
  );
};

export default PropertyActions;
