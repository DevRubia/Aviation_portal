import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ShieldCheck, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';

export default function Gateway() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-aviation-600 p-3 rounded-xl shadow-lg">
            <Plane className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Aviation Licensing Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Select your role to continue
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 px-4 sm:px-0">

          {/* Pilot Portal Card */}
          <Card
            as={Link}
            to="/portal"
            hoverEffect={true}
            className="group relative"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-aviation-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-aviation-100 p-3 rounded-lg group-hover:bg-aviation-600 transition-colors duration-300">
                  <Plane className="h-8 w-8 text-aviation-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-aviation-600 transform group-hover:translate-x-1 transition-all" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Pilot Portal</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                For pilots and students. Apply for licenses, manage ratings, view medical status, and track applications.
              </p>

              <div className="flex items-center text-sm font-medium text-aviation-600 group-hover:text-aviation-700">
                Enter Portal <span className="ml-1">→</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-aviation-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Card>

          {/* Admin Portal Card */}
          <Card
            as={Link}
            to="/core"
            hoverEffect={true}
            className="group relative hover:border-slate-400"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-slate-100 p-3 rounded-lg group-hover:bg-slate-800 transition-colors duration-300">
                  <ShieldCheck className="h-8 w-8 text-slate-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-slate-800 transform group-hover:translate-x-1 transition-all" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">CAA Core</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                For Civil Aviation Authority staff. Process applications, verify documents, and manage license issuance.
              </p>

              <div className="flex items-center text-sm font-medium text-slate-600 group-hover:text-slate-800">
                Access Core <span className="ml-1">→</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Card>

        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            © 2025 Civil Aviation Authority. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
