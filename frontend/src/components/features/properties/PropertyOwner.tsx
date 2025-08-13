import React from 'react';
import Image from 'next/image';
import { PropertyPublicDto } from '@/types/properties';
import { CallOutline, MessageOutline } from '@/assets/icons';

interface PropertyOwnerProps {
  property: PropertyPublicDto;
}

const PropertyOwner = ({ property }: PropertyOwnerProps) => {
  const contactInfo = [
    {
      id: 1,
      label: 'Phone number',
      value: property.owner.phoneNumber,
      icon: <CallOutline className="w-4 h-4 mr-3" />,
    },
    {
      id: 2,
      label: 'Email',
      value: property.owner.email,
      icon: <MessageOutline className="w-4 h-4 mr-3" stroke="currentColor" />,
    },
  ];

  return (
    <div className="mb-6">
      <div className="bg-purple-50 border-2 border-purple-300 rounded-lg px-5 py-4">
        <h2 className="text-body-md font-semibold text-primary-black/50 mb-4">
          Property Owner
        </h2>
        <div className="flex items-center mb-6">
          {property.owner.avatarUrl ? (
            <Image
              src={property.owner.avatarUrl}
              alt={`${property.owner.firstName} ${property.owner.lastName}`}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-primary-violet rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-xl font-jakarta">
                {property.owner.firstName?.[0] || '?'}
              </span>
            </div>
          )}
          <div className="ml-4">
            <h3 className="font-semibold text-gray-900">
              {property.owner.firstName} {property.owner.lastName}
            </h3>
            <p className="text-sm text-primary-black/50 font-medium">
              Property Owner LLC.
            </p>
          </div>
        </div>

        {contactInfo.map((item) => (
          <div
            className="mb-2 bg-purple-300 px-3 py-3 rounded-lg"
            key={item.id}
          >
            <a
              href={`${item.label === 'Phone number' ? `tel:${item.value}` : `mailto:${item.value}`}`}
              className="flex items-center font-semibold text-sm text-primary-violet hover:text-primary-violet-dark"
            >
              {item.icon}
              {item.value}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyOwner;
