import React from 'react'
import { Icon } from '@iconify/react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import HomeBottom from '../../UIComponents/bottomNav';
export default function Event() {
    const router = useRouter();
    return (
        <div className='backgrounds'>
            <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px'}}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600'}}>Events</p>
            </Stack>
            <HomeBottom />
        </div>
    )
}