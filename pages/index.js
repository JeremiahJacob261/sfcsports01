import React, { useState } from 'react'
import Image from 'next/image'
import Logo from "@/public/logo.png";
import { Divider, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Drawer } from '@mui/material';
import { motion } from 'framer-motion'
import Back from '@/public/back.jpg';
import Head from 'next/head';
import Translate from '@/pages/translator';
import { useTranslation } from 'next-i18next'
import { adapter, tronWeb } from '@/crypto/adaptedwc'
import { useEffect } from 'react';
import { supabase } from './api/supabase';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common', 'all'
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
    <Stack style={{ width: '100vw', height: '100vh', background: '#981FC0', opacity: 0.9, padding: 0 }} >
      {/* <div style={{ width: '100%', height: '100vh', position: 'fixed', zIndex: -1, opacity: 0.9,background:'black' }}>
          <Image src={Back}
          alt="background"
            layout='fill'
            objectFit='contain'
          />
        </div> */}
      <Head>
        <title>Eplsports</title>
        <meta name="description" content="Get Started With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Stack className="page" spacing={2}>
        <div className='logo'>
          <Image src={Logo} alt="logo" width={100} height={100} />
        </div>
        <p className='title'>EplSports</p>
        <p className='para'>Welcome To EplSports, Get Started With us to get the latest betting market and fantantic Bonus</p>
        <motion.div className='btn'
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.7 }} initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }}>
          <Icon icon="ic:twotone-play-arrow" width="24" height="24" style={{ color: "#981FC0" }} />
        </motion.div>
      </Stack>
      <Divider sx={{ background:"white"}}/>
      <p className='privacy'>Privacy Policy  &  Terms And Conditions</p>
    </Stack>
  )
}
