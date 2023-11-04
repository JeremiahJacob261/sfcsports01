import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Stack, TextField,Button } from '@mui/material';
export default function Address(){
    const router = useRouter();
    return(
        <div className="backgrounds">
            <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px',width:'100%'}} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard/fund')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600'}}>Input Address</p>
            </Stack>
                <Stack direction='column' alignItems='start' justifyContent='center' spacing={1}>
                    <p style={{ fontSize:'14px',fontWeight:'400px',color:'rgba(194,127,8,1)'}}>The addresss and barcode for transfer will be here</p>
                   
                    <Button sx={{ color:'rgba(194,127,8,1)', maxWidth:'200px',minWidth:'140px'}}>Next</Button>
                </Stack>
     
        </div>
    )
}