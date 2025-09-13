import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface EditableSelectOption {
  value: string;
  label: string;
}

interface EditableSelectProps {
  fieldName: string;
  label: string;
  options: EditableSelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  error?: string;
}

const EditableSelect: React.FC<EditableSelectProps> = ({
  fieldName,
  label,
  options,
  placeholder = 'Select...',
  value = '',
  onChange,
  className = '',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);

    if (onChange) {
      const syntheticEvent = {
        target: { value: optionValue, name: fieldName },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div
      className={`flex flex-col gap-1 relative ${className}`}
      ref={dropdownRef}
    >
      <label
        htmlFor={fieldName}
        className="block text-body-sm-medium text-primary-black"
      >
        {label}
      </label>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          mt-1 w-full px-4 py-3 border bg-white font-medium 
          rounded-md focus:ring-1 focus:outline-none text-body-md focus:bg-white text-left
          flex items-center justify-between transition-colors duration-200
          ${selectedValue ? 'bg-white' : ''}
          ${error 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-purple-300 focus:ring-primary-violet focus:border-primary-violet'
          }
        `}
        data-error={!!error}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={
            selectedValue ? 'text-primary-black' : 'text-primary-black/50'
          }
        >
          {displayValue}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-purple-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="py-3 px-4 text-body-sm text-gray-500">
              No options available
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={`
                  w-full px-4 py-3 text-left text-body-md hover:bg-purple-100 
                  transition-colors duration-150 flex items-center justify-between
                  ${!selectedValue ? 'bg-purple-100 text-primary-violet-dark font-medium' : 'text-primary-black'}
                `}
              >
                {placeholder}
                {!selectedValue && <Check className="h-4 w-4" />}
              </button>
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full px-4 py-3 text-left text-body-md hover:bg-purple-100 
                    transition-colors duration-150 flex items-center justify-between cursor-pointer
                    ${index === options.length - 1 ? 'rounded-b-lg' : ''}
                    ${selectedValue === option.value ? 'bg-purple-100 text-primary-violet-dark font-medium' : 'text-primary-black'}
                  `}
                >
                  {option.label}
                  {selectedValue === option.value && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </>
          )}
        </div>
      )}

      <select
        id={fieldName}
        name={fieldName}
        value={selectedValue}
        onChange={() => {}}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <span className="text-sm text-red-600 mt-1">{error}</span>
      )}
    </div>
  );
};

export default EditableSelect;
