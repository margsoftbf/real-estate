import Button from '@/components/ui/Button';
import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-t from-purple-50 via-purple-50 via-80% lg:via-90% to-white to-95% lg:to-100%">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col items-center gap-4">
          <p className="text-h4 text-primary-violet px-6 lg:px-0">
            No Spam Promise
          </p>
          <p className="text-primary-black text-h3">Are you a landlord?</p>
          <p className="text-body-md text-primary-black/50">
            Discover ways to increase your home value and get listed. No Spam.
          </p>
          <div className="flex flex-col gap-4 lg:hidden">
            <input
              type="text"
              placeholder="Enter your email address"
              className="
                max-w-md w-full py-3 px-3 bg-white text-gray-700 text-body-lg
                focus:outline-none transition-all
                border-0
              "
            />

            <Button variant="primary" size="md" className="w-full max-w-sm">
              Submit
            </Button>
          </div>
          <div className="lg:block relative w-full max-w-lg my-4">
            <input
              type="text"
              placeholder="Enter your email address"
              className="
                w-full py-4 px-6 bg-white text-gray-700 text-body-md
                focus:outline-none transition-all text-body-md-medium
                border-0 rounded-md
              "
            />
            <Button
              variant="primary"
              size="md"
              className="w-full max-w-28 absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              Submit
            </Button>
          </div>
          <p className="text-body-md text-gray-400">
            Join <span className="text-primary-violet">10,000+</span> other
            landlords in our rent smart community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
