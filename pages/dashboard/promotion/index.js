import { Icon } from '@iconify/react'
import { Stack } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { supabase } from '../../../pages/api/supabase';
import { useEffect,useState } from 'react';
import { motion } from 'framer-motion';
export default function Promotion(){
    const router = useRouter();
    const [user, setUser] = useState({});
    useEffect(()=>{
        const Get = async () => { 
            const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', localStorage.getItem('signNames'))
        setUser(data[0])
         }
            Get();
    },[])
    return(
        <div className="backgrounds" style={{ minHeight:'99vh'}}>
             <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/account')
                }} />
                <p className="text-sm text-gray-500">Promotion</p>
            </Stack>
            <Stack direction="column" sx={{ padding:'8px'}}>
                <p style={{ fontSize:'24px',color:'whitesmoke',width:'99vw',textAlign:'center' }}>PROMOTIONs</p>
                <p style={{ fontSize:'12px',color:'grey',padding:'4px'}}>Below are a list of ongoing promotions on our platform</p>
                
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} style={{ cursor:'pointer'}}>
                <Link href={user.claim ? "/dashboard/promotion" : "/dashboard/promotion/claim_signup_bonus"}>
                        
            <Stack direction="row" justifyContent='space-between' alignItems="center" sx={{ padding:'12px',borderRadius:'10px',background:' rgb(122, 12, 32)'}}>
                <p>Claim Sign Up Bonus</p>
                <p style={{ color:'greenyellow'}}>{user.claim ? 'Claimed' : 'Not Claimed'}</p>
            </Stack>
                </Link>
                    </motion.div>
            </Stack>
        </div>
    )
}