import '@/styles/globals.css'
import { Piedra, Poppins } from '@next/font/google'
const poppins = Poppins({ weight: ['300','400','600'],subsets: ['latin']});

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
  <Component {...pageProps} />
    </main>
  )
}
