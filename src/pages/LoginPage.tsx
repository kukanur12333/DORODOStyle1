import React from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/organisms/AuthLayout';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { SocialButton } from '../components/atoms/SocialButton';
import { Eye, EyeOff, Apple } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">Welcome back!</h1>
      <p className="text-gray-600 font-poppins mb-8">
        Sign in to access your exclusive account and continue your luxury journey.
      </p>

      <form className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
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
        
        <div className="text-right">
          <Link to="#" className="text-sm font-poppins text-gray-600 hover:text-primary-black hover:underline">
            Forgot Password?
          </Link>
        </div>
        
        <div className="pt-2">
          <Button type="submit" variant="primary" size="lg" className="w-full !rounded-full !py-3">
            Login
          </Button>
        </div>
      </form>

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
        Not a member?{' '}
        <Link to="/signup" className="font-semibold text-gray-800 hover:underline">
          Register now
        </Link>
      </p>
    </AuthLayout>
  );
};
