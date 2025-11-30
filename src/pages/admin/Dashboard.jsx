import React, { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';

export default function CoreDashboard() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await window.axios.get('/api/applications');
            const apps = response.data.data || response.data || [];

            setApplications(apps);

            // Calculate statistics
            const statsData = {
                total: apps.length,
                pending: apps.filter(app => app.status === 'pending' || app.status === 'in_review').length,
                approved: apps.filter(app => app.status === 'approved').length,
                rejected: apps.filter(app => app.status === 'rejected').length,
            };
            setStats(statsData);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { name: 'Total Applications', value: stats.total, icon: FileText, color: 'bg-blue-500' },
        { name: 'Pending Review', value: stats.pending, icon: Clock, color: 'bg-amber-500' },
        { name: 'Approved', value: stats.approved, icon: CheckCircle, color: 'bg-green-500' },
        { name: 'Rejected', value: stats.rejected, icon: TrendingUp, color: 'bg-red-500' },
    ];

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-amber-100 text-amber-800',
            in_review: 'bg-blue-100 text-blue-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-slate-100 text-slate-800';
    };

    const getTimeAgo = (dateString) => {
        if (!dateString) return 'Unknown';
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
        return date.toLocaleDateString();
    };

    // Get most recent 5 applications
    const recentApplications = applications
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Core Dashboard</h1>
                <p className="text-slate-500">Overview of the licensing system status.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((item) => (
                    <Card key={item.name} className="p-5 flex items-center">
                        <div className={`flex-shrink-0 rounded-md p-3 ${item.color}`}>
                            <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-slate-500 truncate">{item.name}</dt>
                                <dd>
                                    <div className="text-lg font-medium text-slate-900">
                                        {loading ? '...' : item.value}
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-8 text-slate-500">Loading...</div>
                        ) : recentApplications.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                                No recent applications
                            </div>
                        ) : (
                            recentApplications.map((app) => (
                                <div
                                    key={app.id}
                                    className="flex items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0 cursor-pointer hover:bg-slate-50 -mx-2 px-2 rounded transition-colors"
                                    onClick={() => navigate(`/core/application/${app.id}`)}
                                >
                                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-800">
                                            <span className="font-medium">{app.licence_type || 'License'}</span> application
                                            {app.applicant_name && (
                                                <> by <span className="font-medium">{app.applicant_name}</span></>
                                            )}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(app.status)}`}>
                                                {app.status?.replace('_', ' ').toUpperCase()}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {getTimeAgo(app.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {!loading && recentApplications.length > 0 && (
                        <button
                            onClick={() => navigate('/core/registry')}
                            className="mt-4 w-full text-center text-sm text-aviation-600 hover:text-aviation-500 font-medium"
                        >
                            View All Applications →
                        </button>
                    )}
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-medium text-slate-900 mb-4">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Database Sync</span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Operational</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Email Service</span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Operational</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Payment Gateway</span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Operational</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Application API</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${loading ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                                {loading ? 'Loading' : 'Operational'}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
