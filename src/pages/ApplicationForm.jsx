import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FileText, AlertCircle, Send } from 'lucide-react';

export default function ApplicationForm({ readOnly = false }) {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [licenseType, setLicenseType] = useState(type ? type.toUpperCase() : '');
  const [loading, setLoading] = useState(!!id);
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    
    // License Information
    previousLicenseNumber: '',
    previousLicenseType: '',
    previousLicenseAuthority: '',
    
    // Flight Experience
    totalFlightHours: '',
    picHours: '',
    crossCountryHours: '',
    nightHours: '',
    instrumentHours: '',
    multiEngineHours: '',
    
    // Medical Information
    medicalCertificateClass: '',
    medicalCertificateNumber: '',
    medicalExpiryDate: '',
    medicalLimitations: '',
    
    // Training Details
    trainingOrganization: '',
    trainingStartDate: '',
    trainingCompletionDate: '',
    instructorName: '',
    aircraftType: '',
    
    // Additional Information
    englishProficiency: '',
    criminalRecord: 'no',
    additionalRemarks: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/applications/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch application');
          return res.json();
        })
        .then(data => {
          if (data.payload) {
            setFormData(data.payload);
          }
          if (data.licence_type) {
            setLicenseType(data.licence_type);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching application:', err);
          toast.error('Failed to load application data');
          setLoading(false);
          navigate('/portal/dashboard');
        });
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (readOnly) return;
    
    setIsSubmitting(true);

    const url = id ? `/api/applications/${id}` : '/api/applications';
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          licence_type: licenseType,
          applicant_details: {
            name: formData.fullName,
            email: formData.email,
          },
          payload: formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error details:', errorData);
        throw new Error(errorData.message || `Submission failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Submission successful:', data);
      
      toast.success(`Application ${id ? 'updated' : 'submitted'} successfully!`, {
        duration: 4000,
        icon: <FileText className="h-6 w-6" />,
      });
      
      navigate('/portal/dashboard', { state: { activeTab: 'submissions' } });
    } catch (err) {
      console.error('Submission error:', err);
      toast.error(`Failed to ${id ? 'update' : 'submit'}: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aviation-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* 3/4 width container */}
      <div className="max-w-6xl mx-auto" style={{ width: '75%', minWidth: '320px' }}>
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-aviation-600 to-aviation-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="h-6 w-6" />
              {licenseType} License Application {id ? (readOnly ? '(View)' : '(Editing)') : ''}
            </h2>
            <p className="text-aviation-100 mt-2">
              {readOnly 
                ? "Viewing application details." 
                : "Please complete all sections accurately. All fields marked with * are required."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-8">
            <fieldset disabled={readOnly} className="space-y-8 disabled:opacity-80">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name (as per passport) *</label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="nationality" className="block text-sm font-medium text-slate-700">Nationality *</label>
                    <input
                      type="text"
                      name="nationality"
                      id="nationality"
                      required
                      value={formData.nationality}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+359 XXX XXX XXX"
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700">City *</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-slate-700">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Previous License Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  Previous License Information (if applicable)
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="previousLicenseNumber" className="block text-sm font-medium text-slate-700">Previous License Number</label>
                    <input
                      type="text"
                      name="previousLicenseNumber"
                      id="previousLicenseNumber"
                      value={formData.previousLicenseNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="previousLicenseType" className="block text-sm font-medium text-slate-700">Previous License Type</label>
                    <select
                      name="previousLicenseType"
                      id="previousLicenseType"
                      value={formData.previousLicenseType}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    >
                      <option value="">Select...</option>
                      <option value="SPL">SPL - Student Pilot License</option>
                      <option value="PPL">PPL - Private Pilot License</option>
                      <option value="CPL">CPL - Commercial Pilot License</option>
                      <option value="ATPL">ATPL - Airline Transport Pilot License</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="previousLicenseAuthority" className="block text-sm font-medium text-slate-700">Issuing Authority</label>
                    <input
                      type="text"
                      name="previousLicenseAuthority"
                      id="previousLicenseAuthority"
                      value={formData.previousLicenseAuthority}
                      onChange={handleChange}
                      placeholder="e.g., CAA Bulgaria, EASA"
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Flight Experience */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  Flight Experience
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="totalFlightHours" className="block text-sm font-medium text-slate-700">Total Flight Hours *</label>
                    <input
                      type="number"
                      name="totalFlightHours"
                      id="totalFlightHours"
                      required
                      min="0"
                      step="0.1"
                      value={formData.totalFlightHours}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="picHours" className="block text-sm font-medium text-slate-700">PIC Hours *</label>
                    <input
                      type="number"
                      name="picHours"
                      id="picHours"
                      required
                      min="0"
                      step="0.1"
                      value={formData.picHours}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="crossCountryHours" className="block text-sm font-medium text-slate-700">Cross-Country Hours</label>
                    <input
                      type="number"
                      name="crossCountryHours"
                      id="crossCountryHours"
                      min="0"
                      step="0.1"
                      value={formData.crossCountryHours}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="nightHours" className="block text-sm font-medium text-slate-700">Night Hours</label>
                    <input
                      type="number"
                      name="nightHours"
                      id="nightHours"
                      min="0"
                      step="0.1"
                      value={formData.nightHours}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="instrumentHours" className="block text-sm font-medium text-slate-700">Instrument Hours</label>
                    <input
                      type="number"
                      name="instrumentHours"
                      id="instrumentHours"
                      min="0"
                      step="0.1"
                      value={formData.instrumentHours}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="multiEngineHours" className="block text-sm font-medium text-slate-700">Multi-Engine Hours</label>
                    <input
                      type="number"
                      name="multiEngineHours"
                      id="multiEngineHours"
                      min="0"
                      step="0.1"
                      value={formData.multiEngineHours}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  Medical Certificate Information
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="medicalCertificateClass" className="block text-sm font-medium text-slate-700">Medical Certificate Class *</label>
                    <select
                      name="medicalCertificateClass"
                      id="medicalCertificateClass"
                      required
                      value={formData.medicalCertificateClass}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    >
                      <option value="">Select...</option>
                      <option value="Class 1">Class 1 (ATPL/CPL)</option>
                      <option value="Class 2">Class 2 (PPL/SPL)</option>
                      <option value="LAPL">LAPL Medical</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="medicalCertificateNumber" className="block text-sm font-medium text-slate-700">Medical Certificate Number *</label>
                    <input
                      type="text"
                      name="medicalCertificateNumber"
                      id="medicalCertificateNumber"
                      required
                      value={formData.medicalCertificateNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="medicalExpiryDate" className="block text-sm font-medium text-slate-700">Medical Expiry Date *</label>
                    <input
                      type="date"
                      name="medicalExpiryDate"
                      id="medicalExpiryDate"
                      required
                      value={formData.medicalExpiryDate}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="medicalLimitations" className="block text-sm font-medium text-slate-700">Medical Limitations (if any)</label>
                    <input
                      type="text"
                      name="medicalLimitations"
                      id="medicalLimitations"
                      value={formData.medicalLimitations}
                      onChange={handleChange}
                      placeholder="e.g., Must wear corrective lenses"
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Training Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  Training Details
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="trainingOrganization" className="block text-sm font-medium text-slate-700">Training Organization (ATO) *</label>
                    <input
                      type="text"
                      name="trainingOrganization"
                      id="trainingOrganization"
                      required
                      value={formData.trainingOrganization}
                      onChange={handleChange}
                      placeholder="e.g., Sofia Flight Academy"
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="trainingStartDate" className="block text-sm font-medium text-slate-700">Training Start Date *</label>
                    <input
                      type="date"
                      name="trainingStartDate"
                      id="trainingStartDate"
                      required
                      value={formData.trainingStartDate}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="trainingCompletionDate" className="block text-sm font-medium text-slate-700">Training Completion Date *</label>
                    <input
                      type="date"
                      name="trainingCompletionDate"
                      id="trainingCompletionDate"
                      required
                      value={formData.trainingCompletionDate}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="instructorName" className="block text-sm font-medium text-slate-700">Chief Flight Instructor Name *</label>
                    <input
                      type="text"
                      name="instructorName"
                      id="instructorName"
                      required
                      value={formData.instructorName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="aircraftType" className="block text-sm font-medium text-slate-700">Primary Aircraft Type *</label>
                    <input
                      type="text"
                      name="aircraftType"
                      id="aircraftType"
                      required
                      value={formData.aircraftType}
                      onChange={handleChange}
                      placeholder="e.g., Cessna 172, Diamond DA40"
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="englishProficiency" className="block text-sm font-medium text-slate-700">English Language Proficiency Level *</label>
                    <select
                      name="englishProficiency"
                      id="englishProficiency"
                      required
                      value={formData.englishProficiency}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    >
                      <option value="">Select...</option>
                      <option value="Level 6">Level 6 - Expert</option>
                      <option value="Level 5">Level 5 - Extended</option>
                      <option value="Level 4">Level 4 - Operational</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="criminalRecord" className="block text-sm font-medium text-slate-700">Criminal Record *</label>
                    <select
                      name="criminalRecord"
                      id="criminalRecord"
                      required
                      value={formData.criminalRecord}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="additionalRemarks" className="block text-sm font-medium text-slate-700">Additional Remarks</label>
                    <textarea
                      name="additionalRemarks"
                      id="additionalRemarks"
                      rows="4"
                      value={formData.additionalRemarks}
                      onChange={handleChange}
                      placeholder="Any additional information you would like to provide..."
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm px-4 py-2 border disabled:bg-slate-100 disabled:text-slate-500"
                    ></textarea>
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-200 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center justify-center rounded-md bg-slate-200 px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-300 transition-all"
              >
                {readOnly ? 'Back' : 'Cancel'}
              </button>
              {!readOnly && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-aviation-600 to-aviation-500 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-aviation-500 hover:to-aviation-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {id ? 'Updating...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {id ? 'Update Application' : 'Submit Application'}
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
