import '@/styles/globals.css'
import { Piedra, Poppins } from '@next/font/google'
import { supabase } from './api/supabase'
import localFont from 'next/font/local'
import { useEffect } from 'react';
const poppins = Poppins({ weight: ['300','400','600'],subsets: ['latin']});
const pops = localFont({ src: '../public/font/poppins.woff2' });
const lilpop = localFont({ src: '../public/font/lightpops.woff2' })
export default function App({ Component, pageProps }) {
  useEffect(()=>{
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        console.log('sign out')
        // delete cookies on sign out
        const expires = new Date(0).toUTCString()
        document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
        document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        console.log('sign in')
        const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
        document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
        document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
      }
    })
  },[])
  return (
    <main className={lilpop.className} style={{ minHeight:'100vh'}}>
  <Component {...pageProps} />
    </main>
  )
}
