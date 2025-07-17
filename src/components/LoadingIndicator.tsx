import React from 'react';

export const LoadingIndicator: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-12">
    <span className="inline-block animate-spin rounded-full border-4 border-purple-300 border-t-purple-600 h-12 w-12"></span>
    {label && <span className="text-gray-700 text-lg font-medium mt-2">{label}</span>}
  </div>
);

export default LoadingIndicator; 