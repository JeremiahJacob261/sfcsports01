import React from 'react'
import { Icon } from '@iconify/react';
import { Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import HomeBottom from '../../UIComponents/bottomNav';
import Link from 'next/link'
import { motion } from 'framer-motion';
import ball from '../../../public/ball.png'
import Image from 'next/image'
import { supabase } from '../../api/supabase';
import { useEffect } from 'react';
import { Button, Drawer } from '@mui/material';
import { useState } from 'react';
export default function Event({ footDat }) {
  const [selected, setSelected] = React.useState(null);
  const router = useRouter();
  const [parentopen, setParentOpen] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
 

  
  function Placer({txt}) {
   const [amountInput,setAmountInput] = useState('');
  
    const click = (number) =>{
      if(number === 'X'){
        const newVal = amountInput.substring (0, amountInput.length - 1);
        console.log(newVal)
        setAmountInput(newVal);
      }else{
        
      setAmountInput(amountInput + number);
      }
    }
   
    return (
      <React.Fragment key={'bottom'} >
        <Button className='odds' onClick={() => {
          setParentOpen(true) }}>
<p>{txt}</p>
        </Button>
        
        <Drawer
          anchor={'bottom'}
          open={parentopen}
          onClose={() => {setParentOpen(false)}}
          style={{ backgroundColor: 'transparent' }}
        >
          <div
            className="placerstyles"
          >
            <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <p>home</p>
              <p>VS</p>
              <p>away</p>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <p>Market</p> <p>Odd</p>
            </Stack>

           <Stack direction="row" spacing={1} justifyContent="space-between">
           <Stack direction="column" spacing={2}>
              {/* calculator sizes stack */}
              <Stack direction="row" spacing={1}>
                <motion.p onClick={()=>click('0')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">0</motion.p>
                <motion.p onClick={()=>click('1')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">1</motion.p>
                <motion.p onClick={()=>click('2')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">2</motion.p>
              </Stack>

              <Stack direction="row" spacing={1}>
                <motion.p onClick={()=>click('3')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">3</motion.p>
                <motion.p onClick={()=>click('4')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">4</motion.p>
                <motion.p onClick={()=>click('5')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">5</motion.p>
              </Stack>

              <Stack direction="row" spacing={1}>
                <motion.p onClick={()=>click('6')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">6</motion.p>
                <motion.p onClick={()=>click('7')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">7</motion.p>
                <motion.p onClick={()=>click('8')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">8</motion.p>
              </Stack>

              <Stack direction="row" spacing={1}>
                <motion.p onClick={()=>click('9')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">9</motion.p>
                <motion.p onClick={()=>click('.')} whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">.</motion.p>
                <motion.p onClick={()=>click('X')}  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">X</motion.p>
              </Stack>
            </Stack>
            
            <Stack>
            <p style={{ color:'black',background:'whitesmoke',padding:'12px',minWidth:'50px',borderRadius:'5px'}}>{amountInput}</p>
            </Stack>
           </Stack>

            <motion.p onClick={() => {
                    //   router.push('/dashboard/fund/success')
                  
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
    if (footDat && footDat.length > 0) {
      console.log(footDat)
      return (
        <Stack direction='column' spacing={1} alignItems='center' style={{ padding: '4px', marginBottom: '100px', width: '100vw' }}>
          {/* container for all matches i sabove */}
          {
            footDat.map((data) => {
              return (
                <Stack direction="column" key={data.match_id} sx={{ minWidth: '90vw', maxWidth: '310px' }} className='rowsofdata' justifyContent='center' spacing={1}
                  onClick={() => {

                  }}>
                  <Stack direction="row" style={{ color: 'grey' }}>{data.time} ID {data.match_id} {data.league}</Stack>
                  <Stack direction="row" alignItems='center'>

                    <Stack direction='column' sx={{ width: '50%' }} spacing={1}>
                      <Stack direction='row' spacing={1}><Image src={data.ihome ?? ball} alt='home' width={20} height={20} /><p style={{ color: 'white' }} >{data.home}</p></Stack>
                      <Stack direction='row' spacing={1}><Image src={data.iaway ?? ball} alt="away" width={20} height={20} /><p style={{ color: 'white' }}>{data.away}</p></Stack>
                    </Stack>

                    <Stack direction="row" sx={{ width: '50%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
                      <Placer txt={data.onenil}/>
                      <Placer txt={data.nilnil}/>
                      <Placer txt={data.nilone}/>
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
      return (
        <Stack justifyContent='center' alignItems='center' sx={{ width: '100vw', minHeight: '85vh' }}>
          <p style={{ fontSize: '20px' }}>No Data Avaliable</p>
          <p style={{ color: 'grey' }}>Please Check your internet connection</p>
        </Stack>)
    }
  }
  return (
    <div className='backgrounds'>
      <Stack alignItems='center'>

        <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
          <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
            router.push('/dashboard')
          }} />
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#C61F41' }}>Events</p>
        </Stack>
        <MatchRow />
        <HomeBottom />
      </Stack>
    </div>

  )
}
export async function getServerSideProps(context) {
  try {
    const { data, error } = await supabase
      .from('bets')
      .select('*')
      .order('id', { ascending: false });
    let footDat = data;
    console.log(data);
    console.log(error)
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