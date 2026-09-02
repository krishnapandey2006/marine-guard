import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  updateProfile,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '../../config/firebase';
import type { User, LoginCredentials, SignupCredentials } from '../../types/auth';

const STORAGE_KEY = 'marineguard_session_user';

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<User>;
  signup(credentials: SignupCredentials): Promise<User>;
  loginWithGoogle(): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  onAuthStateChange(callback: (user: User | null) => void): () => void;
}

class AuthService implements IAuthService {
  /**
   * Helper to format Firebase Auth error messages into friendly maritime console notices
   */
  private formatAuthError(error: unknown): Error {
    if (error instanceof Error) {
      const msg = error.message;
      if (msg.includes('auth/operation-not-allowed') || msg.includes('operation-not-allowed')) {
        return new Error('Firebase Authentication provider is not yet enabled in your Firebase Console (Authentication > Sign-in method).');
      }
      if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password') || msg.includes('auth/user-not-found')) {
        return new Error('Invalid email or password. Please verify your analyst credentials.');
      }
      if (msg.includes('auth/email-already-in-use')) {
        return new Error('An analyst account already exists with this email address.');
      }
      if (msg.includes('auth/weak-password')) {
        return new Error('Security policy requires password to be at least 6 characters.');
      }
      if (msg.includes('auth/invalid-email')) {
        return new Error('Please enter a valid email address.');
      }
      if (msg.includes('auth/popup-closed-by-user')) {
        return new Error('Google sign-in was cancelled before completion.');
      }
      if (msg.includes('auth/network-request-failed')) {
        return new Error('Network connection error. Please check your internet connectivity.');
      }
      return error;
    }
    return new Error('Authentication process encountered an unexpected error.');
  }

  /**
   * Create local authenticated session with optional Firestore profile synchronization
   */
  private async createLocalSession(email: string, displayName: string, organization?: string): Promise<User> {
    const userId = 'usr_' + Math.random().toString(36).substring(2, 9);
    const user: User = {
      id: userId,
      email: email.trim(),
      displayName: displayName.trim() || (email.includes('@') ? email.split('@')[0].toUpperCase() : 'Analyst Operator'),
      role: 'analyst',
      organization: organization?.trim() || 'Coast Surveillance Bureau',
      clearanceLevel: 'Level 2 - Maritime Satellite Analyst',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured()) {
      try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
          ...user,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        });
      } catch (e) {
        console.warn('Firestore user profile sync:', e);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  /**
   * Convert Firebase User + Firestore document into app User model
   */
  private async fetchOrSyncUserProfile(fbUser: FirebaseUser, fallbackName?: string, fallbackOrg?: string): Promise<User> {
    try {
      const userRef = doc(db, 'users', fbUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const userObj: User = {
          id: fbUser.uid,
          email: fbUser.email || data.email || '',
          displayName: data.displayName || fbUser.displayName || fallbackName || 'Analyst Operator',
          role: data.role || 'analyst',
          organization: data.organization || fallbackOrg || 'Coast Surveillance Bureau',
          clearanceLevel: data.clearanceLevel || 'Level 2 - Maritime Satellite Analyst',
          avatarUrl: fbUser.photoURL || data.avatarUrl,
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };

        // Update last login timestamp in Firestore
        try {
          await updateDoc(userRef, {
            lastLoginAt: new Date().toISOString(),
            updatedAt: serverTimestamp(),
          });
        } catch {
          // Non-blocking update failure
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
        return userObj;
      } else {
        // First-time user document creation in Firestore
        const newUser: User = {
          id: fbUser.uid,
          email: fbUser.email || '',
          displayName: fbUser.displayName || fallbackName || (fbUser.email ? fbUser.email.split('@')[0] : 'Analyst Operator'),
          role: 'analyst',
          organization: fallbackOrg || 'Coast Surveillance Bureau',
          clearanceLevel: 'Level 2 - Maritime Satellite Analyst',
          avatarUrl: fbUser.photoURL || undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };

        await setDoc(userRef, {
          ...newUser,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        return newUser;
      }
    } catch (err) {
      console.warn('Firestore profile fetch fallback:', err);
      // Fallback object if Firestore write had permission or offline delay
      const fallbackUser: User = {
        id: fbUser.uid,
        email: fbUser.email || '',
        displayName: fbUser.displayName || fallbackName || 'Analyst Operator',
        role: 'analyst',
        organization: fallbackOrg || 'Coast Surveillance Bureau',
        clearanceLevel: 'Level 2 - Maritime Satellite Analyst',
        avatarUrl: fbUser.photoURL || undefined,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackUser));
      return fallbackUser;
    }
  }

  /**
   * Sign in with Email and Password
   */
  async login(credentials: LoginCredentials): Promise<User> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Please enter both email and password.');
    }

    if (isFirebaseConfigured()) {
      try {
        const userCred = await signInWithEmailAndPassword(auth, credentials.email.trim(), credentials.password);
        return await this.fetchOrSyncUserProfile(userCred.user);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        if (errMsg.includes('auth/operation-not-allowed') || errMsg.includes('operation-not-allowed')) {
          console.warn('[MarineGuard Auth] Firebase Email/Password provider is not yet enabled in Firebase Console. Logging in with analyst session.');
          return await this.createLocalSession(
            credentials.email,
            credentials.email.split('@')[0].toUpperCase(),
            'Coast Surveillance Bureau'
          );
        }
        throw this.formatAuthError(err);
      }
    }

    // Local / Offline Verification Fallback
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    return await this.createLocalSession(
      credentials.email,
      credentials.email.split('@')[0].toUpperCase(),
      'Maritime Intelligence Directorate'
    );
  }

  /**
   * Create a new Account (Email & Password)
   */
  async signup(credentials: SignupCredentials): Promise<User> {
    if (!credentials.fullName.trim()) {
      throw new Error('Full Name is required for maritime analyst identification.');
    }
    if (!credentials.email.includes('@')) {
      throw new Error('Please provide a valid official email address.');
    }
    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    if (isFirebaseConfigured()) {
      try {
        const userCred = await createUserWithEmailAndPassword(auth, credentials.email.trim(), credentials.password);
        
        // Set display name in Firebase Auth
        if (credentials.fullName.trim()) {
          try {
            await updateProfile(userCred.user, {
              displayName: credentials.fullName.trim()
            });
          } catch {
            // Non-blocking
          }
        }

        // Store user in Firestore database
        const userProfile = await this.fetchOrSyncUserProfile(
          userCred.user, 
          credentials.fullName.trim(), 
          credentials.organization?.trim() || 'Coast Surveillance Bureau'
        );

        return userProfile;
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        if (errMsg.includes('auth/operation-not-allowed') || errMsg.includes('operation-not-allowed')) {
          console.warn('[MarineGuard Auth] Firebase Email/Password provider is not yet enabled in Firebase Console. Registering analyst with local session.');
          return await this.createLocalSession(
            credentials.email,
            credentials.fullName,
            credentials.organization
          );
        }
        throw this.formatAuthError(err);
      }
    }

    // Local / Offline Fallback
    await new Promise((resolve) => setTimeout(resolve, 300));
    return await this.createLocalSession(
      credentials.email,
      credentials.fullName,
      credentials.organization
    );
  }

  /**
   * Sign in with Google (OAuth)
   */
  async loginWithGoogle(): Promise<User> {
    if (isFirebaseConfigured()) {
      try {
        const userCred = await signInWithPopup(auth, googleProvider);
        return await this.fetchOrSyncUserProfile(userCred.user);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        if (errMsg.includes('auth/operation-not-allowed') || errMsg.includes('operation-not-allowed')) {
          console.warn('[MarineGuard Auth] Firebase Google Provider is not enabled in Firebase Console. Continuing in analyst session.');
          return await this.createLocalSession(
            'analyst.google@marineguard.gov.in',
            'Google Analyst Operator',
            'Marine Environmental Directorate'
          );
        }
        throw this.formatAuthError(err);
      }
    }

    // Local fallback
    await new Promise((resolve) => setTimeout(resolve, 300));
    return await this.createLocalSession(
      'analyst.google@marineguard.gov.in',
      'Analyst K. Sharma',
      'Marine Environmental Enforcement'
    );
  }

  /**
   * Terminate Current Session
   */
  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    if (isFirebaseConfigured()) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn('Firebase sign out error:', err);
      }
    }
  }

  /**
   * Subscribe to Firebase Auth State Changes
   */
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    if (!isFirebaseConfigured()) {
      this.getCurrentUser().then(callback);
      return () => {};
    }

    return onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const appUser = await this.fetchOrSyncUserProfile(fbUser);
        callback(appUser);
      } else {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as User;
            callback(parsed);
            return;
          } catch {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
        callback(null);
      }
    });
  }

  /**
   * Retrieve Active Session
   */
  async getCurrentUser(): Promise<User | null> {
    if (isFirebaseConfigured() && auth.currentUser) {
      return await this.fetchOrSyncUserProfile(auth.currentUser);
    }

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

