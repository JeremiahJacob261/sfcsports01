import '@/styles/globals.css'
import { Piedra, Poppins } from '@next/font/google'
import localFont from 'next/font/local'
const poppins = Poppins({ weight: ['300','400','600'],subsets: ['latin']});
const pops = localFont({ src: '../public/font/poppins.woff2' })
export default function App({ Component, pageProps }) {
  return (
    <main className={pops.className} style={{ minHeight:'100vh'}}>
  <Component {...pageProps} />
    </main>
  )
}
