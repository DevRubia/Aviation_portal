import React from 'react';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import Card from '../../components/ui/Card';

export default function CoreDashboard() {
    const stats = [
        { name: 'Total Applications', value: '128', icon: FileText, color: 'bg-blue-500' },
        { name: 'Pending Review', value: '32', icon: Clock, color: 'bg-amber-500' },
        { name: 'Approved', value: '84', icon: CheckCircle, color: 'bg-green-500' },
        { name: 'Active Pilots', value: '1,240', icon: Users, color: 'bg-indigo-500' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Core Dashboard</h1>
                <p className="text-slate-500">Overview of the licensing system status.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Card key={item.name} className="p-5 flex items-center">
                        <div className={`flex-shrink-0 rounded-md p-3 ${item.color}`}>
                            <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-slate-500 truncate">{item.name}</dt>
                                <dd>
                                    <div className="text-lg font-medium text-slate-900">{item.value}</div>
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
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
                                <div>
                                    <p className="text-sm text-slate-800">New application submitted by <span className="font-medium">John Doe</span></p>
                                    <p className="text-xs text-slate-500">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
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
                    </div>
                </Card>
            </div>
        </div>
    );
}
