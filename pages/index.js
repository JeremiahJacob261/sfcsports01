import React, { useState } from 'react'
import Image from 'next/image'
import Logo from "@/public/logo.png";
import { Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Drawer } from '@mui/material';
import { motion } from 'framer-motion'
import Cup2 from '@/public/team_connect.png'
import Cup1 from '@/public/cup1.png'
import Cup3 from '@/public/cup3.png'
import Cert1 from '@/public/cert1.png'
import Cert2 from '@/public/cert2.png'
import Cert3 from '@/public/cert3.png'
import Star from '@/public/stadia.png'
import Tour1 from '@/public/tours.png'
import Tour2 from '@/public/tour2.png'
import Tour3 from '@/public/tour3.png'
import Head from 'next/head';
import Massive from '@/public/slider/cn.jpg'
import Translate from '@/pages/translatec';
import { adapter, tronWeb } from '@/crypto/adaptedwc'
import { useEffect } from 'react';
import { supabase } from './api/supabase';
import {
  Popover,
  PopoverHandler,
  PopoverContent
} from '@material-tailwind/react'
import Footer from './footer/index'


export default function Home(locale) {
  const [authed, setAuthed] = useState(false);
  const router = useRouter();
  const [parentopen, setParentOpen] = useState(false);
  function t(text) {
    return text;
}
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
  let linkers = {
    'HOME': '/',
    'LOGIN': '/login',
    'REGISTER': '/register?refer=0',
    'FAQ': '/',
    'CONTACT': '/'
  };
  function CC({ children }) {
    return <Link href={linkers[children]} style={{ margin: '5px' }}><motion.p whileHover={{ color: '#661980' }} style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '600' }}>{children}</motion.p></Link>
  }
  return (
    <Stack style={{ minWidth: '300px', minHeight: '100vh', background: 'black', opacity: 0.9 }} >
      <div style={{ width: '100%', height: '100vh', position: 'fixed', zIndex: -1, opacity: '0.3', background: 'black' }}>
        <Image src={Star} alt="star" style={{ zIndex: -1 }}
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
      <Stack style={{ background: '#981FC0', width: '100%', height: '70px', padding: '8px', position: 'fixed' }} direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Image src={Logo} width={41} height={36} alt="eplsports" />
          <p style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>eplsports</p>
        </Stack>
        <Stack direction='row' alignItems='end' spacing={2}>

        </Stack>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Stack onClick={async () => {
            try {
              const { data, error } = supabase.auth.signOut();
              localStorage.clear();

              console.log(data);
            } catch (e) {
              console.log(e);
            }
          }}>
            <Icon icon="ic:round-menu" width={39} height={33} style={{ color: '#545454', background: 'white' }} onClick={() => { setParentOpen(true) }} />
          </Stack>

          <Translate />
          {/* <Popover
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <PopoverHandler>
              <p style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '600' }}>Translate</p>
            </PopoverHandler>
            <PopoverContent>
              <div style={{ display: 'flex', flexDirection: 'column', background: 'whitesmoke' }}>
                <motion.p whileHover={{ x: -10 }} whileTap={{ scale: 0.75 }} className='p-popover'>ENGLISH</motion.p>
                <motion.p whileHover={{ x: -10 }} whileTap={{ scale: 0.75 }} className='p-popover'>ESPANOL</motion.p>
                <motion.p whileHover={{ x: -10 }} whileTap={{ scale: 0.75 }} className='p-popover'>FRANCIAS</motion.p>
                <motion.p whileHover={{ x: -10 }} whileTap={{ scale: 0.75 }} className='p-popover'>ENGLISH</motion.p>
                <motion.p whileHover={{ x: -10 }} whileTap={{ scale: 0.75 }} className='p-popover'>ENGLISH</motion.p>
              </div>
            </PopoverContent>
          </Popover> */}
        </div>

      </Stack>
      {/* end of top nav bar */}
      <Stack style={{ minWidth: '100%', minHeight: '100vh', padding: '4px' }} justifyContent='center' alignItems='center' spacing={3}>

        <Stack direction="column" justifyContent='center' alignItems='start' spacing={3} style={{ padding: '12px', width: '100%', height: '100vh' }}>

          <p style={{ color: '#981FC0', fontSize: '45px', fontStyle: 'bold', fontWeight: '900', textAlign: 'left' }}>ENJOY YOUR BETTING EXPERIENCES</p>
          <p style={{ color: 'white', fontSize: '17px', fontWeight: '300', textAlign: 'left', maxWidth: '400px' }}>
            Get rewarded with bonuses of up to 100% every single day and unlock a realm of limitless privileges. Form your own team and immerse yourself in a plethora of bonuses while indulging in the boundless privileges offered by crypto betting.
          </p>
          <motion.div className="cvn" whileTap={{ y: 50 }} whileHover={{ y: 10 }}
            animate={{ y: 50 }}
            exit={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack onClick={() => {
              router.push('/register?refer=0');
            }} sx={{ background: "#3F1052", padding: '16px', width: '191px', border: "1px solid #891CAD" }} justifyContent='center' alignItems='center' >
              <p style={{ color: 'white', fontSize: '16px', fontWeight: '300' }}>Join Now</p>
            </Stack>
          </motion.div>
        </Stack>
        <div style={{ background: 'white', width: '100%', paddingTop: '100px', paddingBottom: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '8px' }}>
          <Stack spacing={5} justifyContent='center' alignItems='center'>
            <p style={{ color: 'black', fontSize: '15px', fontWeight: '700' }}>{t('Trustedbymillionsofplayers')}</p>
            <p style={{ color: '#661980', fontSize: '24px', fontWeight: '600' }}>{t('Whyplaymoneywinninggames')}</p>
            <p style={{ color: 'black', fontSize: '13px', fontWeight: '400' }}>{t('RegisterTodaytoPlayandStartWinningDailyCashPrizes')}</p>
          </Stack>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Stack spacing={3} sx={{ padding: '12px', margin: '4px', borderRadius: '15px', border: '2px solid #891CAD', width: '335px' }} justifyContent='center' alignItems='center'>
              <Image src={Cup1} width={154} height={149} alt="trophy1" style={{ borderRadius: '100px' }} />
              <p style={{ fontWeight: '600', fontSize: '20px', color: 'black' }}>500 +</p>
              <p style={{ fontWeight: '600', fontSize: '16px', color: 'black', textAlign: 'center' }}>{t('DailyMatches')}</p>
            </Stack>

            <Stack spacing={3} sx={{ padding: '12px', margin: '4px', borderRadius: '15px', border: '2px solid #891CAD', width: '335px' }} justifyContent='center' alignItems='center'>
              <Image src={Cup2} width={154} height={149} alt="trophy2" style={{ borderRadius: '100px' }} />
              <p style={{ fontWeight: '600', fontSize: '20px', color: 'black' }}>10 000 +</p>
              < p style={{ fontWeight: '600', fontSize: '16px', color: 'black', textAlign: 'center' }}>{t('ActiveUsers')}</ p>
            </Stack>

            <Stack spacing={3} sx={{ padding: '12px', margin: '4px', borderRadius: '15px', border: '2px solid #891CAD', width: '335px' }} justifyContent='center' alignItems='center'>
              <Image src={Cup3} width={154} height={150} alt="trophy3" style={{ borderRadius: '100px' }} />
              <p style={{ fontWeight: '600', fontSize: '20px', color: 'black' }}>200 000 +</p>
              <p style={{ fontWeight: '600', fontSize: '16px', color: 'black', textAlign: 'center' }}>{t('SuccessfulTransactions')}</p>
            </Stack>
          </div>

        </div>
        <div style={{ color: 'whitesmoke', padding: '8px' }}>
          <p style={{ color: 'whitesmoke', fontSize: '47px', fontWeight: 700, }}>EXPERIENCE A CUSTOM TOUR FOR OUR CUSTOMERS</p>
          <p>
            Get into the world of football with our exclusive custom tour, made specially for enthusiasts like you.
            This immersive experience is not just for die-hard fans it is open to all who cherish the beautiful game.
            Whether you are a casual observer or a dedicated supporter, join us as we traverse through the storied stadiums, iconic landmarks, and vibrant cultures of football.
            With inventories to suit every taste, our football tour guarantees an unforgettable journey for everyone.
          </p>
          <motion.div className="cvn" whileTap={{ y: 50 }} whileHover={{ y: 10 }}
            animate={{ y: 50 }}
            exit={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack onClick={() => {
              router.push('/register?refer=0');
            }} sx={{ marginBottom: '100px', background: "#3F1052", padding: '16px', width: '191px', border: "1px solid #891CAD" }} justifyContent='center' alignItems='center' >
              <p style={{ color: 'white', fontSize: '16px', fontWeight: '300' }}>EXPLORE Now</p>
            </Stack>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Image src={Tour1} alt="star" style={{ margin: '5px' }} width={290} height={200} />
            <Image src={Tour2} alt="star" style={{ margin: '5px' }} width={290} height={200} />
            <Image src={Tour3} alt="star" style={{ margin: '5px' }} width={290} height={200} />
          </div>
        </div>

        <div className='massive'>
          <Image src={Massive} width={367} height={210} alt="massive" />
          <Stack direction={"column"} spacing={3} style={{ width:'300px',margin:'12px'}}>
            <p style={{ fontSize:'21px',fontWeight:'600'}}>Earn Massively with EPLSPORTS</p>
            <p>Invest in EPLSPORTS for potential high daily profits and earn a 3% referral bonus on level one referrals.</p>
            <motion.div className="cvn" whileTap={{ y: 50 }} whileHover={{ y: 10 }}
              animate={{ y: 50 }}
              exit={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Stack onClick={() => {
                router.push('/register?refer=0');
              }} sx={{ marginBottom: '100px', background: "#3F1052", padding: '16px', width: '191px', border: "1px solid #891CAD" }} justifyContent='center' alignItems='center' >
                <p style={{ color: 'white', fontSize: '16px', fontWeight: '300' }}>Earn Now</p>
              </Stack>
            </motion.div>
          </Stack>

        </div>

        <motion.p whileTap={{ color: 'grey', scale: 1.05 }} style={{ color: 'white', fontSize: '21px', fontWeight: '700' }}>{t('OurCertificates')}</motion.p>
        <Stack spacing={2} style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center', aligItems: 'center' }}>
          <Image src={Cert1} width={254} height={230} alt="cert1" style={{ margin: '10px' }} />
          <Image src={Cert2} width={254} height={230} alt="cert2" style={{ margin: '10px' }} />
          <Image src={Cert3} width={254} height={230} alt="cert3" style={{ margin: '10px' }} />
        </Stack>

        <Drawer
          anchor={'left'}
          open={parentopen}
          onClose={() => { setParentOpen(false) }}
          style={{ backgroundColor: 'transparent' }}
        >
          <Stack style={{ background: '#981FC0', width: '70%', height: '100%', padding: '8px', position: 'fixed' }} direction='column' alignItems='start' justifyContent='left' spacing={3}>
            <motion.p className='drawopstop'>Eplsports        </motion.p>

            <Link href='/login'> <motion.p whileTap={{ color: 'grey', scale: 1.05 }} className='drawops'>LOGIN
            </motion.p></Link>
            <Link href='/register?refer=0'> <motion.p whileTap={{ color: 'grey', scale: 1.05 }} className='drawops'>SIGN UP            </motion.p></Link>
            <Link href='/'> <motion.p whileTap={{ color: 'grey', scale: 1.05 }} className='drawops'>CONTACT US         </motion.p></Link>
            <Link href='/'> <motion.p whileTap={{ color: 'grey', scale: 1.05 }} className='drawops'>JOIN TELEGRAM GROUP</motion.p></Link>
          </Stack>
        </Drawer>
      </Stack>
      <Footer />
    </Stack>
  )
}
