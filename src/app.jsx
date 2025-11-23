import './bootstrap';
import './app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ApplicationGuideline from './pages/ApplicationGuideline';
import ApplicationForm from './pages/ApplicationForm';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

import Gateway from './pages/Gateway';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Gateway Route */}
        <Route path="/" element={<Gateway />} />

        {/* Portal Routes */}
        <Route path="/portal" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="guidelines/:type" element={<ApplicationGuideline />} />
          <Route path="apply/:type" element={<ApplicationForm />} />
          <Route path="application/:id/edit" element={<ApplicationForm />} />
          <Route path="application/:id/view" element={<ApplicationForm readOnly={true} />} />
        </Route>

        {/* Admin Route Placeholder */}
        <Route path="/core" element={
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">CAA Admin Portal</h1>
              <p className="text-slate-500 mt-2">Coming Soon</p>
              <a href="/" className="mt-4 inline-block text-aviation-600 hover:underline">Back to Gateway</a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
