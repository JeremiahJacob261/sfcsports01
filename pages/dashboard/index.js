import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Stack } from '@mui/material';
import { adapter, tronWeb } from '@/crypto/adaptedwc'
import { Icon } from '@iconify/react';
import { supabase } from '../api/supabase';
import { useRouter } from 'next/router';
import Logo from "@/public/logo.png";
import Head from 'next/head';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ball from '@/public/ball.png';
import Image from 'next/image'
import cara01 from '@/public/cara01.jpg';
import cara02 from '@/public/cara02.jpg';
import cara03 from '@/public/cara03.jpg';
import cara04 from '@/public/cara04.jpg';
import { motion } from 'framer-motion';
import Avatar from '@/public/avatar.png'
import HomeBottom from '../UIComponents/bottomNav';
import Link from 'next/link';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Translate from '@/pages/translator';
export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'all',
        ])),
        // Will be passed to the page component as props
      },
    }
  }
export default function Home(props) {
  const { t } = useTranslation('all')
  const [addresst, setAddress] = useState('');
  const [gcount, setGCount] = useState(0);
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
  const testRoute = async () => {
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
      if (signedIn) {
        setAuthed(true)
        const getUser = async () => {
          try {
            let test = await fetch('/api/match', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({  })
            }).then(data => {
              return data.json();
              })
            setFootDat(test.data);
          } catch (error) {
            console.log(error)
          }

        }
        getUser();
        const getData = async () => {
          try {
            const { data, error } = await supabase
              .from('users')
              .select()
              .eq('username', localStorage.getItem('signNames'))
            setUser(data[0])
            setGCount(data[0].gcount ?? 0);
          } catch (e) {
            console.log(e)
          }

        }
        getData();
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
      0: 2,
      1: 1,
      2: 0
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
          <p style={{ color: 'whitesmoke' }}>{t("GamesPlayableToday")} </p>
          <p style={{ color: 'greenyellow' }}>{playable[gcount ?? 0]}</p>
        </Stack>
        <div className="countdown-container">
          <span id="hours">{hours} : </span>
          <span id="minutes">{minutes} : </span>
          <span id="seconds"> {seconds}</span>
          <p style={{ fontSize: '12px', fontWeight: '200', color: 'rgba(245,186,79,1)' }}>{t("TimebeforeGamesPlayableResets")}</p>
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
              <p className='ungradtext' style={{ fontSize: '15px', fontWeight: '600' }}>{t("GoodMorning")}</p>
              <p className='gradtest' style={{ fontSize: '15px', fontWeight: '600' }}>{user ? user.username : 'Loading name ...'}</p>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
          
        <Translate />
          <Link href="https://t.me/sfc_customerservice">
            <motion.div whileHover={{ color: '#C61F41' }}>
              <Icon icon="fluent:chat-24-regular" width={24} height={24} className='iconbtn' style={{ color: 'white' }} 
              />
            </motion.div>
          </Link>

            <motion.div whileHover={{ color: '#C61F41' }} onClick={testRoute}>
              <Icon icon="ri:notification-4-fill" width={24} height={24} className='iconbtn' style={{ color: 'white' }} onClick={()=>{
                router.push(`/dashboard/history?id=${user.username}`)
              }}/>
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
              <p className='ungradtext' style={{ fontSize: '15px', fontWeight: '600' }}>{t("GoodMorning")}</p>
              <p className='gradtest' style={{ fontSize: '15px', fontWeight: '600' }}></p>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'
          >
          <Translate />
            <motion.div whileHover={{ color: '#C61F41' }} onClick={() => {
              router.push('/dashboard/history')
            }} >
              <Icon icon="ri:notification-4-fill" width={24} height={24} className='iconbtn' style={{ color: 'white' }} />
            </motion.div>
          </Stack>
        </Stack>
      );
    }
  }
  function MatchRow() {
    if (footDat && footDat.length > 0) {
      return (
        <Stack direction='column' spacing={1} alignItems='center' style={{ padding: '4px', marginBottom: '100px', width: '100vw' }}>
          {/* container for all matches i sabove */}
          {
            footDat.map((data) => {
              //match countdown
              const defTime = () => {
                let dateString = data.date;
                let timeString = data.time;
                let dateParts = dateString.split("-");
                let timeParts = timeString.split(":");
            
                // Create a new Date object
                let date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);
                // Get the timestamp
                let timestamp = date.getTime();
                return timestamp;
              }
function MatchCountDown() {
  function calculateTimeLeft() {
    let difference = +new Date( defTime()) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
   }
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  let hourz = (parseFloat(timeLeft.days) > 0 ) ? parseFloat(timeLeft.hours) + parseFloat(timeLeft.days * 24) : timeLeft.hours;
  return (
    <div>
      <div className="match-countdown-container">
        <span id="hours">{ hourz  + ":" + timeLeft.minutes + ":" + timeLeft.seconds}</span>
      </div>
    </div>
  )
}
//end of match countdown
              return (
                <Link href={'/dashboard/matchs/' + data.match_id + '?name=' + localStorage.getItem('signUids')} key={data.match_id}>
                  <Stack direction="column" sx={{ minWidth: '96vw', maxWidth: '310px',border:data.company ? '1px solid #EA2B1F' : '1px solid rgb(102, 27, 27)', boxShadow:data.company ? '0 0 5px 2px #A23E48' : '0' }} className='rowsofdata' justifyContent='center' spacing={1}
                    onClick={() => {

                    }}>
                     <Stack direction="row" style={{ color: 'grey' }}>{data.time} {data.date} ID {data.match_id} {data.league} 
                    <MatchCountDown/>
                    </Stack>
                    <Stack direction="row" alignItems='center'>
                      <Stack direction='column' sx={{ width: '50%' }} spacing={1}>
                        <Stack direction='row' spacing={1}><Image src={data.ihome ?? ball} alt='home' width={20} height={20} /><p style={{ color: 'white' }} >{data.home}</p></Stack>
                        <Stack direction='row' spacing={1}><Image src={data.iaway ?? ball} alt="away" width={20} height={20} /><p style={{ color: 'white' }}>{data.away}</p></Stack>
                      </Stack>

                      <Stack direction="row" sx={{ width: '50%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
                        <div className='odds-fix' onClick={() => {

                        }}>
                        <p style={{ color: 'white', height: '7px', margin: 0, padding: 0 }}>.</p>
                          <p style={{ color: '#e4264c', fontSize: '14px' }}>{data.onenil}</p>
                        </div>
                        <div className='odds-fix' onClick={() => {

                        }}>
                        <p style={{ color: 'white', height: '7px', margin: 0, padding: 0 }}>.</p>
                          <p style={{ color: '#e4264c', fontSize: '14px' }}>{data.nilnil}</p>
                        </div>
                        <div className='odds-fix' onClick={() => {

                        }}>
                        <p style={{ color: 'white', height: '7px', margin: 0, padding: 0 }}>.</p>
                          <p style={{ color: '#e4264c', fontSize: '14px' }}>{data.nilone}</p>
                        </div>
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
      return (
        <Stack justifyContent='center' alignItems='center' sx={{ width: '100vw', minHeight: '85vh' }}>
          <p style={{ fontSize: '20px' }}>{t("NoDataAvaliable")}</p>
          <p style={{ color: 'grey' }}>{t("PleaseCheckyourinternetconnection")}</p>
        </Stack>)
    }
  }

  return (
    <Stack direction='column' alignItems='center' sx={{ minHeight: '98vh' }} className='backgrounds' spacing={1}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Stack sx={{ height: '50px', width: '100%' }}>
        <NavbAR />
      </Stack>
      <marquee><p style={{color:'whitesmoke'}}>{t("WelcometoSFSPORTSO1")}</p></marquee>
      <div style={{ width: '300px', height: 'auto', background: 'rgba(27,3,0,1)', padding: '2px' }}>
        <Carousel interval={1500} autoPlay={true} >
          <div >
            <Image src={cara02} width={144} height={137} alt='invitation bonus' sx={{ borderRadius: '15px' }} />

          </div>
          <div>
            <Image src={cara03} width={344} height={137} alt='invitation bonus' sx={{ borderRadius: '15px' }} />

          </div>
          <div>
            <Image src={cara04} width={344} height={137} alt='invitation bonus' sx={{ borderRadius: '15px' }} />

          </div>
          <div>
            <Image src={cara01} width={344} height={137} alt='invitation bonus' sx={{ borderRadius: '15px' }} />

          </div>
        </Carousel>
      </div>
      <CountDown />
      <Stack direction='row' justifyContent='center' spacing={1} sx={{ padding: '8px', width: '100%' }}>
        {/* fans favourite */}
        <Stack direction='column' alignItems='center' spacing={1} sx={{ background: 'rgb(27,3,0)', width: '30%' }}>
          <Box sx={{ width: '100%', height: '5px', backgroundColor: '#C61F41' }}>
          </Box>
          <p style={{ textAlign: 'center', fontSize: '13px' }}>{t("PeopleFavourites")}</p>
        </Stack>

        {/* today games */}
        <Stack sx={{ background: 'rgb(27,3,0)', width: '30%' }} alignItems='center' spacing={1}>
          <Box sx={{ height: '5px', width: '100%', backgroundColor: 'green' }}>
          </Box>
          <p style={{ textAlign: 'center', fontSize: '13px' }}>{t("TodayMatches")}</p>
        </Stack>

        {/* tomorrow games */}
        <Stack sx={{ background: 'rgb(27,3,0)', width: '30%' }} alignItems='center' spacing={1}>
          <Box sx={{ height: '5px', width: '100%', backgroundColor: 'rgba(194,127,8,1)' }}>
          </Box>
          <p style={{ textAlign: 'center', fontSize: '13px' }}>{t("TomorrowMatches")}</p>
        </Stack>

      </Stack>
      <MatchRow />
      <HomeBottom />
    </Stack>
  )
}