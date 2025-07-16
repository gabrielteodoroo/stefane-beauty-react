import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="mb-2">
      <label className="block mb-1 font-medium">{label}</label>
      {children}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
} 