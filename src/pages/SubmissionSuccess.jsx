import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';

export default function SubmissionSuccess() {
  return (
    <div className="min-h-full bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Application Submitted!</h2>
        <p className="mt-2 text-sm text-slate-600">
          Your application has been successfully received. Our team will review your details and get back to you shortly.
        </p>
        <div className="mt-8">
          <Link
            to="/dashboard"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-aviation-600 hover:bg-aviation-700 md:py-4 md:text-lg transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
