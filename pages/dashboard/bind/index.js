import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'
export default function BindWallet() {
    const router = useRouter();
    return(
        <div className="backgrounds" style={{ minHeight:'99vh',width:'100%'}}>
           <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/account')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600',color:'#C61F41' }}> Bind Wallet</p>
            </Stack>
                <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{ padding:'12px'}}>
                <p>BIND WALLET</p>
                <TextField placeholder='wallet address' sx={{ color: 'black', background:'white',maxWidth:'310px',letterSpacing: '1px', input: { color: 'black', } ,borderRadius:'6px'}}/>
                <TextField placeholder='Password' sx={{ color: 'black', background:'white',maxWidth:'310px',letterSpacing: '1px', input: { color: 'black', } ,borderRadius:'6px'}}/>
                <TextField placeholder='Confirm Password' sx={{ color: 'black', background:'white',maxWidth:'310px',letterSpacing: '1px', input: { color: 'black', } ,borderRadius:'6px'}}/>
                <motion.p onClick={() => {
                    //   router.push('/dashboard/fund/success')
                    }}
                        whileTap={{ background: '#573b41',color:'rgba(194,127,8,1)', scale: 0.9 }}
                        whileHover={{ background: '#573b41',color:'rgba(194,127,8,1)',scale: 1.1  }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#C61F41',width:'280px',textAlign: 'center', cursor: 'pointer',borderRadius:'5px' }}>
                    Bind Wallet</motion.p>
                </Stack>
            </div>
    )
}