import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Eye, Edit, RefreshCw, MoreVertical, ChevronDown, FileText, CheckCircle, Clock, AlertCircle, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color, trend }) => (
    <Card className="p-6 border-l-4" style={{ borderLeftColor: color }}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
            </div>
            <div className={`p-3 rounded-full bg-opacity-10`} style={{ backgroundColor: `${color}20` }}>
                <Icon className="h-6 w-6" style={{ color: color }} />
            </div>
        </div>
        {trend && (
            <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium">{trend}</span>
                <span className="ml-2 text-slate-400">from last month</span>
            </div>
        )}
    </Card>
);

export default function Registry() {
    // State for search input
    const [searchTerm, setSearchTerm] = useState('');
    // State for storing application data
    const [applications, setApplications] = useState([]);
    // State for loading status
    const [isLoading, setIsLoading] = useState(true);
    // State for tracking which dropdown is open
    const [openDropdown, setOpenDropdown] = useState(null);

    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Initial data fetch
    useEffect(() => {
        fetchApplications();
    }, []);

    // Handle clicking outside of dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    /**
     * Fetches all applications from the API.
     */
    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const response = await window.axios.get('/api/applications');
            // Mocking some extra data for the design if not present
            const enhancedData = response.data.map(app => ({
                ...app,
                assigned_to: app.assigned_to || { name: 'Unassigned', avatar: null },
                submission_date: app.created_at || new Date().toISOString(),
                priority: Math.random() > 0.8 ? 'High' : 'Normal'
            }));
            setApplications(enhancedData);
        } catch (error) {
            console.error('Error fetching applications:', error);
            // Fallback mock data if API fails or is empty for demo
            setApplications([
                { id: 101, status: 'pending', licence_type: 'PPL(A)', applicant_details: { name: 'Alice Smith' }, created_at: '2023-10-25', updated_at: '2023-10-28', assigned_to: { name: 'Capt. Morgan' } },
                { id: 102, status: 'approved', licence_type: 'CPL(A)', applicant_details: { name: 'Bob Jones' }, created_at: '2023-10-20', updated_at: '2023-10-22', assigned_to: { name: 'Sarah Connor' } },
                { id: 103, status: 'review', licence_type: 'ATPL', applicant_details: { name: 'Charlie Day' }, created_at: '2023-10-26', updated_at: '2023-10-26', assigned_to: null },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Returns the appropriate Tailwind CSS classes for a given status.
     * @param {string} status - The status of the application.
     * @returns {string} - Tailwind CSS classes.
     */
    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s === 'approved') return 'text-emerald-700 bg-emerald-50 border-emerald-200 ring-1 ring-emerald-600/20';
        if (s === 'rejected') return 'text-rose-700 bg-rose-50 border-rose-200 ring-1 ring-rose-600/20';
        if (s === 'submitted' || s === 'pending') return 'text-blue-700 bg-blue-50 border-blue-200 ring-1 ring-blue-600/20';
        if (s === 'review') return 'text-violet-700 bg-violet-50 border-violet-200 ring-1 ring-violet-600/20';
        if (s === 'draft') return 'text-slate-600 bg-slate-50 border-slate-200 ring-1 ring-slate-500/20';
        return 'text-amber-700 bg-amber-50 border-amber-200 ring-1 ring-amber-600/20';
    };

    /**
     * Calculates the number of days an application has been in its current stage.
     * @param {string} dateString - The date string to calculate from.
     * @returns {string} - The number of days.
     */
    const calculateTimeInStage = (dateString) => {
        if (!dateString) return '--';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '--';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    /**
     * Extracts the applicant's name from the JSON details.
     * @param {object} app - The application object.
     * @returns {string} - The applicant's name.
     */
    const getApplicantName = (app) => {
        if (!app.applicant_details) return 'Unknown';
        const details = typeof app.applicant_details === 'string'
            ? JSON.parse(app.applicant_details)
            : app.applicant_details;

        return details.name || 'Unknown';
    };

    // Filter applications based on search term
    const filteredApplications = applications.filter(app => {
        const searchLower = searchTerm.toLowerCase();
        const applicantName = getApplicantName(app).toLowerCase();
        const ref = `ISS/${app.id}`.toLowerCase();
        return applicantName.includes(searchLower) || ref.includes(searchLower);
    });

    /**
     * Toggles the visibility of the action dropdown for a specific row.
     * @param {number} appId - The ID of the application.
     */
    const toggleDropdown = (appId) => {
        setOpenDropdown(openDropdown === appId ? null : appId);
    };

    /**
     * Handles the navigation for view/edit actions.
     * @param {string} action - 'view' or 'edit'
     * @param {number} appId - The ID of the application.
     */
    const handleAction = (action, appId) => {
        setOpenDropdown(null);
        if (action === 'view') {
            navigate(`/core/application/${appId}`);
        } else if (action === 'edit') {
            navigate(`/portal/application/${appId}/edit`);
        }
    };

    // Calculate stats
    const stats = {
        total: applications.length,
        pending: applications.filter(a => ['pending', 'submitted', 'review'].includes(a.status?.toLowerCase())).length,
        approved: applications.filter(a => a.status?.toLowerCase() === 'approved').length,
        attention: applications.filter(a => calculateTimeInStage(a.updated_at).replace(' days', '') > 7).length
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Registry</h1>
                    <p className="text-slate-500 mt-1">Overview of all licensing activities and applications.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={RefreshCw} onClick={fetchApplications} isLoading={isLoading}>Sync</Button>
                    <Button variant="dark" icon={FileText}>Export Report</Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total Applications" value={stats.total} icon={FileText} color="#3b82f6" trend="+12%" />
                <StatsCard title="Pending Review" value={stats.pending} icon={Clock} color="#f59e0b" />
                <StatsCard title="Approved (YTD)" value={stats.approved} icon={CheckCircle} color="#10b981" trend="+5%" />
                <StatsCard title="Needs Attention" value={stats.attention} icon={AlertCircle} color="#ef4444" />
            </div>

            <Card className="overflow-hidden border border-slate-200 shadow-lg rounded-xl">
                <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-slate-900">Application List</h3>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                                placeholder="Search registry..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" icon={Filter} className="shrink-0">Filter</Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Reference</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicant</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Submitted</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned To</th>
                                <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex justify-center items-center gap-2">
                                            <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
                                            <span>Loading registry data...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredApplications.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                                        No applications found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-blue-600">ISS/{app.id}</div>
                                            <div className="text-xs text-slate-400">Ref ID</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mr-3">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">{getApplicantName(app)}</div>
                                                    <div className="text-xs text-slate-500">Pilot</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800">
                                                {app.licence_type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatDate(app.created_at)}
                                            </div>
                                            <div className="text-xs text-slate-400 mt-0.5">
                                                {calculateTimeInStage(app.updated_at)} ago
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {app.assigned_to?.name ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700">
                                                        {app.assigned_to.name.charAt(0)}
                                                    </div>
                                                    <span>{app.assigned_to.name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-400 italic">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="relative" ref={openDropdown === app.id ? dropdownRef : null}>
                                                <button
                                                    onClick={() => toggleDropdown(app.id)}
                                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                >
                                                    <MoreVertical className="h-5 w-5" />
                                                </button>

                                                {openDropdown === app.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-20 ring-1 ring-black ring-opacity-5">
                                                        <button
                                                            onClick={() => handleAction('view', app.id)}
                                                            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                        >
                                                            <Eye className="h-4 w-4 text-blue-500" />
                                                            View Details
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction('edit', app.id)}
                                                            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                        >
                                                            <Edit className="h-4 w-4 text-slate-500" />
                                                            Edit Application
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500">
                            Showing <span className="font-medium text-slate-900">{filteredApplications.length}</span> results
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled>Previous</Button>
                            <Button variant="outline" size="sm" disabled>Next</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
