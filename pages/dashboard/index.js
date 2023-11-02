import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Stack } from '@mui/material';
import { adapter, tronWeb } from '@/crypto/adaptedwc'
import { Icon } from '@iconify/react';
import { supabase } from '../api/supabase';
import { useRouter } from 'next/router';
import Logo from "@/public/Sheffield_FC.svg.png";
import Head from 'next/head';
import Image from 'next/image'
import { motion } from 'framer-motion';
import Avatar from '@/public/avatar.png'
import HomeBottom from '../UIComponents/bottomNav';
export default function Home({ footDat,usernam}) {
  const [addresst, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [reciept, setReciept] = useState('');
  const [balance, setBalance] = useState(0);
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  // const sendTRX = async () => {
  //   console.log('started ...');
  //   try {
  //     const unSignedTransaction = await tronWeb.transactionBuilder.sendTrx(reciept, amount, adapter.address);
  //     // using adapter to sign the transaction
  //     console.log(unSignedTransaction)
  //     const signedTransaction = await adapter.signTransaction(unSignedTransaction);
  //     // broadcast the transaction
  //     console.log(signedTransaction)
  //     await tronWeb.trx.sendRawTransaction(signedTransaction);
  //   } catch (e) {

  //   }


  // };
  // const walletConnect = async () => {
  //   // connect
  //   try {
  //     localStorage.clear();
  //     let as = await adapter.connect();
  //     console.log(as);

  //     console.log(adapter.address);
  //   } catch (e) {
  //     console.log(e)
  //     console.log(e.code)
  //   }
  // };
  useEffect(() => {
    const checkAuth = async () => {
      const signedIn = localStorage.getItem('signedIns');
      const uid = localStorage.getItem('signUids');
      if (signedIn) {
        setAuthed(true)
        const getUser = async () => {
          try {
            const { data, error } = await supabase
              .from('users')
              .select('*')
              .eq('userId', uid)
            setUser(data[0]);
            console.log(data[0])
          } catch (error) {
            console.log(error)
          }

        }
        getUser();
      } else {
        router.push('/login')
      }
    };
    checkAuth();
    
    
  }, [authed]);
  function NavbAR() {
    if (authed) {
      return (
        <Stack style={{ width: '100%', height: '56px', padding: '8px', position: 'fixed' }} direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <div style={{ borderRadius: '100px', background: '#D8B16B' }}>
              <Image src={Avatar} width={40} height={29} alt="sfclogo" />
            </div>
            <Stack>
              <p className='ungradtext' style={{ fontSize: '15px', fontWeight: '600' }}>Good Morning!</p>
              <p className='gradtest' style={{ fontSize: '15px', fontWeight: '600' }}>{usernam ? usernam : 'Loading name ...'}</p>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
            <motion.div whileHover={{ color: '#C61F41' }}>
              <Icon icon="fluent:chat-24-regular" width={24} height={24} className='iconbtn' style={{ color: 'white' }} onClick={()=>{
                const { data,error } = supabase.auth.signOut();
                localStorage.clear();
                console.log('sign out')
                router.push('/login')
              }}/>
            </motion.div>
            <motion.div whileHover={{ color: '#C61F41' }}>
              <Icon icon="ri:notification-4-fill" width={24} height={24} className='iconbtn' style={{ color: 'white' }} />
            </motion.div>
          </Stack>
        </Stack>
      );
    } else {
      return (
        <Stack style={{ width: '100%', height: '56px', padding: '8px', position: 'fixed' }} direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <div style={{ borderRadius: '100px', background: '#D8B16B' }}>
              <Image src={Avatar} width={40} height={29} alt="sfclogo" />
            </div>
            <Stack>
              <p className='ungradtext' style={{ fontSize: '15px', fontWeight: '600' }}>Good Morning</p>
              <p className='gradtest' style={{ fontSize: '15px', fontWeight: '600' }}></p>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
            <motion.div whileHover={{ color: '#C61F41' }}>
              <Icon icon="iconamoon:link-bold" width={24} height={24} className='iconbtn' style={{ color: 'white' }} onClick={()=>{
                const { data,error } = supabase.auth.signOut();
                localStorage.clear();
                console.log('signout')
                router.push('/login')
              }}/>
            </motion.div>

            <motion.div whileHover={{ color: '#C61F41' }}>
              <Icon icon="ri:notification-4-fill" width={24} height={24} className='iconbtn' style={{ color: 'white' }} />
            </motion.div>
          </Stack>
        </Stack>
      );
    }
  }
  function MatchRow() {
    if (footDat) {
      return(
        <Stack direction='column' spacing={1} style={{ padding:'4px', marginBottom:'100px', maxWidth:'310px', minWidth:'80vw'}}>
      {/* container for all matches i sabove */}
      {
        footDat.map((data)=>{ 
          return(
          <Stack direction="column" sx={{ minWidth:'87vw',maxWidth:'310px'}} className='rowsofdata' justifyContent='center' spacing={1} key={data.match_id}>
        <Stack direction="row" style={{ color:'grey'}}>{data.time} ID {data.match_id} {data.league}</Stack>
        <Stack direction="row" alignItems='center'> 
  
        <Stack direction='column' sx={{ width:'50%'}} spacing={1}>
          <Stack direction='row' spacing={1}><Image src={data.ihome} alt='home' width={20} height={20}/><p>{data.home}</p></Stack>
          <Stack direction='row' spacing={1}><Image src={data.iaway} alt="away" width={20} height={20}/><p>{data.away}</p></Stack>
        </Stack>
  
        <Stack direction="row" sx={{ width:'50%',height:'100%'}} spacing={2} alignItems='center' justifyContent='center'>
          <p className='odds'>{data.onenil}</p>
          <p className='odds'>{data.nilnil}</p>
          <p className='odds'>{data.nilone}</p>
        </Stack>
        </Stack>
        <Stack direction="row"></Stack>
          </Stack>
          )
         })
      }
       </Stack>
      )
    } else {
      return(
      <Stack justifyContent='center' alignItems='center' sx={{ width:'100vw',height:'100vh'}}>
        <p style={{ fontSize:'20px'}}>No Data Avaliable</p>
        <p style={{ color:'grey'}}>Please Check your internet connection</p>
      </Stack>)
    }
  }
  return (
    <Stack direction='column' alignItems='center' sx={{ minHeight: '90vh' }} className='backgrounds' spacing={1}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/Sheffield_FC.svg.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Stack sx={{ height: '50px', width: '100%' }}>
        <NavbAR />
      </Stack>
      <marquee>Welcome to SFSPORTSO1</marquee>
      <Stack alignItems='center' justifyContent='center' sx={{ height: '100px', width: '100%', background: 'grey' }}>
        <p className='gradtest' style={{ fontSize: '15px', fontWeight: '600' }}>Image Banners go here</p>
      </Stack>
      <Stack direction='row' justifyContent='center' spacing={1} sx={{ padding: '8px',width:'100%' }}>
        {/* fans favourite */}
        <Stack direction='column' alignItems='center' spacing={1} sx={{ background: 'rgb(27,3,0)',width:'30%' }}>
          <Box sx={{ width: '100%', height: '5px', backgroundColor: '#C61F41' }}>
          </Box>
          <p style={{ textAlign: 'center', fontSize: '13px' }}>People  Favourites</p>
        </Stack>

        {/* today games */}
        <Stack sx={{ background: 'rgb(27,3,0)',width:'30%' }} alignItems='center' spacing={1}>
          <Box sx={{ height: '5px', width: '100%',backgroundColor: 'green' }}>
          </Box>
          <p style={{ textAlign: 'center', fontSize: '13px' }}>Today Matches</p>
        </Stack>

        {/* tomorrow games */}
        <Stack sx={{ background: 'rgb(27,3,0)' ,width:'30%'}} alignItems='center' spacing={1}>
          <Box sx={{ height: '5px', width: '100%',  backgroundColor: 'rgba(194,127,8,1)' }}>
          </Box>
          <p style={{ textAlign: 'center', fontSize: '13px' }}>Tomorrow Matches</p>
        </Stack>

      </Stack>
     <MatchRow/>
      <HomeBottom />
    </Stack>
  )
}
export async function getServerSideProps({req}) {
  const refreshToken = req.cookies['my-refresh-token']
const accessToken = req.cookies['my-access-token']
try{
if (refreshToken && accessToken) {
    console.log('sign insss')
   await supabase.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
  })
} else {
  // make sure you handle this case!
  throw new Error('User is not authenticated.');
  console.log('not logged in')
}
}catch(e){
  console.log(e)

}


// returns user information
let {data:user ,error} = await supabase.auth.getUser()
    
    console.log(error)
   
  try{
const { data, error } = await supabase
    .from('bets')
    .select()
    .limit(10)
    .order('id', { ascending: false });
  let footDat = data;
  let usernam = user.user.user_metadata.displayName;
  return {
    props: { footDat,usernam }, // will be passed to the page component as props
  }
  }catch(e){
    console.log(e);
    let err = [];
    return {
      props: { err }, // will be passed to the page component as props
    }
  }
  
}