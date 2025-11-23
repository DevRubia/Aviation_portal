import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Home, FileText, Bell, User, Menu, X, LogOut } from 'lucide-react';

export default function CoreLayout() {
    const location = useLocation();
    // State to manage mobile sidebar visibility
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Navigation items configuration
    const navigation = [
        { name: 'Home', href: '/core/dashboard', icon: Home },
        { name: 'Registry', href: '/core/registry', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900 bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
                        <ShieldCheck className="h-8 w-8 text-blue-600" />
                        <span>CAA Core</span>
                    </div>
                    <button
                        className="lg:hidden text-slate-500 hover:text-slate-700"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mt-6 px-3 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}
                `}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                            <User className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900">Admin User</p>
                            <p className="text-xs text-slate-500">admin@caa.bg</p>
                        </div>
                    </div>
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-2 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navbar */}
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <button
                        className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex-1 flex justify-end items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
