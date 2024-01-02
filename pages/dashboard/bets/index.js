import HomeBottom from '../../UIComponents/bottomNav';
import { useRouter } from 'next/router';
import { Icon, InlineIcon } from '@iconify/react';
import { Stack } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/pages/api/supabase';
import Head from 'next/head'
import Link from 'next/link';
import { useEffect } from 'react';
export default function Bets() {
  const router = useRouter();
  const [betDta, setBetDta] = useState([]);
  const [selected, setSelected] = useState(0);
  const betObj = {
    0: 'all',
    1: 'settled'
  }
  //match countdown
  const defTime = (dates, time) => {
    let dateString = dates;
    let timeString = time;
    let dateParts = dateString.split("-");
    let timeParts = timeString.split(":");

    // Create a new Date object
    let date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);
    // Get the timestamp
    let timestamp = date.getTime() / 1000;
    return timestamp;
  }
  const betSelectLogic = (index) => {
    setSelected(index);
    //return bet desired data
    console.log(betObj[index])
    const getFilter = async () => {
      try {
        let test = await fetch('/api/bet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: localStorage.getItem('signNames'), type: betObj[index] })
        }).then(data => {
          return data.json();
        })
        setBetDta(test.message)
      } catch (e) {

      }
    }
    getFilter();
  }
  useEffect(() => {
    const getRef = async () => {
      try {
        const { data, error } = await supabase
          .from('placed')
          .select()
          .eq('username', localStorage.getItem('signNames'))
          .eq('won', 'null')
          .order('id', { ascending: false });
        setBetDta(data)
        console.log(data)
      } catch (e) {
        console.log(e)
      }

    }
    getRef();
  }, [])
  function MatchRow() {

    if (betDta && betDta.length > 0) {
      console.log(betDta)
      return (
        <Stack direction='column' sx={{ maxWidth: '100vw', padding: '8px', marginBottom: '100px' }} alignItems='center' spacing={2}>
          {
            betDta.map((bet) => {
              {/* bet data according to betTabSelected */ }
              let s = bet;
              let stams = Date.parse(s.date + " " + s.time) / 1000;
              let curren = new Date().getTime() / 1000;
              return (

                <Link href={'/dashboard/betdetails?id=' + bet.betid} key={bet.betid}>
                  <Stack direction='column' className='rowsofdata' sx={{ width: '305px' }} spacing={1}>
                    {/* statusOfBet */}
                    <Stack direction='row' alignItems='center' justifyContent='space-between'
                      sx={{ padding: '8px', background: (bet.won === 'true') ? 'green' : (bet.won === 'false') ? 'red' : (defTime(bet.date, bet.time) < defTime(new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate(), new Date().getHours() + ":" + new Date().getMinutes())) ? 'grey' : 'goldenrod', borderRadius: '6px' }}>
                      <p>Status</p>
                      <p>{(bet.won === 'true') ? 'Won' : (bet.won === 'false') ? 'Lost' : (stams > curren) ? 'Ongoing' : 'Not Started'}</p> </Stack>
                    {/* team data */}
                    <Stack direction='row'>
                      {/* team names and logo */}
                      <Stack spacing={1}>
                        {/* home team */}
                        <Stack direction='row' spacing={1}>
                          <Image src={bet.ihome ?? 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Soccer_ball.svg/2048px-Soccer_ball.svg.png'} width={20} height={20} alt="home logo" />
                          <p>{bet.home}</p>
                        </Stack>
                        {/* end of home team */}
                        {/* away team */}
                        <Stack direction='row' spacing={1}>
                          <Image src={bet.iaway ?? 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Soccer_ball.svg/2048px-Soccer_ball.svg.png'} width={20} height={20} alt='away logo' />
                          <p>{bet.away}</p>
                        </Stack>
                        {/* end of away team */}
                      </Stack>
                      {/* end of team name and logo */}
                    </Stack>
                    {/* end of team data */}
                    <Stack><p>Stake: {bet.stake} USDT</p></Stack>
                  </Stack>
                </Link>

              )
              {/*end of  bet data according to betTabSelected */ }
            })
          }
        </Stack>

      )
    } else {
      return (
        <Stack justifyContent='center' alignItems='center' sx={{ width: '100%', minHeight: '80vh' }}>
          <p style={{ fontSize: '20px' }}>No Data Avaliable</p>
          <p style={{ color: 'grey' }}>Please Check your internet connection</p>
        </Stack>
      )
    }

  }
  return (
    <div className='backgrounds'>
      <Head>
        <title>Bets History</title>
        <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/Sheffield_FC.svg.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px' }} spacing={1}>
        <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
          router.push('/dashboard')
        }} />
        <p style={{ fontSize: '16px', fontWeight: '600', color: '#C61F41' }}>Bets</p>
      </Stack>
      <Stack direction="row" sx={{ width: '100%', marginTop: '5px', padding: '6px', background: 'rgb(27, 5, 9)' }} spacing={2} justifyContent='center' alignItems="center">
        <p className={(selected != 0) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(0) }}>Open Bets</p>
        <p className={(selected != 1) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(1) }}>Settled Bets</p>
      </Stack>
      <MatchRow />
      <HomeBottom />
    </div>
  )
}