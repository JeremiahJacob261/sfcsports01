import { Icon } from '@iconify/react';
import { Stack, TextField, Button,Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/pages/api/supabase';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
export default function CodeSetting({use}) {
    const router = useRouter();
    const [pi,setPi] = useState('') ;
    const [pin, setPin] = useState('');
    const [cpin, setCPin] = useState('');
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
              router.push('/dashboard/account')
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
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/account')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Set Transaction Pin</p>
            </Stack>
            <Stack direction='column' alignItems='center' sx={{minHeight:'90vh',padding:'12px'}} spacing={2}>
            <Stack direction='row' justifyContent='center' alignItems='center' sx={{ height: '58px', background: '#FBEFEF', borderRadius: '5px', padding: '16px', maxWidth: '344px' }} spacing={2}>
                <PriorityHighRoundedIcon sx={{ color: '#E5E7EB', background: '#E94E55', width: '20px', height: '20px', borderRadius: '10px' }} />
                <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '300', color: '#E94E55' }}>Please note that whatever pin you set is what you will always use to make withdrawals</Typography>
            </Stack>
            <Stack spacing={1} sx={{ minWidth: '344px' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Poppins,sans-serif', color: 'white' }}>Enter Transaction Password </Typography>
                <TextField
                    sx={{ color: 'white', input: { color: '#E5E7EB', }  }}
                    value={pi}
                    label='Enter Transaction Password'
                    type='text'
                    onChange={(p) => {
                        setPi(p.target.value)
                    }}
                />
            </Stack>
            <Stack spacing={1} sx={{ minWidth: '344px' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Poppins,sans-serif', color: 'white' }}>Confirm Transaction Password </Typography>
                <TextField
                    sx={{ color: 'white' ,input: { color: '#E5E7EB', },inputLabel: { color: '#E5E7EB',}  }}
                    label='Confirm Transaction Password'
                    type='password'
                    value={pin}
                    onChange={(p) => {
                        setPin(p.target.value)
                    }}
                />
            </Stack>
            <Stack spacing={1} sx={{ minWidth: '344px' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: '500', fontFamily: 'Poppins,sans-serif', color: 'white' }}>Enter Password </Typography>
                <TextField
                    sx={{ color: '#03045E', input: { color: '#E5E7EB', }  }}
                    label='Enter Pin'
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
                    whileTap={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 0.9 }}
                    whileHover={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 1.1 }}
                    style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#C61F41', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                    SET Transaction Password</motion.p>

            </Stack>
            
        </div >
    )
}
export async function getServerSideProps({ req }) {
    const refreshToken = req.cookies['my-refresh-token']
    const accessToken = req.cookies['my-access-token']
    console.log(accessToken)
    if (refreshToken && accessToken) {
        console.log('sign insss')
        let sess = await supabase.auth.setSession({
            refresh_token: refreshToken,
            access_token: accessToken,
        })
        console.log(sess)
    } else {
        // make sure you handle this case!
        throw new Error('User is not authenticated.')
    }
    // returns user information


    try {
        let { data: user, error: err } = await supabase.auth.getUser()
        console.log(user.user.user_metadata)
       let use = user.user.user_metadata.displayName;
        return {
            props: { use }, // will be passed to the page component as props
        }
    } catch (error) {
        console.log(error)
        let use = {};
        return {
            props: { use }, // will be passed to the page component as props
        }
    }

}