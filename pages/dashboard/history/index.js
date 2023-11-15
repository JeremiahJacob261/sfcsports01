import { Stack } from '@mui/material';
import HomeBottom from '../../UIComponents/bottomNav';
import { useRouter } from 'next/router';
import { Icon, InlineIcon } from '@iconify/react';
import HistoryDx from '@/pages/UIComponents/dialogs/historydx.js'
export default function History() {
    const router = useRouter();
    return (
        <div className='backgrounds' style={{ width:'100vw',height:'100vh' }}>
             <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px'}} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600',color:'#C61F41'}}>History</p>
            </Stack>
            <Stack sx={{ minHeight:'100vh',padding:'8px' }} direction='column' alignItems='center'>
                <p style={{ color:'#C61F41',fontSize:'24px'}}>History</p>
                <Stack className='bottomnav' direction='row'  justifyContent='space-between' alignItems='center' sx={{ border:'1px solid #C61F41',maxWidth:'90vw',minWidth:'80vw',borderRadius:'5px'}}>
                    <Stack>
                         <p className='ungradtext' style={{fontSize:'16px'}}>Bet Won</p>
                    <p style={{ color:'white'}}>Amount</p>
                    <p style={{ color:'white'}}>Match Id</p>
                    <p style={{ color:'white'}}>Time</p>
                    </Stack>
                   <Stack justifyContent='center' alignItems="center">
                       <HistoryDx/>
                
                   </Stack>
                </Stack>
            </Stack>
            <HomeBottom />
        </div>
    )
}