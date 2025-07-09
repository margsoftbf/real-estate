import React from 'react';
import CustomerOfferHeader from './CustomerOffer/CustomerOfferHeader';
import {
  DocumentOutline,
  VideoVirtualOutline,
  PropertyInsuranceOutline,
} from '@/assets/icons';
import CustomerOfferCard from './CustomerOffer/CustomerOfferCard';

const customerOffer = [
  {
    id: 1,
    icon: <VideoVirtualOutline className="font-bold text-white w-6 h-6" />,
    title: 'Virtual home Tour',
    description:
      'You can communicate directly with landlords and we provide you with virtual tour before you buy or rent the property.',
    cardBgColor: 'bg-white/20',
    iconBorderColor: 'border-secondary-violet',
    iconMainBgColor: 'bg-secondary-violet',
    iconBgColor: 'bg-secondary-violet',
    titleColor: 'text-white',
    descriptionColor: 'text-white',
  },
  {
    id: 2,
    icon: <PropertyInsuranceOutline className="text-primary-violet w-6 h-6" />,
    title: 'Find the best deal',
    description:
      'Browse thousands of properties, save your favorites and set up search alerts so you don’t miss the best home deal!',
    cardBgColor: 'bg-white',
    iconBorderColor: 'border-purple-300',
    iconMainBgColor: 'bg-white',
    iconBgColor: 'bg-purple-300',
    titleColor: 'text-primary-black',
    descriptionColor: 'text-primary-black',
  },
  {
    id: 3,
    icon: <DocumentOutline className="text-primary-violet w-6 h-6" />,
    title: 'Get ready to apply',
    description:
      'Find your dream house? You just need to do a little to no effort and you can start move in to your new dream home!',
    cardBgColor: 'bg-primary-violet-dark',
    iconBorderColor: 'bg-white',
    iconMainBgColor: 'bg-white',
    iconBgColor: 'bg-white',
    titleColor: 'text-white',
    descriptionColor: 'text-white',
  },
];

const CustomerOffer = () => {
  return (
    <section className="py-12 bg-secondary-violet relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <CustomerOfferHeader />
        <div className="flex flex-col lg:flex-row lg:text-left justify-between items-center mb-8 gap-4">
          {customerOffer.map((item) => (
            <CustomerOfferCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerOffer;
