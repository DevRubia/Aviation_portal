import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileBadge, Award, BookOpen, Layers, CheckCircle, FileText, Eye, Trash2, Plane, GraduationCap, Shield, Users, FileCheck, Globe, AlertCircle, Edit } from 'lucide-react';
import { guidelines } from '../data/guidelines';

// Icon mapping for different license types
const iconMap = {
  SPL: BookOpen,
  PPL: FileBadge,
  CPL: Award,
  ATPL: Plane,
  IR: Shield,
  MER: Plane,
  NightRating: Plane,
  FI: GraduationCap,
  CCL: Users,
  Dispatcher: FileCheck,
  MedicalCertificates: FileCheck,
  ELP: Globe,
};

const LicenseCard = ({ title, description, icon: Icon, to }) => (
  <Link to={to} className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 hover:border-aviation-300 hover:shadow-lg transition-all duration-300">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-aviation-50 group-hover:bg-aviation-100 transition-colors">
      <Icon className="h-6 w-6 text-aviation-600" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-aviation-700">{title}</h3>
    <p className="mt-2 text-slate-600 text-sm leading-relaxed">{description}</p>
    <div className="mt-4 flex items-center text-sm font-medium text-aviation-600 opacity-0 group-hover:opacity-100 transition-opacity">
      Apply Now <span className="ml-1">→</span>
    </div>
  </Link>
);

const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = () => {
    setLoading(true);
    setError(null);
    fetch('/api/applications')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched applications:', data);
        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          console.error('API response is not an array:', data);
          setApplications([]);
          setError('Received invalid data from server.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch applications', err);
        setApplications([]);
        setError(err.message || 'Failed to load applications.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <div className="text-center py-10 text-slate-500">Loading submissions...</div>;

  if (error) {
    return (
      <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-200 border-dashed">
        <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
        <h3 className="mt-2 text-sm font-semibold text-red-900">Error loading applications</h3>
        <p className="mt-1 text-sm text-red-700">{error}</p>
        <button 
          onClick={fetchApplications}
          className="mt-4 px-4 py-2 bg-white border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
        <FileText className="mx-auto h-12 w-12 text-slate-300" />
        <h3 className="mt-2 text-sm font-semibold text-slate-900">No applications found</h3>
        <p className="mt-1 text-sm text-slate-500">Get started by selecting a service from the Services tab.</p>
        <button 
          onClick={fetchApplications}
          className="mt-4 px-4 py-2 text-aviation-600 hover:text-aviation-700 text-sm font-medium"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Application ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applicant</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#{app.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-aviation-100 text-aviation-800">
                    {app.licence_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                  {app.applicant_details?.name || 'N/A'}
                  <div className="text-xs text-slate-500">{app.applicant_details?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    app.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {new Date(app.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/portal/application/${app.id}/view`} className="text-slate-400 hover:text-aviation-600 transition-colors" title="View">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link to={`/portal/guidelines/${app.licence_type.toLowerCase()}`} className="text-aviation-600 hover:text-aviation-700 text-sm font-medium flex items-center gap-1" title="View Guideline">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button className="text-slate-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('services');

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  const tabs = [
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'submissions', label: 'Submissions', icon: FileText },
    { id: 'approvals', label: 'Approvals', icon: CheckCircle },
  ];

  return (
    <div className="bg-slate-50 min-h-full py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-500">Manage your aviation licenses and applications.</p>
          </div>
        </div>

        {/* Floating Aligned Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-full shadow-sm border border-slate-200 inline-flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-aviation-600 text-white shadow-md' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}
                  `}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {Object.entries(guidelines).map(([key, guideline]) => (
                <LicenseCard
                  key={key}
                  title={guideline.title}
                  description={guideline.description}
                  icon={iconMap[key] || FileText}
                  to={`/guidelines/${key.toLowerCase()}`}
                />
              ))}
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ApplicationsTable />
            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
                <CheckCircle className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="mt-2 text-sm font-semibold text-slate-900">No approvals yet</h3>
                <p className="mt-1 text-sm text-slate-500">Approved applications will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
