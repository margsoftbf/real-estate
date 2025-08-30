import React, { forwardRef } from 'react';

interface EditableTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fieldName: string;
  label: string;
  placeholder: string;
  required?: boolean;
  error?: string;
}

const EditableTextarea = forwardRef<HTMLTextAreaElement, EditableTextareaProps>(
  (
    {
      fieldName,
      label,
      placeholder,
      required = false,
      error,
      ...textareaProps
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={fieldName}
          className="block text-body-sm-medium text-primary-black"
        >
          {label}
        </label>
        <textarea
          {...textareaProps}
          ref={ref}
          id={fieldName}
          name={fieldName}
          placeholder={placeholder}
          required={required}
          data-error={!!error}
          className={`mt-1 block w-full px-4 py-3 border bg-white font-medium rounded-md placeholder-primary-black/50 focus:ring-1 focus:outline-none text-body-md focus:bg-purple-50 valid:bg-white ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-purple-300 focus:ring-primary-violet focus:border-primary-violet'
          }`}
        />
        {error && (
          <span className="text-xs text-body-sm-medium text-red-600 mt-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

EditableTextarea.displayName = 'EditableTextarea';

export default EditableTextarea;