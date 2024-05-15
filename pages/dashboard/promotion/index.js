import { Icon } from '@iconify/react'
import { Stack } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { supabase } from '../../../pages/api/supabase';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Translate from '@/pages/translator';

export default function Promotion() {
    const router = useRouter();
    const [user, setUser] = useState({});
    useEffect(() => {
        const Get = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', localStorage.getItem('signNames'))
            setUser(data[0])
        }
        Get();
    }, [])
    return (
        <div className="backgrounds" style={{ minHeight: '99vh' }}>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.back()
                }} />
                <p className="text-sm text-gray-500">Promotion</p>
            </Stack>
            <Stack direction="column" sx={{ padding: '8px' }}>
                <p style={{ fontSize: '24px', color: 'whitesmoke', width: '99%', textAlign: 'center' }}>PROMOTIONs</p>
                <p style={{ fontSize: '12px', color: 'white', padding: '4px' }}>Below are a list of ongoing promotions on our platform</p>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} style={{ cursor: 'pointer',display:user.newbie ? 'none' : 'visible' }}>
                    <Link href={user.claim ? "/dashboard/promotion" : "/dashboard/promotion/rewards"}>

                        <Stack direction="row" justifyContent='space-between' alignItems="center" sx={{ padding: '12px', background: '#3F1052',display:user.newbie ? 'none' : 'visible' }}>
                            <p>CLAIM REWARDS</p>
                            <p style={{ color: 'greenyellow' }}>{user.claim ? 'Claimed' : "NotClaimed"}</p>
                        </Stack>
                    </Link>
                </motion.div>

            </Stack>
        </div>
    )
}
