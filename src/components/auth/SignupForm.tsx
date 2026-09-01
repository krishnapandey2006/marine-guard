import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, Building, AlertCircle } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { GoogleAuthButton } from '../common/GoogleAuthButton';
import { useAuth } from '../../context/AuthContext';

export const SignupForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { signup, loginWithGoogle, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errors: typeof formErrors = {};
    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Official Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email format';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirmation password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    try {
      await signup({
        fullName,
        email,
        password,
        organization: organization.trim() || undefined,
      });
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

      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        <Input
          label="Full Name"
          type="text"
          placeholder="e.g. Commander R. Varma"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: undefined });
          }}
          error={formErrors.fullName}
          leftIcon={<UserIcon className="w-4 h-4" />}
          disabled={isLoading}
        />

        <Input
          label="Official Email Address"
          type="email"
          placeholder="analyst@coastguard.gov.in"
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

        <Input
          label="Organization / Agency (Optional)"
          type="text"
          placeholder="e.g. Maritime Board / Port Authority"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          leftIcon={<Building className="w-4 h-4" />}
          disabled={isLoading}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Password"
            type="password"
            placeholder="Min. 6 chars"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formErrors.password) setFormErrors({ ...formErrors, password: undefined });
            }}
            error={formErrors.password}
            leftIcon={<Lock className="w-4 h-4" />}
            autoComplete="new-password"
            disabled={isLoading}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (formErrors.confirmPassword) setFormErrors({ ...formErrors, confirmPassword: undefined });
            }}
            error={formErrors.confirmPassword}
            leftIcon={<Lock className="w-4 h-4" />}
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full mt-2"
          isLoading={isLoading}
        >
          CREATE ANALYST ACCOUNT
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-3">
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
        Already registered?{' '}
        <Link to="/login" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
          Sign In to Console
        </Link>
      </div>

    </div>
  );
};
