import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';

export default function Notifications() {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Application Approved',
      message: 'Your CPL application #1023 has been approved by the Civil Aviation Authority.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'Document Requested',
      message: 'Please upload your medical certificate for application #1024.',
      time: '1 day ago',
      read: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'License Expiring Soon',
      message: 'Your PPL license is set to expire in 30 days. Please submit a renewal application.',
      time: '3 days ago',
      read: true,
    },
    {
      id: 4,
      type: 'info',
      title: 'System Maintenance',
      message: 'The portal will be undergoing scheduled maintenance on Saturday from 22:00 to 02:00.',
      time: '1 week ago',
      read: true,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'warning': return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-6 w-6 text-red-500" />;
      default: return <Info className="h-6 w-6 text-aviation-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Notifications
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
            Mark all as read
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <ul role="list" className="divide-y divide-slate-200">
          {notifications.map((notification) => (
            <li key={notification.id} className={`p-4 hover:bg-slate-50 transition-colors ${!notification.read ? 'bg-aviation-50/30' : ''}`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 pt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    {notification.title}
                    {!notification.read && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-aviation-100 px-2 py-0.5 text-xs font-medium text-aviation-800">
                        New
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{notification.message}</p>
                  <div className="mt-2 flex items-center text-xs text-slate-400">
                    <Clock className="mr-1 h-3 w-3" />
                    {notification.time}
                  </div>
                </div>
                <div>
                  <button className="text-slate-400 hover:text-slate-500">
                    <span className="sr-only">Options</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
