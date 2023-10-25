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
const supabaseUrl = 'https://fsyxfwfrzfggwmqznwmb.supabase.cov'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzeXhmd2ZyemZnZ3dtcXpud21iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODA4NTY1NywiZXhwIjoyMDEzNjYxNjU3fQ.F8S219c2ZpzPkQpv8PH0eI8oea17NISi19-fj_UhIrov'

export const supabase = createClient(supabaseUrl, supabaseKey)