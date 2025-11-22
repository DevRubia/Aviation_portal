import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FileText, AlertCircle } from 'lucide-react';

export default function ApplicationForm() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    flightHours: '',
    medicalCert: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          licence_type: type.toUpperCase(),
          applicant_details: {
            name: formData.fullName,
            email: formData.email,
          },
          payload: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const data = await response.json();
      console.log('Submission successful:', data);
      
      toast.success('Application submitted successfully!', {
        duration: 4000,
        icon: <FileText className="h-6 w-6" />,
      });
      
      navigate('/dashboard', { state: { activeTab: 'submissions' } });
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-aviation-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="h-6 w-6" />
              {type?.toUpperCase()} Application
            </h2>
            <p className="text-aviation-100 mt-2">Please fill out the details below to proceed with your license application.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-slate-700">Postal Address</label>
                <textarea
                  name="address"
                  id="address"
                  rows="3"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border"
                ></textarea>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="flightHours" className="block text-sm font-medium text-slate-700">Total Flight Hours</label>
                <input
                  type="number"
                  name="flightHours"
                  id="flightHours"
                  value={formData.flightHours}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="medicalCert" className="block text-sm font-medium text-slate-700">Medical Certificate Number</label>
                <input
                  type="text"
                  name="medicalCert"
                  id="medicalCert"
                  value={formData.medicalCert}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center rounded-md bg-aviation-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-aviation-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
