import { Icon } from '@iconify/react';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { supabase } from '@/pages/api/supabase';
import { useState } from 'react';
import Avatar from '@/public/avatar.png'
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
    
    const betSelectLogic = (index) => {
        setSelected(index);
        //return referral desired data
        let tofill = (index === 0) ? 'all' : (index === 1) ? 'refer' : (index === 2) ? 'lvla' : 'lvlb'
        try{

            if(tofill === 'all'){
                setRefer(reforigin);
            }else{
                const fill = reforigin.filter(i => i[tofill] === user.newrefer);
                setRefer(fill);
            console.log(fill)
            }
            
        }catch(e){
            console.log(e)
        }
        console.log(tofill)
    }
    useEffect(() => {
        if (!localStorage.getItem('signedIns')) {
            router.push('/login')
        }
        const testRoute = async () => {
            let users = localStorage.getItem('signNames')
            console.log(users);
            let test = await fetch('/api/referral', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: users })
            }).then(data => {
                return data.json();
            })
            console.log(test);
            setUser(test.user)
            setRefOrigin(test.refdata);
            setRefer(test.refdata);
    
        }
        testRoute();
    },[])
    function RefData() {
        if(refers && refers.length > 0){
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
                                <Image src={t.profile ?? Avatar} width={40} height={40} alt='rounds' />
                                <Stack direction='column' alignItems='start' sx={{ width: '196px' }}>
                                    <Stack direction='row' alignItems='center' spacing={1} justifyContent='stretch'>
                                        <Typography style={{ color: 'white', fontFamily: 'Poppins,sans-serif', fontSize: '16px', fontWeight: '500' }}>{t.username}
                                        </Typography>
                                        <Typography sx={{ color: '#808080' }}>•</Typography>
                                        <Typography style={{ color: (user.newrefer === t.refer) ? '#793D20' : (user.newrefer === t.lvla) ? '#5E6172' : '#BE6D07', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '300' }}>
                                            {(user.newrefer === t.refer) ? 'Level 1' : (user.newrefer === t.lvla) ? 'Level 2' : 'Level 3'}
                                        </Typography>
                                    </Stack>
                                    <Typography style={{ color: 'white', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '500' }}>{dates} • {time}</Typography>

                                </Stack>
                                <Typography style={{ color: 'white', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '500' }}>$ {balance}</Typography>
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
                <p className={(selected != 0) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(0) }}>All Referral ({reforigin.length ?? 0})</p>
                <p className={(selected != 1) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(1) }}>Level One {(selected === 1) ? `(${refers.length ?? 0})` : ''}</p>
                <p className={(selected != 2) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(2) }}>Level Two {(selected === 2) ? `(${refers.length ?? 0})` : ''}</p>
                <p className={(selected != 3) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(3) }}>Level Three {(selected === 3) ? `(${refers.length ?? 0})` : ''}</p>
            </Stack>
            <RefData/>
        </div>
    )
}
