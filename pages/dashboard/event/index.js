import React from 'react'
import { Icon } from '@iconify/react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import HomeBottom from '../../UIComponents/bottomNav';
import Image from 'next/image'
import { supabase } from '../../api/supabase';
export default function Event({ footDat}) {
    const router = useRouter();
    function MatchRow() {
      if (footDat) {
        return(
          <Stack direction='column' spacing={1} style={{ padding:'8px',marginBottom:'100px',maxWidth:'80vh'}}>
        {/* container for all matches i sabove */}
        {
          footDat.map((data)=>{ 
            return(
            <Stack direction="column" sx={{ minWidth:'90vw',maxWidth:'310px'}} className='rowsofdata' justifyContent='center' spacing={1} key={data.match_id}>
          <Stack direction="row" style={{ color:'grey'}}>{data.time} ID {data.match_id} {data.league}</Stack>
          <Stack direction="row" alignItems='center'> 
    
          <Stack direction='column' sx={{ width:'50%'}} spacing={1}>
            <Stack direction='row' spacing={1}><Image src={data.ihome} alt='home' width={20} height={20}/><p>{data.home}</p></Stack>
            <Stack direction='row' spacing={1}><Image src={data.iaway} alt="away" width={20} height={20}/><p>{data.away}</p></Stack>
          </Stack>
    
          <Stack direction="row" sx={{ width:'50%',height:'100%'}} spacing={2} alignItems='center' justifyContent='center'>
            <p className='odds'>{data.onenil}</p>
            <p className='odds'>{data.nilnil}</p>
            <p className='odds'>{data.nilone}</p>
          </Stack>
          </Stack>
          <Stack direction="row"></Stack>
            </Stack>
            )
           })
        }
         </Stack>
        )
      } else {
        return(
        <Stack justifyContent='center' alignItems='center' sx={{ width:'100vw',height:'100vh'}}>
          <p style={{ fontSize:'20px'}}>No Data Avaliable</p>
          <p style={{ color:'grey'}}>Please Check your internet connection</p>
        </Stack>)
      }
    }
    return (
        <Stack className='backgrounds' alignItems='center'>
            <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px',width:'100%'}} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600'}}>Events</p>
            </Stack>
                <MatchRow/>
            <HomeBottom />
        </Stack>
    )
}
export async function getServerSideProps(context) {
    try{
  const { data, error } = await supabase
      .from('bets')
      .select()
      .limit(10)
      .order('id', { ascending: false });
    let footDat = data;
    console.log(data)
    return {
      props: { footDat }, // will be passed to the page component as props
    }
    }catch(e){
      console.log(e);
      let err = [];
      return {
        props: { err }, // will be passed to the page component as props
      }
    }
    
  }