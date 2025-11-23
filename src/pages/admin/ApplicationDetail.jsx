import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Download,
    Edit
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function ApplicationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchApplication();
    }, [id]);

    const fetchApplication = async () => {
        setLoading(true);
        try {
            const response = await window.axios.get(`/api/applications/${id}`);
            setApplication(response.data);
        } catch (error) {
            console.error('Error fetching application:', error);
            toast.error('Failed to load application');
            navigate('/core/registry');
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (action) => {
        setActionLoading(true);
        try {
            // TODO: Implement actual API call for status update
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

            toast.success(`Application ${action}!`);
            navigate('/core/registry');
        } catch (error) {
            console.error('Error updating application:', error);
            toast.error(`Failed to ${action} application`);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-full flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!application) {
        return (
            <div className="min-h-full flex items-center justify-center py-12">
                <p className="text-slate-500">Application not found</p>
            </div>
        );
    }

    const { applicant_details, payload, licence_type, status, created_at, updated_at } = application;
    const details = typeof applicant_details === 'string' ? JSON.parse(applicant_details) : applicant_details;
    const formData = typeof payload === 'string' ? JSON.parse(payload) : payload;

    const getStatusBadge = (status) => {
        const s = status?.toLowerCase();
        if (s === 'approved') return { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle };
        if (s === 'rejected') return { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle };
        if (s === 'submitted') return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock };
        return { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: AlertCircle };
    };

    const statusBadge = getStatusBadge(status);
    const StatusIcon = statusBadge.icon;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        icon={ArrowLeft}
                        onClick={() => navigate('/core/registry')}
                    >
                        Back to Registry
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Application ISS/{id}</h1>
                        <p className="text-slate-500">{licence_type} License Application</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        icon={Edit}
                        onClick={() => navigate(`/portal/application/${id}/edit`)}
                    >
                        Edit
                    </Button>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${statusBadge.color}`}>
                        <StatusIcon className="h-5 w-5" />
                        <span className="font-semibold">{status}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {status?.toLowerCase() === 'submitted' && (
                <Card className="p-6 bg-blue-50 border-blue-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">Review Required</h3>
                            <p className="text-sm text-slate-600 mt-1">This application is pending your review and decision.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                icon={XCircle}
                                onClick={() => handleAction('rejected')}
                                isLoading={actionLoading}
                                className="border-red-300 text-red-700 hover:bg-red-50"
                            >
                                Reject
                            </Button>
                            <Button
                                variant="primary"
                                icon={CheckCircle}
                                onClick={() => handleAction('approved')}
                                isLoading={actionLoading}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Approve
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - 2 columns */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Applicant Information */}
                    <Card>
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Applicant Information
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Full Name</label>
                                    <p className="text-sm text-slate-900 font-medium mt-1">{formData?.fullName || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Date of Birth</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.dateOfBirth || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Nationality</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.nationality || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Email</label>
                                    <p className="text-sm text-slate-900 mt-1 flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-slate-400" />
                                        {formData?.email || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Phone</label>
                                    <p className="text-sm text-slate-900 mt-1 flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        {formData?.phone || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">City</label>
                                    <p className="text-sm text-slate-900 mt-1 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                        {formData?.city || 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase">Address</label>
                                <p className="text-sm text-slate-900 mt-1">{formData?.address || 'N/A'}, {formData?.postalCode || ''}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Flight Experience */}
                    <Card>
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-900">Flight Experience</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Total Hours</label>
                                    <p className="text-sm text-slate-900 font-medium mt-1">{formData?.totalFlightHours || '0'} hrs</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">PIC Hours</label>
                                    <p className="text-sm text-slate-900 font-medium mt-1">{formData?.picHours || '0'} hrs</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Cross-Country</label>
                                    <p className="text-sm text-slate-900 font-medium mt-1">{formData?.crossCountryHours || '0'} hrs</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Night Hours</label>
                                    <p className="text-sm text-slate-900 font-medium mt-1">{formData?.nightHours || '0'} hrs</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Instrument</label>
                                    <p className="text-sm text-slate-900 font-medium mt-1">{formData?.instrumentHours || '0'} hrs</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Multi-Engine</label>
                                    <p className="text-sm text-slate-900 font-medium mt-1">{formData?.multiEngineHours || '0'} hrs</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Training Details */}
                    <Card>
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-900">Training Details</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Training Organization</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.trainingOrganization || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Aircraft Type</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.aircraftType || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Start Date</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.trainingStartDate || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Completion Date</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.trainingCompletionDate || 'N/A'}</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs font-medium text-slate-500 uppercase">Instructor Name</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.instructorName || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Medical Information */}
                    <Card>
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-900">Medical Certificate</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Class</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.medicalCertificateClass || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Certificate Number</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.medicalCertificateNumber || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Expiry Date</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.medicalExpiryDate || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Limitations</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData?.medicalLimitations || 'None'}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar - 1 column */}
                <div className="space-y-6">
                    {/* Timeline */}
                    <Card>
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Timeline
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase">Submitted</label>
                                <p className="text-sm text-slate-900 mt-1">{new Date(created_at).toLocaleString()}</p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase">Last Updated</label>
                                <p className="text-sm text-slate-900 mt-1">{new Date(updated_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Additional Info */}
                    <Card>
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-900">Additional Information</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase">English Proficiency</label>
                                <p className="text-sm text-slate-900 mt-1">{formData?.englishProficiency || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase">Criminal Record</label>
                                <p className="text-sm text-slate-900 mt-1">{formData?.criminalRecord === 'no' ? 'No' : 'Yes'}</p>
                            </div>
                            {formData?.additionalRemarks && (
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase">Remarks</label>
                                    <p className="text-sm text-slate-900 mt-1">{formData.additionalRemarks}</p>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-900">Actions</h2>
                        </div>
                        <div className="p-6 space-y-3">
                            <Button variant="outline" icon={Download} className="w-full">
                                Download PDF
                            </Button>
                            <Button variant="outline" icon={FileText} className="w-full">
                                View Full Application
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
