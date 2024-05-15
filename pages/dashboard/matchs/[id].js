import { Router, useRouter } from 'next/router';
import { supabase } from '@/pages/api/supabase';
import { Icon } from '@iconify/react';
import { Stack } from '@mui/material';
import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Drawer, TextField } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { Button } from '@mui/material';
import ball from '@/public/ball.png';
import Image from 'next/image'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
export default function Matchs({ matc, user, test }) {
  const [drop, setDrop] = useState(false);
  const router = useRouter();
  const [matches, setMatches] = useState(matc);//[router.query.id
  const [placee, setPlacee] = useState({});
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
        // const { data:match, error:errmatch } = await supabase
        // .from('bets')
        // .select('*')
        // .eq('match_id', router.query.id)
        // setMatches(match[0]);
      } catch (e) {
        console.log(e)
      }

    }
    // getRef();

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
    "otherscores": "Other",
    "hd": "Home or Draw",
    "ha": "Home or Away",
    "da": "Draw or Away"
  }
  const placebet = async (matches, stake, profit, username, market, odd) => {
    setDrop(true)
    console.log(stake)
    if (user.gcount > 2) {
      // || 
      if (user.username === "Godlike1" || user.username === "Godlike2" || user.username === "Gentleman" || user.username === "Gentleman1" || user.username === "Grace123") {
        if (!stake) {
          alert('Please Input a Number')
          setDrop(false)
          return;
        } else if (parseFloat(stake) < 1) {
          alert('Minimum stake is 1 USDT')
          setDrop(false)
          return;
        } else if (parseFloat(stake) > user.balance) {
          alert('Insufficient Balance')
          setDrop(false)
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
                'stake': parseFloat(stake ?? 0),
                'profit': parseFloat(((odd * stake) / 100)).toFixed(2),
                'aim': (odd * stake) / 100,
                "home": matches.home,
                "away": matches.away,
                "time": matches.time,
                "date": matches.date,
                "odd": odd,
                "ihome": matches.ihome ?? ball,
                "iaway": matches.iaway ?? ball,
                "league": matches.league,
              })
            const { error: err } = await supabase
              .from('users')
              .update({
                'gcount': user.gcount + 1,
              })
              .eq('username', user.username)
            const { error: arr } = await supabase
              .from('activa')
              .insert({
                'code': 'bet-placed',
                'username': user.username,
                'amount': parseFloat(stake),
                'type': matches.home + ' vs ' + matches.away,
              })
            const { error: errr } = await supabase
              .rpc('withdrawer', {
                names: user.username,
                amount: stake
              })
            alert('Bet Placed Successfully')
            setParentOpen(false)
            location.reload();
            console.log(error, err, arr, errr)
            setDrop(false)
          } catch (e) {
            console.log(e)
            setDrop(false)
          }
        }
      } else {
        alert('You have exceeded the number of games you can play today')
        setDrop(false)
      }

      return;
    } else {
      if (!stake) {
        alert('Please Input a Number')
        setDrop(false)
        return;
      } else if (parseFloat(stake) < 1) {
        alert('Minimum stake is 1 USDT')
        setDrop(false)
        return;
      } else if (parseFloat(stake) > user.balance) {
        alert('Insufficient Balance')
        setDrop(false)
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
              'stake': parseFloat(stake ?? 0),
              'profit': parseFloat(((odd * stake) / 100)).toFixed(2),
              'aim': (odd * stake) / 100,
              "home": matches.home,
              "away": matches.away,
              "time": matches.time,
              "date": matches.date,
              "odd": odd,
              "ihome": matches.ihome ?? ball,
              "iaway": matches.iaway ?? ball,
              "league": matches.league,
            })
          const { error: err } = await supabase
            .from('users')
            .update({
              'gcount': user.gcount + 1,
            })
            .eq('username', user.username)
          const { error: arr } = await supabase
            .from('activa')
            .insert({
              'code': 'bet-placed',
              'username': user.username,
              'amount': parseFloat(stake),
              'type': matches.home + ' vs ' + matches.away,
            })
          const { error: errr } = await supabase
            .rpc('withdrawer', {
              names: user.username,
              amount: stake
            })
          alert('Bet Placed Successfully')
          setParentOpen(false)
          location.reload();
          console.log(error, err, arr, errr)
          setDrop(false)
        } catch (e) {
          console.log(e)
          setDrop(false)
        }
      }
    }
    setDrop(false)
  }


  function DoubleChance({ txt, data, pick }) {
    const [amountInput, setAmountInput] = useState('');
    // console.log(txt)
    // console.log(pick)
    // console.log(markets[pick])
    const [use, setUse] = useState({});
    let profit = parseFloat(amountInput) * parseFloat((parseFloat(placee.txt) / 100).toFixed(3)).toFixed(3);
    let total = parseFloat((parseFloat(profit) + parseFloat(amountInput)).toFixed(3))
    const click = (parseFloat) => {
      if (parseFloat === 'X') {
        const newVal = amountInput.substring(0, amountInput.length - 1);
        setAmountInput(newVal);
      } else {
        if (parseFloat === '.') {
          if (amountInput.includes('.')) {
            return;
          } else {
            if (amountInput === '') {
              setAmountInput(amountInput + '0' + parseFloat);
            } else {
              setAmountInput(amountInput + parseFloat);
            }
          }
        } else {

          setAmountInput(amountInput + parseFloat);
        }
      }
    }
    useEffect(() => {
      const getRef = async () => {
        try {
          const { data: refer, error: errref } = await supabase
            .from('users')
            .select('*')
            .eq('username', localStorage.getItem('signNames'))
          setUse(refer[0]);
          // const { data:match, error:errmatch } = await supabase
          // .from('bets')
          // .select('*')
          // .eq('match_id', router.query.id)
          // setMatches(match[0]);
        } catch (e) {
          console.log(e)
        }

      }
      getRef();
    }, [use])
    const vip = {
      '1': 0,
      '2': 0.015,
      '3': 0.030,
      '4': 0.050,
      '5': 0.070,
      '6': 0.095,
      '7': 0.125
    }
    return (
      <React.Fragment key={'bottom'} >
        <motion.div className='odds' onClick={() => {
          setParentOpen(true)
          setPlacee({ 'txt': parseFloat(txt) + parseFloat(vip[test.viplevel]), 'pick': pick, 'market': markets[pick] })
        }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ border: (matc.company && matc.comarket === pick) ? '3px solid goldenrod' : '1px solid #981FC0', borderRadius: '5px', padding: '8px', width: '100%', textAlign: 'center', cursor: 'pointer', color: 'white', fontWeight: '500', fontSize: '12px', boxShadow: '0px 0px 5px rgba(0,0,0,0.5)', textShadow: '0px 0px 5px rgba(0,0,0,0.5)' }}
        >
          <Stack direction='row' spacing={1} justifyContent='center' alignItems='center' sx={{ cursor: 'pointer' }}>
            <p style={{ color: '#e4264c' }}>{(parseFloat(parseFloat(txt).toFixed(2)) + parseFloat(parseFloat(vip[test.viplevel]).toFixed(3))).toFixed(2)}</p>
          </Stack>

        </motion.div>

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
              <p style={{ width: '100%', color: 'whitesmoke', textAlign: 'center', color: 'rgba(245,186,79,1)', fontSize: '600' }} className='p-1'>{data.league}</p>
              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <p>{data.home}</p>
                <p>VS</p>
                <p>{data.away}</p>
              </Stack>

              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <p>{placee.market}</p> <p>{placee.txt}</p>
              </Stack>
              <TextField value={amountInput} onChange={(e)=>{ setAmountInput(e.target.value) }}/>
               <Stack direction="row" justifyContent="space-around" sx={{ width: '100%' }} spacing={1}>
                <Stack direction="column" spacing={1}>
                  <p>Balance : {user.balance.toFixed(2) ?? 0} USDT</p>
                  <p>Stake: {amountInput}</p>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <p>Profit: {profit}</p>
                  <p>Winnings: {total}</p>
                </Stack>

              </Stack>
              <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ width: '100%' }}>
                <Stack direction="column" spacing={2}>
                  {/* whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} */}
                  {/* calculator sizes stack */}
                  <Stack direction="row" spacing={1}>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('0')} className="figures">0</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('1')} className="figures">1</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('2')} className="figures">2</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('3')} className="figures">3</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('4')} className="figures">4</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('5')} className="figures">5</motion.p>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('6')} className="figures">6</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('7')} className="figures">7</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('8')} className="figures">8</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('9')} className="figures">9</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('.')} className="figures">.</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('X')} className="figures">X</motion.p>
                  </Stack>

                </Stack>


              </Stack>

              <motion.p onClick={() => {
                //   router.push('/dashboard/fund/success')
                // (matches, stake, profit, username, market, odd)
                placebet(data, parseFloat(amountInput) ?? 0, parseFloat(profit), localStorage.getItem('signNames'), placee.market, placee.txt);
              }}
                whileTap={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 0.9 }}
                whileHover={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 1.05 }}
                style={{ fontWeight: '500', fontSize: '12px', color: 'white', border: '0.6px solid #3F1052', padding: '10px', background: '#981FC0', width: '90%', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                Place Bet</motion.p>
            </Stack>

          </div>
        </Drawer>
      </React.Fragment>

    )
  }


  function Placer({ txt, data, pick }) {
    const [amountInput, setAmountInput] = useState('');
    // console.log(txt)
    // console.log(pick)
    // console.log(markets[pick])
    const [use, setUse] = useState({});
    let profit = parseFloat(amountInput) * parseFloat((parseFloat(placee.txt) / 100).toFixed(3)).toFixed(3);
    let total = parseFloat((parseFloat(profit) + parseFloat(amountInput)).toFixed(3))
    const click = (parseFloat) => {
      if (parseFloat === 'X') {
        const newVal = amountInput.substring(0, amountInput.length - 1);
        setAmountInput(newVal);
      } else {
        if (parseFloat === '.') {
          if (amountInput.includes('.')) {
            return;
          } else {
            if (amountInput === '') {
              setAmountInput(amountInput + '0' + parseFloat);
            } else {
              setAmountInput(amountInput + parseFloat);
            }
          }
        } else {

          setAmountInput(amountInput + parseFloat);
        }
      }
    }
    useEffect(() => {
      const getRef = async () => {
        try {
          const { data: refer, error: errref } = await supabase
            .from('users')
            .select('*')
            .eq('username', localStorage.getItem('signNames'))
          setUse(refer[0]);
          // const { data:match, error:errmatch } = await supabase
          // .from('bets')
          // .select('*')
          // .eq('match_id', router.query.id)
          // setMatches(match[0]);
        } catch (e) {
          console.log(e)
        }

      }
      getRef();
    }, [use])
    const vip = {
      '1': 0,
      '2': 0.015,
      '3': 0.030,
      '4': 0.050,
      '5': 0.070,
      '6': 0.095,
      '7': 0.125
    }
    return (
      <React.Fragment key={'bottom'} >
        <motion.div className='odds' onClick={() => {
          setParentOpen(true)
          setPlacee({ 'txt': parseFloat(txt) + parseFloat(vip[test.viplevel]), 'pick': pick, 'market': markets[pick] })
        }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ border: (matc.company && matc.comarket === pick) ? '3px solid goldenrod' : '1px solid #981FC0', borderRadius: '5px', padding: '4px', width: '100%', textAlign: 'center', cursor: 'pointer', color: 'white', fontWeight: '500', fontSize: '12px', boxShadow: '0px 0px 5px rgba(0,0,0,0.5)', textShadow: '0px 0px 5px rgba(0,0,0,0.5)' }}
        >
          <Stack direction='row' spacing={1} justifyContent='center' alignItems='center' sx={{ cursor: 'pointer', padding: '3px' }}>
            <p style={{ color: 'black', fontSize: '12px' }}>{markets[pick]}</p>
            <p style={{ color: '#e4264c', fontSize: '12px' }}>{(parseFloat(parseFloat(txt).toFixed(2)) + parseFloat(parseFloat(vip[test.viplevel]).toFixed(3))).toFixed(2)}</p>
          </Stack>

        </motion.div>

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
              <p style={{ width: '100%', color: 'whitesmoke', textAlign: 'center', color: 'rgba(245,186,79,1)', fontSize: '600' }} className='p-1'>{data.league}</p>
              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <p>{data.home}</p>
                <p>VS</p>
                <p>{data.away}</p>
              </Stack>

              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <p>{placee.market}</p> <p>{placee.txt}</p>
              </Stack>
              <p style={{ color: 'black', textAlign: 'center', fontSize: '20px', fontWeight: '700', background: 'whitesmoke', padding: '12px', height: '50px', minWidth: '80%', borderRadius: '5px' }}>{amountInput} </p>
              <Stack direction="row" justifyContent="space-around" sx={{ width: '100%' }} spacing={1}>
                <Stack direction="column" spacing={1}>
                  <p>Balance : {user.balance.toFixed(2) ?? 0} USDT</p>
                  <p>Stake: {amountInput}</p>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <p>Profit: {profit.toFixed(2)}</p>
                  <p>Winnings: {total}</p>
                </Stack>

              </Stack>
              <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ width: '100%' }}>
                <Stack direction="column" spacing={2}>
                  {/* whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} */}
                  {/* calculator sizes stack */}
                  <Stack direction="row" spacing={1}>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('0')} className="figures">0</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('1')} className="figures">1</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('2')} className="figures">2</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('3')} className="figures">3</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('4')} className="figures">4</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('5')} className="figures">5</motion.p>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('6')} className="figures">6</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('7')} className="figures">7</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('8')} className="figures">8</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('9')} className="figures">9</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('.')} className="figures">.</motion.p>
                    <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => click('X')} className="figures">X</motion.p>
                  </Stack>

                </Stack>


              </Stack>

              <motion.p onClick={() => {
                //   router.push('/dashboard/fund/success')
                // (matches, stake, profit, username, market, odd)
                placebet(data, parseFloat(amountInput) ?? 0, parseFloat(profit), localStorage.getItem('signNames'), placee.market, placee.txt);
              }}
                whileTap={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 0.9 }}
                whileHover={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 1.05 }}
                style={{ fontWeight: '500', fontSize: '12px', color: 'white', border: '0.6px solid #3F1052', padding: '10px', background: '#981FC0', width: '90%', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                Place Bet</motion.p>
            </Stack>

          </div>
        </Drawer>
      </React.Fragment>

    )
  }

  function OddArrange() {
    console.log(matches)
    return (
      <Stack direction='column' spacing={3} alignItems='center'>


        <Stack direction="column" className='homecol' spacing={2} justifyContent='center' alignItems='center'>
          <p>DOUBLE CHANCE</p>
          <Stack direction="row" alignItems={"center"} justifyContent="space-between" sx={{ width: '100%' }}>
            <Stack direction="column" sx={{ width: 'auto', height: '100%' }} spacing={3} alignItems='center' justifyContent='space-between'>
              <p style={{ fontWeight: '600', color: 'whitesmoke' }}>Home or Draw</p>
              <p style={{ fontWeight: '600', color: 'whitesmoke' }}>Home or Away</p>
              <p style={{ fontWeight: '600', color: 'whitesmoke' }}>Draw or AWAY</p>
            </Stack>

            <Stack direction="column" sx={{ width: 'auto', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
              <DoubleChance txt={matches.hd} data={matches} pick='hd' />
              <DoubleChance txt={matches.ha} data={matches} pick={'ha'} />
              <DoubleChance txt={matches.da} data={matches} pick={'da'} />
            </Stack>

          </Stack>


        </Stack>


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
            <Placer txt={matches.otherscores} data={matches} pick={"otherscores"} />
          </Stack>
        </Stack>
      </Stack>

    )
  }

  //match-countdown
  //match countdown
  const defTime = () => {
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
    return (
      <div>
        <Stack className="match-countdown-container" direction='row'>
          <span id="hours">Time Before Match Starts : {(hourz + min + sec > 0) ? hourz + " : " + min + " : " + sec : "Match Has Started"}</span>
        </Stack>
      </div>
    )
  }
  //end of match countdown
  //countdown
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
        <Stack direction="row" justifyContent='center' spacing={2} sx={{ background: 'grey', padding: '4px', width: '98%', textAlign: 'center' }}>
          <p style={{ color: 'whitesmoke' }}>Games Playable Today: </p>
          <p style={{ color: 'greenyellow' }}>{playable[user.gcount ?? 0]}</p>
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
  const dayl = (Number(new Date().getDate() + 1) > 9) ? "-" + Number(new Date().getDate() + 1) : "-0" + Number(new Date().getDate() + 1);
  const dayn = (Number(new Date().getDate()) > 9) ? "-" + Number(new Date().getDate()) : "-0" + Number(new Date().getDate());

  return (
    <div className="backgrounds" style={{ minHeight: '100vh' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={drop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Head>
        <title>{matches.home} VS {matches.away}</title>
        <meta name="description" content="Get Started With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Stack>
        <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
          <Icon icon="basil:cancel-outline" width={30} height={30} onClick={() => { router.push('/dashboard/event') }} />
          <p style={{ color: 'white', fontSize: '15px', fontWeight: '600', textAlign: 'center', width: '100%' }}>{matches.league}</p>
        </Stack>
        {/* <CountDown /> */}
        <Stack direction="column" sx={{ width: '100%', height: '100%', padding: '12px' }} spacing={2} alignItems='center' justifyContent='center'>
          <Stack direction="row" sx={{ width: '100%', height: '100%', padding: '8px' }} spacing={2} alignItems='center' justifyContent='space-between'>
            <Stack direction="row" spacing={2} justifyContent='center' alignItems='center' sx={{}}>
              <Image src={matches.ihome ?? ball} style={{ color: 'whitesmoke' }} alt='home image' width={35} height={35} />
              <p>{matches.home}</p>
            </Stack>
            <p>VS</p>
            <Stack direction="row" spacing={2} justifyContent='center' alignItems='center'>
              <Image src={matches.iaway ?? ball} style={{ color: 'whitesmoke' }} alt='away image' width={35} height={35} />
              <p>{matches.away}</p>
            </Stack>
          </Stack>
          <div className='live2'>
            <p className='mscore'>{matches.time}</p>
            <p className='mtime'>{(matches.date === new Date().getFullYear() + "-0" + Number(new Date().getMonth() + 1) + dayn) ? 'TODAY' : (matches.date === new Date().getFullYear() + "-0" + Number(new Date().getMonth() + 1) + dayl) ? 'Tomorrow' : matches.date}</p>
            <p className='mtime'>Match ID: {matches.match_id}</p>
          </div>
          {/* <MatchCountDown /> */}
          <OddArrange />
        </Stack>
      </Stack>
    </div>
  )
}
export async function getServerSideProps(context) {
  console.log(context.query.name)
  try {
    const { data: match, error: errmatch } = await supabase
      .from('bets')
      .select('*')
      .eq('match_id', context.query.id);

    const { data: use, error: usematch } = await supabase
      .from('users')
      .select('*')
      .eq('userId', context.query.name);

    //get vip level
    const id = context.query.name;
    let users = use[0];
    const viplimit = {
      '1': 50,
      '2': 100,
      '3': 200,
      '4': 300,
      '5': 500,
      '6': 1000,
      '7': 5000
    };
    const vipclimit = {
      '1': 3,
      '2': 5,
      '3': 8,
      '4': 12,
      '5': 15,
      '6': 20,
      '7': 500
    };
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .match({
        'refer': use[0].newrefer,
        'firstd': true
      });
    console.log(count)
    let refCount = count;
    let vipl = (users.totald < 50 || count < 3) ? '1' : (users.totald < 100 || count < 5) ? '2' : (users.totald < 200 || count < 8) ? '3' : (users.totald < 300 || count < 12) ? '4' : (users.totald < 500 || count < 15) ? '5' : (users.totald < 1000 || count < 20) ? '6' : '7';

    let viplevel = (users.totald < 50 || count < 3) ? '1' : (users.totald < 100 || count < 5) ? '2' : (users.totald < 200 || count < 8) ? '3' : (users.totald < 300 || count < 12) ? '4' : (users.totald < 500 || count < 15) ? '5' : (users.totald < 1000 || count < 20) ? '6' : '7';
    let rprogress = (parseInt(users.totald) / parseInt(viplimit[vipl])) * 100;
    //tests
    // console.log(users.totald)
    //end
    let cprogress = (parseInt(count) / parseInt(vipclimit[vipl])) * 100;
    let c1 = (parseFloat(((parseInt(count) / parseInt(vipclimit[vipl])) * 100).toFixed(2)) > 100) ? 100 : parseFloat(((parseInt(count) / parseInt(vipclimit[vipl])) * 100).toFixed(2));
    let r1 = (parseFloat(((parseInt(users.totald) / parseInt(viplimit[vipl])) * 100).toFixed(2)) > 100) ? 100 : parseFloat(((parseInt(users.totald) / parseInt(viplimit[vipl])) * 100).toFixed(2));
    console.log(rprogress, cprogress, refCount, viplevel)
    let test = { status: 'success', refCount: parseFloat(refCount) ?? 0, viplevel: parseFloat(viplevel) ?? 0, rprogress: parseFloat(rprogress.toFixed(2)), cprogress: parseFloat(cprogress.toFixed(2)), c1: parseFloat(c1), r1: parseFloat(r1) }


    //end of get vip level
    let user = use[0];
    let matc = match[0];
    return {
      props: { matc, user, test }, // will be passed to the page component as props
    }
  } catch (e) {
    let matc = {};
    let user = {};
    let test = {};
    return {
      props: { matc, user, test }, // will be passed to the page component as props
    }
  }

}
