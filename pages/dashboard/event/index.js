import React from 'react'
import { Icon } from '@iconify/react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import HomeBottom from '../../UIComponents/bottomNav';
import Link from 'next/link'
import { motion } from 'framer-motion';
import ball from '../../../public/ball.png'
import Image from 'next/image'
import { supabase } from '../../api/supabase';
import MatchDx from '../../UIComponents/dialogs/matchdx.js';
export default function Event({ footDat }) {
  const [selected, setSelected] = React.useState(null);
  const [parentopen, setParentOpen] = React.useState(false);
  const router = useRouter();
  function MatchRow() {
    if (footDat && footDat.length > 0) {
      console.log(footDat)
      return (
        <Stack direction='column' spacing={1} alignItems='center' style={{ padding: '4px', marginBottom: '100px', width: '100vw' }}>
          {/* container for all matches i sabove */}
          {
            footDat.map((data) => {
              return (
                 <MatchDx key={data.match_id} data={data}/>
              )
            })
          }
        </Stack>
      )
    } else {
      return (
        <Stack justifyContent='center' alignItems='center' sx={{ width: '100vw', minHeight: '85vh' }}>
          <p style={{ fontSize: '20px' }}>No Data Avaliable</p>
          <p style={{ color: 'grey' }}>Please Check your internet connection</p>
        </Stack>)
    }
  }
  return (
    <Stack className='backgrounds' alignItems='center'>
      <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
        <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
          router.push('/dashboard')
        }} />
        <p style={{ fontSize: '16px', fontWeight: '600', color: '#C61F41' }}>Events</p>
      </Stack>
      <MatchRow />
      <HomeBottom />
    </Stack>
  )
}
export async function getServerSideProps(context) {
  try {
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
  } catch (e) {
    console.log(e);
    let err = [];
    return {
      props: { err }, // will be passed to the page component as props
    }
  }

}