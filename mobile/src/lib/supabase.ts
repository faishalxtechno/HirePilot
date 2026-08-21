import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supabase credentials for HirePilot
const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  'https://akhtoqxwjixqoddecqty.supabase.co';

const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured =
  Boolean(supabaseUrl && supabaseAnonKey) &&
  !supabaseUrl.includes('placeholder-project') &&
  !supabaseAnonKey.includes('placeholder') &&
  supabaseAnonKey.length > 20;

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://akhtoqxwjixqoddecqty.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
