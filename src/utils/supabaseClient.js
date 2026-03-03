import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jbkpknhqlwluomasaqlp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impia3BrbmhxbHdsdW9tYXNhcWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyODk5OTYsImV4cCI6MjA4NTg2NTk5Nn0.UVJ9zPCBKmYu3-qv6gdDi6keGdfG6RQKeiuMqy75AY8'

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using mock mode.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})