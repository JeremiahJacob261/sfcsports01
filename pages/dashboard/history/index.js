import { Stack } from '@mui/material';
import HomeBottom from '../../UIComponents/bottomNav';
import { Icon } from '@iconify/react';
export default function History() {
    return (
        <div className='backgrounds' style={{ width:'100vw',height:'100vh' }}>
            <Stack sx={{ minHeight:'100vh',padding:'8px' }} direction='column' alignItems='center'>
                <p style={{ color:'#C61F41',fontSize:'24px'}}>History</p>
                <Stack className='bottomnav' direction='row'  justifyContent='space-between' alignItems='center' sx={{ border:'1px solid #C61F41',maxWidth:'90vw',minWidth:'80vw',borderRadius:'5px'}}>
                    <Stack>
                         <p className='ungradtext' style={{fontSize:'16px'}}>Bet Won</p>
                    <p>Amount</p>
                    <p>Match Id</p>
                    <p>Time</p>
                    </Stack>
                   <Stack justifyContent='center' alignItems="center">
                        <Icon icon="fa6-solid:expand" width={24} height={24} className='iconbtn' style={{ color: 'white' }} />
                
                   </Stack>
                </Stack>
            </Stack>
            <HomeBottom />
        </div>
    )
}