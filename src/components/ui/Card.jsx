import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  hoverEffect = false,
  as: Component = 'div',
  ...props 
}) {
  const baseStyles = "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden block text-left";
  const hoverStyles = hoverEffect ? "hover:shadow-xl hover:border-aviation-500 transition-all duration-300" : "shadow-xl";

  return (
    <Component className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </Component>
  );
}
