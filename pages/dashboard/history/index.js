import { Stack } from '@mui/material';
import HomeBottom from '../../UIComponents/bottomNav';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Box, Typography, Modal, Fade, Backdrop } from '@mui/material';
import { Icon, InlineIcon } from '@iconify/react';
import { useEffect,useState } from 'react';
import { supabase } from '@/pages/api/supabase';
export default function History({credent}) {
    const router = useRouter();
    const [data, setData] = useState({});
    const [ref,setRef] = useState('')
    const [noti, setNoti] = useState(false);
    //hisstory-dx

    useEffect(()=>{
            console.log('started',credent.newrefer);
            setRef(credent.newrefer);
        const getNoti = async () =>{
            const { data,error } = await supabase
            .from('activa')
            .select('*')
            .or(`username.eq.${localStorage.getItem('signNames')},code.eq.${credent.newrefer}`)
            .order('id', { ascending: false })
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
                            let infos = {
                                type:'New Refferal',
                                amount:'no payment',
                                time:fullDay,
                                username:item.username,
                                description:`${item.type} +  just signed up with your referral link` ,
                                status:'Success',
                                payment:'...'
                            }
                            return(
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                        <Stack>
                            <Casing><Casing style={{ fontWeight:'bold',color:'greenyellow'}}>{item.type}</Casing> has just signed up with your Referral Link</Casing>
                            <Casing style={{ color: 'white' }}>{fullDay}</Casing>
                        </Stack>
                       
                    </Stack>
                            )
                          } else if(item.code === 'bet-cancellation'){
                            let infos = {
                                type:'bet-cancellation',
                                amount:item.amount,
                                time:fullDay,
                                username:item.username,
                                description:'Bet was cancelled. Contact support if you did not request for this',
                                status:'Success',
                                payment:'USDT(TRC20)'
                            }
                            return(
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                        <Stack>
                            <Casing className='ungradtext' style={{ fontSize: '16px' }}>Your Bet with betid of {item.type}</Casing>
                            <Casing style={{ color: 'white' }}>Amount {item.amount ?? 0}</Casing>
                            <Casing style={{ color: 'white' }}>{fullDay}</Casing>
                            <Casing style={{ color: 'white',fontSize:'11px' }}>If you did not Request for this Bet Cancellation, please contact Customer Care</Casing>
                        </Stack>
                    </Stack>
                            )
                          }else if(item.type === 'bonus' && item.code === ''){
                            return(
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                        <Stack>
                            <Casing style={{ fontWeight:'bold',color:'greenyellow'}}>You just recieved a {item.type}</Casing>
                            <Casing>{item.amount} USDT</Casing>
                            <Casing style={{ color: 'white' }}>{fullDay}</Casing>
                        </Stack>
                       
                    </Stack>
                            )
                          } else if(item.code === 'usdtdepositsuccess'){
                            let infos = {
                                type:'deposit',
                                amount:item.amount,
                                time:fullDay,
                                username:item.username,
                                description:'Deposit',
                                status:'Success',
                                payment:'USDT(TRC20)'
                            }
                            return(
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                                <Stack>
                                    <Casing style={{ fontWeight:'bold',color:'greenyellow'}}>Your USDT Deposit was Successful</Casing>
                                    <Casing>{item.amount} USDT</Casing>
                                    <Casing style={{ color: 'white' }}>{fullDay}</Casing>
                                </Stack>
                            </Stack>
                            )
                          }else if(item.code === 'bet-placed'){
                            let infos = {
                                type:'Bet Placed',
                                amount:item.amount,
                                time:fullDay,
                                username:item.username,
                                description:`Bet Placed Successfully. Match Info: ${item.type}`,
                                status:'Success',
                                payment:'USDT(TRC20)'
                            }
                            return(
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                                <Stack>
                                    <Casing style={{ fontWeight:'bold',color:'greenyellow'}}>Your Bet was placed Successfully</Casing>
                                    <Casing>{item.type}</Casing>
                                    <Casing>{item.amount} USDT</Casing>
                                    <Casing style={{ color: 'white' }}>{fullDay}</Casing>
                                </Stack>
                            </Stack>
                            )

                          }else if(item.code === 'usdtdepositfailed'){
                            let infos = {
                                type:'Deposit',
                                amount:item.amount,
                                time:fullDay,
                                username:item.username,
                                description:'USDT Deposit Failed. Contact Customer Care for any Complaints',
                                status:'Failed',
                                payment:'USDT(TRC20)'
                            }
                            return(
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                                <Stack>
                                    <Casing style={{ fontWeight:'bold',color:'greenyellow'}}>Your USDT Deposit Failed</Casing>
                                    <Casing>{item.amount} USDT</Casing>
                                    <Casing style={{ color: 'white' }}>{fullDay}</Casing>
                                </Stack>
                            </Stack>
                            )
                          }else{
                           if(item.code === credent.newrefer && item.type === 'depbonus'){
                            let infos = {
                                type:'Broadcast',
                                amount:'',
                                time:fullDay,
                                username:'admin',
                                description:item.username,
                                status:'Success',
                                payment:'none'
                            }
                            return(
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                                <Stack>
                                    <Casing style={{ fontWeight:'bold',color:'greenyellow'}}>You recieved first deposit bonus from {item.username}</Casing>
                                    <Casing>{item.amount} USDT</Casing>
                                    <Casing style={{ color: 'white' }}>{fullDay}</Casing>
                                </Stack>
                            </Stack>
                            )
                           }else{
                            if(item.type === 'affbonus' && item.code === credent.newrefer){
                                return(
                                    <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                                    <Stack>
                                        <Casing style={{ fontWeight:'bold',color:'greenyellow'}}>You have recieved rebate bonus bonus from {item.username}</Casing>
                                        <Casing>{item.amount} USDT</Casing>
                                        <Casing style={{ color: 'white' }}>{fullDay}</Casing>
                                    </Stack>
                                </Stack>
                                )
                            }
                           }
                          }
                        })
                    }
                </Stack>
            )
        }else{
            return(
            <Stack justifyContent='center' alignItems='center' sx={{ width:'100vw',height:'55vh'}}>
        <Casing style={{ fontSize:'20px'}}>No Data Avaliable</Casing>
        <Casing style={{ color:'grey'}}>Please Check your internet connection</Casing>
      </Stack>)
        }
    }
    return (
        <div className='backgrounds' style={{ width: '100vw', minHeight: '100vh' }}>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard')
                }} />
                <Casing style={{ fontSize: '16px', fontWeight: '600', color: '#C61F41' }}>History</Casing>
            </Stack>
            <Stack sx={{ minHeight: '100vh', padding: '8px' }} direction='column' alignItems='center'>
                <Casing style={{ color: '#C61F41', fontSize: '24px' }}>History</Casing>
                <NotiFunc/>
            </Stack>
            <HomeBottom />
        </div>
    )
}
export async function getServerSideProps(context) { 
    const id = context.query.id;
    try{
        const { data,error } = await supabase
        .from('users')
        .select('*')
        .eq('username',id)
        return {
            props: {credent:data[0]}, // will be passed to the page component as props
        }
    }catch(err){
        console.log(err);
        let credent = {};
        return {
            props: {credent:credent}, // will be passed to the page component as props
        }
    }
}