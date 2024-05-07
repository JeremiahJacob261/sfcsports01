import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Stack } from '@mui/material';
import OneSignal from 'react-onesignal';
import { Icon } from '@iconify/react';
import { supabase } from '../api/supabase';
import { useRouter } from 'next/router';
import Logo from "@/public/logo.png";
import TranslateX from '../translatex';
import Head from 'next/head';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Cn from '@/public/slider/cn.jpg';
import Cn1 from '@/public/slider/cn1.jpg';
import Cn2 from '@/public/slider/cn2.jpg';
import Cn3 from '@/public/slider/cn3.jpg';
import Cn4 from '@/public/slider/cn4.jpg';
import Cn5 from '@/public/slider/cn5.jpg';
import ball from '@/public/ball.png';
import Image from 'next/image'
import InputAdornment from '@mui/material/InputAdornment';
import { motion } from 'framer-motion';
import Avatar from '@/public/avatar.png'
import HomeBottom from '../UIComponents/bottomNav';
import Link from 'next/link';
import { Divider, Modal } from '@mui/material';
export async function getServerSideProps(context) {
 
    try {
      let test = await fetch('https://app.epl-sports.com/api/match', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(data => {
        return data.json();
      })
      let bts = test.data.filter(i => i.verified == false );
      return {
        props: {
        foot:bts
          // Will be passed to the page component as props
        },
      }
    } catch (e) {
      console.log(e);
      let err = [];
      return {
        props: {
          foot:[]
          // Will be passed to the page component as props
        },
      }
    }
 
}

export default function Home({foot}) {
  const [addresst, setAddress] = useState('');
  const [gcount, setGCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [reciept, setReciept] = useState('');
  const [balance, setBalance] = useState(0);
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  console.log(foot)

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
  async function runOneSignal() {
    await OneSignal.init({ appId: '1fc58f49-adf9-4461-a23d-56ea6586c275', allowLocalhostAsSecureOrigin: true });
    OneSignal.Slidedown.promptPush();
  }
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    runOneSignal();
    try {
      if (localStorage.getItem('pin?') === 'true') {
        //show set pin dialog
        setOpen(true)
      } else {
        //dont show pin dialog
      }
    } catch (e) {
      console.log(e)
    }
    const checkAuth = async () => {
      const signedIn = localStorage.getItem('signedIns');
      const uid = localStorage.getItem('signUids');
      if (signedIn) {
        setAuthed(true)
        // const getUser = async () => {
        //   try {
        //     let test = await fetch('/api/match', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json'
        //       },
        //       body: JSON.stringify({})
        //     }).then(data => {
        //       return data.json();
        //     })
        //     console.log(test)
        //     setFootDat(test.data);
        //   } catch (error) {
        //     console.log(error)
        //   }

        // }
        // getUser();
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
        <Stack direction="row" justifyContent='center' spacing={2} sx={{ background: 'grey', padding: '4px', width: '100%', textAlign: 'center' }}>
          <p style={{ color: 'whitesmoke' }}>Games Playable Today </p>
          <p style={{ color: 'greenyellow' }}>{playable[gcount ?? 0]}</p>
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

  function MatchRow() {
    if (footDat && footDat.length > 0) {
      return (
        <Stack direction='column' spacing={1} alignItems='center' style={{ padding: '4px', marginBottom: '100px', width: '100%' }}>
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
                  let difference = +new Date(defTime()) - +new Date();
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
                let hourz = (parseFloat(timeLeft.days) > 0) ? parseFloat(timeLeft.hours) + parseFloat(timeLeft.days * 24) : timeLeft.hours;
                return (
                  <div>
                    <div className="match-countdown-container">
                      <span id="hours">{hourz + ":" + timeLeft.minutes + ":" + timeLeft.seconds}</span>
                    </div>
                  </div>
                )
              }
              //end of match countdown
              return (
                <Link href={'/dashboard/matchs/' + data.match_id + '?name=' + localStorage.getItem('signUids')} key={data.match_id} style={{ padding: '8px' }}>
                  <Stack direction="column" sx={{ minWidth: '96%', maxWidth: '310px', border: data.company ? '1px solid #EA2B1F' : '1px solid rgb(102, 27, 27)', boxShadow: data.company ? '0 0 5px 2px #A23E48' : '0' }} className='rowsofdata' justifyContent='center' spacing={1}
                    onClick={() => {

                    }}>
                    <Stack direction="row" style={{ color: 'grey' }}>{data.time} {data.date} ID {data.match_id} {data.league}
                      <MatchCountDown />
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
        <Stack justifyContent='center' alignItems='center' sx={{ width: '100%', minHeight: '85vh' }}>
          <p style={{ fontSize: '20px' }}>No Data Avaliable</p>
          <p style={{ color: 'grey' }}>Please Check your internet connection</p>
        </Stack>)
    }
  }
  function Header() {
    return (
      <div className='headies'>
        <Stack direction='column' sx={{ flex: 1 }}>
          <p className='title1'>Hello</p>
          <p className='title2'>{user ? user.username : ""}</p>
        </Stack>
        <TranslateX />
        <motion.div className="icon-con" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }} onClick={() => {
          router.push(`/dashboard/history?id=${user.userId ?? ""}`);
        }}>
          <Icon icon="tdesign:notification-filled" width="24" height="24" style={{ color: "#981FC0" }} />
        </motion.div>
      </div>
    )
  }
  function ShortCuts() {
    return (
      <Stack direction="column">
        <Link href="https://t.me/EPLFOOTBALLOFFICIAL" ><motion.p whileHover={{ y: -10 }} whileTap={{ scale: 0.7 }} className='shorts' style={{ width:'100%'}}>EplSports Group</motion.p></Link>
         
        <Stack direction='row' justifyContent='space-between' spacing={1} sx={{ width: '100%', padding: '4px', overflow: 'auto' }}>
          <Link href="/dashboard/fund" ><motion.p whileHover={{ y: -10 }} whileTap={{ scale: 0.7 }} className='shorts'>DEPOSIT</motion.p></Link>
          <Link href="/dashboard/withdraw" >             <motion.p whileHover={{ y: -10 }} whileTap={{ scale: 0.7 }} className='shorts'>WITHDRAW</motion.p></Link>
          <Link href="/dashboard/bets" ><motion.p whileHover={{ y: -10 }} whileTap={{ scale: 0.7 }} className='shorts'>BETS</motion.p></Link>
          <Link href="https://t.me/EPL_Customerservice" >             <motion.p whileHover={{ y: -10 }} whileTap={{ scale: 0.7 }} className='shorts'>SUPPORT</motion.p></Link>
        </Stack>
      </Stack>
    )
  }
  function SearchBar() {
    const [search, setSearch] = useState('');
    const [filterSearch ,setFilterSearch ] = useState([])
    
    const searcher = (e) => {
      //this runs on every key stroke
      console.log("typed")
      setSearch(e.target.value);
      setFilterSearch(foot.filter(i => i.home.toLowerCase().includes(e.target.value.toLowerCase()) || i.away.toLowerCase().includes(e.target.value.toLowerCase()) || i.match_id.toLowerCase().includes(e.target.value.toLowerCase())));
    console.log(foot.filter(i => i.home.toLowerCase().includes(e.target.value.toLowerCase()) || i.away.toLowerCase().includes(e.target.value.toLowerCase()) || i.match_id.toLowerCase().includes(e.target.value.toLowerCase())))
    }
    return (
      <Stack direction='column' sx={{ height: "auto",minHeight:'70px', width: '100%', padding: '8px', alignItems: 'center' }}>
        <TextField
          id="input-with-icon-textfield"
          label="Search by name or ID"
          value={search}
          onChange={(e) => {
            searcher(e);

          }}
          sx={{
            width: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: '8px',
            "& .MuiOutlinedInput-root": {
              "& > fieldset": {
                border: "none" // This removes the border
              },
              "& .MuiInputBase-input": {
                color: "white" // This changes the text color to white
              }
            }

          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="iconamoon:search-duotone" width="24" height="24" style={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          InputLabelProps={{
            style: { color: '#D8BFD8' } // Light purple color
          }}
        />
          <Stack sx={{ position:'relative',background:'#3F1052',color:'#981FC0',maxWidth:'99%'}}>
            {
              filterSearch.map((data) => { 
                return ( 
                  <Link href={'/dashboard/matchs/' + data.match_id + '?name=' + localStorage.getItem('signUids')} key={data.match_id} style={{ padding: '8px' }}>
                        <Stack direction={"row"}>
                          <p style={{ color:'whitesmoke'}}>{data.home} vs {data.away}</p>
                        </Stack>
                        <p style={{ color:'#981FC0'}}>{data.match_id}</p>
                    </Link>
                )
              })
            }
          </Stack>
      </Stack>
    )
  }

  function Live() {
    const [liver, setLiver] = useState([]);
    useEffect(() => {
      const fetchLives = async () => {
        const { data, error } = await supabase
          .from('bets')
          .select('*')
          .eq('live', true)
        setLiver(data);
      }
      fetchLives()
    }, [liver])
    if (liver && liver.length > 0) {
      return (
        <Stack className='live' sx={{ maxWidth: '350px' }}>
          <div className='live-title-contain'>
            <p className='live-title1'>*</p>
            <p className='live-title'>Live</p>
          </div>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} style={{ width: 'auto', padding: '4px', margin: 0 }}>
            {
              liver.map((i) => {
                return (
                  <div className='live-containx' key={i.ihome} style={{ width: 'auto', height: '210px', padding: 4, margin: 0, flexDirection: 'column' }}>
                    <p className='mleague' style={{ padding: '8px' }}>{i.league}</p>
                    <div className='live-containx' style={{}}>
                      <div className='live1'>
                        <Image src={i.ihome} width={40} height={40} alt="home_logo" />
                        <p className='mtxt'>{i.home}</p>
                      </div>
                      <div className='live2'>
                        <p className='mnot' style={{ color: 'whitesmoke' }}>{i.match_id}</p>
                        <p className='mscore'>{i.mcore}</p>
                        <p className='mtime' style={{ color: '#00ff2a' }}>{i.mive} mins</p>
                      </div>
                      <div className='live1'>
                        <Image src={i.iaway} width={40} height={40} alt="home_logo" />
                        <p className='mtxt'>{i.away}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </Stack>

        </Stack>
      )
    } else {
      return;
    }
  }

  function Matchx() {
    return (
      <div className='live-containx' style={{ width: 'auto', padding: 4, margin: 0, flexDirection: 'column' }}>
        <div className='live-containx' style={{}}>
          <div className='live1'>
            <Image src="https://media.api-sports.io/football/teams/7879.png" width={40} height={40} alt="home_logo" />
            <p className='mtxt'>Princesa Solimões</p>
          </div>
          <div className='live2'>
            <p className='mleague'>Premier league</p>
            <p className='mscore'>10 : 20</p>
            <p className='mtime'>TODAY</p>
          </div>
          <div className='live1'>
            <Image src="https://media.api-sports.io/football/teams/7879.png" width={40} height={40} alt="home_logo" />
            <p className='mtxt'>Princesa Solimões</p>
          </div>
        </div>
        <motion.div className="decision-x" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.8 }}>
          <p>Place Bet</p>
          <Icon icon="ic:round-arrow-right" width="24" height="24" style={{ color: 'white' }} />
        </motion.div>
      </div>
    )
  }
  function NextMatches() {
    const [footDat, setFootDat] = useState([]);
    useEffect(() => {
      const getMatch = async () => {
        try {
          let test = await fetch('/api/match', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(data => {
            return data.json();
          })
          let bts = test.data.filter(i => i.verified == false && (Date.parse(i.date + " " + i.time) / 1000) > (new Date().getTime() / 1000));

          setFootDat(bts);

        } catch (e) {
          console.log(e);
          let err = [];
          setFootDat([]);
        }
      }
      getMatch();
    }, [footDat])
    return (
      <Stack alignItems="center" direction="column-reverse" justifyContent="center" spacing={2} style={{ width: 'auto', marginLeft: '-30px' }}>
        <div style={{ height: '5px', width: '1px' }}></div>
        {
          footDat.map((data) => {
           const dayl = (Number(new Date().getDate() + 1) > 9) ? "-" + Number(new Date().getDate()+1) : "-0" + Number(new Date().getDate()+1) ;
           const dayn = (Number(new Date().getDate()) > 9) ? "-" + Number(new Date().getDate()) : "-0" + Number(new Date().getDate()) ;
 
            return (
              <Link href={'/dashboard/matchs/' + data.match_id + '?name=' + localStorage.getItem('signUids')} key={data.match_id} style={{ width: '310px' }}>

                <div className='live-containx' style={{ minWidth: '340px', width: 'auto', margin: 0, flexDirection: 'column', border: '0.5px solid #3F1052' }} >
                  <div className='live-containx' style={{ margin: 0 }}>
                    <div className='live1'>
                      <Image src={data.ihome ?? ball} width={40} height={40} alt="home_logo" />
                      <p className='mtxt'>{data.home}</p>
                    </div>
                    <div className='live2'>
                      <p className='mleague'>{data.league}</p>
                      <p className='mscore'>{data.time}</p>
                      <p className='mtime'>{(data.date === new Date().getFullYear() + "-0" + Number(new Date().getMonth()+1) +  dayn) ? 'TODAY' : (data.date === new Date().getFullYear() + "-0" + Number(new Date().getMonth()+1) + dayl ) ? 'Tomorrow' : data.date}</p>
                      <p className='mtime'>{data.match_id}</p>
                    </div>
                    <div className='live1'>
                      <Image src={data.iaway ?? ball} width={40} height={40} alt="home_logo" />
                      <p className='mtxt'>{data.away}</p>
                    </div>
                  </div>

                  <motion.div onClick={() => {
                    // router.push('/dashboard/match/')
                  }} className="decision-x" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.8 }}>
                    <p>Place Bet</p>
                    <Icon icon="ic:round-arrow-right" width="24" height="24" style={{ color: 'white' }} />
                  </motion.div>
                </div>
              </Link>

            )
          })
        }
      </Stack>
    )
  }

  function Analytics() {
    return (
      <div className='analytics-div'>
        <div className='analytic-section'>
          <p className='number'></p>
          <p style={{ color: '#00ff2a' }}> Online Users</p>
        </div>

        <div className='analytic-section'>
          <p className='numberx'></p>
          <p style={{ color: '#00ff2a' }}> Winners</p>
        </div>
      </div>
    )
  }

  function Alertz() {
    return (
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack alignItems='center' justifyContent='space-evenly' sx={{
          background: '#3D195B',
          border: "1px solid #981FC0",
          width: '290px', height: '300px', borderRadius: '20px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '12px'
        }}>
          <p id="modal-modal-title" style={{ fontSize: '20px', fontWeight: '500', color: 'white' }}>
            TRANSACTION PASSWORD
          </p>
          <p id="modal-modal-description" style={{ mt: 2, color: 'whitesmoke', fontSize: '16px', textAlign: 'center', fontWeight: '300' }}>
            SET YOUR TRANSACTION PASSWORD
          </p>

          <Divider sx={{ borderBottomWidth: '45px' }} />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }} className="classicbtn"
            onClick={() => {
              setOpen(false)
            }}
          >
            <p style={{ color: 'white', padding: '8px', width: '100%', textAlign: 'center', cursor: 'pointer' }}
              onClick={() => {
                if (aleT) {
                  setOpen(false)
                  router.push('/dashboard')
                } else {
                  setOpen(false)
                }
              }}>OKAY</p>
          </motion.div>
        </Stack>
      </Modal>
    )
  }
  return (
    <Stack direction='column' alignItems='center' sx={{ minHeight: '100vh', paddingBottom: '100px' }} className='backgrounds' spacing={1}>

      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <p className='short-title'>SHORTCUTS</p>
      <ShortCuts />
      <SearchBar />
      <div style={{ width: '300px', height: 'auto' }}>
        <Carousel interval={1500} autoPlay={true}>
          <Image src={Cn} alt="logo" width={330} height={212} />
          <Image src={Cn1} alt="logo" width={330} height={212} />
          <Image src={Cn2} alt="logo" width={330} height={212} />
          <Image src={Cn3} alt="logo" width={330} height={212} />
          <Image src={Cn4} alt="logo" width={330} height={212} />
          <Image src={Cn5} alt="logo" width={330} height={212} />
        </Carousel>
      </div>

      <Live />
      <Analytics />
      <p className='next-title'>Next Matches</p>
      <NextMatches />
      <HomeBottom />
    </Stack>
  )
}
