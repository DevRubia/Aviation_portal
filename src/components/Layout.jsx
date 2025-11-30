import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Plane, Bell, User } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/portal" className="flex items-center gap-2 text-aviation-600 hover:text-aviation-700 transition-colors">
              <Plane className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight">SkyLicensing Sofia</span>
            </Link>

            <div className="flex items-center gap-6">
              <nav className="flex gap-6 mr-4">
                <Link
                  to="/portal"
                  className={`font-medium transition-colors ${location.pathname === '/portal' ? 'text-aviation-600' : 'text-slate-600 hover:text-aviation-600'}`}
                >
                  Home
                </Link>
                <Link
                  to="/portal/dashboard"
                  className={`font-medium transition-colors ${location.pathname.includes('/portal/dashboard') ? 'text-aviation-600' : 'text-slate-600 hover:text-aviation-600'}`}
                >
                  Dashboard
                </Link>
              </nav>

              <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                <Link to="/portal/notifications" className="relative text-slate-500 hover:text-aviation-600 transition-colors p-1">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </Link>

                <Link to="/portal/profile" className="flex items-center gap-2 text-slate-700 hover:text-aviation-600 transition-colors group">
                  <div className="h-8 w-8 rounded-full bg-aviation-100 flex items-center justify-center text-aviation-700 group-hover:bg-aviation-200 transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium hidden sm:block">Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow bg-slate-50">
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
