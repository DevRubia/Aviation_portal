import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    User, Mail, Lock, Phone, Briefcase, ArrowRight, ArrowLeft,
    Shield, Building2, MapPin, FileText, CheckCircle, Users
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useSystemOptions, getOptionsByCategory } from '../../hooks/useSystemOptions';

// Step Indicator Component (Reused for consistency)
const StepIndicator = ({ currentStep, totalSteps, steps }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
                <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 -z-10 transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index + 1 < currentStep;
                    const isCurrent = index + 1 === currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${isCompleted || isCurrent
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                    }`}
                            >
                                {isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                            </div>
                            <span className={`mt-2 text-xs font-medium ${isCurrent ? 'text-blue-600' : 'text-slate-500'}`}>
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function AdminRegister() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch system options
    const { options: systemOptions, loading: optionsLoading } = useSystemOptions();

    const [formData, setFormData] = useState({
        // Identity
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',

        // Professional
        employee_id: '',
        department: '',
        job_title: '',
        office_location: '',
        supervisor_name: '',

        // Access
        access_justification: '',
        password: '',
        password_confirmation: '',
        agree_policy: false
    });

    const steps = ['Identity', 'Employment', 'Access', 'Security'];
    const totalSteps = steps.length;

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.id]: value });
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
            console.log('Admin registration data:', formData);
            navigate('/core/login');
        }, 1500);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: // Identity
                return (
                    <div className="space-y-5 animate-fadeIn">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Personal Identity</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Input id="first_name" label="First Name" placeholder="Official Name" required value={formData.first_name} onChange={handleChange} />
                            <Input id="last_name" label="Last Name" placeholder="Surname" required value={formData.last_name} onChange={handleChange} />
                        </div>
                        <Input id="email" type="email" label="Official Email" placeholder="name@caa.gov" required value={formData.email} onChange={handleChange} icon={Mail} />
                        <Input id="phone_number" type="tel" label="Direct Line / Mobile" placeholder="+123456789" required value={formData.phone_number} onChange={handleChange} icon={Phone} />
                    </div>
                );
            case 2: // Employment
                return (
                    <div className="space-y-5 animate-fadeIn">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Employment Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Input id="employee_id" label="Employee ID" placeholder="CAA-0000" required value={formData.employee_id} onChange={handleChange} icon={Briefcase} />
                            <Select
                                id="department"
                                label="Department"
                                options={getOptionsByCategory(systemOptions, 'caa_department')}
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="Select Department"
                                required
                                disabled={optionsLoading}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Input id="job_title" label="Job Title" placeholder="e.g. Senior Inspector" required value={formData.job_title} onChange={handleChange} icon={Briefcase} />
                            <Input id="office_location" label="Office Location" placeholder="HQ - Wing A" required value={formData.office_location} onChange={handleChange} icon={MapPin} />
                        </div>
                        <Input id="supervisor_name" label="Direct Supervisor" placeholder="Supervisor Name" required value={formData.supervisor_name} onChange={handleChange} icon={Users} />
                    </div>
                );
            case 3: // Access
                return (
                    <div className="space-y-5 animate-fadeIn">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Access Request</h3>
                        <div className="space-y-2">
                            <label htmlFor="access_justification" className="block text-sm font-medium text-slate-700">Reason for Access</label>
                            <textarea
                                id="access_justification"
                                rows={4}
                                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                                placeholder="Please describe why you need access to the core system and which modules you require..."
                                value={formData.access_justification}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3">
                            <Shield className="h-5 w-5 text-blue-600 shrink-0" />
                            <p className="text-sm text-blue-700">
                                Your request will be reviewed by the IT Security Department. You will receive an email notification once your access level has been determined.
                            </p>
                        </div>
                    </div>
                );
            case 4: // Security
                return (
                    <div className="space-y-5 animate-fadeIn">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Security Credentials</h3>
                        <Input id="password" type="password" label="Create Password" placeholder="••••••••" required value={formData.password} onChange={handleChange} icon={Lock} />
                        <Input id="password_confirmation" type="password" label="Confirm Password" placeholder="••••••••" required value={formData.password_confirmation} onChange={handleChange} icon={Lock} />

                        <div className="flex items-start pt-4">
                            <div className="flex items-center h-5">
                                <input
                                    id="agree_policy"
                                    name="agree_policy"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                                    checked={formData.agree_policy}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="agree_policy" className="font-medium text-slate-700">I agree to the Information Security Policy</label>
                                <p className="text-slate-500">I understand that unauthorized access or misuse of this system is a punishable offense.</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left Side - Visual & Info */}
            <div className="hidden lg:flex lg:w-5/12 bg-slate-800 relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-slate-800/95"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-blue-400 mb-8">
                        <Shield className="h-8 w-8" />
                        <span className="text-xl font-bold tracking-wider uppercase">CAA Core</span>
                    </div>
                    <h1 className="text-4xl font-bold leading-tight mb-4">
                        Administrative <br />
                        <span className="text-blue-400">Access Portal</span>
                    </h1>
                    <p className="text-slate-400 max-w-sm">
                        Secure registration for Civil Aviation Authority personnel and officers.
                    </p>
                </div>

                <div className="relative z-10 space-y-8">
                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
                        <h3 className="text-lg font-semibold text-white mb-2">Security Protocol</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            All administrative accounts require verification by the IT Security Department.
                            Please ensure your Employee ID matches your official documentation.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-slate-300">
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                            <span className="text-sm">Two-Factor Authentication Required</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                            <span className="text-sm">Audit Logging Enabled</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-slate-600 font-mono">
                    SYSTEM ID: CORE-AUTH-v2.4.0
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
                <div className="mx-auto w-full max-w-lg">
                    <div className="text-center lg:text-left mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Officer Registration</h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Complete the steps below to request system access.
                        </p>
                    </div>

                    <StepIndicator
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        steps={steps}
                    />

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                        <form onSubmit={handleSubmit}>
                            {renderStepContent()}

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
                                    <div className="w-1/3">
                                        <Link to="/core/login" className="text-sm text-slate-500 hover:text-blue-600 flex items-center h-full">
                                            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
                                        </Link>
                                    </div>
                                )}

                                {currentStep < totalSteps ? (
                                    <Button
                                        type="button"
                                        variant="dark"
                                        onClick={nextStep}
                                        className="w-1/3"
                                        icon={ArrowRight}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="dark"
                                        className="w-1/3"
                                        isLoading={isLoading}
                                        icon={CheckCircle}
                                    >
                                        Submit
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
