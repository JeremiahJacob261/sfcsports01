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
            .from('activa')
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
                            let months = {
                                0:'Jan',
                                1:'Feb',
                                2:'March',
                                3:'April',
                                4:'May',
                                5:'June',
                                6:'July',
                                7:'Aug',
                                8:'Sept',
                                9:'Oct',
                                10:'Nov',
                                11:'Dec'
                            }
                            let date = new Date(item.created_at);
                            let day = date.getDate();
                            let month = months[date.getMonth()];
                            let fullDay = day + '/' + month
                          if (item.code === 'refer') {
                            return(
                                <Stack className='bottomnav' direction='row' key={item.time} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                        <Stack>
                            <p><p style={{ fontWeight:'bold',color:'greenyellow'}}>{item.type}</p> has just signed up with your Referral Link</p>
                            <p style={{ color: 'white' }}>{fullDay}</p>
                        </Stack>
                        <Stack justifyContent='center' alignItems="center">
                            <HistoryDx />
                        </Stack>
                    </Stack>
                            )
                          } else {
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
                          }
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
        <div className='backgrounds' style={{ width: '100vw', minHeight: '100vh' }}>
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