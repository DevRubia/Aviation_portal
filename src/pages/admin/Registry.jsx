import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Eye, Edit, RefreshCw, MoreVertical, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

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
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
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
        if (s === 'approved') return 'text-green-600 bg-green-50 border-green-100';
        if (s === 'rejected') return 'text-red-600 bg-red-50 border-red-100';
        if (s === 'submitted' || s === 'pending') return 'text-blue-600 bg-blue-50 border-blue-100';
        if (s === 'draft') return 'text-slate-500 bg-slate-50 border-slate-100';
        return 'text-amber-600 bg-amber-50 border-amber-100';
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Registry</h1>
                    <p className="text-slate-500">View and manage all license applications.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" icon={RefreshCw} onClick={fetchApplications} isLoading={isLoading}>Refresh</Button>
                    <Button variant="outline" icon={Filter}>Filter</Button>
                    <Button variant="dark">Export Data</Button>
                </div>
            </div>

            <Card className="overflow-hidden border border-slate-200 shadow-sm">
                <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Search by reference or applicant..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Actions
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Reference
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Process
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Applicant
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Time in Stage
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Responsible User(s)
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Responsible Role
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                                        Loading registry data...
                                    </td>
                                </tr>
                            ) : filteredApplications.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="relative" ref={openDropdown === app.id ? dropdownRef : null}>
                                                <button
                                                    onClick={() => toggleDropdown(app.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors"
                                                >
                                                    Actions
                                                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === app.id ? 'rotate-180' : ''}`} />
                                                </button>

                                                {openDropdown === app.id && (
                                                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-10">
                                                        <button
                                                            onClick={() => handleAction('view', app.id)}
                                                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                        >
                                                            <Eye className="h-4 w-4 text-blue-600" />
                                                            View Application
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction('edit', app.id)}
                                                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                        >
                                                            <Edit className="h-4 w-4 text-slate-600" />
                                                            Edit in Portal
                                                        </button>
                                                        {/* Add more actions here as needed */}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                            ISS/{app.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {app.licence_type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
                                            {getApplicantName(app)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {calculateTimeInStage(app.updated_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            --
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            --
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white px-4 py-3 border-t border-slate-200 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-700">
                            Showing <span className="font-medium">{filteredApplications.length}</span> results
                        </div>
                        <div className="flex-1 flex justify-end gap-2">
                            <Button variant="outline" size="sm" disabled>Previous</Button>
                            <Button variant="outline" size="sm" disabled>Next</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
