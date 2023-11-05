import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
export default function Upload() {
    const router = useRouter();
    return (
        <div className="backgrounds" style={{ minHeight:'99vh'}}>
            <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px',width:'100%'}} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard/fund/address')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600'}}>Upload Receipt</p>
            </Stack>
            <p>You are expected to Upload a screenshot or Picture of the Receipt proving the transaction has been made.</p>
        </div>
    )
}