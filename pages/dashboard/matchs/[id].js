import { useRouter } from 'next/router';
import { supabase } from '@/pages/api/supabase';
import { Icon } from '@iconify/react';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Drawer, TextField } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import React from 'react';
export default function Matchs({ matchDat }) {
    let data = matchDat[0];
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
     
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
      function Placer({txt}) {
        const [amountInput,setAmountInput] = useState();
    
        const click = (number) =>{
          setAmountInput(amountInput + number);
        }
        return (
          <React.Fragment key={'bottom'} >
            <p className='odds' onClick={() => { toggleDrawer('bottom', true) }}>{txt}</p>
            <Drawer
              anchor={'bottom'}
              open={state['bottom']}
              onClose={toggleDrawer('bottom', false)}
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
                    <motion.p onClick={click('0')}  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">0</motion.p>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">1</motion.p>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">2</motion.p>
                  </Stack>
    
                  <Stack direction="row" spacing={1}>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">3</motion.p>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">4</motion.p>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">5</motion.p>
                  </Stack>
    
                  <Stack direction="row" spacing={1}>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">6</motion.p>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">7</motion.p>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">8</motion.p>
                  </Stack>
    
                  <Stack direction="row" spacing={1}>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }} className="figures">9</motion.p>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">.</motion.p>
                    <motion.p  whileTap={{ backgroundColor: '#585656', scale: 0.9 }}  className="figures">X</motion.p>
                  </Stack>
                </Stack>
                
                <Stack>
                 <TextField type="number" placeholder='amount' sx={{ background:'white'}} value={amountInput} onChange={(event)=>{
                  setAmountInput(event.target.value)
                 }}/>
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
    return (
        <div classNmae="backgrounds">
            <Stack>
                <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                    <Icon icon="basil:cancel-outline" width={24} height={24} onClick={() => { }} />
                </Stack>
                <Stack direction="column" sx={{ width: '100%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
                    <Stack direction="row" sx={{ width: '50%', height: '100%' }} spacing={2} alignItems='center' justifyContent='space-between'>
                       <p>home</p>
                       <p>VS</p>
                       <p>away</p>
                    </Stack>
                    <Stack direction="row" sx={{ width: '50%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
                        <Placer txt={data.onenil} />
                        <Placer txt={data.nilnil} />
                        <Placer txt={data.nilone} />
                    </Stack>
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