import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { GoogleAuthButton } from '../common/GoogleAuthButton';
import { useAuth } from '../../context/AuthContext';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const { login, loginWithGoogle, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email format';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch {
      // Error handled by AuthContext
    }
  };

  const handleGoogleSignIn = async () => {
    clearError();
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch {
      // Error handled by AuthContext
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Global Error Banner */}
      {error && (
        <div className="p-3 bg-red-950/70 border border-red-800/80 rounded flex items-start gap-2 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Official Email Address"
          type="email"
          placeholder="analyst@marineguard.gov.in"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
          }}
          error={formErrors.email}
          leftIcon={<Mail className="w-4 h-4" />}
          autoComplete="email"
          disabled={isLoading}
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formErrors.password) setFormErrors({ ...formErrors, password: undefined });
            }}
            error={formErrors.password}
            leftIcon={<Lock className="w-4 h-4" />}
            autoComplete="current-password"
            disabled={isLoading}
          />
          <div className="flex justify-end mt-1.5">
            <button
              type="button"
              onClick={() => alert('Password reset service will be configured with Firebase in Step 2.')}
              className="text-xs text-teal-400 hover:text-teal-300 transition-colors font-mono focus:outline-none"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full mt-2"
          isLoading={isLoading}
        >
          SIGN IN TO CONSOLE
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="w-full border-t border-marine-700"></div>
        <span className="bg-marine-900 px-3 text-[11px] font-mono uppercase text-marine-400 absolute">
          OR
        </span>
      </div>

      {/* Google Sign-in */}
      <GoogleAuthButton
        onClick={handleGoogleSignIn}
        isLoading={isLoading}
        label="Continue with Google"
      />

      {/* Footer Switch */}
      <div className="text-center pt-2 text-xs text-marine-400">
        New to MarineGuard?{' '}
        <Link to="/signup" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
          Create an Analyst Account
        </Link>
      </div>

    </div>
  );
};
