import { createClient } from '@supabase/supabase-js'
const options = {
    db: {
      schema: 'public',
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: { 'x-my-custom-header': 'my-app-name' },
    },
  }
const supabaseUrl = 'https://fsyxfwfrzfggwmqznwmb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzeXhmd2ZyemZnZ3dtcXpud21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwODU2NTcsImV4cCI6MjAxMzY2MTY1N30.k5neP0yC3uoE4rpbM_sTJyfmg9ZFR7PpmJ3LEjiA-RQ'

export const supabase = createClient(supabaseUrl, supabaseKey)