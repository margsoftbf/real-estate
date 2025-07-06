import React from 'react';

const CustomerOfferHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row text-center lg:text-left justify-between items-center mb-8 lg:mb-16">
      <p className="text-h3 font-bold text-white px-6 lg:px-0 sm:text-4xl lg:w-1/2 lg:max-w-sm">
        We make it easy for <span className="text-primary-violet">tenants</span>{' '}
        and <span className="text-primary-violet">landlords.</span>
      </p>
      <p className="mt-6 text-body-md px-6 lg:px-0  text-white opacity-70 lg:text-lg lg:w-1/2 lg:max-w-md lg:mt-0">
        Whether it’s selling your current home, getting financing, or buying a
        new home, we make it easy and efficient. The best part? you’ll save a
        bunch of money and time with our services.
      </p>
    </div>
  );
};

export default CustomerOfferHeader;
