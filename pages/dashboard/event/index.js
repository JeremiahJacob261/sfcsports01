import React from 'react'
import { Icon } from '@iconify/react';
import { Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
 
import HomeBottom from '../../UIComponents/bottomNav';
import Link from 'next/link'
import { useRef } from 'react'
import { motion } from 'framer-motion';
import ball from '../../../public/ball.png'
import Image from 'next/image'
import { supabase } from '../../api/supabase';
import { useEffect } from 'react';
import { Button, Drawer } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
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
export default function Event() {
  const { t } = useTranslation('all')
  const [selected, setSelected] = React.useState(null);
  const router = useRouter();
  const [user, setUser] = useState({});
  const [parentopen, setParentOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('signedIns')) {
      router.push('/login')
    }
    const getRef = async () => {
      try {
        const { data: refer, error: errref } = await supabase
          .from('users')
          .select('*')
          .eq('username', localStorage.getItem('signNames'))
        setUser(refer[0]);
      } catch (e) {
        console.log(e)
      }
    }
    getRef();
  }, [])
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const markets = {
    "nilnil": "0 - 0",
    "onenil": "1 - 0",
    "nilone": "0 - 1",
    "oneone": "1 - 1",
    "twonil": "2 - 0",
    "niltwo": "0 - 2",
    "twoone": "2 - 1",
    "onetwo": "1 - 2",
    "twotwo": "2 - 2",
    "threenil": "3 - 0",
    "nilthree": "0 - 3",
    "threeone": "3 - 1",
    "onethree": "1 - 3",
    "twothree": "2 - 3",
    "threetwo": "3 - 2",
    "threethree": "3 - 3",
    "otherscores": "Other"
  }
  const placebet = async (matches, stake, profit, username, market, odd) => {
    if (stake < 1) {
      alert('Minimum stake is 1 USDT')
      return;
    } else if (stake > user.balance) {
      alert('Insufficient Balance')
      return;

    } else {
      try {
        const { error } = await supabase
          .from('placed')
          .upsert({
            'match_id': matches.match_id,
            'market': market,
            'username': username,
            'started': false,
            'stake': Number(stake),
            'profit': Number(((odd * stake) / 100)).toFixed(2),
            'aim': profit,
            "home": matches.home,
            "away": matches.away,
            "time": matches.time,
            "date": matches.date,
            "odd": odd,
            "ihome": matches.ihome,
            "iaway": matches.iaway
          })

      } catch (e) {
        console.log(e)
      }
    }
  }

  function Placer({ txt, data, pick }) {
    const [amountInput, setAmountInput] = useState('');
    let profit = (parseFloat(parseFloat(amountInput).toFixed(3)) * parseFloat((parseFloat(txt) / 100).toFixed(3))).toFixed(3);
    let total = parseFloat((parseFloat(profit) + parseFloat((parseFloat(amountInput)).toFixed(3))).toFixed(3))
    const click = (number) => {
      if (number === 'X') {
        const newVal = amountInput.substring(0, amountInput.length - 1);
        console.log(newVal)
        setAmountInput(newVal);
      } else {
        if (number === '.') {
          if (amountInput.includes('.')) {
            return;
          } else {
            if (amountInput === '') {
              setAmountInput(amountInput + '0' + number);
            } else {
              setAmountInput(amountInput + number);
            }

          }
        } else {

          setAmountInput(amountInput + number);
        }
      }
    }

    return (
      <React.Fragment key={'bottom'} >
        <Stack direction='column' sx={{ padding: 0 }} justifyContent='center' alignItems="center" className='odds-fix' onClick={() => {
          setParentOpen(true)
        }}>
          <p style={{ color: 'white', height: '7px', margin: 0, padding: 0 }}>.</p>
          <p style={{ color: '#e4264c', verticalAlign: 'center', fontSize: '12px', margin: 0, padding: 0 }}>{txt}</p>
        </Stack>

        <Drawer
          anchor={'bottom'}
          open={parentopen}
          onClose={() => { setParentOpen(false) }}
          style={{ backgroundColor: 'transparent' }}
        >
          <div
            className="placerstyles"
          >
            <Stack spacing={2} alignItems='center'>
              <p style={{ width: '100vw', color: 'whitesmoke', textAlign: 'center', color: 'rgba(245,186,79,1)', fontSize: '600' }} className='p-1'>{data.league}</p>
              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <p>{data.home}</p>
                <p>VS</p>
                <p>{data.away}</p>
              </Stack>

              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <p>{markets[pick]}</p> <p>{data[pick]}</p>
              </Stack>

              <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ width: '100%' }}>
                <Stack direction="column" spacing={2}>
                  {/* calculator sizes stack */}
                  <Stack direction="row" spacing={1}>
                    <motion.p onClick={() => click('0')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">0</motion.p>
                    <motion.p onClick={() => click('1')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">1</motion.p>
                    <motion.p onClick={() => click('2')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">2</motion.p>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <motion.p onClick={() => click('3')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">3</motion.p>
                    <motion.p onClick={() => click('4')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">4</motion.p>
                    <motion.p onClick={() => click('5')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">5</motion.p>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <motion.p onClick={() => click('6')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">6</motion.p>
                    <motion.p onClick={() => click('7')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">7</motion.p>
                    <motion.p onClick={() => click('8')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">8</motion.p>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <motion.p onClick={() => click('9')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">9</motion.p>
                    <motion.p onClick={() => click('.')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">.</motion.p>
                    <motion.p onClick={() => click('X')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">X</motion.p>
                  </Stack>
                </Stack>

                <Stack sx={{ width: '200px' }} spacing={2}>
                  <p>Stake: {amountInput}</p>
                  <p>Profit: {(profit == NaN) ? 0 : profit}</p>
                  <p>Total Winnings: {total}</p>
                  <p style={{ color: 'black', background: 'whitesmoke', padding: '12px', height: '50px', minWidth: '50px', borderRadius: '5px' }}>{amountInput}</p>
                </Stack>
              </Stack>

              <motion.p onClick={() => {
                //   router.push('/dashboard/fund/success')
                // (matches, stake, profit, username, market, odd)
                placebet(data, parseFloat(parseFloat(amountInput).toFixed(3)), parseFloat(profit), localStorage.getItem('signNames'), markets[pick], data[pick]);
              }}
                whileTap={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 0.9 }}
                whileHover={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 1.1 }}
                style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#C61F41', width: '90vw', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                Place Bet</motion.p>
            </Stack>

          </div>
        </Drawer>
      </React.Fragment>

    )
  }
  function MatchRow() {
  const [footDat, setFootDat] = useState([]);
 
useEffect(()=>{
  const getMatch = async () => { 
    try {
      // const { data, error } = await supabase
      //   .from('bets')
      //   .select('*')
      //   .eq('verified', false)
      //   .order('id', { ascending: false });
   let test = await fetch('/api/match', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(data => {
          return data.json();
          })
     setFootDat(test.data);
     
    } catch (e) {
      console.log(e);
      let err = [];
      setFootDat([]);
    }
  }
  getMatch();
},[footDat]);
    if (footDat && footDat.length > 0) {
  
      return (
        <Stack direction='column' spacing={1} alignItems='center' style={{ padding: '4px', marginBottom: '100px', width: '100vw' }}>
          {/* container for all matches i sabove */}
          {
            footDat.map((data) => {
                //match-countdown
  //match countdown
  const defTime = () => {
    let matches = data;
    let dateString = matches.date;
    let timeString = matches.time;
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
    let min = timeLeft.minutes ?? 0;
    let sec = timeLeft.seconds ?? 0;
    console.log(hourz + min + sec)
    return (
      <div>
        <Stack className="match-countdown-container" direction='row'>
          <span id="hours">{(hourz + min + sec > 0) ? hourz + " : " + min + " : " + sec : "Match Has Started"}</span>
        </Stack>
      </div>
    )
  }
  //end of match countdown

              return (
                <Link href={'/dashboard/matchs/' + data.match_id} key={data.match_id}>
                  <Stack direction="column" sx={{ minWidth: '96vw', maxWidth: '310px', border: data.company ? '1px solid #EA2B1F' : '1px solid rgb(102, 27, 27)', boxShadow: data.company ? '0 0 5px 2px #A23E48' : '0' }} className='rowsofdata' justifyContent='center' spacing={1}
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
                        <Placer txt={data.onenil} data={data} pick={'onenil'} />
                        <Placer txt={data.nilnil} data={data} pick={'nilnil'} />
                        <Placer txt={data.nilone} data={data} pick={'nilone'} />
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
          <p style={{ color: 'whitesmoke' }}>{t("GamesPlayableToday")}</p>
          <p style={{ color: 'greenyellow' }}>{playable[user.gcount ?? 0]}</p>
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
  return (
    <div className='backgrounds'>
      <Stack alignItems='center'>

        <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
          <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
            router.push('/dashboard')
          }} />
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#C61F41' }}>{t("Events")}</p>
        </Stack>
        <CountDown />
        <MatchRow />
        <HomeBottom />
      </Stack>
    </div>

  )
}
// export async function getServerSideProps(context) {
 
// }