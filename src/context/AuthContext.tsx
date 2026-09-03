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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log('[AUTH DEBUG] initial', {
    loading,
    hasUser: Boolean(user),
  });

  useEffect(() => {
    let mounted = true;

    const handleAuthChange = async (event: string, currentSession: Session | null) => {
      console.log('[AUTH DEBUG] auth change', {
        event,
        hasSession: Boolean(currentSession),
        hasUser: Boolean(currentSession?.user),
      });
      if (!mounted) return;

      // Ignore INITIAL_SESSION here because getSession() handles the initial load safely.
      // This prevents a race condition where INITIAL_SESSION fires with null before storage is fully read,
      // causing premature loading=false and redirect to /login.
      if (event === 'INITIAL_SESSION') return;

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        await fetchUserProfile(
          currentSession.user.id,
          currentSession.user.email,
          currentSession.user.user_metadata
        );
      } else {
        setProfile(null);
      }
    };

    const initializeAuth = async () => {
      if (!isSupabaseConfigured) {
        console.warn('Supabase is not configured. Authentication will not work properly.');
        if (mounted) setLoading(false);
        return;
      }

      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        console.log('[AUTH DEBUG] getSession', {
          hasSession: Boolean(initialSession),
          hasUser: Boolean(initialSession?.user),
        });
        
        if (error) {
          console.error('[AUTH] Error in getSession:', error);
        }
        
        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);

          if (initialSession?.user) {
            await fetchUserProfile(
              initialSession.user.id,
              initialSession.user.email,
              initialSession.user.user_metadata
            );
          } else {
            setProfile(null);
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    let subscription: any = null;
    if (isSupabaseConfigured) {
      const { data } = supabase.auth.onAuthStateChange((event, currentSession) => {
        handleAuthChange(event, currentSession);
      });
      subscription = data.subscription;
    }

    return () => {
      mounted = false;
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Debug logging for state changes
  useEffect(() => {
    console.log(
      '[AUTH]',
      'session:',
      session ? 'ACTIVE' : 'NONE',
      'loading:',
      loading
    );
  }, [session, loading]);

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
    if (!isSupabaseConfigured) return { error: new Error('Supabase not configured') };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? new Error(error.message) : null };
  };

  const signUp = async (email: string, password: string, name?: string) => {
    if (!isSupabaseConfigured) return { error: new Error('Supabase not configured') };
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
    if (!isSupabaseConfigured) return { error: new Error('Supabase not configured') };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured) return { error: new Error('Supabase not configured') };
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
    }
    return { error: new Error('Supabase not configured or no user logged in') };
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
