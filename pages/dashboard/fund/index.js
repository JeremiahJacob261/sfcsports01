import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
export default function Fund(){
    const router = useRouter();
    const [ amount,setAmount ] = useState(0);
    return(
        <div className="backgrounds">
            <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px',width:'100%'}} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard/account')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600'}}>Fund Account</p>
            </Stack>
                <Stack direction='column' alignItems='center' justifyContent='center' spacing={1} sx={{ padding:'12px',margin:'8px',background:'rgba(77, 3, 3, 1)'}}>
                    <p style={{ fontSize:'14px',fontWeight:'400px',color:'rgba(194,127,8,1)'}}>Amount</p>
                    <TextField variant='standard' placeholder='amount' sx={{ color:'white',letterSpacing:'1px',input: { color: 'white', }}} value={amount} onChange={(e)=>{
                        setAmount(e.target.value);
                    }}/>
                    <Button sx={{ color:'rgba(194,127,8,1)',background:'white', maxWidth:'200px',minWidth:'140px'}} onClick={()=>{
                        router.push('/dashboard/fund/address')
                    }}>Next</Button>
                </Stack>
     
        </div>
    )
}