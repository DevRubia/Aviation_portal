import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, FileText, User } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login - redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-aviation-50 to-white pt-14 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Aviation Licensing Made Simple
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              The official portal for Pilot Licensing. Apply for SPL, PPL, and CPL licenses seamlessly online.
              Fast, secure, and compliant with CAA regulations.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={handleLogin}
                className="rounded-full bg-aviation-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-aviation-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aviation-600 transition-all transform hover:scale-105"
              >
                Get Started
              </button>
              <a href="#features" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1">
                Learn more <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-aviation-600">Streamlined Process</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to manage your license
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-aviation-50 p-2 ring-1 ring-aviation-100">
                  <FileText className="h-6 w-6 text-aviation-600" />
                </div>
                <dt className="mt-4 font-semibold text-slate-900">Digital Applications</dt>
                <dd className="mt-2 leading-7 text-slate-600">Submit your SPL, PPL, or CPL applications entirely online without paperwork delays.</dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-aviation-50 p-2 ring-1 ring-aviation-100">
                  <ShieldCheck className="h-6 w-6 text-aviation-600" />
                </div>
                <dt className="mt-4 font-semibold text-slate-900">Secure Verification</dt>
                <dd className="mt-2 leading-7 text-slate-600">Your data is encrypted and securely processed directly by the Civil Aviation Authority.</dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-aviation-50 p-2 ring-1 ring-aviation-100">
                  <User className="h-6 w-6 text-aviation-600" />
                </div>
                <dt className="mt-4 font-semibold text-slate-900">Personal Dashboard</dt>
                <dd className="mt-2 leading-7 text-slate-600">Track your application status, view your license details, and manage renewals in one place.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
