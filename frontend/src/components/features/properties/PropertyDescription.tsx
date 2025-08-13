import React from 'react';

interface PropertyDescriptionProps {
  description: string | null;
}
const PropertyDescription = ({ description }: PropertyDescriptionProps) => {
  return (
    <>
      {description && (
        <div className="my-6">
          <h2 className="text-xl font-semibold text-primary-black mb-2">
            About this home
          </h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      )}
    </>
  );
};

export default PropertyDescription;
