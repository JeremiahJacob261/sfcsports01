import React,{useState} from 'react'
import Image from 'next/image'
import Logo from "@/public/Sheffield_FC.svg.png";
import { Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {Drawer} from '@mui/material';
import { motion } from 'framer-motion'
import Cup2 from '@/public/team_connect.png'
import Cup1 from '@/public/cup1.png'
import Cup3 from '@/public/cup3.png'
import Cert1 from '@/public/cert (1).jpg'
import Cert2 from '@/public/cert (2).jpg'
import Cert3 from '@/public/cert (3).jpg'
import Head from 'next/head';
import { useTranslation } from 'next-i18next'
import { adapter,tronWeb } from '@/crypto/adaptedwc'
import { useEffect } from 'react';
import { supabase } from './api/supabase';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Casing from '@/pages/i18ncasing';
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default function Home(props) {
  const [authed, setAuthed] = useState(false);
  const router = useRouter();
  const [parentopen, setParentOpen] = useState(false);
const { t } = useTranslation()
//   const WalletConnect = async () => {
//     try{
//  // connect
//  try{
//    await adapter.connect();
 
//   alert("Connecting ...")
// console.log(adapter.address);
// router.push('/dashboard')
//     }catch(e){
//         console.log(e);
//     }
//     }catch(err){
//       console.log(err);
//     }
//   }
  useEffect(() => { 
    // const checkAuth = async () => {
    //   try {
    //   const address = adapter.address;
    //     console.log(address);
    //     if(address){
    //       setAuthed(true);
    //       router.push('/dashboard');
    //     }else{
    //       setAuthed(false);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // checkAuth();
   }, []);
  return (
    <Stack style={{ minWidth: '100vw',minHeight:'100vh',background:'black',opacity:0.9 }} >
      <div style={{ width: '100%', height: '100vh', position: 'fixed', zIndex: -1, opacity: '0.3',background:'black' }}>
          <Image src={Logo}
            layout='fill'
            objectFit='cover'
          />
        </div>
      <Head>
        <title>SFCSPORTS01</title>
        <meta name="description" content="Get Started With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/Sheffield_FC.svg.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* top nav bar */}
      <Stack style={{ background: '#C61F41', width: '100%', height: '56px', padding: '8px', position: 'fixed' }} direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Image src={Logo} width={41} height={36} alt="sfclogo" />
          <Casing style={{ color: '#D8B16B', fontSize: '15px', fontWeight: '600' }}>{t('common:SFCSPORTS01')}</Casing>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
        <Stack onClick={async()=>{
          try{
            const { data,error } = supabase.auth.signOut();
            localStorage.clear();

          console.log(data);
          }catch(e){
            console.log(e);
          }
        }}>
          <Icon icon="ic:round-menu" width={39} height={33} style={{ color: '#545454', background: '#D03151', opacity: '0.7' }} onClick={()=>{ setParentOpen(true) }}/>
        </Stack>

          </Stack>
      </Stack>
      {/* end of top nav bar */}
      <Stack style={{ minWidth: '100%', minHeight: '100vh',padding:'8px' }} justifyContent='center' alignItems='center' spacing={3}>
        
        <Stack direction="column" justifyContent='center' alignItems='center' spacing={3} style={{ padding: '12px', width: '100%', height: '100vh' }}>
          <Casing style={{ color: '#D8B16B', fontSize: '20px', fontWeight: '700' }}>{t('common:GETUPTO100BONUSDAILY')}</Casing>
          <Casing style={{ width: '300px', color: 'white', fontSize: '32px', fontWeight: '700' }}>BET On Football Games & Win Upto $1 Million</Casing>
          <Casing style={{ width: '300px', color: 'white', fontSize: '17px', fontWeight: '300' }}>Build Your Team To  Get Multiple Bonuses and Unlimited Priviledges</Casing>
        
            <Stack onClick={()=>{
              router.push('/register?refer=0');
            }} sx={{ background: "linear-gradient(#C61F41, #D13655);", padding: '16px', borderRadius: '10px', width: '191px' }} justifyContent='center' alignItems='center' >
              <Casing style={{ color: 'white', fontSize: '16px', fontWeight: '300' }}>GET STARTED NOW!</Casing>
            </Stack>
        </Stack>
        <Stack spacing={5} justifyContent='center' alignItems='center'>
          <Casing style={{ color: '#D8B16B', fontSize: '15px', fontWeight: '700' }}>Trusted by millions of players</Casing>
          <Casing style={{ color: 'white', fontSize: '24px', fontWeight: '600' }}>Why play money winning games</Casing>
          <Casing style={{ color: 'white', fontSize: '13px', fontWeight: '400' }}>Register Today to Play and Start Winning Daily Cash Prizes</Casing>
        </Stack>
        <Stack spacing={3} sx={{padding:'12px',borderRadius:'15px',border:'2px solid #D03151',width:'335px'}} justifyContent='center' alignItems='center'>
          <Image src={Cup1} width={154} height={149} alt="trophy1" style={{borderRadius:'100px'}}/>
          <Casing style={{ fontWeight:'600',fontSize:'20px' }}>500 +</Casing>
          <Casing style={{ fontWeight:'600',fontSize:'16px',color:'#D8B16B',textAlign:'center'}}>Daily Matches</Casing>
        </Stack>

        <Stack spacing={3} sx={{padding:'12px',borderRadius:'15px',border:'2px solid #D03151',width:'335px'}} justifyContent='center' alignItems='center'>
          <Image src={Cup2} width={154} height={149} alt="trophy2" style={{borderRadius:'100px'}}/>
          <Casing style={{ fontWeight:'600',fontSize:'20px' }}>10 000 +</Casing>
          <Casing style={{ fontWeight:'600',fontSize:'16px',color:'#D8B16B',textAlign:'center'}}>Active Users</Casing>
        </Stack>

        <Stack spacing={3} sx={{padding:'12px',borderRadius:'15px',border:'2px solid #D03151',width:'335px'}} justifyContent='center' alignItems='center'>
          <Image src={Cup3} width={154} height={150} alt="trophy3" style={{borderRadius:'100px'}}/>
          <Casing style={{ fontWeight:'600',fontSize:'20px' }}>200 000 +</Casing>
          <Casing style={{ fontWeight:'600',fontSize:'16px',color:'#D8B16B',textAlign:'center'}}>Successful Transactions</Casing>
        </Stack>
         <motion.p whileTap={{ color:'grey',scale:1.05 }} style={{ color: '#D8B16B', fontSize: '21px', fontWeight: '700' }}>Our Certificates</motion.p>
        <Image src={Cert1} width={254} height={230} alt="cert1" style={{}}/>
        <Image src={Cert2} width={254} height={230} alt="cert2" style={{}}/>
        <Image src={Cert3} width={254} height={230} alt="cert3" style={{}}/>
        <Drawer
          anchor={'left'}
          open={parentopen}
          onClose={() => { setParentOpen(false) }}
          style={{ backgroundColor: 'transparent' }}
        >
          <Stack style={{ background: '#C61F41', width: '70vw', height: '100%', padding: '8px', position: 'fixed' }} direction='column' alignItems='start' justifyContent='left' spacing={3}>
            <motion.p className='drawopstop'>SFCSPORTS01        </motion.p>

            <Link href='/login'> <motion.p whileTap={{ color:'grey',scale:1.05 }} className='drawops'>LOGIN              </motion.p></Link>
            <Link href='/register?refer=0'> <motion.p whileTap={{ color:'grey',scale:1.05 }} className='drawops'>SIGN UP            </motion.p></Link>
            <Link href='/'> <motion.p whileTap={{ color:'grey',scale:1.05 }} className='drawops'>CONTACT US         </motion.p></Link>
            <Link href='/'> <motion.p whileTap={{ color:'grey',scale:1.05 }} className='drawops'>JOIN TELEGRAM GROUP</motion.p></Link>
            </Stack>
        </Drawer>
      </Stack>
    </Stack>
  )
}
