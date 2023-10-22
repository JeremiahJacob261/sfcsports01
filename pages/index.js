import Image from 'next/image'
import { Inter } from 'next/font/google'
import {Logo} from "@/public/Sheffield_FC.svg.png";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`bg-sheffield-red-deep p-8 ${inter.className}`}
    >
    <div className='bg-red-300'>
      <Image src={Logo} width={50} height={50}/>
<p>Hello World</p>
    </div>
    </main>
  )
}
