import './bootstrap';
import './app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout components
import Layout from './components/Layout';
import CoreLayout from './components/CoreLayout';

// Public portal pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ApplicationGuideline from './pages/ApplicationGuideline';
import ApplicationForm from './pages/ApplicationForm';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Register from './pages/Register';
import PortalLogin from './pages/Login';

// Admin (CAA) pages
import AdminLogin from './pages/admin/Login';
import CoreDashboard from './pages/admin/Dashboard';
import Registry from './pages/admin/Registry';
import ApplicationDetail from './pages/admin/ApplicationDetail';
import AdminRegister from './pages/admin/Register';

// Gateway (entry point)
import Gateway from './pages/Gateway';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Gateway route – entry point */}
        <Route path="/" element={<Gateway />} />

        {/* Pilot portal routes */}
        <Route path="/portal" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<PortalLogin />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="guidelines/:type" element={<ApplicationGuideline />} />
          <Route path="apply/:type" element={<ApplicationForm />} />
          <Route path="application/:id/edit" element={<ApplicationForm />} />
          <Route path="application/:id/view" element={<ApplicationForm readOnly={true} />} />
        </Route>

        {/* Admin authentication */}
        <Route path="/core/login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route path="/core" element={<CoreLayout />}>
          <Route index element={<Navigate to="/core/login" replace />} />
          <Route path="dashboard" element={<CoreDashboard />} />
          <Route path="registry" element={<Registry />} />
          <Route path="application/:id" element={<ApplicationDetail />} />
          <Route path="register" element={<AdminRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
