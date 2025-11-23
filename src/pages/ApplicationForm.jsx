import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FileText, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import TextArea from '../components/ui/TextArea';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';

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
            setFormData(prev => ({ ...prev, ...data.payload }));
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aviation-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" style={{ width: '75%', minWidth: '320px' }}>
        <Card>
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
                <SectionHeader title="Personal Information" />
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Input
                      label="Full Name (as per passport)"
                      name="fullName"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <Input
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />

                  <Input
                    label="Nationality"
                    name="nationality"
                    id="nationality"
                    required
                    value={formData.nationality}
                    onChange={handleChange}
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+359 XXX XXX XXX"
                  />

                  <div className="sm:col-span-2">
                    <Input
                      label="Street Address"
                      name="address"
                      id="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <Input
                    label="City"
                    name="city"
                    id="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                  />

                  <Input
                    label="Postal Code"
                    name="postalCode"
                    id="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Previous License Information */}
              <div className="space-y-6">
                <SectionHeader title="Previous License Information (if applicable)" />
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <Input
                    label="Previous License Number"
                    name="previousLicenseNumber"
                    id="previousLicenseNumber"
                    value={formData.previousLicenseNumber}
                    onChange={handleChange}
                  />

                  <Select
                    label="Previous License Type"
                    name="previousLicenseType"
                    id="previousLicenseType"
                    value={formData.previousLicenseType}
                    onChange={handleChange}
                    options={[
                      { value: 'SPL', label: 'SPL - Student Pilot License' },
                      { value: 'PPL', label: 'PPL - Private Pilot License' },
                      { value: 'CPL', label: 'CPL - Commercial Pilot License' },
                      { value: 'ATPL', label: 'ATPL - Airline Transport Pilot License' },
                    ]}
                  />

                  <div className="sm:col-span-2">
                    <Input
                      label="Issuing Authority"
                      name="previousLicenseAuthority"
                      id="previousLicenseAuthority"
                      value={formData.previousLicenseAuthority}
                      onChange={handleChange}
                      placeholder="e.g., CAA Bulgaria, EASA"
                    />
                  </div>
                </div>
              </div>

              {/* Flight Experience */}
              <div className="space-y-6">
                <SectionHeader title="Flight Experience" />
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <Input
                    label="Total Flight Hours"
                    type="number"
                    name="totalFlightHours"
                    id="totalFlightHours"
                    required
                    min="0"
                    step="0.1"
                    value={formData.totalFlightHours}
                    onChange={handleChange}
                  />

                  <Input
                    label="PIC Hours"
                    type="number"
                    name="picHours"
                    id="picHours"
                    required
                    min="0"
                    step="0.1"
                    value={formData.picHours}
                    onChange={handleChange}
                  />

                  <Input
                    label="Cross-Country Hours"
                    type="number"
                    name="crossCountryHours"
                    id="crossCountryHours"
                    min="0"
                    step="0.1"
                    value={formData.crossCountryHours}
                    onChange={handleChange}
                  />

                  <Input
                    label="Night Hours"
                    type="number"
                    name="nightHours"
                    id="nightHours"
                    min="0"
                    step="0.1"
                    value={formData.nightHours}
                    onChange={handleChange}
                  />

                  <Input
                    label="Instrument Hours"
                    type="number"
                    name="instrumentHours"
                    id="instrumentHours"
                    min="0"
                    step="0.1"
                    value={formData.instrumentHours}
                    onChange={handleChange}
                  />

                  <Input
                    label="Multi-Engine Hours"
                    type="number"
                    name="multiEngineHours"
                    id="multiEngineHours"
                    min="0"
                    step="0.1"
                    value={formData.multiEngineHours}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-6">
                <SectionHeader title="Medical Certificate Information" />
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <Select
                    label="Medical Certificate Class"
                    name="medicalCertificateClass"
                    id="medicalCertificateClass"
                    required
                    value={formData.medicalCertificateClass}
                    onChange={handleChange}
                    options={[
                      { value: 'Class 1', label: 'Class 1 (ATPL/CPL)' },
                      { value: 'Class 2', label: 'Class 2 (PPL/SPL)' },
                      { value: 'LAPL', label: 'LAPL Medical' },
                    ]}
                  />

                  <Input
                    label="Medical Certificate Number"
                    name="medicalCertificateNumber"
                    id="medicalCertificateNumber"
                    required
                    value={formData.medicalCertificateNumber}
                    onChange={handleChange}
                  />

                  <Input
                    label="Medical Expiry Date"
                    type="date"
                    name="medicalExpiryDate"
                    id="medicalExpiryDate"
                    required
                    value={formData.medicalExpiryDate}
                    onChange={handleChange}
                  />

                  <Input
                    label="Medical Limitations (if any)"
                    name="medicalLimitations"
                    id="medicalLimitations"
                    value={formData.medicalLimitations}
                    onChange={handleChange}
                    placeholder="e.g., Must wear corrective lenses"
                  />
                </div>
              </div>

              {/* Training Details */}
              <div className="space-y-6">
                <SectionHeader title="Training Details" />
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Input
                      label="Training Organization (ATO)"
                      name="trainingOrganization"
                      id="trainingOrganization"
                      required
                      value={formData.trainingOrganization}
                      onChange={handleChange}
                      placeholder="e.g., Sofia Flight Academy"
                    />
                  </div>

                  <Input
                    label="Training Start Date"
                    type="date"
                    name="trainingStartDate"
                    id="trainingStartDate"
                    required
                    value={formData.trainingStartDate}
                    onChange={handleChange}
                  />

                  <Input
                    label="Training Completion Date"
                    type="date"
                    name="trainingCompletionDate"
                    id="trainingCompletionDate"
                    required
                    value={formData.trainingCompletionDate}
                    onChange={handleChange}
                  />

                  <Input
                    label="Chief Flight Instructor Name"
                    name="instructorName"
                    id="instructorName"
                    required
                    value={formData.instructorName}
                    onChange={handleChange}
                  />

                  <Input
                    label="Primary Aircraft Type"
                    name="aircraftType"
                    id="aircraftType"
                    required
                    value={formData.aircraftType}
                    onChange={handleChange}
                    placeholder="e.g., Cessna 172, Diamond DA40"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <SectionHeader title="Additional Information" />
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <Select
                    label="English Language Proficiency Level"
                    name="englishProficiency"
                    id="englishProficiency"
                    required
                    value={formData.englishProficiency}
                    onChange={handleChange}
                    options={[
                      { value: 'Level 6', label: 'Level 6 - Expert' },
                      { value: 'Level 5', label: 'Level 5 - Extended' },
                      { value: 'Level 4', label: 'Level 4 - Operational' },
                    ]}
                  />

                  <Select
                    label="Criminal Record"
                    name="criminalRecord"
                    id="criminalRecord"
                    required
                    value={formData.criminalRecord}
                    onChange={handleChange}
                    options={[
                      { value: 'no', label: 'No' },
                      { value: 'yes', label: 'Yes' },
                    ]}
                  />

                  <div className="sm:col-span-2">
                    <TextArea
                      label="Additional Remarks"
                      name="additionalRemarks"
                      id="additionalRemarks"
                      value={formData.additionalRemarks}
                      onChange={handleChange}
                      placeholder="Any additional information you would like to provide..."
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-200 flex justify-end gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                {readOnly ? 'Back' : 'Cancel'}
              </Button>
              {!readOnly && (
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  icon={Send}
                >
                  {id ? 'Update Application' : 'Submit Application'}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
