import { supabase } from './supabase';

export interface EmailSignup {
  id: number;
  email: string;
  created_at: string;
  status: string;
  source: string;
}

export interface CreateEmailSignupData {
  email: string;
  source?: string;
}

// Create a new email signup
export async function createEmailSignup(data: CreateEmailSignupData): Promise<EmailSignup> {
  const { data: result, error } = await supabase
    .from('email_signups')
    .insert([{
      email: data.email,
      source: data.source || 'landing_page'
    }])
    .select()
    .single();

  if (error) {
    console.error('Supabase error details:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    
    if (error.code === '23505') { // Unique constraint violation
      throw new Error('This email is already registered!');
    }
    if (error.code === '42P01') { // Table does not exist
      throw new Error('Database table not found. Please contact support.');
    }
    throw new Error(`Database error: ${error.message}`);
  }

  return result;
}

// Get all email signups (for admin use)
export async function getEmailSignups(): Promise<EmailSignup[]> {
  const { data, error } = await supabase
    .from('email_signups')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching email signups:', error);
    throw new Error('Failed to fetch email signups');
  }

  return data || [];
}

// Check if email already exists
export async function checkEmailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('email_signups')
    .select('id')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    console.error('Error checking email:', error);
    return false;
  }

  return !!data;
}
