import React from 'react';
import { Link } from 'react-router-dom';
import { FileBadge, Award, BookOpen } from 'lucide-react';

const LicenseCard = ({ title, description, icon: Icon, to }) => (
  <Link to={to} className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 hover:border-aviation-300 hover:shadow-lg transition-all duration-300">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-aviation-50 group-hover:bg-aviation-100 transition-colors">
      <Icon className="h-6 w-6 text-aviation-600" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-aviation-700">{title}</h3>
    <p className="mt-2 text-slate-600 text-sm leading-relaxed">{description}</p>
    <div className="mt-4 flex items-center text-sm font-medium text-aviation-600 opacity-0 group-hover:opacity-100 transition-opacity">
      Apply Now <span className="ml-1">→</span>
    </div>
  </Link>
);

export default function Dashboard() {
  return (
    <div className="bg-slate-50 min-h-full py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Welcome back, Pilot
            </h2>
            <p className="mt-1 text-sm text-slate-500">Select a service to proceed with your application.</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <LicenseCard
            title="Student Pilot License (SPL)"
            description="Begin your aviation journey. Apply for your initial student pilot license to start training."
            icon={BookOpen}
            to="/guidelines/spl"
          />
          <LicenseCard
            title="Private Pilot License (PPL)"
            description="Fly for leisure. Apply for a PPL to fly private aircraft for non-commercial purposes."
            icon={FileBadge}
            to="/guidelines/ppl"
          />
          <LicenseCard
            title="Commercial Pilot License (CPL)"
            description="Turn your passion into a career. Apply for a CPL to fly professionally."
            icon={Award}
            to="/guidelines/cpl"
          />
        </div>
      </div>
    </div>
  );
}
