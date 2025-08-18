import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          ingredients: string[];
          instructions: string[];
          cook_time: string | null;
          servings: number;
          category: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          ingredients: string[];
          instructions: string[];
          cook_time?: string | null;
          servings: number;
          category?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          ingredients?: string[];
          instructions?: string[];
          cook_time?: string | null;
          servings?: number;
          category?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      email_signups: {
        Row: {
          id: number;
          email: string;
          created_at: string;
          status: string;
          source: string;
        };
        Insert: {
          id?: number;
          email: string;
          created_at?: string;
          status?: string;
          source?: string;
        };
        Update: {
          id?: number;
          email?: string;
          created_at?: string;
          status?: string;
          source?: string;
        };
      };
    };
  };
};
