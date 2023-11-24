import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Stack } from '@mui/material';
import { adapter, tronWeb } from '@/crypto/adaptedwc'
import { Icon } from '@iconify/react';
import { supabase } from '../api/supabase';
import { useRouter } from 'next/router';
import Logo from "@/public/Sheffield_FC.svg.png";
import Head from 'next/head';
import Ball from '@/public/ball.png';
import Image from 'next/image'
import { motion } from 'framer-motion';
import Avatar from '@/public/avatar.png'
import HomeBottom from '../UIComponents/bottomNav';
import Link from 'next/link';
export default function Home() {
  const [addresst, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [reciept, setReciept] = useState('');
  const [balance, setBalance] = useState(0);
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const [footDat, setFootDat] = useState([]);
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
    const testRoute = async ()=>{
      // let test = await fetch('/api/test', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ name: usernam,type:'all' })
      //   }).then(data => {
      //     return data.json();
      //     })
      //     console.log(test)
    }
    
  useEffect(() => {
    const checkAuth = async () => {
      const signedIn = localStorage.getItem('signedIns');
      const uid = localStorage.getItem('signUids');
      setUser(localStorage.getItem('signNames'))
      if (signedIn) {
        setAuthed(true)
        const getUser = async () => {
          try {
            const { data, error } = await supabase
            .from('bets')
            .select()
            .limit(10)
            .order('id', { ascending: false });
            setFootDat(data);
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

  function CountDown() {
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')
    let playable = {
      0: 3,
      1: 2,
      2: 1,
      3: 0
    }
    function calculateTimeRemaining() {
      const currentDate = new Date();
      const targetDate = new Date();
      targetDate.setHours(23);
      targetDate.setMinutes(0);
      targetDate.setSeconds(0);
      targetDate.setMilliseconds(0);
      const timeRemaining = targetDate - currentDate;
      return timeRemaining;
    }
    useEffect(() => {
      const timer = setInterval(() => {
        try {
          const timeRemaining = calculateTimeRemaining();
          setHours(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24));
          setMinutes(Math.floor((timeRemaining / 1000 / 60) % 60));
          setSeconds(Math.floor((timeRemaining / 1000) % 60));

        } catch (e) {
          console.log(e)
        }


      }, 1000);

      return () => clearInterval(timer);
    }, []);

    return (
      <div>
        <Stack direction="row" justifyContent='center' spacing={2} sx={{ background: 'grey', padding: '4px', width: '100vw', textAlign: 'center' }}>
          <p style={{ color: 'whitesmoke' }}>Games Playable Today: </p>
          <p style={{ color: 'greenyellow' }}>{playable[user.gcount]}</p>
        </Stack>
        <div className="countdown-container">
          <span id="hours">{hours} : </span>
          <span id="minutes">{minutes} : </span>
          <span id="seconds"> {seconds}</span>
          <p style={{ fontSize: '12px', fontWeight: '200', color: 'rgba(245,186,79,1)' }}>Time before Games Playable Resets</p>
        </div>
      </div>
    )
  }

  function NavbAR() {
    if (authed) {
      return (
        <Stack style={{ width: '100%', height: '56px', padding: '8px', position: 'fixed' }} direction='row' alignItems='center' justifyContent='space-between' className='navBar'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <div style={{ borderRadius: '100px', background: '#D8B16B' }}>
              <Image src={Avatar} width={40} height={29} alt="sfclogo" />
            </div>
            <Stack>
              <p className='ungradtext' style={{ fontSize: '15px', fontWeight: '600' }}>Good Morning!</p>
              <p className='gradtest' style={{ fontSize: '15px', fontWeight: '600' }}>{user ? user : 'Loading name ...'}</p>
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
            <motion.div whileHover={{ color: '#C61F41' }} onClick={testRoute}>
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
    if (footDat && footDat.length > 0) {
      console.log(footDat)
      return(
        <Stack direction='column' spacing={1} alignItems='center' style={{ padding:'4px', marginBottom:'100px',width:'100vw'}}>
      {/* container for all matches i sabove */}
      {
        footDat.map((data)=>{ 
          return(
          <Link href={`/dashboard/matchs/${data.id}`} key={data.match_id}>
            <Stack direction="column" sx={{ minWidth:'87vw',maxWidth:'310px'}} className='rowsofdata' justifyContent='center' spacing={1}>
        <Stack direction="row" style={{ color:'grey'}}>{data.time} ID {data.match_id} {data.league}</Stack>
        <Stack direction="row" alignItems='center'> 
  
        <Stack direction='column' sx={{ width:'50%'}} spacing={1}>
          <Stack direction='row' spacing={1}><Image src={data.ihome ?? Ball} alt='home' width={20} height={20}/><p>{data.home}</p></Stack>
          <Stack direction='row' spacing={1}><Image src={data.iaway ?? Ball} alt="away" width={20} height={20}/><p>{data.away}</p></Stack>
        </Stack>
  
        <Stack direction="row" sx={{ width:'50%',height:'100%'}} spacing={2} alignItems='center' justifyContent='center'>
          <p className='odds'>{data.onenil}</p>
          <p className='odds'>{data.nilnil}</p>
          <p className='odds'>{data.nilone}</p>
        </Stack>
        </Stack>
        <Stack direction="row"></Stack>
          </Stack>
            </Link>
          )
         })
      }
       </Stack>
      )
    } else {
      return(
      <Stack justifyContent='center' alignItems='center' sx={{ width:'100vw',height:'55vh'}}>
        <p style={{ fontSize:'20px'}}>No Data Avaliable</p>
        <p style={{ color:'grey'}}>Please Check your internet connection</p>
      </Stack>)
    }
  }
  return (
    <Stack direction='column' alignItems='center' sx={{ minHeight: '98vh' }} className='backgrounds' spacing={1}>
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
      <CountDown/>
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