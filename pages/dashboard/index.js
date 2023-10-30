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
export default function Home() {
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
              <p className='gradtest' style={{ fontSize: '15px', fontWeight: '600' }}>{user ? user.username : 'Loading name ...'}</p>
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
  return (
    <Stack direction='column' alignItems='center' sx={{ minHeight: '100vh' }} className='backgrounds' spacing={3}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/Sheffield_FC.svg.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Stack sx={{ height: '50px', width: '100%' }}>
        <NavbAR />
      </Stack>
      <Stack alignItems='center' justifyContent='center' sx={{ height: '100px', width: '100%', background: 'grey' }}>
        <p className='gradtest' style={{ fontSize: '15px', fontWeight: '600' }}>Image Banners go here</p>
      </Stack>
      <Stack direction='row' justifyContent='center' spacing={1} sx={{ padding: '8px',width:'100%' }}>
        {/* fans favourite */}
        <Stack direction='column' alignItems='center' justifyContent='center' sx={{ background: 'rgb(27,3,0)',width:'30%' }}>
          <Box sx={{ width: '100%', height: '5px', maxWidth: 360, backgroundColor: '#C61F41' }}>
          </Box>
          <p style={{ textAlign: 'center', fontSize: '13px' }}>People Favourites</p>
        </Stack>

        {/* today games */}
        <Stack sx={{ background: 'rgb(27,3,0)',width:'30%' }}>
          <Box sx={{ height: '5px', width: '100%', maxWidth: 360, backgroundColor: 'green' }}>
          </Box>
          <p style={{ textAlign: 'center', fontSize: '13px' }}>Today Matches</p>
        </Stack>

        {/* tomorrow games */}
        <Stack sx={{ background: 'rgb(27,3,0)' ,width:'30%'}}>
          <Box sx={{ height: '5px', width: '100%', maxWidth: 360, backgroundColor: 'rgba(194,127,8,1)' }}>
          </Box>
          <p style={{ textAlign: 'center', fontSize: '13px' }}>Tomorrow Matches</p>
        </Stack>

      </Stack>

      <HomeBottom />
    </Stack>
  )
}