import { Icon } from '@iconify/react';
import { Stack, TextField, Button,Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/pages/api/supabase';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Translate from '@/pages/translator';

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'all','login'
        ])),
        // Will be passed to the page component as props
      },
    }
  }
export default function CodeSetting() {
    const { t } = useTranslation('all')
    const router = useRouter();
    const [pi,setPi] = useState('') ;
    const [pin, setPin] = useState('');
    const [cpin, setCPin] = useState('');
    const [ use,setUse] = useState('')
    useEffect(()=>{ 
        if(!localStorage.getItem('signedIns')){
            router.push('/login')
        }
        setUse(localStorage.getItem('signNames'))
     },[])
    const testRoute = async ()=>{
        console.log(use)
        let test = await fetch('/api/pinset', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: use,password:cpin,pin:pin })
          }).then(data => {
            return data.json();
            })
            console.log(test);
            if(test[0].status === 'Failed'){
              alert(test[0].message);
            }else{
              alert('Transaction pin set successfully')
              router.push('/dashboard/')
            }
  
    }
    const nextPage = () => {    
        if (pi === '') {
            alert('Please enter pin')
        } else if (pin === '') {

            alert('Please confirm pin')
        } else if (pi !== pin) {

            alert('Pin does not match')
        } else if (cpin === '') {

            alert('Please enter password')
        } else if(pin.length < 4){        
           alert('Pin must be atleast 4 digits')
        }else{
testRoute();
        }
    }
    return (
        <div className="backgrounds">
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.back()
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>{t("SetTransactionPin")}</p>
            </Stack>
            <Stack direction='column' alignItems='center' sx={{minHeight:'90vh',padding:'12px'}} spacing={2}>
            <Stack direction='row' justifyContent='center' alignItems='center' sx={{ height: '58px', background: '#FBEFEF', borderRadius: '5px', padding: '16px', maxWidth: '344px' }} spacing={2}>
                <PriorityHighRoundedIcon sx={{ color: '#E5E7EB', background: '#E94E55', width: '20px', height: '20px', borderRadius: '10px' }} />
                <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '300', color: '#E94E55' }}>Please note that whatever pin you set is what you will always use to make withdrawals</Typography>
            </Stack>
            <Stack spacing={1} sx={{ minWidth: '344px' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Poppins,sans-serif', color: 'white' }}>Enter Transaction Password </Typography>
                <TextField
                    sx={{ color: 'white',background:'grey',borderRadius:'8px', input: { color: '#E5E7EB', }  }}
                    value={pi}
                    label='Enter Transaction PIN'
                    type='text'
                    onChange={(p) => {
                        setPi(p.target.value)
                    }}
                />
            </Stack>
            <Stack spacing={1} sx={{ minWidth: '344px' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Poppins,sans-serif', color: 'white' }}>Confirm Transaction Password </Typography>
                <TextField
                    sx={{ color: 'white',background:'grey',borderRadius:'8px' ,input: { color: '#E5E7EB', },inputLabel: { color: '#E5E7EB',}  }}
                    label='Confirm Transaction PIN'
                    type='password'
                    value={pin}
                    onChange={(p) => {
                        setPin(p.target.value)
                    }}
                />
            </Stack>
            <Stack spacing={1} sx={{ minWidth: '344px' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: '500',borderRadius:'8px', fontFamily: 'Poppins,sans-serif', color: 'white' }}>Enter Password </Typography>
                <TextField
                    sx={{ color: '#03045E',borderRadius:'8px',background:'grey', input: { color: '#E5E7EB', }  }}
                    label='Enter Password'
                    type='password'
                    value={cpin}
                    onChange={(p) => {
                        setCPin(p.target.value)
                    }}
                />
            </Stack>
            <motion.p onClick={() => {
                    nextPage();
                }}
                whileTap={{ background: '#981FC0', color: '#3F1052', scale: 0.9 }}
                whileHover={{ background: '#981FC0', color: '#3F1052', scale: 1.1 }}
                style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#3F1052', border: '0.6px solid #3F1052', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                SET TRANSACTION PIN</motion.p>

            </Stack>
            
        </div >
    )
}