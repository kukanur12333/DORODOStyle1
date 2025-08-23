import { createClient } from '@supabase/supabase-js';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User as AppUser, Address } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<AppUser | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', supabaseUser.id)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  if (data) {
    return {
      id: data.id,
      name: data.full_name || 'New User',
      email: supabaseUser.email || '',
      avatar: data.avatar_url,
      membershipTier: data.membership_tier || 'Silver',
      loyaltyPoints: data.loyalty_points || 0,
      wishlist: [], // This would be fetched from another table in a real app
      addresses: [], // This would be fetched from another table
    };
  }

  return null;
};
