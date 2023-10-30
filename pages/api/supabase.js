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
const supabaseUrl = 'http://20.119.101.142:8000'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNjk4NjIwNDAwLAogICJleHAiOiAxODU2NDczMjAwCn0.CaKsc9iEyj0McM6uOLF0aVJZHmoWDe2wMcSLwyAgGdE'

export const supabase = createClient(supabaseUrl, supabaseKey)