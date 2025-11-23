import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

export default function AdminLogin() {
  const navigate = useNavigate();
  // State for login form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // State for loading status
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For now, just log to console. In a real app, we'd handle auth tokens here.
      console.log('Admin login attempt:', formData);
      navigate('/core/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-slate-900 p-3 rounded-xl shadow-lg">
            <ShieldCheck className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          CAA Core System
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Restricted access for authorized personnel only.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10 border-t-4 border-t-slate-900">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              label="Official Email"
              placeholder="officer@caa.bg"
              required
              value={formData.email}
              onChange={handleChange}
              icon={Mail}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              required
              value={formData.password}
              onChange={handleChange}
              icon={Lock}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-slate-900 hover:text-slate-700">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="dark"
                className="w-full"
                isLoading={isLoading}
                icon={ArrowRight}
              >
                Sign in to Core
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  Authorized Access Only
                </span>
              </div>
            </div>
            <div className="mt-6 text-center text-xs text-slate-400">
              <p>Unauthorized access is a criminal offense under the Computer Misuse Act 1990.</p>
              <p className="mt-1">IP Address Logged: 192.168.x.x</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
