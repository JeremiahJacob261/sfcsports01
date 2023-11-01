
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Stack } from '@mui/material';
export default function Fund(){
    const router = useRouter();
    return(
        <div className="backgrounds">
            <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px',width:'100%'}} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600'}}>Fund Account</p>
            </Stack>
            <h1>Fund Account</h1>
        </div>
    )
}