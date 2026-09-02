import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, type Firestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseAppletConfig from '../../firebase-applet-config.json';

// Firebase configuration resolving applet config with env variable fallback
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseAppletConfig.apiKey || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseAppletConfig.authDomain || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseAppletConfig.projectId || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseAppletConfig.storageBucket || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseAppletConfig.messagingSenderId || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseAppletConfig.appId || '',
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.authDomain
  );
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);

// Use named database if specified in config, otherwise default
const databaseId = firebaseAppletConfig.firestoreDatabaseId && firebaseAppletConfig.firestoreDatabaseId !== '(default)'
  ? firebaseAppletConfig.firestoreDatabaseId
  : undefined;

try {
  db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
} catch {
  db = getFirestore(app);
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Verify Firestore connection on boot
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client offline check:', error.message);
    }
    return false;
  }
}

// Initial silent connection check
testFirestoreConnection().catch(() => {});

export { app, auth, db };
