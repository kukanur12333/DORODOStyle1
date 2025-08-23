import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/organisms/AuthLayout';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { SocialButton } from '../components/atoms/SocialButton';
import { Eye, EyeOff, Apple } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        // This will redirect the user to the home page after email confirmation
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.user && data.user.identities?.length === 0) {
      setError("This email address is already in use. Please try logging in.");
      setLoading(false);
      return;
    }
    
    if (data.user) {
      setSuccess(true);
    }
    
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">Create an Account</h1>
      <p className="text-gray-600 font-poppins mb-8">Join the future of fashion. It's free!</p>

      {success ? (
        <div className="text-center bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-bold font-montserrat text-green-800 mb-2">Check your email!</h3>
          <p className="text-green-700 font-poppins">
            We've sent a confirmation link to <strong>{email}</strong>. Please click the link to complete your registration.
          </p>
          <Button onClick={() => navigate('/login')} className="mt-6">Go to Login</Button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSignUp}>
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            endIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          
          {error && <p className="text-sm text-red-500">{error}</p>}
          
          <p className="text-xs text-gray-500 font-poppins pt-2">
            By creating an account, you agree to our{' '}
            <Link to="#" className="underline hover:text-primary-black">Terms of Service</Link> and{' '}
            <Link to="#" className="underline hover:text-primary-black">Privacy Policy</Link>.
          </p>
          
          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" className="w-full !rounded-full !py-3" loading={loading} disabled={loading}>
              Create Account
            </Button>
          </div>
        </form>
      )}
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-gray-500 font-poppins">or continue with</span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <SocialButton icon={<span className="font-bold text-lg">G</span>} label="Google" />
        <SocialButton icon={<Apple size={22} />} label="Apple" />
        <SocialButton icon={<span className="font-bold text-lg">f</span>} label="Facebook" />
      </div>

      <p className="text-center text-sm font-poppins text-gray-600 mt-8">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-gray-800 hover:underline">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
};
