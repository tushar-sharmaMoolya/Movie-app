// src/context/FirebaseAuthContext.tsx
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, analytics } from '../config/firebase';
import { logEvent } from 'firebase/analytics';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface FirebaseAuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  registerWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType | undefined>(undefined);

export const FirebaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Setup auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          setCurrentUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });
          setIsAuthenticated(true);

          // Log login event to Analytics
          logEvent(analytics, 'login', {
            method: firebaseUser.providerData[0]?.providerId || 'email',
          });
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Error setting auth state:', err);
        setError(err instanceof Error ? err.message : 'Authentication error');
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const registerWithEmail = useCallback(
    async (email: string, password: string, displayName: string) => {
      try {
        setError(null);
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Update profile with display name
        await updateProfile(result.user, { displayName });

        // Save user data to Firestore
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email,
          displayName,
          createdAt: new Date(),
          provider: 'email',
        });

        // Log event
        logEvent(analytics, 'sign_up', { method: 'email' });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Registration failed';
        setError(errorMsg);
        throw err;
      }
    },
    []
  );

  const loginWithEmail = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);

      // Log event
      logEvent(analytics, 'login', { method: 'email' });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Save user data to Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date(),
        provider: 'google',
      });

      // Log event
      logEvent(analytics, 'login', { method: 'google' });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Google login failed';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const loginWithFacebook = useCallback(async () => {
    try {
      setError(null);
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Save user data to Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date(),
        provider: 'facebook',
      });

      // Log event
      logEvent(analytics, 'login', { method: 'facebook' });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Facebook login failed';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      await signOut(auth);

      // Log event
      logEvent(analytics, 'logout');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const value: FirebaseAuthContextType = {
    currentUser,
    isAuthenticated,
    loading,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    error,
  };

  return (
    <FirebaseAuthContext.Provider value={value}>{children}</FirebaseAuthContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider');
  }
  return context;
};
