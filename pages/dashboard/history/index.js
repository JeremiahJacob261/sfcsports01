import { Stack } from '@mui/material';
import HomeBottom from '../../UIComponents/bottomNav';
import { useRouter } from 'next/router';
import { Icon, InlineIcon } from '@iconify/react';
import HistoryDx from '@/pages/UIComponents/dialogs/historydx.js'
import { useEffect,useState } from 'react';
import { supabase } from '@/pages/api/supabase';
export default function History() {
    const router = useRouter();
    const [noti, setNoti] = useState(false);
    useEffect(()=>{
        const getNoti = async () =>{
            const { data,error } = await supabase
            .from('notification')
            .select('*')
            .eq('username',localStorage.getItem('signNames'))
            setNoti(data);
            console.log(data)
        }
        getNoti();
    },[]);
    
    function NotiFunc() {
        if(noti && noti.length > 0){
            return(
                <Stack spacing={2}>
                    {
                         noti.map((item) => {
                            let date = new Date(item.time);
                            let day = date.getDate();
                            let month = date.getMonth() + 1;
                            let fullDay = day + '/' + month
                            return(
                                <Stack className='bottomnav' direction='row' key={item.time} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                        <Stack>
                            <p className='ungradtext' style={{ fontSize: '16px' }}>{item.type ?? 'none'}</p>
                            <p style={{ color: 'white' }}>{item.amount ?? 0}</p>
                            <p style={{ color: 'white' }}>{item.code ?? 'More'}</p>
                            <p style={{ color: 'white' }}>{fullDay}</p>
                        </Stack>
                        <Stack justifyContent='center' alignItems="center">
                            <HistoryDx />
                        </Stack>
                    </Stack>
                            )
                        })
                    }
                </Stack>
            )
        }else{
            return(
            <Stack justifyContent='center' alignItems='center' sx={{ width:'100vw',height:'55vh'}}>
        <p style={{ fontSize:'20px'}}>No Data Avaliable</p>
        <p style={{ color:'grey'}}>Please Check your internet connection</p>
      </Stack>)
        }
    }
    return (
        <div className='backgrounds' style={{ width: '100vw', height: '100vh' }}>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#C61F41' }}>History</p>
            </Stack>
            <Stack sx={{ minHeight: '100vh', padding: '8px' }} direction='column' alignItems='center'>
                <p style={{ color: '#C61F41', fontSize: '24px' }}>History</p>
                <NotiFunc/>
            </Stack>
            <HomeBottom />
        </div>
    )
}