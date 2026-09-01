import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      title="Analyst Sign In"
      subtitle="Enter your credentials to access the satellite intelligence workspace."
    >
      <LoginForm />
    </AuthLayout>
  );
};
