import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    User, Building2, Mail, Lock, Phone, ArrowRight, ArrowLeft,
    CheckCircle, Plane, FileText, MapPin, Shield, CreditCard, Globe, Briefcase
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

// Step Indicator Component
const StepIndicator = ({ currentStep, totalSteps, steps }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
                <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-aviation-600 -z-10 transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index + 1 < currentStep;
                    const isCurrent = index + 1 === currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${isCompleted || isCurrent
                                    ? 'bg-aviation-600 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                    }`}
                            >
                                {isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                            </div>
                            <span className={`mt-2 text-xs font-medium ${isCurrent ? 'text-aviation-600' : 'text-slate-500'}`}>
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function PortalRegister() {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState(null); // 'individual' or 'organization'
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Unified form state
    const [formData, setFormData] = useState({
        // Account Type
        account_type: '',

        // Personal / Rep Info
        first_name: '',
        middle_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        nationality: '',

        // Organization Info
        org_name: '',
        org_legal_name: '',
        org_type: '',
        org_registration_number: '',
        org_tax_id: '',
        org_website: '',

        // Contact
        email: '',
        phone_number: '',
        address_line_1: '',
        city: '',
        country: '',
        postal_code: '',

        // Identification
        id_type: 'national_id',
        id_number: '',
        passport_number: '',

        // Security
        password: '',
        password_confirmation: '',
        agree_terms: false
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.id]: value });
    };

    const handleSelectChange = (id, value) => {
        setFormData({ ...formData, [id]: value });
    };

    const handleAccountTypeSelect = (type) => {
        setAccountType(type);
        setFormData({ ...formData, account_type: type });
        setCurrentStep(1);
    };

    const nextStep = () => {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Registration Payload:', formData);
            navigate('/portal/login');
        }, 2000);
    };

    // Define steps based on account type
    const individualSteps = ['Personal', 'Contact', 'Identity', 'Security'];
    const organizationSteps = ['Organization', 'Contact', 'Your Details', 'Identity', 'Security'];

    const steps = accountType === 'organization' ? organizationSteps : individualSteps;
    const totalSteps = steps.length;

    // Render Step Content
    const renderStepContent = () => {
        if (!accountType) {
            return (
                <div className="space-y-6 animate-fadeIn">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">Select Account Type</h2>
                        <p className="text-slate-500 mt-2">Choose the type of account that best fits your needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={() => handleAccountTypeSelect('individual')}
                            className="group relative p-6 border-2 border-slate-200 rounded-xl hover:border-aviation-500 hover:bg-aviation-50 transition-all text-left"
                        >
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <User className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-aviation-700">Individual Pilot</h3>
                            <p className="text-sm text-slate-500 mt-2">
                                For pilots, students, and aviation professionals managing personal licenses and ratings.
                            </p>
                        </button>

                        <button
                            onClick={() => handleAccountTypeSelect('organization')}
                            className="group relative p-6 border-2 border-slate-200 rounded-xl hover:border-aviation-500 hover:bg-aviation-50 transition-all text-left"
                        >
                            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-aviation-700">Organization</h3>
                            <p className="text-sm text-slate-500 mt-2">
                                For airlines, training schools (ATO), and maintenance organizations (MRO) managing multiple personnel.
                            </p>
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link to="/portal/login" className="font-medium text-aviation-600 hover:text-aviation-500">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            );
        }

        // INDIVIDUAL FLOW
        if (accountType === 'individual') {
            switch (currentStep) {
                case 1: // Personal
                    return (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Input id="first_name" label="First Name" placeholder="John" required value={formData.first_name} onChange={handleChange} />
                                <Input id="middle_name" label="Middle Name" placeholder="Optional" value={formData.middle_name} onChange={handleChange} />
                                <Input id="last_name" label="Last Name" placeholder="Doe" required value={formData.last_name} onChange={handleChange} />
                                <div className="space-y-1">
                                    <label htmlFor="gender" className="block text-sm font-medium text-slate-700">Gender</label>
                                    <select id="gender" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm py-2 px-3 border" value={formData.gender} onChange={handleChange}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <Input id="date_of_birth" type="date" label="Date of Birth" required value={formData.date_of_birth} onChange={handleChange} />
                                <Input id="nationality" label="Nationality" placeholder="e.g. Kenyan" required value={formData.nationality} onChange={handleChange} icon={Globe} />
                            </div>
                        </div>
                    );
                case 2: // Contact
                    return (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Contact Details</h3>
                            <Input id="email" type="email" label="Email Address" placeholder="pilot@example.com" required value={formData.email} onChange={handleChange} icon={Mail} />
                            <Input id="phone_number" type="tel" label="Phone Number" placeholder="+254 700 000000" required value={formData.phone_number} onChange={handleChange} icon={Phone} />

                            <div className="pt-2">
                                <Input id="address_line_1" label="Residential Address" placeholder="Street / P.O. Box" required value={formData.address_line_1} onChange={handleChange} icon={MapPin} />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <Input id="city" label="City" placeholder="Nairobi" required value={formData.city} onChange={handleChange} />
                                <Input id="country" label="Country of Residence" placeholder="Kenya" required value={formData.country} onChange={handleChange} />
                            </div>
                        </div>
                    );
                case 3: // Identity
                    return (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Identification</h3>
                            <div className="space-y-1">
                                <label htmlFor="id_type" className="block text-sm font-medium text-slate-700">ID Document Type</label>
                                <select id="id_type" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm py-2 px-3 border" value={formData.id_type} onChange={handleChange}>
                                    <option value="national_id">National ID</option>
                                    <option value="passport">Passport</option>
                                    <option value="military_id">Military ID</option>
                                </select>
                            </div>

                            <Input id="id_number" label="ID / Document Number" placeholder="12345678" required value={formData.id_number} onChange={handleChange} icon={CreditCard} />

                            {formData.id_type === 'passport' && (
                                <Input id="passport_number" label="Passport Number" placeholder="A1234567" value={formData.passport_number} onChange={handleChange} icon={Globe} />
                            )}

                            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3">
                                <Shield className="h-5 w-5 text-blue-600 shrink-0" />
                                <p className="text-sm text-blue-700">
                                    You will be asked to upload a scanned copy of your identification document after your account is created to verify your identity.
                                </p>
                            </div>
                        </div>
                    );
                case 4: // Security
                    return (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Account Security</h3>
                            <Input id="password" type="password" label="Create Password" placeholder="••••••••" required value={formData.password} onChange={handleChange} icon={Lock} />
                            <Input id="password_confirmation" type="password" label="Confirm Password" placeholder="••••••••" required value={formData.password_confirmation} onChange={handleChange} icon={Lock} />

                            <div className="flex items-start pt-4">
                                <div className="flex items-center h-5">
                                    <input
                                        id="agree_terms"
                                        name="agree_terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 text-aviation-600 focus:ring-aviation-500 border-slate-300 rounded cursor-pointer"
                                        checked={formData.agree_terms}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="agree_terms" className="font-medium text-slate-700">I agree to the Terms and Conditions</label>
                                    <p className="text-slate-500">By creating an account, you agree to our <a href="#" className="text-aviation-600 hover:underline">Terms of Service</a> and <a href="#" className="text-aviation-600 hover:underline">Privacy Policy</a>.</p>
                                </div>
                            </div>
                        </div>
                    );
                default:
                    return null;
            }
        }

        // ORGANIZATION FLOW
        if (accountType === 'organization') {
            switch (currentStep) {
                case 1: // Organization Info
                    return (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Organization Details</h3>
                            <Input id="org_name" label="Organization Name" placeholder="SkyHigh Aviation Ltd" required value={formData.org_name} onChange={handleChange} icon={Building2} />
                            <Input id="org_legal_name" label="Legal Name (if different)" placeholder="SkyHigh Aviation Limited" value={formData.org_legal_name} onChange={handleChange} />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <label htmlFor="org_type" className="block text-sm font-medium text-slate-700">Organization Type</label>
                                    <select id="org_type" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm py-2 px-3 border" value={formData.org_type} onChange={handleChange}>
                                        <option value="">Select Type</option>
                                        <option value="airline">Airline / Operator</option>
                                        <option value="ato">Approved Training Org (ATO)</option>
                                        <option value="amo">Approved Maintenance Org (AMO)</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <Input id="org_registration_number" label="Registration Number" placeholder="REG-123456" required value={formData.org_registration_number} onChange={handleChange} icon={FileText} />
                            </div>
                            <Input id="org_tax_id" label="Tax ID / KRA PIN" placeholder="P000000000A" required value={formData.org_tax_id} onChange={handleChange} />
                        </div>
                    );
                case 2: // Org Contact
                    return (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Organization Contact</h3>
                            <Input id="email" type="email" label="Official Email Address" placeholder="info@skyhigh.com" required value={formData.email} onChange={handleChange} icon={Mail} />
                            <Input id="phone_number" type="tel" label="Official Phone Number" placeholder="+254 700 000000" required value={formData.phone_number} onChange={handleChange} icon={Phone} />
                            <Input id="org_website" type="url" label="Website" placeholder="https://www.skyhigh.com" value={formData.org_website} onChange={handleChange} icon={Globe} />

                            <div className="pt-2">
                                <Input id="address_line_1" label="Physical Address" placeholder="Hangar 2, Wilson Airport" required value={formData.address_line_1} onChange={handleChange} icon={MapPin} />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <Input id="city" label="City" placeholder="Nairobi" required value={formData.city} onChange={handleChange} />
                                <Input id="country" label="Country" placeholder="Kenya" required value={formData.country} onChange={handleChange} />
                            </div>
                        </div>
                    );
                case 3: // Your Personal Details
                    return (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Your Personal Details</h3>
                            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3 mb-4">
                                <User className="h-5 w-5 text-blue-600 shrink-0" />
                                <p className="text-sm text-blue-700">
                                    You are creating a <strong>personal account</strong> that represents your organization.
                                    You can apply for personal pilot licenses and also manage your organization's compliance and operations.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Input id="first_name" label="First Name" placeholder="Jane" required value={formData.first_name} onChange={handleChange} />
                                <Input id="middle_name" label="Middle Name" placeholder="Optional" value={formData.middle_name} onChange={handleChange} />
                                <Input id="last_name" label="Last Name" placeholder="Doe" required value={formData.last_name} onChange={handleChange} />
                                <div className="space-y-1">
                                    <label htmlFor="gender" className="block text-sm font-medium text-slate-700">Gender</label>
                                    <select id="gender" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm py-2 px-3 border" value={formData.gender} onChange={handleChange}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <Input id="date_of_birth" type="date" label="Date of Birth" required value={formData.date_of_birth} onChange={handleChange} />
                                <Input id="nationality" label="Nationality" placeholder="e.g. Kenyan" required value={formData.nationality} onChange={handleChange} icon={Globe} />
                            </div>
                            <Input id="job_title" label="Your Position/Role" placeholder="Operations Manager" required value={formData.job_title} onChange={handleChange} icon={Briefcase} />
                        </div>
                    );
                case 4: // Identity
                    return (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Your Identification</h3>
                            <div className="space-y-1">
                                <label htmlFor="id_type" className="block text-sm font-medium text-slate-700">ID Document Type</label>
                                <select id="id_type" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-aviation-500 focus:ring-aviation-500 sm:text-sm py-2 px-3 border" value={formData.id_type} onChange={handleChange}>
                                    <option value="national_id">National ID</option>
                                    <option value="passport">Passport</option>
                                    <option value="military_id">Military ID</option>
                                </select>
                            </div>

                            <Input id="id_number" label="ID / Document Number" placeholder="12345678" required value={formData.id_number} onChange={handleChange} icon={CreditCard} />

                            {formData.id_type === 'passport' && (
                                <Input id="passport_number" label="Passport Number" placeholder="A1234567" value={formData.passport_number} onChange={handleChange} icon={Globe} />
                            )}

                            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3">
                                <Shield className="h-5 w-5 text-blue-600 shrink-0" />
                                <p className="text-sm text-blue-700">
                                    You will be asked to upload a scanned copy of your identification document after your account is created to verify your identity.
                                </p>
                            </div>
                        </div>
                    );
                case 5: // Security
                    return (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Account Security</h3>
                            <Input id="password" type="password" label="Create Password" placeholder="••••••••" required value={formData.password} onChange={handleChange} icon={Lock} />
                            <Input id="password_confirmation" type="password" label="Confirm Password" placeholder="••••••••" required value={formData.password_confirmation} onChange={handleChange} icon={Lock} />

                            <div className="flex items-start pt-4">
                                <div className="flex items-center h-5">
                                    <input
                                        id="agree_terms"
                                        name="agree_terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 text-aviation-600 focus:ring-aviation-500 border-slate-300 rounded cursor-pointer"
                                        checked={formData.agree_terms}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="agree_terms" className="font-medium text-slate-700">I agree to the Terms and Conditions</label>
                                    <p className="text-slate-500">By creating an account, you agree to our <a href="#" className="text-aviation-600 hover:underline">Terms of Service</a> and <a href="#" className="text-aviation-600 hover:underline">Privacy Policy</a>.</p>
                                </div>
                            </div>
                        </div>
                    );
                default:
                    return null;
            }
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Visual & Info */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-aviation-900/90 to-slate-900/90"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-aviation-400 mb-8">
                        <Plane className="h-8 w-8" />
                        <span className="text-xl font-bold tracking-wider uppercase">SkyLicensing</span>
                    </div>
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        {accountType === 'organization' ? 'Enterprise Aviation' : 'Begin Your'} <br />
                        <span className="text-aviation-400">{accountType === 'organization' ? 'Management Portal' : 'Aviation Journey'}</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-md">
                        {accountType === 'organization'
                            ? 'Streamline your organization\'s licensing, compliance, and personnel management in one secure platform.'
                            : 'Join thousands of pilots managing their licenses, medicals, and ratings through our secure digital portal.'
                        }
                    </p>
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-aviation-500/20 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-aviation-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold">{accountType === 'organization' ? 'Fleet & Crew Management' : 'Digital License Management'}</h3>
                            <p className="text-sm text-slate-400">Access your documents anywhere, anytime.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-aviation-500/20 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-aviation-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Real-time Application Tracking</h3>
                            <p className="text-sm text-slate-400">Stay updated on your application status.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-slate-500">
                    © 2025 Civil Aviation Authority. All rights reserved.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-slate-50">
                <div className="mx-auto w-full max-w-lg">

                    {accountType && (
                        <div className="mb-6">
                            <button
                                onClick={() => setAccountType(null)}
                                className="flex items-center text-sm text-slate-500 hover:text-aviation-600 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1" /> Back to selection
                            </button>
                        </div>
                    )}

                    <div className="text-center lg:text-left mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            {accountType ? 'Create Account' : 'Welcome'}
                        </h2>
                        {!accountType && (
                            <p className="mt-2 text-sm text-slate-600">
                                Start by selecting your account type to proceed with registration.
                            </p>
                        )}
                    </div>

                    {accountType && (
                        <StepIndicator
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            steps={steps}
                        />
                    )}

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                        <form onSubmit={handleSubmit}>
                            {renderStepContent()}

                            {accountType && (
                                <div className="mt-8 flex justify-between gap-4">
                                    {currentStep > 1 ? (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={prevStep}
                                            className="w-1/3"
                                        >
                                            Back
                                        </Button>
                                    ) : (
                                        <div className="w-1/3"></div> // Spacer
                                    )}

                                    {currentStep < totalSteps ? (
                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={nextStep}
                                            className="w-1/3"
                                            icon={ArrowRight}
                                        >
                                            Next
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-1/3"
                                            isLoading={isLoading}
                                            icon={CheckCircle}
                                        >
                                            Register
                                        </Button>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
