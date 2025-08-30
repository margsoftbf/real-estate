import { HashLoader, ScaleLoader, ClipLoader, BeatLoader } from 'react-spinners';

export interface LoadingProps {
  type?: 'hash' | 'scale' | 'clip' | 'beat';
  size?: number | string;
  className?: string;
  color?: string;
}

const DEFAULT_COLOR = '#7065f0';

export const Loading = ({ 
  type = 'hash', 
  size = 50, 
  className = '', 
  color = DEFAULT_COLOR 
}: LoadingProps) => {
  const baseClasses = `flex justify-center items-center ${className}`;

  const renderSpinner = () => {
    switch (type) {
      case 'hash':
        return <HashLoader color={color} size={size} />;
      case 'scale':
        return <ScaleLoader color={color} height={size} />;
      case 'clip':
        return <ClipLoader color={color} size={size} />;
      case 'beat':
        return <BeatLoader color={color} size={size} />;
      default:
        return <HashLoader color={color} size={size} />;
    }
  };

  return (
    <div className={baseClasses}>
      {renderSpinner()}
    </div>
  );
};

export const PageLoading = ({ className = '' }: { className?: string }) => (
  <div className={`min-h-screen flex justify-center items-center ${className}`}>
    <Loading type="hash" size={60} />
  </div>
);

export const ButtonLoading = ({ className = '' }: { className?: string }) => (
  <Loading type="beat" size={8} className={className} />
);

export const InlineLoading = ({ className = '' }: { className?: string }) => (
  <Loading type="clip" size={20} className={className} />
);

export const FormLoading = ({ className = '' }: { className?: string }) => (
  <div className={`py-8 ${className}`}>
    <Loading type="scale" size={35} />
  </div>
);