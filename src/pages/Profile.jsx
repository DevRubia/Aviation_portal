import React from 'react';
import { User, Mail, Phone, MapPin, Shield, Calendar, Edit } from 'lucide-react';

export default function Profile() {
  // Mock user data
  const user = {
    name: "Alex Morgan",
    role: "Commercial Pilot",
    email: "alex.morgan@aviation.com",
    phone: "+359 88 123 4567",
    location: "Sofia, Bulgaria",
    memberSince: "March 2023",
    licenseNumber: "BG-CPL-12345",
    avatar: ""
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header/Cover */}
        <div className="bg-aviation-600 h-32 md:h-48"></div>
        
        <div className="px-4 py-5 sm:px-6 relative">
          <div className="-mt-16 sm:-mt-24 mb-6 flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <img 
              className="h-32 w-32 rounded-full ring-4 ring-white bg-white object-cover" 
              src={user.avatar} 
              alt={user.name} 
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
              <p className="text-sm font-medium text-slate-500">{user.role}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aviation-500">
                <Edit className="-ml-1 mr-2 h-4 w-4 text-slate-500" />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </dt>
                <dd className="mt-1 text-sm text-slate-900">{user.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone
                </dt>
                <dd className="mt-1 text-sm text-slate-900">{user.phone}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Location
                </dt>
                <dd className="mt-1 text-sm text-slate-900">{user.location}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <Shield className="h-4 w-4" /> License Number
                </dt>
                <dd className="mt-1 text-sm text-slate-900">{user.licenseNumber}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Member Since
                </dt>
                <dd className="mt-1 text-sm text-slate-900">{user.memberSince}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
          <h3 className="text-lg leading-6 font-medium text-slate-900">Account Settings</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-slate-900">Email Notifications</h4>
                <p className="text-sm text-slate-500">Receive emails about your application status.</p>
              </div>
              <div className="flex items-center">
                <input type="checkbox" defaultChecked className="h-4 w-4 text-aviation-600 focus:ring-aviation-500 border-slate-300 rounded" />
              </div>
            </div>
            <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-slate-900">Two-Factor Authentication</h4>
                <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
              </div>
              <button className="text-sm text-aviation-600 hover:text-aviation-500 font-medium">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
