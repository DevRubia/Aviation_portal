import React from 'react';

export default function SectionHeader({ title, className = '' }) {
  return (
    <h3 className={`text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2 ${className}`}>
      {title}
    </h3>
  );
}
