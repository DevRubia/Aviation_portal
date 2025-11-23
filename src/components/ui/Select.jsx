import React from 'react';

export default function Select({ 
  label, 
  id, 
  options = [], 
  error, 
  className = '', 
  disabled,
  required,
  placeholder = 'Select...',
  ...props 
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label} {required && '*'}
        </label>
      )}
      <select
        id={id}
        disabled={disabled}
        required={required}
        className={`block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500 ${error ? 'border-red-500' : ''}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
