import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { guidelines } from '../data/guidelines';

export default function ApplicationGuideline() {
  const { type } = useParams();
  const licenseType = type?.toUpperCase();

  const currentGuideline = guidelines[licenseType] || {
    title: `${licenseType} License`,
    requirements: ['General requirements apply.'],
    description: 'Please review the general regulations for this license type.',
  };

  return (
    <div className="min-h-full bg-slate-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-aviation-600 px-8 py-8 text-white">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-3xl font-bold">{currentGuideline.title} Guidelines</h1>
          </div>
          <p className="mt-4 text-aviation-100 text-lg">{currentGuideline.description}</p>
        </div>

        <div className="px-8 py-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Prerequisites & Requirements
          </h3>
          
          <ul className="space-y-4 mb-10">
            {currentGuideline.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="mt-1 min-w-1.5 min-h-1.5 rounded-full bg-aviation-500"></div>
                <span className="text-slate-700">{req}</span>
              </li>
            ))}
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-md">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800">Important Note</h4>
                <p className="text-amber-700 text-sm mt-1">
                  Ensure you have digital copies of your medical certificate and identification documents ready before proceeding with the application.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
            <Link 
              to="/dashboard"
              className="px-6 py-3 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Link>
            <Link
              to={`/apply/${type}`}
              className="flex items-center gap-2 px-8 py-3 rounded-lg bg-aviation-600 text-white font-semibold hover:bg-aviation-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Proceed to Application <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
