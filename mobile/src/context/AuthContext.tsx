import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { UserProfile } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name?: string, role?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const LOCAL_STORAGE_KEY_DEMO_USER = 'hirepilot_mobile_demo_user';
const LOCAL_STORAGE_KEY_PROFILE = 'hirepilot_mobile_profile';

const DEFAULT_PROFILE: UserProfile = {
  id: 'guest-mobile-01',
  name: 'Alex Morgan',
  target_role: 'Software Engineer',
  experience_level: 'Mid-Level',
  target_companies: ['Google', 'Stripe', 'Anthropic', 'Vercel'],
  skills: ['React', 'TypeScript', 'Node.js', 'System Design', 'PostgreSQL'],
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  monthly_interviews_used: 1,
  monthly_interviews_limit: 3,
  subscription_tier: 'free',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  // Safe profile fetching that uses .maybeSingle() to completely avoid Supabase 406 errors
  const fetchUserProfile = async (userId: string, userMeta?: any): Promise<UserProfile | null> => {
    console.log('[AUTH] Profile request started for userId:', userId);
    try {
      if (!isSupabaseConfigured) {
        console.log('[AUTH] Supabase not configured, using local profile fallback');
        const defaultProfile: UserProfile = {
          id: userId,
          name: userMeta?.name || userMeta?.full_name || 'Alex Morgan',
          target_role: userMeta?.target_role || 'Software Engineer',
          experience_level: userMeta?.experience_level || 'Mid-Level',
          skills: ['React', 'TypeScript', 'Node.js', 'System Design'],
          monthly_interviews_used: 1,
          monthly_interviews_limit: 3,
          subscription_tier: 'free',
        };
        setProfile(defaultProfile);
        await AsyncStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(defaultProfile));
        console.log('[AUTH] Profile request completed');
        return defaultProfile;
      }

      // Query with timeout so slow network doesn't hang UI
      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
      );

      const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

      if (error) {
        console.warn('[AUTH] Could not load profile from Supabase, using local fallback:', error.message);
      }

      if (data) {
        console.log('[AUTH] Profile request completed (found existing profile)');
        setProfile(data as UserProfile);
        await AsyncStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(data));
        return data as UserProfile;
      }

      // If no profile row exists, safely auto-provision one
      console.log('[AUTH] Auto-provisioning new profile for:', userId);
      const newProfile: UserProfile = {
        id: userId,
        name: userMeta?.name || userMeta?.full_name || user?.email?.split('@')[0] || 'Candidate',
        target_role: userMeta?.target_role || 'Software Engineer',
        experience_level: userMeta?.experience_level || 'Mid-Level',
        skills: ['JavaScript', 'React', 'Node.js'],
        monthly_interviews_used: 0,
        monthly_interviews_limit: 3,
        subscription_tier: 'free',
      };

      try {
        await supabase.from('profiles').upsert(newProfile, { onConflict: 'id' });
      } catch (upsertErr) {
        console.warn('[AUTH] Auto-provision profile upsert skipped:', upsertErr);
      }

      setProfile(newProfile);
      await AsyncStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(newProfile));
      console.log('[AUTH] Profile request completed (auto-provisioned)');
      return newProfile;
    } catch (e) {
      console.warn('[AUTH] Profile fetch exception caught, using fallback:', e);
      const fallbackProfile: UserProfile = {
        id: userId,
        name: userMeta?.name || userMeta?.full_name || 'Candidate',
        target_role: 'Software Engineer',
        experience_level: 'Mid-Level',
        skills: ['JavaScript', 'React', 'Node.js'],
        monthly_interviews_used: 0,
        monthly_interviews_limit: 3,
        subscription_tier: 'free',
      };
      setProfile(fallbackProfile);
      return fallbackProfile;
    }
  };

  useEffect(() => {
    // Initial session retrieval
    const initAuth = async () => {
      console.log('[AUTH] App startup/auth initialization started');
      setIsLoading(true);
      try {
        const cachedDemo = await AsyncStorage.getItem(LOCAL_STORAGE_KEY_DEMO_USER);
        if (cachedDemo) {
          const parsed = JSON.parse(cachedDemo);
          console.log('[AUTH] Session detected from local storage (demo user)');
          setUser(parsed);
          const cachedProfile = await AsyncStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
          if (cachedProfile) {
            setProfile(JSON.parse(cachedProfile));
          }
          setIsLoading(false);
          return;
        }

        if (isSupabaseConfigured) {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          if (currentSession?.user) {
            console.log('[AUTH] Session detected from Supabase');
            await fetchUserProfile(currentSession.user.id, currentSession.user.user_metadata);
          } else {
            const cached = await AsyncStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
            if (cached) {
              setProfile(JSON.parse(cached));
            }
          }
        } else {
          const cached = await AsyncStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
          if (cached) {
            setProfile(JSON.parse(cached));
          }
        }
      } catch (err) {
        console.warn('[AUTH] Error during mobile auth init:', err);
      } finally {
        console.log('[AUTH] App startup/auth initialization completed');
        setIsLoading(false);
      }
    };

    initAuth();

    // Listen to Supabase auth state changes
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        console.log('[AUTH] Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          console.log('[AUTH] Session detected from auth state change');
          await fetchUserProfile(newSession.user.id, newSession.user.user_metadata);
        } else if (event === 'SIGNED_OUT') {
          setProfile(DEFAULT_PROFILE);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const signIn = async (email: string, pass: string) => {
    console.log('[AUTH] Login button pressed / Supabase login request started for:', email.trim());
    setIsLoading(true);
    try {
      // Demo / Sandbox accounts
      if (email.toLowerCase().includes('demo') || pass === 'demo123') {
        console.log('[AUTH] Demo account credentials provided, creating demo session');
        const demoUser = {
          id: 'demo-user-id-01',
          email: email.trim(),
          user_metadata: { name: 'Alex Morgan' },
        } as any;
        setUser(demoUser);
        setProfile(DEFAULT_PROFILE);
        await AsyncStorage.setItem(LOCAL_STORAGE_KEY_DEMO_USER, JSON.stringify(demoUser));
        console.log('[AUTH] Supabase login response received (demo success)');
        return;
      }

      if (!isSupabaseConfigured) {
        console.log('[AUTH] Standalone offline sign-in');
        const localUser = {
          id: 'local-user-' + Date.now(),
          email: email.trim(),
          user_metadata: { name: email.split('@')[0] },
        } as any;
        setUser(localUser);
        setProfile({
          ...DEFAULT_PROFILE,
          id: localUser.id,
          name: email.split('@')[0],
        });
        await AsyncStorage.setItem(LOCAL_STORAGE_KEY_DEMO_USER, JSON.stringify(localUser));
        console.log('[AUTH] Supabase login response received (standalone local success)');
        return;
      }

      const loginPromise = supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass,
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Login timed out. Please check your internet connection.')), 10000)
      );

      const { data, error } = (await Promise.race([loginPromise, timeoutPromise])) as any;
      console.log('[AUTH] Supabase login response received, hasError:', Boolean(error));

      if (error) {
        throw error;
      }

      if (data?.session) {
        console.log('[AUTH] Session detected');
        setSession(data.session);
        setUser(data.user);
        // Non-blocking profile fetch
        fetchUserProfile(data.user.id, data.user.user_metadata).catch((err) => {
          console.warn('[AUTH] Non-blocking profile fetch notice:', err);
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, pass: string, name = 'Candidate', role = 'Software Engineer') => {
    console.log('[AUTH] Signup request started for:', email.trim());
    setIsLoading(true);
    try {
      if (!isSupabaseConfigured) {
        const localUser = {
          id: 'local-user-' + Date.now(),
          email: email.trim(),
          user_metadata: { name, target_role: role },
        } as any;
        setUser(localUser);
        setProfile({
          ...DEFAULT_PROFILE,
          id: localUser.id,
          name,
          target_role: role,
        });
        await AsyncStorage.setItem(LOCAL_STORAGE_KEY_DEMO_USER, JSON.stringify(localUser));
        console.log('[AUTH] Signup completed (local)');
        return;
      }

      const signupPromise = supabase.auth.signUp({
        email: email.trim(),
        password: pass,
        options: {
          data: {
            name: name.trim(),
            target_role: role.trim(),
          },
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Signup timed out. Please check your internet connection.')), 10000)
      );

      const { data, error } = (await Promise.race([signupPromise, timeoutPromise])) as any;
      console.log('[AUTH] Signup response received, hasError:', Boolean(error));

      if (error) throw error;

      if (data?.user) {
        setUser(data.user);
        setSession(data.session);
        fetchUserProfile(data.user.id, { name, target_role: role }).catch((err) => {
          console.warn('[AUTH] Non-blocking profile fetch notice:', err);
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    console.log('[AUTH] Sign out request started');
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
      await AsyncStorage.removeItem(LOCAL_STORAGE_KEY_DEMO_USER);
    } catch (e) {
      console.warn('[AUTH] Sign out error:', e);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(DEFAULT_PROFILE);
      console.log('[AUTH] Sign out completed');
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;

    const merged = { ...profile, ...updates, updated_at: new Date().toISOString() };
    setProfile(merged);
    await AsyncStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(merged));

    if (isSupabaseConfigured && user?.id) {
      try {
        await supabase
          .from('profiles')
          .upsert({ ...merged, id: user.id }, { onConflict: 'id' });
      } catch (err) {
        console.warn('[AUTH] Could not persist profile update to remote Supabase:', err);
      }
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchUserProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        refreshProfile,
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
