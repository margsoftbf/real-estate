import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface EditableInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const EditableInput = ({
  fieldName,
  label,
  placeholder,
  type,
  required = false,
  showPasswordToggle = false,
  error,
  ref,
  ...inputProps
}: EditableInputProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const inputType = showPasswordToggle
      ? passwordVisible
        ? 'text'
        : 'password'
      : type;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={fieldName}
          className="block text-body-sm-medium text-primary-black"
        >
          {label}
        </label>
        <div className="relative">
          <input
            {...inputProps}
            ref={ref}
            id={fieldName}
            name={fieldName}
            type={inputType}
            placeholder={placeholder}
            required={required}
            data-error={!!error}
            className={`mt-1 block w-full px-4 py-3 border bg-white font-medium rounded-md placeholder-primary-black/50 focus:ring-1 focus:outline-none text-body-md focus:bg-purple-50 valid:bg-white pr-1 ${
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-purple-300 focus:ring-primary-violet focus:border-primary-violet'
            }`}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 top-1 pr-3 flex items-center text-sm leading-5 min-w-[44px] min-h-[44px]"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
        </div>
        {error && (
          <span className="text-xs text-body-sm-medium text-red-600 mt-1">
            {error}
          </span>
        )}
      </div>
    );
};


export default EditableInput;
