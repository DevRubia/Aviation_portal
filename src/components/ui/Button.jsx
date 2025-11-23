import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  icon: Icon, 
  className = '', 
  disabled, 
  ...props 
}) {
  const baseStyles = "flex items-center justify-center gap-2 rounded-md px-8 py-3 text-sm font-semibold shadow-sm transition-all transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-aviation-600 to-aviation-500 text-white hover:shadow-xl hover:from-aviation-500 hover:to-aviation-400 focus-visible:outline-aviation-600",
    secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300",
    outline: "border-2 border-aviation-600 text-aviation-600 hover:bg-aviation-50",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          {children}
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </>
      )}
    </button>
  );
}
