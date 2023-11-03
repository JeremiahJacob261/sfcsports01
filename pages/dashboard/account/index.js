import HomeBottom from '../../UIComponents/bottomNav';
import { useRouter } from 'next/router';
import { Icon, InlineIcon } from '@iconify/react';
import { Divider, Stack } from '@mui/material';
import Image from 'next/image'
import Avatar from '@/public/avatar.png'
import { motion } from 'framer-motion';
import Link from 'next/link'
import Head from 'next/head';
import { supabase } from '@/pages/api/supabase';
import Swapic from '@/pages/UIComponents/dialogs/swapic';


export default function Account({ users }) {
    //accounts-balanace
    function AccountsBalance() {
        return (
            <Stack style={{ width: '100%' }} justifyContent='center' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }}>
                    <p style={{ fontWeight: '500', fontSize: '15px' }}>Wallet</p>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                {/* accountinfoandBalance */}
                <Stack className='accountinfo' justifyContent='center' alignItems='center' spacing={1}>
                    <p style={{ fontWeight: '600', fontSize: '24px', color: '#ac915fd2' }}>$ {users.balance}</p>
                    <p style={{ fontWeight: '300', fontSize: '12px' }}>Account Balance</p>
                    <motion.p onClick={() => {
                        router.push('/dashboard/fund')
                    }}
                        whileTap={{ background: '#573b41', scale: '1.05' }}
                        whileHover={{ background: '#573b41' }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '8px', background: '#C61F41', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
                        DEPOSIT</motion.p>
                    <motion.p onClick={() => {
                        router.push('/dashboard/fund')
                    }}
                        whileTap={{ background: '#573b41', scale: '1.05' }}
                        whileHover={{ background: '#573b41' }}
                        style={{ fontWeight: '500', fontSize: '12px', color: '#C61F41', padding: '8px', background: 'white', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
                        WITHDRAW</motion.p>
                        <motion.p onClick={() => {
                        router.push('/dashboard/transactions')
                    }}
                        whileTap={{ background: '#ac915fd2', scale: '1.05' }}
                        whileHover={{ background: '#ac915fd2' }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '8px', background: 'rgba(245,186,79,1)', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
                        SEE TRANSACTIONS</motion.p>
                    <Stack direction='row' justifyContent='stretch' alignItems='center'>
                        <Stack sx={{ padding: '8px' }} justifyContent='center' alignItems='center'>
                            <p style={{ fontWeight: '600', fontSize: '18px', color: '#ac915fd2' }}>$ {users.totald}</p>
                            <p style={{ fontWeight: '300', fontSize: '10px' }}>Total DEPOSITS</p>
                        </Stack>
                        <Stack sx={{ padding: '8px' }} justifyContent='center' alignItems='center'>
                            <p style={{ fontWeight: '600', fontSize: '18px', color: '#ac915fd2' }}>$ {users.totalw}</p>
                            <p style={{ fontWeight: '300', fontSize: '10px' }}>Total WITHDRAWN</p>
                        </Stack>
                    </Stack>

                </Stack>
            </Stack>
        );
    }
    //end of language
    const router = useRouter();
    return (
        <div className='backgrounds'>
            <Head>
                <title>Account</title>
                <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
                <link rel="icon" href="/Sheffield_FC.svg.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Stack direction="row" alignItems='center' sx={{ padding: '12px' }} spacing={1}>
                <p style={{ fontSize: '18px', fontWeight: '600', width: '100%', textAlign: 'center' }}>Account</p>
            </Stack>
            <Stack direction='column' alignItems='center'>
                <Stack className='accountinfo' direction='row' alignItems='center' spacing={2} style={{ padding: '8px' }}>
                    <div className='avatar'>
                        <Image src={Avatar} alt="profile_pic" width={55} height={50} />
                    </div>
                    {/* textedUserInfo */}
                    <Stack justifyContent='center' className='acctext'>
                        <p style={{ fontWeight: '500', color: 'white' }}>{users.username}</p>
                        <p style={{ fontWeight: '200', color: 'white' }}>{users.email}</p>
                        <p style={{ fontWeight: '200', color: 'white' }}>{users.userId}</p>
                    </Stack>
                    <Stack>
                        <Swapic image={Avatar} name={users.username} />
                    </Stack>
                </Stack>
                <AccountsBalance />
            </Stack>
            <HomeBottom />
        </div>
    )
}
export async function getServerSideProps({ req }) {
    const refreshToken = req.cookies['my-refresh-token']
    const accessToken = req.cookies['my-access-token']
    console.log(accessToken)
    if (refreshToken && accessToken) {
        console.log('sign insss')
        let sess = await supabase.auth.setSession({
            refresh_token: refreshToken,
            access_token: accessToken,
        })
        console.log(sess)
    } else {
        // make sure you handle this case!
        throw new Error('User is not authenticated.')
    }
    // returns user information
    try{
        let { data: user, error } = await supabase.auth.getUser()
    console.log(user.user.user_metadata)
    console.log(error)
    }catch(e){
        console.log(e)
    }
    
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', user.user.user_metadata.displayName)
        let users = data[0];
        console.log(users)
        return {
            props: { users }, // will be passed to the page component as props
        }
    } catch (error) {
        console.log(error)
        let users = {};
        return {
            props: { users }, // will be passed to the page component as props
        }
    }

}