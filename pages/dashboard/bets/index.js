import HomeBottom from '../../UIComponents/bottomNav';
import { useRouter } from 'next/router';
import { Icon, InlineIcon } from '@iconify/react';
import { Stack } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/pages/api/supabase';
import Head from 'next/head'
export default function Bets({ betDta }) {
    const router = useRouter();
    const [selected, setSelected] = useState(0);
    const betSelectLogic = (index) => {
        setSelected(index);
        //return bet desired data
    }
    function MatchRow() {
     
        if (betDta && betDta.length > 0) {
          console.log(betDta)
          return(
            <Stack direction='column' sx={{ maxWidth: '100vw',padding:'8px',marginBottom:'100px' }} alignItems='center' spacing={2}>
            {
             betDta.map((bet)=>{
                      {/* bet data according to betTabSelected */}
                 return(

             <Stack direction='column' className='rowsofdata' sx={{ width: '305px' }} key={bet.betid} spacing={1}>
             {/* statusOfBet */}
             <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ padding:'8px', background:(bet.won === 'true') ? 'green' : 'grey',borderRadius:'6px'}}><p>Status</p>    <p>{(bet.won === 'true') ? 'Won' :'Lost'}</p> </Stack>
             {/* team data */}
             <Stack direction='row'> 
             {/* team names and logo */}
             <Stack spacing={1}>
                 {/* home team */}
             <Stack direction='row' spacing={1}>
             <Image src={ bet.ihome ?? 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Soccer_ball.svg/2048px-Soccer_ball.svg.png' } width={20} height={20} alt="home logo"/>
             <p>{bet.home}</p>
             </Stack>
             {/* end of home team */}
             {/* away team */}
             <Stack direction='row' spacing={1}>
             <Image src={ bet.iaway ?? 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Soccer_ball.svg/2048px-Soccer_ball.svg.png' } width={20} height={20} alt='away logo'/>
             <p>{bet.away}</p>
             </Stack>
             {/* end of away team */}
             </Stack>
             {/* end of team name and logo */}
              </Stack>
              {/* end of team data */}
             <Stack><p>Stake: {bet.stake} USDT</p></Stack>
             </Stack>

                 )
             {/*end of  bet data according to betTabSelected */}
             })
            }
         </Stack>
        
          )
        }else{
          return(
            <Stack justifyContent='center' alignItems='center' sx={{ width:'100vw',minHeight:'85vh'}}>
              <p style={{ fontSize:'20px'}}>No Data Avaliable</p>
              <p style={{ color:'grey'}}>Please Check your internet connection</p>
            </Stack>)
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
                <p style={{ fontSize: '16px', fontWeight: '600',color:'#C61F41' }}>Bets</p>
            </Stack>
            <Stack direction="row" sx={{ width: '100%', marginTop: '5px', padding: '6px', background: 'rgb(27, 5, 9)' }} spacing={2} justifyContent='center' alignItems="center">
                <p className={(selected != 0) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(0) }}>Open Bets</p>
                <p className={(selected != 1) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(1) }}>Settled Bets</p>
            </Stack>
                <MatchRow/>
            <HomeBottom />
        </div>
    )
}
export async function getServerSideProps({req}) {
    const refreshToken = req.cookies['my-refresh-token']
const accessToken = req.cookies['my-access-token']
console.log(accessToken)
if (refreshToken && accessToken) {
    console.log('sign insss')
  let sess = await supabase.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
  })
} else {
  // make sure you handle this case!
  throw new Error('User is not authenticated.')
}

// returns user information
let {data:user ,error} = await supabase.auth.getUser()
    console.log(user.user.user_metadata)
    console.log(error)
    try{
  const { data, error } = await supabase
      .from('placed')
      .select()
      .eq('username',user.user.user_metadata.displayName)
      .limit(10)
      .order('id', { ascending: false });
    let betDta = data;
    return {
      props: { betDta }, // will be passed to the page component as props
    }
    }catch(e){
      console.log(e);
      let err = [];
      return {
        props: { err }, // will be passed to the page component as props
      }
    }
    
  }