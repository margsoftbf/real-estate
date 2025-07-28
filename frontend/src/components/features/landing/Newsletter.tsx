import Button from '@/components/ui/Button/Button';
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitted(true);
    // Here you would typically send the email to your backend
    console.log('Newsletter signup:', email);
  };
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
          
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 max-w-lg w-full">
              <p className="text-green-800 text-body-md-medium">
                Thank you! We've received your email and will keep you updated.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 lg:hidden">
                <div className="flex flex-col">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className={`
                      max-w-md w-full py-3 px-3 bg-white text-gray-700 text-body-lg
                      focus:outline-none transition-all border-0 rounded-md
                      ${error ? 'border-2 border-red-300' : ''}
                    `}
                  />
                  {error && (
                    <p className="text-red-500 text-body-sm mt-1 text-left">
                      {error}
                    </p>
                  )}
                </div>

                <Button 
                  variant="primary" 
                  size="md" 
                  className="w-full max-w-sm"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
              <div className="hidden lg:block relative w-full max-w-lg my-4">
                <div className="flex flex-col">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className={`
                        w-full py-4 px-6 bg-white text-gray-700 text-body-md
                        focus:outline-none transition-all text-body-md-medium
                        border-0 rounded-md
                        ${error ? 'border-2 border-red-300' : ''}
                      `}
                    />
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full max-w-28 absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-body-sm mt-1 text-left">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
          
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
