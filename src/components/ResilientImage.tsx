import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackLabel,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-sky-50 to-slate-100 text-teal-800 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <PawPrint className="w-10 h-10 text-teal-600 mb-2 opacity-80" />
        <span className="text-xs font-medium text-slate-600">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
