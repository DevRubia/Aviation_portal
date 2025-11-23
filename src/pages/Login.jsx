import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plane, Mail, Lock, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function PortalLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock login success
      console.log('Portal login attempt:', formData);
      navigate('/portal/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-aviation-600 p-3 rounded-xl shadow-lg">
            <Plane className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Pilot Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to manage your licenses and applications
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="pilot@example.com"
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
                  className="h-4 w-4 text-aviation-600 focus:ring-aviation-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-aviation-600 hover:text-aviation-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
                icon={ArrowRight}
              >
                Sign In
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
                  New to SkyLicensing?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/portal/register"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-aviation-600 bg-aviation-50 hover:bg-aviation-100 transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
