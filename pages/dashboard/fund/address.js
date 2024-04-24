import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Stack, Button } from '@mui/material';
import bar1 from '@/public/barcode1.png'
import bar2 from '@/public/bar (1).jpg'
import bar3 from '@/public/bar (2).jpg'
import bar4 from '@/public/bar (3).jpg'
import { useState } from 'react';
import Bankbri from '@/public/bankbri.jpg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast';

  const imagesx = [bar1, bar2, bar3, bar4];
  const address = ["TMqYfYgpRgrDtxqJ4kTEh8MgCtvu4W4YPZ","TTM42MLTFEAkxjpKarnbZHDvcKCGJKbw9o","TYgeQ9BY9dZDwL3NocmfkUUA3Nufp2sH5j","TCX2YRQ3UoxECMNuPXZD3tksidsJAGWb8Y"];
export async function getServerSideProps(context) {
  const met = context.query.met;
  let constx = Math.floor(Math.random() * imagesx.length);
let imax = imagesx[constx]
let addressx = address[constx]
console.log(imax)
  return {
    props: {
      method: met,
      images: imax,
      address: addressx,
      randomed: constx
      // Will be passed to the page component as props
    },
  }
}
export default function Address({ method,images,address ,randomed}) {
  const router = useRouter();
 if(method === 'bankbri'){
  return (
    <div className="backgrounds">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '14px',
            background: '#981FC0',
            color: '#fff',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'rgba(194,127,8,1)',
          },
        }}
      />

      <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
        <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
          router.back()
        }} />
        <p style={{ fontSize: '16px', fontWeight: '600' }}>Input Address</p>
      </Stack>
      <Stack direction='column' alignItems='center' justifyContent='center' spacing={1} sx={{ width: '100%', height: '100vh' }}>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.8 }} onClick={() => { }}>
          <Image src={Bankbri} alt='barcode' width={300} height={300} style={{ borderRadius:'10px'}}/>
        </motion.div>
        <p style={{ fontSize: '14px', fontWeight: '400px', color: 'rgba(194,127,8,1)' }}>Account name:  Deri pratama</p> 
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
          <p style={{ fontSize: '14px', fontWeight: '400px', color: 'rgba(194,127,8,1)' }}>{(method === 'bankbri') ? "174901058158503" : "TMqYfYgpRgrDtxqJ4kTEh8MgCtvu4W4YPZ"}</p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Icon icon="solar:copy-bold-duotone" color="#981FC0" width={30} height={30} onClick={() => {
              navigator.clipboard.writeText((method === 'bankbri') ? "174901058158503" : "TMqYfYgpRgrDtxqJ4kTEh8MgCtvu4W4YPZ");
              toast.success('Copied to clipboard');
            }} />
          </motion.div>
        </Stack>
        <p style={{ color: 'green', fontSize: '13px', fontWeight: '200', maxWidth: '70%' }}>Bank Name: Bank BRI</p>
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
          <Icon icon="ph:info-light" color="#981FC0" />
          <p style={{ color: 'grey', fontSize: '12px', fontWeight: '200', maxWidth: '70%' }}>You are expected to upload an image of the receipt in the next page within 30 minutes of making the transaction else transferred funds might be lost!. <br/>Contact Support for more information</p>
        </Stack>
        <motion.p onClick={() => {
          router.push('/dashboard/fund/upload')
        }}
          whileTap={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 0.9 }}
          whileHover={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 1.1 }}
          style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '8px', background: '#981FC0', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
          NEXT</motion.p>
      </Stack>

    </div>
  )
 }else{
  return (
    <div className="backgrounds">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '14px',
            background: '#981FC0',
            color: '#fff',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'rgba(194,127,8,1)',
          },
        }}
      />

      <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
        <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
          router.back()
        }} />
        <p style={{ fontSize: '16px', fontWeight: '600' }}>Input Address</p>
      </Stack>
      <Stack direction='column' alignItems='center' justifyContent='center' spacing={1} sx={{ width: '100%', height: '100vh' }}>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.8 }} onClick={() => { }}>

          <Image src={images} alt='barcode' width={300} height={300} />
        </motion.div>
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
          <p style={{ fontSize: '14px', fontWeight: '400px', color: 'whitesmoke' }}>{(method === 'bankbri') ? "174901058158503" : address}</p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Icon icon="solar:copy-bold-duotone" color="#3f1052" width={30} height={30} onClick={() => {
              navigator.clipboard.writeText((method === 'bankbri') ? "174901058158503" : address);
              toast.success('Copied to clipboard');
            }} />
          </motion.div>
        </Stack>
        <p style={{ color: 'greenyellow', fontSize: '13px', fontWeight: '200', maxWidth: '70%' }}>Network: USDT (TRC20)</p>
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
          <Icon icon="ph:info-light" color="#981FC0" />
          <p style={{ color: 'whitesmoke', fontSize: '12px', fontWeight: '100', maxWidth: '70%' }}>You are expected to upload an image of the receipt in the next page within 30 minutes of making the transaction else transferred funds might be lost!. <br/>Contact Support for more information</p>
        </Stack>
        <motion.p onClick={() => {
          router.push('/dashboard/fund/upload')
          localStorage.setItem('randomed',randomed);
        }}
        whileTap={{ background: '#981FC0', color: '#3F1052', scale: 0.9 }}
        whileHover={{ background: '#981FC0', color: '#3F1052', scale: 1.1 }}
        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#3F1052', border: '0.6px solid #3F1052', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
        NEXT</motion.p>
      </Stack>

    </div>
  )
 }
}