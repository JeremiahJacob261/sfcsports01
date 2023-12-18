import { Stack } from '@mui/material';
import HomeBottom from '../../UIComponents/bottomNav';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Box, Typography, Modal, Fade, Backdrop } from '@mui/material';
import { Icon, InlineIcon } from '@iconify/react';
import { useEffect,useState } from 'react';
import { supabase } from '@/pages/api/supabase';
export default function History() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [noti, setNoti] = useState(false);
    //hisstory-dx

    function HistoryDx() {
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
      
        return (
          <div >
            <Icon icon="fa6-solid:expand" width={24} height={24} className='iconbtn' style={{ color: 'white' }}
              onClick={handleOpen}
            />
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box className='history'>
                  <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ width:"100%",textAlign:'center',color:"#e4264c"}}>
                    Transaction History
                  </Typography>
                  <Stack spacing={2} sx={{ width: '100%' }} direction="column" justifyContent='center'>
                 
                    <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
         <p style={{ color:'rgba(245,186,79,1)'}}>Transaction Type</p>
      <p>{data.type ?? ''}</p>
                    </Stack>
                    <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
        <p style={{ color:'rgba(245,186,79,1)'}}> Status</p>
      <p>{data.status}</p>
                    </Stack>
                    <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
        <p style={{ color:'rgba(245,186,79,1)'}}>Amount</p>
      <p>{data.amount} USDT</p>
                    </Stack>
                    <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
        <p style={{ color:'rgba(245,186,79,1)'}}> Description</p>
      <p>{data.description}</p>
                    </Stack>
                    <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
        <p style={{ color:'rgba(245,186,79,1)'}}>Payment Method</p>
      <p>{data.payment}</p>
                    </Stack>
      
                    <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
        <p style={{ color:'rgba(245,186,79,1)'}}>Time</p>
      <p>{data.time}</p>
                    </Stack>
                  </Stack>
      
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className='cancelbrn'>
                    <Icon icon="iconoir:cancel" onClick={handleClose} width={24} height={24} style={{ color: 'white' }} />
      
                  </motion.div>
                </Box>
              </Fade>
            </Modal>
          </div>
        );
      }

    //history-dx
    useEffect(()=>{
            console.log('started')
        const getNoti = async () =>{
            const { data,error } = await supabase
            .from('activa')
            .select('*')
            .eq('username',localStorage.getItem('signNames'))
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
                            <p><p style={{ fontWeight:'bold',color:'greenyellow'}}>{item.type}</p> has just signed up with your Referral Link</p>
                            <p style={{ color: 'white' }}>{fullDay}</p>
                        </Stack>
                        <Stack justifyContent='center' alignItems="center">
                            <HistoryDx onClick={()=>{
                                setData(infos)
                            
                            }}/>
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
                            <p className='ungradtext' style={{ fontSize: '16px' }}>Your Bet with betid of {item.type}</p>
                            <p style={{ color: 'white' }}>Amount {item.amount ?? 0}</p>
                            <p style={{ color: 'white' }}>{fullDay}</p>
                            <p style={{ color: 'white',fontSize:'11px' }}>If you did not Request for this Bet Cancellation, please contact Customer Care</p>
                        </Stack>
                        <Stack justifyContent='center' alignItems="center">
                            <HistoryDx onClick={()=>{
                                setData(infos)
                            
                            }}/>
                        </Stack>
                    </Stack>
                            )
                          }else if(item.type === 'bonus'){
                            let infos = {
                                type:'bonus',
                                amount:item.amount,
                                time:fullDay,
                                username:item.username,
                                description:'Sign Up Bonus',
                                status:'Success',
                                payment:'USDT(TRC20)'
                            }
                            return(
                                <Stack className='bottomnav' direction='row' key={item.id} justifyContent='space-between' alignItems='center' sx={{ border: '1px solid #C61F41', maxWidth: '90vw', minWidth: '80vw', borderRadius: '5px' }}>
                        <Stack>
                            <p style={{ fontWeight:'bold',color:'greenyellow'}}>You just recieved a {item.type}</p>
                            <p>{item.amount} USDT</p>
                            <p style={{ color: 'white' }}>{fullDay}</p>
                        </Stack>
                        <Stack justifyContent='center' alignItems="center">
                            <HistoryDx onClick={()=>{
                                setData(infos)
                            
                            }}/>
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
                                    <p style={{ fontWeight:'bold',color:'greenyellow'}}>Your USDT Deposit was Successful</p>
                                    <p>{item.amount} USDT</p>
                                    <p style={{ color: 'white' }}>{fullDay}</p>
                                </Stack>
                                <Stack justifyContent='center' alignItems="center">
                                    <HistoryDx onClick={()=>{
                                setData(infos)
                            
                            }}/>
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
                                    <p style={{ fontWeight:'bold',color:'greenyellow'}}>Your Bet was placed Successfully</p>
                                    <p>{item.amount} USDT</p>
                                    <p style={{ color: 'white' }}>{fullDay}</p>
                                </Stack>
                                <Stack justifyContent='center' alignItems="center">
                                    <HistoryDx onClick={()=>{
                                setData(infos)
                            
                            }}/>
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
                                    <p style={{ fontWeight:'bold',color:'greenyellow'}}>Your USDT Deposit Failed</p>
                                    <p>{item.amount} USDT</p>
                                    <p style={{ color: 'white' }}>{fullDay}</p>
                                </Stack>
                                <Stack justifyContent='center' alignItems="center">
                                    <HistoryDx onClick={()=>{
                                setData(infos)
                            
                            }}/>
                                </Stack>
                            </Stack>
                            )
                          }else{
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
                                    <p style={{ fontWeight:'bold',color:'greenyellow'}}>Your USDT Deposit Failed</p>
                                    <p>{item.amount} USDT</p>
                                    <p style={{ color: 'white' }}>{fullDay}</p>
                                </Stack>
                                <Stack justifyContent='center' alignItems="center">
                                    <HistoryDx onClick={()=>{
                                setData(infos)
                            
                            }}/>
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