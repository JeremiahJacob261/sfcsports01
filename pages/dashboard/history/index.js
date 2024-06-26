import { Stack } from '@mui/material';
import HomeBottom from '../../UIComponents/bottomNav';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Box, Typography, Modal, Fade, Backdrop } from '@mui/material';
import { Icon, InlineIcon } from '@iconify/react';
import { useEffect,useState } from 'react';
import { supabase } from '@/pages/api/supabase';
import Translate from '@/pages/translator';

 
export default function History({credent}) {
    const router = useRouter();
    function t(text){
        return text;
       }
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
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #981FC0', maxWidth: '90%', minWidth: '80%', borderRadius: '5px' }}>
                        <Stack>
                            <p><p style={{ fontWeight:'bold',color:'greenyellow'}}>{item.type}</p> has just signed up with your Referral Link on {fullDay}</p>
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
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #981FC0', maxWidth: '90%', minWidth: '80%', borderRadius: '5px' }}>
                        <Stack>
                            <p className='ungradtext' style={{ fontSize: '16px' }}>Your Bet with betid of {item.type} and amount of {item.amount ?? 0} on {fullDay}</p>
                            <p style={{ color: 'white',fontSize:'11px' }}>If you did not Request for this Bet Cancellation, please contact Customer Care</p>
                        </Stack>
                    </Stack>
                            )
                          }else if(item.type === 'bonus' && item.code === ''){
                            return(
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #981FC0', maxWidth: '90%', minWidth: '80%', borderRadius: '5px' }}>
                        <Stack>
                            <p style={{ fontWeight:'bold',color:'greenyellow'}}>You just recieved a {item.type}</p>
                            <p>{item.amount} USDT</p>
                            <p style={{ color: 'white' }}>{fullDay}</p>
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
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #981FC0', maxWidth: '90%', minWidth: '80%', borderRadius: '5px' }}>
                                <Stack>
                                    <p style={{ fontWeight:'bold',color:'greenyellow'}}>Your USDT Deposit of {item.amount} was Successful on {fullDay}</p>
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
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #981FC0', maxWidth: '90%', minWidth: '80%', borderRadius: '5px' }}>
                                <Stack>
                                    <p style={{ fontWeight:'bold',color:'greenyellow'}}>Your Trade was Successfully for {item.type}, {item.amount} USDT, {fullDay}</p>
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
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #981FC0', maxWidth: '90%', minWidth: '80%', borderRadius: '5px' }}>
                                <Stack>
                                    <p style={{ fontWeight:'bold',color:'greenyellow'}}>Your USDT Deposit of {item.amount} USDT Failed on {fullDay}</p>
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
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #981FC0', maxWidth: '90%', minWidth: '80%', borderRadius: '5px' }}>
                                <Stack>
                                    <p style={{ fontWeight:'bold',color:'greenyellow'}}>You recieved first deposit bonus of {item.amount} USDT from {item.username}</p>
                                    <p style={{ color: 'white' }}>{fullDay}</p>
                                </Stack>
                            </Stack>
                            )
                           }else{
                            if(item.type === 'affbonus' && item.code === credent.newrefer){
                                return(
                                    <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #981FC0', maxWidth: '90%', minWidth: '80%', borderRadius: '5px' }}>
                                    <Stack>
                                        <p style={{ fontWeight:'bold',color:'greenyellow'}}>You have recieved rebate bonus of {item.amount} USDT from {item.username}</p>
                                        <p style={{ color: 'white' }}>{fullDay}</p>
                                    </Stack>
                                </Stack>
                                )
                            }else{
                                if(item.code === 'transfersend'){
                                    return(
                                        <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #981FC0', maxWidth: '90%', minWidth: '80%', borderRadius: '5px' }}>
                                        <Stack>
                                            <p style={{ fontWeight:'bold',color:'greenyellow'}}>You have sent funds of {item.amount} USDT from {item.type}</p>
                                            <p style={{ color: 'white',fontSize:'11px' }}>If you did not make this E-Transfer, please contact Customer Care as soon as possible.</p>
                                            <p style={{ color: 'white' }}>{fullDay}</p>
                                        </Stack>
                                    </Stack>
                                    )
                                }else if(item.code === 'transfercollect'){
                                    return(
                                        <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #981FC0', maxWidth: '90%', minWidth: '80%', borderRadius: '5px' }}>
                                        <Stack>
                                            <p style={{ fontWeight:'bold',color:'greenyellow'}}>You have recieved funds of {item.amount} USDT from {item.type}</p>
                                            <p style={{ color: 'white' }}>{fullDay}</p>
                                        </Stack>
                                    </Stack>
                                    )
                                }else{
                                    return;
                                }
                            }
                           }
                          }
                        })
                    }
                </Stack>
            )
        }else{
            return(
            <Stack justifyContent='center' alignItems='center' sx={{ width:'100%',height:'55vh'}}>
        <p style={{ fontSize:'20px'}}>{t("NoDataAvaliable")}</p>
        <p style={{ color:'grey'}}>Please Check your internet connection</p>
      </Stack>)
        }
    }
    return (
        <div className='backgrounds' style={{ width: '100%', minHeight: '90vh',display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'center',paddingBottom:'200px' }}>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px',width:'100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.push('/dashboard')
                }} />
                  <p style={{ color: '#981FC0', fontSize: '18px' }}>Notifications</p>
            </Stack>
            <Stack sx={{ padding: '8px' }} direction='column' alignItems='center'>
                <NotiFunc/>
            </Stack>
            <HomeBottom />
        </div>
    )
}
export async function getServerSideProps(context) { 
    const id = context.query.id;
    const { locale } = context;
    console.log(id)
    try{
        const { data,error } = await supabase
        .from('users')
        .select('*')
        .eq('userId',id)
        return {
            props: {credent:data[0], 
                
            }, // will be passed to the page component as props
        }
    }catch(err){
        console.log(err);
        let credent = {};
        return {
            props: {credent:credent,}, // will be passed to the page component as props
        }
    }
}