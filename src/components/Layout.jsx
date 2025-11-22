import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 text-aviation-600 hover:text-aviation-700 transition-colors">
              <Plane className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight">SkyLicensing</span>
            </Link>
            <nav className="flex gap-6">
              <Link to="/" className="text-slate-600 hover:text-aviation-600 font-medium transition-colors">Home</Link>
              <Link to="/dashboard" className="text-slate-600 hover:text-aviation-600 font-medium transition-colors">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Aviation Licensing Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
