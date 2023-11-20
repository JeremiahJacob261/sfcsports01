import { Icon } from '@iconify/react';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { supabase } from '@/pages/api/supabase';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect } from 'react';
import Image from 'next/image';
export default function Referral() {
    const router = useRouter();
    const [reforigin, setRefOrigin] = useState([]);
    const [refers, setRefer] = useState([]);
    const [selected, setSelected] = useState(0);
    const [user, setUser] = useState({});
    useEffect(() => {
        if (!localStorage.getItem('signedIns')) {
            router.push('/login')
        }
        setUser(localStorage.getItem('userinfo'));
    }, [])
    const betSelectLogic = (index) => {
        setSelected(index);
        //return referral desired data
        let tofill = (index === 0) ? 'all' : (index === 1) ? 'refer' : (index === 2) ? 'lvla' : 'lvlb'
        try{
            const fill = reforigin.filter(i => i[tofill] === user.newrefer);
            console.log(fill)
        }catch(e){
            console.log(e)
        }
        console.log(tofill)
    }
    useEffect(() => {
        if (!localStorage.getItem('signedIns')) {
            router.push('/login')
        }
        const getRef = async () => {
            const { data: refer, error: errref } = await supabase
                .from('users')
                .select('*')
                .or(`refer.eq.${user.newrefer},lvla.eq.${user.newrefer},lvlb.eq.${user.newrefer}`)
            setRefOrigin(refer);
            setRefer(refer);
        }
        getRef();
    })
    function RefData() {
        if(refers && refers.length > 0){
            return(
                <Stack direction='column' alignItems='center' sx={{ minHeight: '90vh', padding: '12px' }} spacing={2}>
                {
                    refers.map((t) => {
                        let date = new Date(t.crdate);
                        let dates = date.getDate() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getFullYear()
                        let month = months[date.getMonth()];
                        let time = date.getHours() + ':' + date.getMinutes()
                        let balance = t.balance.toFixed(2);
                        return (
                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems='center' sx={{ padding: '8px' }} key={t.keyf}>
                                <Image src={Rd} width={40} height={40} alt='rounds' />
                                <Stack direction='column' alignItems='start' sx={{ width: '196px' }}>
                                    <Stack direction='row' alignItems='center' spacing={1} justifyContent='stretch'>
                                        <Typography style={{ color: 'black', fontFamily: 'Poppins,sans-serif', fontSize: '16px', fontWeight: '500' }}>{t.username}
                                        </Typography>
                                        <Typography sx={{ color: '#808080' }}>•</Typography>
                                        <Typography style={{ color: (user.newrefer === t.refer) ? '#793D20' : (user.newrefer === t.lvla) ? '#5E6172' : '#BE6D07', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '300' }}>
                                            {(user.newrefer === t.refer) ? 'Level 1' : (user.newrefer === t.lvla) ? 'Level 2' : 'Level 3'}
                                        </Typography>
                                    </Stack>
                                    <Typography style={{ color: 'black', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '500' }}>{dates} • {time}</Typography>

                                </Stack>
                                <Typography style={{ color: 'black', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '500' }}>$ {balance}</Typography>
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
          </Stack>
            )
        }
    }
    return (
        <div className="backgrounds">
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/account')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Referral</p>
            </Stack>
            <Stack direction="row" sx={{ width: '100%', marginTop: '5px', padding: '6px', background: 'rgb(27, 5, 9)' }} spacing={2} justifyContent='center' alignItems="center">
                <p className={(selected != 0) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(0) }}>All Referral</p>
                <p className={(selected != 1) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(1) }}>Level One</p>
                <p className={(selected != 2) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(2) }}>Level Two</p>
                <p className={(selected != 3) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(3) }}>Level Three</p>
            </Stack>
            <RefData/>
        </div>
    )
}
