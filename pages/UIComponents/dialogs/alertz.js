import * as React from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { Stack, Divider } from '@mui/material';
import Image from 'next/image'
import Success from '../../../public/success.png'
import Warn from '../../../public/warn.png'
import { useRouter } from 'next/router'
import { useState } from 'react'  
import { useEffect } from 'react'
import { motion } from 'framer-motion'
export default function Alertz({amount}) {
  const checkCredible =  () => {
    if (amount < 10) {
        Alerts('Minimum amount to fund is $10', false);
    } else {
      
    router.push('/dashboard/fund/address');
    localStorage.setItem('deposit-amount',Number(amount));
        
    }
} 
     //alerts
     const [ale, setAle] = useState('')
     const [open, setOpen] = useState(false)
     const [aleT, setAleT] = useState(false)
     const Alerts = (m, t) => {
       setOpen(true)
       setAle(m)
       setAleT(t)
     }
     //end of alerts
  const router = useRouter();
    return (
      <div>
        <motion.p onClick={() => {
                        checkCredible()
                    }}
                        whileTap={{ background: '#573b41', scale: '0.9' }}
                        whileHover={{ background: '#573b41', scale: '1.1' }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '8px', background: '#C61F41', width: '30vh', textAlign: 'center', cursor: 'pointer',borderRadius:'5px' }}>
                        DEPOSIT</motion.p>
      <Modal
        open={open}
        onClose={() => {
          if (aleT) {
            setOpen(false)
          } else {
            setOpen(false)
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack alignItems='center' justifyContent='space-evenly' sx={{
          background: '#E5E7EB', width: '290px', height: '330px', borderRadius: '20px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '12px'
        }}>
          <Image src={aleT ? Success : Warn} width={120} height={120} alt='widh' />
          <p id="modal-modal-title" style={{ fontSize: '20px', fontWeight: '500',color:'black' }}>

            {aleT ? 'Success' : 'Sorry!'}
          </p>
          <p id="modal-modal-description" style={{  mt: 2, color:'black',fontSize: '16px',textAlign:'center', fontWeight: '300' }}>
            {ale}
          </p>
          <Divider sx={{ borderBottomWidth: '45px'}} />
          <p style={{  color: '#D8B16B', padding: '8px', width: '100%',textAlign:'center',cursor: 'pointer' }} onClick={() => {
            if (aleT) {
              setOpen(false)
              router.push('/dashboard')
            } else {

              setOpen(false)
            }
          }}>OKAY</p>
        </Stack>

      </Modal>
      </div>
      )
  }