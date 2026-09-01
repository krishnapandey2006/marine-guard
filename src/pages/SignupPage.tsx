import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { SignupForm } from '../components/auth/SignupForm';

export const SignupPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create Analyst Account"
      subtitle="Register an authorized account for marine surveillance operations."
    >
      <SignupForm />
    </AuthLayout>
  );
};
