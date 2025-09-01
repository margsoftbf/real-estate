import React, { useState } from 'react';
import EditableInput from '@/components/common/EditableInput';
import EditableSelect from '@/components/common/EditableSelect';
import Button from '@/components/ui/Button/Button';

interface PriceChangeSectionProps {
  currentPrice: number;
  onPriceChange: (newPrice: number, reason: string) => void;
  validationErrors?: { price?: string; priceChangeReason?: string; customReason?: string };
  isEditMode?: boolean;
}

const PriceChangeSection: React.FC<PriceChangeSectionProps> = ({
  currentPrice,
  onPriceChange,
  validationErrors = {},
  isEditMode = true,
}) => {
  const [newPrice, setNewPrice] = useState<number>(0);
  const [reason, setReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [showPriceChange, setShowPriceChange] = useState<boolean>(false);

  const reasonOptions = [
    { value: '', label: 'Select a reason...' },
    { value: 'Market adjustment', label: 'Market adjustment' },
    { value: 'Property improvements', label: 'Property improvements' },
    { value: 'Seasonal pricing', label: 'Seasonal pricing' },
    { value: 'Competitive pricing', label: 'Competitive pricing' },
    { value: 'Maintenance costs', label: 'Maintenance costs' },
    { value: 'High demand', label: 'High demand' },
    { value: 'Low demand', label: 'Low demand' },
    { value: 'Other', label: 'Other' },
  ];

  const handleApplyPriceChange = () => {
    const finalReason = reason === 'Other' ? customReason : reason;
    const isValidChange = isEditMode 
      ? newPrice && finalReason && newPrice !== currentPrice
      : newPrice && (finalReason || !isEditMode);
    
    if (isValidChange) {
      onPriceChange(newPrice, finalReason || 'Initial price');
      setNewPrice(0);
      setReason('');
      setCustomReason('');
      setShowPriceChange(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-6">Price Management</h2>
      
      <div className="space-y-4">
        {isEditMode && currentPrice > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Current Price</p>
            <p className="text-2xl font-bold text-green-600">{formatPrice(currentPrice)}</p>
          </div>
        )}

        {!showPriceChange ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => setShowPriceChange(true)}
          >
            {isEditMode ? 'Change Price' : 'Set Price'}
          </Button>
        ) : (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <EditableInput
              fieldName="newPrice"
              label="New Price *"
              placeholder="Enter new price"
              type="number"
              value={newPrice.toString()}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              error={validationErrors.price}
            />

            <EditableSelect
              fieldName="priceChangeReason"
              label="Reason for Price Change *"
              options={reasonOptions}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              error={validationErrors.priceChangeReason}
            />

            {reason === 'Other' && (
              <EditableInput
                fieldName="customReason"
                label="Custom Reason *"
                placeholder="Enter custom reason"
                type="text"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                error={validationErrors.customReason}
              />
            )}

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleApplyPriceChange}
                disabled={!newPrice || !(reason === 'Other' ? customReason : reason) || (isEditMode && newPrice === currentPrice)}
              >
                {isEditMode ? 'Apply Price Change' : 'Set Price'}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  setShowPriceChange(false);
                  setNewPrice(0);
                  setReason('');
                  setCustomReason('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChangeSection;