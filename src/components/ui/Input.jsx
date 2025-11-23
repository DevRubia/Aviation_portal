import React from 'react';

export default function Input({ 
  label, 
  id, 
  error, 
  className = '', 
  disabled,
  required,
  ...props 
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label} {required && '*'}
        </label>
      )}
      <input
        id={id}
        disabled={disabled}
        required={required}
        className={`block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500 ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
