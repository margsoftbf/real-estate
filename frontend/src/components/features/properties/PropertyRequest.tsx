import React, { useState } from 'react';
import {
  CheckCircleOutline,
  CloseOutline,
  VideoVirtualOutline,
  LocationControlBold,
  TourInPersonOutline,
} from '@/assets/icons';
import Button from '@/components/ui/Button/Button';

const PropertyRequest = () => {
  const [tourType, setTourType] = useState<'in-person' | 'virtual'>(
    'in-person'
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleTourRequest = () => {
    setShowSuccessModal(true);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const tourOptions = [
    {
      id: 'in-person',
      label: 'In Person',
      icon: TourInPersonOutline,
    },
    {
      id: 'virtual',
      label: 'Virtual',
      icon: VideoVirtualOutline,
    },
  ];

  return (
    <div className="mb-6">
      <div className="bg-white border-2 border-purple-300 rounded-lg px-5 py-4">
        <h2 className="text-mody-md font-semibold text-primary-black mb-6">
          Request a home tour
        </h2>

        <div>
          <div className="flex flex-row gap-2 mb-4">
            {tourOptions.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  setTourType(option.id as 'in-person' | 'virtual')
                }
                className={`flex-1 px-4 py-3 text-sm font-medium border-2 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  tourType === option.id
                    ? 'bg-purple-200 text-primary-violet-dark border-primary-violet-dark'
                    : 'bg-white text-primary-black/50 border-purple-300 hover:bg-purple-50'
                }`}
              >
                <option.icon
                  className={`w-4 h-4 ${
                    tourType === option.id
                      ? 'text-primary-violet-dark'
                      : 'text-primary-black/50'
                  }`}
                />
                {option.label}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                id="tour-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-3 border bg-purple-50 font-medium border-purple-300 rounded-md focus:ring-1 focus:outline-none focus:ring-primary-violet focus:border-primary-violet text-body-md focus:bg-white"
                min={new Date().toISOString().split('T')[0]}
                placeholder="Select Date"
              />
            </div>
          </div>

          <Button
            onClick={handleTourRequest}
            size="lg"
            variant="secondary"
            className="w-full mb-4 flex items-center justify-center gap-2 text-body-md-bold text-white font-semibold"
            disabled={!selectedDate}
          >
            <LocationControlBold className="w-5 h-5" />
            Request a Tour
          </Button>
          <p className="text-body-sm text-primary-black/50 text-xs px-1">
            It’s free, with no obligation － cancel anytime.
          </p>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/30 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-md w-full">
            <div className="flex justify-end mb-2">
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <CloseOutline className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircleOutline className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-primary-black mb-2">
                Tour Request Sent!
              </h3>
              <p className="text-primary-black/70 mb-6">
                Your {tourType.replace('-', ' ')} tour request for{' '}
                {selectedDate} has been sent to the property owner. They will
                contact you soon to confirm the details.
              </p>
              <Button onClick={closeModal} className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyRequest;
