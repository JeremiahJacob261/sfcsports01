import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion'
import Alertz from '@/pages/UIComponents/dialogs/alertz';
import { Alert } from 'react-bootstrap';
export default function Fund(){
    const router = useRouter();
    const [ amount,setAmount ] = useState('');
  
  
    return(
        <div className="backgrounds">

            <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px',width:'100%'}} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard/account')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600'}}>Fund Account</p>
            </Stack>
                <Stack direction='column' alignItems='center' justifyContent='center' spacing={1} sx={{ padding:'12px',margin:'8px',background:'rgba(77, 3, 3, 1)',minHeight:'40vh'}}>
                    <p style={{ fontSize:'14px',fontWeight:'400px',color:'rgba(194,127,8,1)'}}>Amount</p>
                    <Stack direction='row' alignItems='center' justifyContent='center'>
                        <TextField variant='standard' type='number' placeholder='amount' sx={{ color:'white',letterSpacing:'1px',input: { color: 'white', }}} value={amount} onChange={(e)=>{
                        setAmount(e.target.value);
                    }}/>
                    <p>USDT</p>
                    </Stack>
                                <Alertz amount={amount}/>
                </Stack>
     
        </div>
    )
}