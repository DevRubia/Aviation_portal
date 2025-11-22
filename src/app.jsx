import './bootstrap';
import './app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ApplicationGuideline from './pages/ApplicationGuideline';
import ApplicationForm from './pages/ApplicationForm';
import SubmissionSuccess from './pages/SubmissionSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="guidelines/:type" element={<ApplicationGuideline />} />
          <Route path="apply/:type" element={<ApplicationForm />} />
          <Route path="success" element={<SubmissionSuccess />} />
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
