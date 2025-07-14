import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface EditableInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
  showPasswordToggle?: boolean;
}

const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>(
  (
    {
      fieldName,
      label,
      placeholder,
      type,
      required = false,
      showPasswordToggle = false,
      ...inputProps
    },
    ref
  ) => {
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
            className="mt-1 block w-full px-4 py-3 border bg-purple-50 font-medium border-purple-300 rounded-md placeholder-primary-black/50 focus:outline-none focus:ring-primary-violet focus:border-primary-violet text-body-md focus:bg-white valid:bg-white pr-1"
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 top-1 pr-3 flex items-center text-sm leading-5"
            >
              {passwordVisible ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

EditableInput.displayName = 'EditableInput';

export default EditableInput;
