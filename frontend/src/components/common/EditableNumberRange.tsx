import React from 'react';
import EditableInput from './EditableInput';

interface EditableNumberRangeProps {
  label: string;
  minFieldName: string;
  maxFieldName: string;
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  placeholder?: { min: string; max: string };
  step?: number;
}

const EditableNumberRange: React.FC<EditableNumberRangeProps> = ({
  label,
  minFieldName,
  maxFieldName,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  placeholder = { min: 'Min', max: 'Max' },
  step = 1,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-body-sm-medium text-primary-black">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        <EditableInput
          fieldName={minFieldName}
          label=""
          placeholder={placeholder.min}
          type="number"
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          step={step}
        />
        <EditableInput
          fieldName={maxFieldName}
          label=""
          placeholder={placeholder.max}
          type="number"
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          step={step}
        />
      </div>
    </div>
  );
};

export default EditableNumberRange;
