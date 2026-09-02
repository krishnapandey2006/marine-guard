export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'analyst' | 'investigator' | 'commander' | 'admin';
  organization?: string;
  clearanceLevel?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
  organization?: string;
}
