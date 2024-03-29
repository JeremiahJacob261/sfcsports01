import React,{useState} from 'react'
import Image from 'next/image'
import Logo from "@/public/logo.png";
import { Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {Drawer} from '@mui/material';
import { motion } from 'framer-motion'
import Cup2 from '@/public/team_connect.png'
import Cup1 from '@/public/cup1.png'
import Cup3 from '@/public/cup3.png'
import Cert1 from '@/public/cert1.png'
import Cert2 from '@/public/cert2.png'
import Cert3 from '@/public/cert3.png'
import Head from 'next/head';
import Translate from '@/pages/translator';
import { useTranslation } from 'next-i18next'
import { adapter,tronWeb } from '@/crypto/adaptedwc'
import { useEffect } from 'react';
import { supabase } from './api/supabase';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common','all'
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default function Home(locale) {
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
    <Stack style={{ minWidth: '300px',minHeight:'100vh',background:'black',opacity:0.9 }} >
      <div style={{ width: '100%', height: '100vh', position: 'fixed', zIndex: -1, opacity: '0.3',background:'black' }}>
          <Image src={Logo}
            layout='fill'
            objectFit='cover'
          />
        </div>
      <Head>
        <title>Eplsports</title>
        <meta name="description" content="Get Started With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* top nav bar */}
      <Stack style={{ background: '#981FC0', width: '100%', height: '56px', padding: '8px', position: 'fixed' }} direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Image src={Logo} width={41} height={36} alt="sfclogo" />
          <p style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>{t('all:Eplsports')}</p>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Translate/>
        <Stack onClick={async()=>{
          try{
            const { data,error } = supabase.auth.signOut();
            localStorage.clear();

          console.log(data);
          }catch(e){
            console.log(e);
          }
        }}>
          <Icon icon="ic:round-menu" width={39} height={33} style={{ color: '#545454', background: '#891CAD', opacity: '0.7' }} onClick={()=>{ setParentOpen(true) }}/>
        </Stack>

          </Stack>
      </Stack>
      {/* end of top nav bar */}
      <Stack style={{ minWidth: '100%', minHeight: '100vh',padding:'8px' }} justifyContent='center' alignItems='center' spacing={3}>
        
        <Stack direction="column" justifyContent='center' alignItems='center' spacing={3} style={{ padding: '12px', width: '100%', height: '100vh' }}>
        <p style={{ color: 'white', fontSize: '20px', fontWeight: '700',textAlign:'center' }}>
Receive up to a 100% bonus every day</p>
          <p style={{ width: '300px', color: 'white', fontSize: '32px', fontWeight: '700',textAlign:'center' }}>BET on sports games and stand a chance to win up to $5 million.</p>
          <p style={{ width: '300px', color: 'white', fontSize: '17px', fontWeight: '300',textAlign:'center' }}>Create your team to enjoy numerous bonuses and enjoy unlimited privileges.</p>
        
        <motion.div className="cvn" whileTap={{ y: 50}} whileHover={{ y:10 }}
        animate={{ y: 50 }}
        exit={{ y: 0}}
        transition={{ duration: 0.5 }}
        >
            <Stack onClick={()=>{
              router.push('/register?refer=0');
            }} sx={{ background: "#3F1052", padding: '16px', width: '191px',border:"1px solid #891CAD" }} justifyContent='center' alignItems='center' >
              <p style={{ color: 'white', fontSize: '16px', fontWeight: '300' }}>Join Now</p>
            </Stack>
            </motion.div>
        </Stack>
        <Stack spacing={5} justifyContent='center' alignItems='center'>
          <p style={{ color: 'white', fontSize: '15px', fontWeight: '700' }}>{t('all:Trustedbymillionsofplayers')}</p>
          <p style={{ color: 'white', fontSize: '24px', fontWeight: '600' }}>{t('all:Whyplaymoneywinninggames')}</p>
          <p style={{ color: 'white', fontSize: '13px', fontWeight: '400' }}>{t('all:RegisterTodaytoPlayandStartWinningDailyCashPrizes')}</p>
        </Stack>
        <Stack spacing={3} sx={{padding:'12px',borderRadius:'15px',border:'2px solid #891CAD',width:'335px'}} justifyContent='center' alignItems='center'>
          <Image src={Cup1} width={154} height={149} alt="trophy1" style={{borderRadius:'100px'}}/>
          <p style={{ fontWeight:'600',fontSize:'20px' }}>500 +</p>
          <p style={{ fontWeight:'600',fontSize:'16px',color:'white',textAlign:'center'}}>{t('all:DailyMatches')}</p>
        </Stack>

        <Stack spacing={3} sx={{padding:'12px',borderRadius:'15px',border:'2px solid #891CAD',width:'335px'}} justifyContent='center' alignItems='center'>
          <Image src={Cup2} width={154} height={149} alt="trophy2" style={{borderRadius:'100px'}}/>
          <p style={{ fontWeight:'600',fontSize:'20px' }}>10 000 +</p>
          < p style={{ fontWeight:'600',fontSize:'16px',color:'white',textAlign:'center'}}>{t('all:ActiveUsers')}</ p>
        </Stack>

        <Stack spacing={3} sx={{padding:'12px',borderRadius:'15px',border:'2px solid #891CAD',width:'335px'}} justifyContent='center' alignItems='center'>
          <Image src={Cup3} width={154} height={150} alt="trophy3" style={{borderRadius:'100px'}}/>
          <p style={{ fontWeight:'600',fontSize:'20px' }}>200 000 +</p>
          <p style={{ fontWeight:'600',fontSize:'16px',color:'white',textAlign:'center'}}>{t('all:SuccessfulTransactions')}</p>
        </Stack>
         <motion.p whileTap={{ color:'grey',scale:1.05 }} style={{ color: 'white', fontSize: '21px', fontWeight: '700' }}>{t('all:OurCertificates')}</motion.p>
         <Stack spacing={2} style={{ display:"flex", flexDirection:"row", flexWrap:'wrap',justifyContent:'center',aligItems:'center'}}>
            <Image src={Cert1} width={254} height={230} alt="cert1" style={{ margin:'10px'}}/>
        <Image src={Cert2} width={254} height={230} alt="cert2" style={{ margin:'10px'}}/>
        <Image src={Cert3} width={254} height={230} alt="cert3" style={{ margin:'10px'}}/>
         </Stack>
      
        <Drawer
          anchor={'left'}
          open={parentopen}
          onClose={() => { setParentOpen(false) }}
          style={{ backgroundColor: 'transparent' }}
        >
          <Stack style={{ background: '#981FC0', width: '70%', height: '100%', padding: '8px', position: 'fixed' }} direction='column' alignItems='start' justifyContent='left' spacing={3}>
            <motion.p className='drawopstop'>Eplsports        </motion.p>

            <Link href='/login'> <motion.p whileTap={{ color:'grey',scale:1.05 }} className='drawops'>LOGIN  
                        </motion.p></Link>
            <Link href='/register?refer=0'> <motion.p whileTap={{ color:'grey',scale:1.05 }} className='drawops'>SIGN UP            </motion.p></Link>
            <Link href='/'> <motion.p whileTap={{ color:'grey',scale:1.05 }} className='drawops'>CONTACT US         </motion.p></Link>
            <Link href='/'> <motion.p whileTap={{ color:'grey',scale:1.05 }} className='drawops'>JOIN TELEGRAM GROUP</motion.p></Link>
            </Stack>
        </Drawer>
      </Stack>
    </Stack>
  )
}
