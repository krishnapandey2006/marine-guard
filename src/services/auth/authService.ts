import type { User, LoginCredentials, SignupCredentials } from '../../types/auth';
import { isFirebaseConfigured } from '../../config/firebase';

const STORAGE_KEY = 'marineguard_session_user';

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<User>;
  signup(credentials: SignupCredentials): Promise<User>;
  loginWithGoogle(): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

class AuthService implements IAuthService {
  /**
   * Sign in with Email and Password
   */
  async login(credentials: LoginCredentials): Promise<User> {
    if (isFirebaseConfigured()) {
      throw new Error('Firebase configured: connecting to live backend...');
    }

    // Local / Development verification mode
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required.');
    }

    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const user: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: credentials.email,
      displayName: credentials.email.split('@')[0].toUpperCase(),
      role: 'analyst',
      organization: 'Maritime Intelligence Directorate',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  /**
   * Create a new Account
   */
  async signup(credentials: SignupCredentials): Promise<User> {
    if (isFirebaseConfigured()) {
      throw new Error('Firebase configured: connecting to live backend...');
    }

    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!credentials.fullName.trim()) {
      throw new Error('Full Name is required for maritime analyst identification.');
    }

    if (!credentials.email.includes('@')) {
      throw new Error('Please provide a valid official email address.');
    }

    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const user: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: credentials.email,
      displayName: credentials.fullName,
      role: 'analyst',
      organization: credentials.organization || 'Coast Surveillance Bureau',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  /**
   * Sign in with Google (OAuth)
   */
  async loginWithGoogle(): Promise<User> {
    if (isFirebaseConfigured()) {
      throw new Error('Firebase configured: connecting to Google OAuth provider...');
    }

    await new Promise((resolve) => setTimeout(resolve, 700));

    const user: User = {
      id: 'usr_google_' + Math.random().toString(36).substring(2, 9),
      email: 'analyst.ocean@marineguard.gov.in',
      displayName: 'Analyst K. Sharma',
      role: 'investigator',
      organization: 'Marine Environmental Enforcement',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  /**
   * Terminate Current Session
   */
  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Retrieve Active Session
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as User;
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    return null;
  }
}

export const authService = new AuthService();
