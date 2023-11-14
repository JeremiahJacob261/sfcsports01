import '@/styles/globals.css'
import { Piedra, Poppins } from '@next/font/google'
import { supabase } from './api/supabase'
import localFont from 'next/font/local'
import { useEffect } from 'react';
import Head from 'next/head';
const poppins = Poppins({ weight: ['300','400','600'],subsets: ['latin']});
const pops = localFont({ src: '../public/font/poppins.woff2' });
const lilpop = localFont({ src: '../public/font/lightpops.woff2' })
export default function App({ Component, pageProps }) {
  useEffect(()=>{
    // supabase.auth.onAuthStateChange((event, session) => {
    //   if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
    //     console.log('sign out')
    //     // delete cookies on sign out
    //     const expires = new Date(0).toUTCString()
    //     document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
    //     document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
    //   } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    //     console.log('sign in')
    //     const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
    //     document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
    //     document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
    //   }
    // })
  },[])
  return (
    <main className={lilpop.className} style={{ minHeight:'100vh'}}>
            <Head>
        <title>SFCSPORTS01</title>
        <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/Sheffield_FC.svg.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="PWA App" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="SFCSPORTS01" />
<meta name="description" content="BEST Investment Bet Platform in the whole world" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="msapplication-config" content="/icons/browserconfig.xml" />
<meta name="msapplication-TileColor" content="#2B5797" />
<meta name="msapplication-tap-highlight" content="no" />
<meta name="theme-color" content="#000000" />

<link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
<link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

<link rel="icon" type="image/png" sizes="32x32" href="/Sheffield_FC.svg.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/Sheffield_FC.svg.png" />
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="https://sfcsports01.com" />
<meta name="twitter:title" content="SFCSPORTS01" />
<meta name="twitter:description" content="Number One Investment Bet Platform" />
<meta name="twitter:image" content="https://sfcsports01.com/icons/android-chrome-192x192.png" />
<meta name="twitter:creator" content="@DavidWShadow" />
<meta property="og:type" content="website" />
<meta property="og:title" content="PWA App" />
<meta property="og:description" content="Best PWA App in the world" />
<meta property="og:site_name" content="PWA App" />
<meta property="og:url" content="https://sfcsports01.com" />
<meta property="og:image" content="https://sfcsports01.com/icons/apple-touch-icon.png" />

      </Head>
  <Component {...pageProps} />
    </main>
  )
}
