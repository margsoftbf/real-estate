import React from 'react';
import EditableInput from '@/components/common/EditableInput';
import Button from '@/components/ui/Button/Button';

interface PropertyPhotosSectionProps {
  photos: string[];
  validationErrors: Record<string, string>;
  onPhotoChange: (index: number, value: string) => void;
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
}

const PropertyPhotosSection: React.FC<PropertyPhotosSectionProps> = ({
  photos,
  validationErrors,
  onPhotoChange,
  onAddPhoto,
  onRemovePhoto,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-6">Property Photos</h2>
      <div className="space-y-4">
        {photos?.map((photo, index) => (
          <div key={index} className="flex gap-3 items-end">
            <div className="flex-1">
              <EditableInput
                fieldName={`photo-${index}`}
                label={`Photo ${index + 1} URL`}
                placeholder="https://example.com/photo.jpg"
                type="url"
                value={photo}
                onChange={(e) => onPhotoChange(index, e.target.value)}
                error={validationErrors[`photos.${index}`]}
              />
            </div>
            {photos.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemovePhoto(index)}
                className="mb-1"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddPhoto}
        >
          Add Another Photo
        </Button>
      </div>
    </div>
  );
};

export default PropertyPhotosSection;