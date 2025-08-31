import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, ArrowLeftIcon } from 'lucide-react';

const Custom404: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative mx-auto w-64 h-64 mb-6">
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* House illustration */}
              <rect x="120" y="180" width="160" height="100" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" rx="8"/>
              <polygon points="110,180 200,120 290,180" fill="#7c3aed" stroke="#6d28d9" strokeWidth="2"/>
              <rect x="150" y="200" width="30" height="50" fill="#3b82f6" rx="4"/>
              <rect x="220" y="200" width="30" height="30" fill="#60a5fa" rx="4"/>
              <circle cx="175" cy="215" r="2" fill="#1e40af"/>
              
              {/* Key floating */}
              <g transform="translate(300, 140) rotate(15)">
                <rect x="0" y="8" width="20" height="6" fill="#fbbf24" rx="3"/>
                <circle cx="25" cy="11" r="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                <rect x="30" y="9" width="4" height="4" fill="none" stroke="#d97706" strokeWidth="2"/>
              </g>
              
              {/* Floating question marks */}
              <text x="80" y="100" fill="#9ca3af" fontSize="24" fontWeight="bold">?</text>
              <text x="320" y="80" fill="#9ca3af" fontSize="18" fontWeight="bold">?</text>
              <text x="60" y="200" fill="#9ca3af" fontSize="20" fontWeight="bold">?</text>
            </svg>
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-primary-violet mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Property Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the property you're looking for seems to have been sold or moved. 
            Let's help you find your perfect home instead!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-violet text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/rent" className="text-primary-violet hover:underline">
              Browse Rentals
            </Link>
            <Link href="/buy" className="text-primary-violet hover:underline">
              Buy Properties
            </Link>
            <Link href="/dashboard" className="text-primary-violet hover:underline">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;