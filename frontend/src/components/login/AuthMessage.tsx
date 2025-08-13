import React from 'react';

interface AuthMessageProps {
  successMessage: string | null;
  errorMessage?: string;
  isError: boolean;
}

const AuthMessage = ({
  successMessage,
  isError,
  errorMessage,
}: AuthMessageProps) => {
  return (
    <>
      {successMessage && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">{successMessage}</p>
        </div>
      )}

      {isError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">
            {errorMessage || 'Login failed. Please try again.'}
          </p>
        </div>
      )}
    </>
  );
};

export default AuthMessage;
