import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_PROFILE: UserProfile = {
  id: 'guest-user-123',
  name: 'Alex Morgan',
  email: 'alex.morgan@hirepilot.dev',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  target_role: 'Software Engineer',
  experience_level: '1-3 Years',
  created_at: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedGuest = localStorage.getItem('hirepilot_guest_user');

    if (isSupabaseConfigured) {
      // Listen to auth state changes (handles initial session, login, logout, token refresh)
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          await fetchUserProfile(
            currentSession.user.id,
            currentSession.user.email,
            currentSession.user.user_metadata
          );
        } else if (savedGuest) {
          setProfile(JSON.parse(savedGuest));
          setUser({ id: 'guest-user-123', email: 'alex.morgan@hirepilot.dev' } as any);
        } else {
          setProfile(null);
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Local fallback mode when Supabase credentials are not configured
      if (savedGuest) {
        setProfile(JSON.parse(savedGuest));
        setUser({ id: 'guest-user-123', email: 'alex.morgan@hirepilot.dev' } as any);
      } else {
        localStorage.setItem('hirepilot_guest_user', JSON.stringify(DEMO_USER_PROFILE));
        setProfile(DEMO_USER_PROFILE);
        setUser({ id: 'guest-user-123', email: 'alex.morgan@hirepilot.dev' } as any);
      }
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (userId: string, email?: string, userMetadata?: any) => {
    try {
      // Use .maybeSingle() instead of .single() to avoid 406 Not Acceptable (PGRST116) when 0 rows match
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('Notice fetching profile from Supabase:', error.message);
      }

      if (data) {
        setProfile(data);
      } else {
        // Fallback default profile if trigger hasn't fired or row does not exist yet
        const defaultProfile: UserProfile = {
          id: userId,
          name: userMetadata?.full_name || userMetadata?.name || email?.split('@')[0] || 'Candidate',
          email: email || '',
          target_role: 'Software Engineer',
          experience_level: 'Fresher',
        };
        setProfile(defaultProfile);

        // Auto-provision profile row in Supabase so future requests find the record
        try {
          await supabase
            .from('profiles')
            .upsert(defaultProfile, { onConflict: 'id' });
        } catch (upsertErr) {
          // Non-blocking if table is restricted
          console.warn('Notice auto-provisioning profile row:', upsertErr);
        }
      }
    } catch (err) {
      console.error('Error in fetchUserProfile:', err);
      setProfile({
        id: userId,
        name: userMetadata?.full_name || userMetadata?.name || email?.split('@')[0] || 'Candidate',
        email: email || '',
        target_role: 'Software Engineer',
        experience_level: 'Fresher',
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      const guestProfile = { ...DEMO_USER_PROFILE, email, name: email.split('@')[0] };
      localStorage.setItem('hirepilot_guest_user', JSON.stringify(guestProfile));
      setProfile(guestProfile);
      setUser({ id: 'guest-user-123', email } as any);
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? new Error(error.message) : null };
  };

  const signUp = async (email: string, password: string, name?: string) => {
    if (!isSupabaseConfigured) {
      const guestProfile = {
        ...DEMO_USER_PROFILE,
        email,
        name: name || email.split('@')[0],
      };
      localStorage.setItem('hirepilot_guest_user', JSON.stringify(guestProfile));
      setProfile(guestProfile);
      setUser({ id: 'guest-user-123', email } as any);
      return { error: null };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      loginAsGuest();
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    localStorage.removeItem('hirepilot_guest_user');
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured) {
      return { error: null };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error ? new Error(error.message) : null };
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return { error: new Error('No user logged in') };

    const updated = { ...profile, ...updates, updated_at: new Date().toISOString() };
    setProfile(updated);

    if (isSupabaseConfigured && user) {
      const { error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: user.id,
            email: user.email,
            ...updates,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );
      return { error: error ? new Error(error.message) : null };
    } else {
      localStorage.setItem('hirepilot_guest_user', JSON.stringify(updated));
      return { error: null };
    }
  };

  const loginAsGuest = () => {
    localStorage.setItem('hirepilot_guest_user', JSON.stringify(DEMO_USER_PROFILE));
    setProfile(DEMO_USER_PROFILE);
    setUser({ id: 'guest-user-123', email: DEMO_USER_PROFILE.email } as any);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
        updateProfile,
        loginAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
