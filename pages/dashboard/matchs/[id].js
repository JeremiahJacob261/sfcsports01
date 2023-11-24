import { Router, useRouter } from 'next/router';
import { supabase } from '@/pages/api/supabase';
import { Icon } from '@iconify/react';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Drawer, TextField } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import ball from '@/public/ball.png';
import Image from 'next/image'
import React from 'react';
export default function Matchs({ matchDat }) {
  const router = useRouter();
  const [matches, setMatches] = useState(matchDat[0]);
  const [user, setUser] = useState({});
  console.log(matches)
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
    if(user.gcount > 2){
      alert('You have exceeded the number of games you can play today')
      return;
    }else{
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
            const { error : err } = await supabase
            .from('users')
            .update({
              'gcount':user.gcount+1,
            })
            .eq('username',user.username)
            const { error : arr } = await supabase
            .from('activa')
            .insert({
              'code':'bet-placed',
              'username':user.username,
              'amount':Number(stake),
              'type':'bet'
            })
            .eq('username',user.username)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  function Placer({ txt, data, pick }) {
    const [amountInput, setAmountInput] = useState('');
    console.log(matches.onenil)
    console.log(pick)
    let profit = (parseFloat(parseFloat(amountInput).toFixed(3)) * parseFloat((parseFloat(txt) / 100).toFixed(3))).toFixed(3);
    let total = parseFloat((parseFloat(profit) + parseFloat((parseFloat(amountInput)).toFixed(3))).toFixed(3))
    console.log((parseFloat(parseFloat(amountInput).toFixed(3))) + parseFloat((parseFloat(txt) / 100).toFixed(3)))
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
        <div className='odds' onClick={() => {
          setParentOpen(true)
        }}>
          <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
             <p style={{ color: 'black' }}>{markets[pick]}</p>
          <p style={{ color: '#e4264c' }}>{txt}</p>
          </Stack>
         
        </div>

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
                  <p>Profit: {profit}</p>
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
  function OddArrange() {
    return (
      <Stack direction='column' spacing={3} alignItems='center'>

        <Stack direction="column" className='homecol' spacing={2} justifyContent='center' alignItems='center'>
          <p>Home</p>
          <Stack direction="row" sx={{ width: '100%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
            <Placer txt={matches.onenil} data={matches} pick='onenil' />
            <Placer txt={matches.twonil} data={matches} pick={'twonil'} />
            <Placer txt={matches.threenil} data={matches} pick={'threenil'} />
          </Stack>
          <Stack direction="row" sx={{ width: '100%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
            <Placer txt={matches.twoone} data={matches} pick={'twoone'} />
            <Placer txt={matches.threeone} data={matches} pick={'threeone'} />
            <Placer txt={matches.threetwo} data={matches} pick={'threetwo'} />
          </Stack>
        </Stack>

        <Stack direction="column" className='awaycol' spacing={2} justifyContent='center' alignItems='center'>
          <p>Away</p>
          <Stack direction="row" sx={{ width: '100%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
            <Placer txt={matches.nilone} data={matches} pick={'nilone'} />
            <Placer txt={matches.niltwo} data={matches} pick={'niltwo'} />
            <Placer txt={matches.nilthree} data={matches} pick={'nilthree'} />
          </Stack>

          <Stack direction="row" sx={{ width: '100%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
            <Placer txt={matches.onetwo} data={matches} pick={'onetwo'} />
            <Placer txt={matches.onethree} data={matches} pick={'onethree'} />
            <Placer txt={matches.twothree} data={matches} pick={'twothree'} />
          </Stack>
        </Stack>

        <Stack direction="column" className='drawcol' spacing={2} justifyContent='center' alignItems='center'>
          <p>Draw and Others</p>
          <Stack direction="row" sx={{ width: '100%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
            <Placer txt={matches.oneone} data={matches} pick={'oneone'} />
            <Placer txt={matches.twotwo} data={matches} pick={'twotwo'} />
            <Placer txt={matches.threethree} data={matches} pick={'threethree'} />
          </Stack>
          <Stack direction="row" sx={{ width: '100%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
            <Placer txt={matches.otherscores} data={matches} pick={'otherscores'} />
          </Stack>
        </Stack>
      </Stack>

    )
  }

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

  return (
    <div className="backgrounds" style={{ minHeight:'97vh'}}>
      <Stack>
        <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
          <Icon icon="basil:cancel-outline" width={24} height={24} onClick={() => { router.push('/dashboard/event')}} />
          <p style={{ color:'wheat',fontSize:'24px',fontWeight:'bold',textAlign:'center',width:'100%' }}>{matches.league}</p>
        </Stack>
        <CountDown/>
        <Stack direction="column" sx={{ width: '100%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
          <Stack direction="row" sx={{ width: '50%', height: '100%',padding:'8px' }} spacing={2} alignItems='center' justifyContent='space-between'>
            <Stack direction="row" spacing={2} justifyContent='center' alignItems='center'>
              <Image src={matches.ihome ?? ball} style={{ color:'whitesmoke'}} alt='home image' width={35} height={35}/>
            <p>{matches.home}</p>
            </Stack>
            <p>VS</p>
            <Stack direction="row" spacing={2} justifyContent='center' alignItems='center'>
              <Image src={matches.iaway ?? ball} style={{ color:'whitesmoke'}} alt='away image' width={35} height={35}/>
            <p>{matches.away}</p>
            </Stack>
          </Stack>
          <OddArrange />
        </Stack>
      </Stack>
    </div>
  )
}
export async function getStaticPaths() {
  const { data, error } = await supabase
    .from('bets')
    .select()
  const paths = data.map((ref) => ({
    params: { id: ref.match_id },
  }))



  return { paths, fallback: true }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const { data, error } = await supabase
    .from('bets')
    .select()
    .eq('match_id', params.id)
  let matchDat = data;

  // Pass post data to the page via props
  return { props: { matchDat } }
}