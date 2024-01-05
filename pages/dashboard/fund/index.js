import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion'
import Alertz from '@/pages/UIComponents/dialogs/alertz';
import { Alert } from 'react-bootstrap';
import Image from 'next/image';
import Tether from '@/public/tether.jpg'
export default function Fund() {
    const router = useRouter();
    const [amount, setAmount] = useState('');
const [met,setMet] = useState('none');

    return (
        <div className="backgrounds" style={{ height: '100vh', width: 'auto' }}>

            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/account')
                }} />
                <Casing style={{ fontSize: '16px', fontWeight: '600' }}>Fund Account</Casing>
            </Stack>

            <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{ padding: '12px', margin: '8px', width: '100%', height: '100%' }}>
                <Stack direction='column' alignItems='center' justifyContent='center'>
                    <Casing style={{ fontSize: '18px', fontWeight: '600px', color: 'rgba(194,127,8,1)' }}>Select Payment Method</Casing>

                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.04 }}
                    >
                        <Image src={Tether} width={100} height={100} alt="payment_method" onClick={()=>{
                            setMet('visible');
                        }}/>
                    </motion.div>
                </Stack>
                <Stack direction='column' spacing={2} alignItems='center' justifyContent='center' sx={{ display:met}}>
                    <Casing style={{ fontSize: '18px',display:met, fontWeight: '600px', color: 'rgba(194,127,8,1)' }}>Amount</Casing>
                    <Stack direction='row' alignItems='center' justifyContent='center' sx={{ display:met}}>
                        <TextField variant='standard' type='number' placeholder='Amount' sx={{ display:met,color: 'white', background: '#ad1c39', padding: '8px', borderRadius: '5px', letterSpacing: '1px', input: { color: 'white', } }} value={amount} onChange={(e) => {
                            setAmount(e.target.value);
                        }} />
                        <Casing sx={{ display:met}}>USDT</Casing>
                    </Stack>

                    <Alertz amount={amount} sx={{ display:met}}/>
                </Stack>
            </Stack>

        </div>
    )
}