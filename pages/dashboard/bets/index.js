import HomeBottom from '../../UIComponents/bottomNav';
import { useRouter } from 'next/router';
import { Icon, InlineIcon } from '@iconify/react';
import { Stack } from '@mui/material';
export default function Bets() {
    const router = useRouter();
    return (
        <div className='backgrounds'>
             <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px'}}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600'}}>Bets</p>
            </Stack>
            <HomeBottom />
        </div>
    )
}