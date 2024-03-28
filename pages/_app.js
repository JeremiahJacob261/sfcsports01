import '@/styles/globals.css'
import { Sumana, Poppins, Walter_Turncoat } from '@next/font/google'
import { supabase } from './api/supabase'
import localFont from 'next/font/local'
import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next'
import ErrorBoundary from './ErrorBoundary';
import Head from 'next/head';
const poppins = Poppins({ weight: ['300','400','600'],subsets: ['latin']});
const suma = Sumana({ weight: ['400','700'],subsets: ['latin']})
const pops = localFont({ src: '../public/font/poppins.woff2' });
const walter = Walter_Turncoat({ weight:['400'],subsets:['latin']})
const lilpop = localFont({ src: '../public/font/lightpops.woff2' })
 function App({ Component, pageProps }) {
  useEffect(()=>{
    localStorage.setItem('pin?','false');
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
     } else if (Notification.permission === "granted") {
      // Permission has already been granted
     } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
         if (permission === "granted") {
           // Permission has been granted
         }
      });
     }
     
  },[])
  return (
    <main className={lilpop.className} style={{ minHeight:'100vh'}}>
      <ErrorBoundary>
            <Head>
        <title>Eplsports</title>
        <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="PWA App" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="Eplsports" />
<meta name="description" content="BEST Investment Bet Platform in the whole world" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="msapplication-config" content="/icons/browserconfig.xml" />
<meta name="msapplication-TileColor" content="#2B5797" />
<meta name="msapplication-tap-highlight" content="no" />
<meta name="theme-color" content="#000000" />

<link rel="apple-touch-icon" href="/logo.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
<link rel="apple-touch-icon" sizes="167x167" href="/logo.png" />

<link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/logo.png" color="#5bbad5" />
<link rel="shortcut icon" href="/logo.png" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="https://Eplsports.com" />
<meta name="twitter:title" content="Eplsports" />
<meta name="twitter:description" content="Number One Investment Bet Platform" />
<meta name="twitter:image" content="https://Eplsports.com/icons/android-chrome-192x192.png" />
<meta name="twitter:creator" content="@Eplsports" />
<meta property="og:type" content="website" />
<meta property="og:title" content="PWA App" />
<meta property="og:description" content="Best PWA App in the world" />
<meta property="og:site_name" content="PWA App" />
<meta property="og:url" content="https://Eplsports.com" />
<meta property="og:image" content="https://Eplsports.com//logo.png" />

      </Head>
  <Component {...pageProps} />
  </ErrorBoundary>
    </main>
  )
}
export default appWithTranslation(App);