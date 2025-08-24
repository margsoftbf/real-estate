import React, { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import EditableInput from '@/components/common/EditableInput';
import EditableSelect from '@/components/common/EditableSelect';
import { useAIDescription } from '@/hooks/llm/useAIDescription';

interface AIDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (data: {
    title: string;
    description: string;
    tags: string[];
    highlights: string[];
    city?: string;
    price?: number;
  }) => void;
  propertyType?: 'apartment' | 'house' | 'studio' | 'room';
  location?: string;
}

const AIDescriptionModal: React.FC<AIDescriptionModalProps> = ({
  isOpen,
  onClose,
  onGenerated,
  propertyType = 'apartment',
  location = '',
}) => {
  const [formData, setFormData] = useState({
    shortDescription: '',
    propertyType: propertyType,
    listingType: 'rent' as 'rent' | 'sale',
    rooms: 2,
    area: 50,
    location: location,
    price: '',
    features: '',
  });

  const { generateDescription, isGenerating } = useAIDescription();

  const handleSubmit = async () => {
    if (!formData.shortDescription.trim()) {
      return;
    }

    const result = await generateDescription({
      propertyType: formData.propertyType,
      listingType: formData.listingType,
      rooms: formData.rooms,
      area: formData.area,
      location: formData.location || 'City Center',
      price: formData.price ? parseInt(formData.price) : undefined,
      features: formData.features,
      additionalInfo: formData.shortDescription,
    });

    if (result) {
      onGenerated({
        ...result,
        ...(formData.location && { city: formData.location }),
        ...(formData.price &&
          parseInt(formData.price) > 0 && { price: parseInt(formData.price) }),
      });
      onClose();
      setFormData({
        shortDescription: '',
        propertyType: 'apartment',
        listingType: 'rent',
        rooms: 2,
        area: 50,
        location: '',
        price: '',
        features: '',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                AI Property Description Generator
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  FREE
                </span>
              </h2>
              <p className="text-gray-600 mt-1">
                Tell us about your property and we&apos;ll create a professional
                description
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell us about your property *
              </label>
              <textarea
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shortDescription: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="e.g., Modern apartment in city center, recently renovated, has balcony and parking, quiet neighborhood, close to metro..."
                className="mt-1 block w-full px-4 py-3 border bg-white font-medium rounded-md placeholder-primary-black/50 focus:ring-1 focus:outline-none text-body-md focus:bg-purple-50 valid:bg-white border-purple-300 focus:ring-primary-violet focus:border-primary-violet resize-none"
                rows={4}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Describe key features, location advantages, recent
                renovations, amenities, etc. Press Ctrl+Enter to generate.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">
                Quick Details (optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <EditableSelect
                  fieldName="propertyType"
                  label="Property Type"
                  options={[
                    { value: 'apartment', label: 'Apartment' },
                    { value: 'house', label: 'House' },
                    { value: 'studio', label: 'Studio' },
                    { value: 'room', label: 'Room' },
                  ]}
                  value={formData.propertyType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      propertyType: e.target.value as
                        | 'apartment'
                        | 'house'
                        | 'studio'
                        | 'room',
                    }))
                  }
                />

                <EditableSelect
                  fieldName="listingType"
                  label="Listing Type"
                  options={[
                    { value: 'rent', label: 'For Rent' },
                    { value: 'sale', label: 'For Sale' },
                  ]}
                  value={formData.listingType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      listingType: e.target.value as 'rent' | 'sale',
                    }))
                  }
                />

                <EditableInput
                  fieldName="rooms"
                  label="Rooms"
                  type="number"
                  placeholder="2"
                  value={formData.rooms.toString()}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      rooms: parseInt(e.target.value) || 1,
                    }))
                  }
                />

                <EditableInput
                  fieldName="area"
                  label="Area (m²)"
                  type="number"
                  placeholder="50"
                  value={formData.area.toString()}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      area: parseInt(e.target.value) || 30,
                    }))
                  }
                />

                <EditableInput
                  fieldName="location"
                  label="Location"
                  type="text"
                  placeholder="City, District"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />

                <EditableInput
                  fieldName="price"
                  label="Price (PLN)"
                  type="text"
                  placeholder="2500"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mt-4">
                <EditableInput
                  fieldName="features"
                  label="Features (optional)"
                  type="text"
                  placeholder="balcony, garage, AC, garden, elevator..."
                  value={formData.features}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      features: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1"
                disabled={isGenerating}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!formData.shortDescription.trim() || isGenerating}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>Generate Professional Description</>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>How it works:</strong> Describe your property in your own
              words, add some basic details, and our AI will create a
              professional description with title, detailed description, and key
              highlights that you can use in your listing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDescriptionModal;
