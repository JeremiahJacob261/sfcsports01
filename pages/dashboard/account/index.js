import HomeBottom from '../../UIComponents/bottomNav';
import { useRouter } from 'next/router';
import { Icon, InlineIcon } from '@iconify/react';
import { Divider, Stack, p } from '@mui/material';
import Image from 'next/image'
import Avatar from '@/public/avatar.png'
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'
import Head from 'next/head';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '@/pages/api/supabase';
import Swapic from '@/pages/UIComponents/dialogs/swapic';
import DiamondIcon from '@mui/icons-material/Diamond';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

export default function Account() {
    const [ users,setUser] = useState({});
    const [placed,setPlaced] = useState([]);
     useEffect(()=>{ 
        if(!localStorage.getItem('signedIns')){
            router.push('/login')
        }
        const GET = async () => { 
            const { data: place, error: perr } = await supabase
        .from('placed')
        .select()
        .eq('username', localStorage.getItem('signNames'))
        .limit(10)
        .order('id', { ascending: false });
        setPlaced(place);
        const { data,error} = await supabase
        .from('users')
        .select('*')
        .eq('username', localStorage.getItem('signNames'))
        }
        GET();
      },[])
    //vip logics
    const [rprogress, setRProgress] = useState(0);
    const [cprogress, setCProgress] = useState(0);
    const [refCount, setRefCount] = useState(0);
    const [viplevel, setViplevel] = useState(1);
    const [c1, setC1] = useState(0);
    const [r1, setR1] = useState(0);
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));
    //endborder
    //vip object
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
    const viproyal = {
        '1': '#CD7F32P',
        '2': '#71706E',
        '3': '#FFD700',
        '4': '#36F1CD',
        '5': '#0F52BA',
        '6': '#E01157',
        '7': '#CF1259'
    };
    // end vip object
    useEffect(() => {
        const GET = async () => {
            let info = users;
            try {
                async function getReferCount() {
                    try {
                        const { count, error } = await supabase
                            .from('users')
                            .select('*', { count: 'exact', head: true })
                            .match({
                                'refer': users.newrefer,
                                'firstd': true
                            });
                        setRefCount(count)
                        setViplevel((info.totald < 50 || count < 3) ? '1' : (info.totald < 100 || count < 5) ? '2' : (info.totald < 200 || count < 8) ? '3' : (info.totald < 300 || count < 12) ? '4' : (info.totald < 500 || count < 15) ? '5' : (info.totald < 1000 || count < 20) ? '6' : '7');
                        let vipl = (info.totald < 50 || count < 3) ? '1' : (info.totald < 100 || count < 5) ? '2' : (info.totald < 200 || count < 8) ? '3' : (info.totald < 300 || count < 12) ? '4' : (info.totald < 500 || count < 15) ? '5' : (info.totald < 1000 || count < 20) ? '6' : '7';
                        setRProgress((parseInt(info.totald) / parseInt(viplimit[vipl])) * 100);
                        setCProgress((parseInt(count) / parseInt(vipclimit[vipl])) * 100);
                        setC1((Number(((parseInt(count) / parseInt(vipclimit[vipl])) * 100).toFixed(2)) > 100) ? 100 : Number(((parseInt(count) / parseInt(vipclimit[vipl])) * 100).toFixed(2)));
                        setR1((Number(((parseInt(info.totald) / parseInt(viplimit[vipl])) * 100).toFixed(2)) > 100) ? 100 : Number(((parseInt(info.totald) / parseInt(viplimit[vipl])) * 100).toFixed(2)));
                        console.log(rprogress, cprogress, refCount, viplevel)
                    } catch (e) {
                        console.log(e)
                    }
                }
                getReferCount();
            } catch (e) {
                console.log(e)
            }

        }
        GET();


    }, [rprogress, cprogress, refCount, viplevel])
    //end of vip logics
    //accounts-balanace
    function AccountsBalance() {
        let balanace = users.balance ?? 0;
        return (
            <Stack style={{ width: '100%' }} justifyContent='center' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }}>
                    <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
                        <Icon icon="mdi:cash" width={24} height={24} style={{ color: 'white' }} />
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>Wallet</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                {/* accountinfoandBalance */}
                <Stack className='accountinfo' justifyContent='center' alignItems='center' spacing={1}>
                    <p style={{ fontWeight: '600', fontSize: '24px', color: '#ac915fd2' }}>$ {balanace.toFixed(2)}</p>
                    <p style={{ fontWeight: '300', fontSize: '12px' }}>Account Balance</p>
                    <motion.p onClick={() => {
                        router.push('/dashboard/fund')
                    }}
                        whileTap={{ background: '#573b41', scale: '1.05' }}
                        whileHover={{ background: '#573b41' }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '8px', background: '#C61F41', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
                        DEPOSIT</motion.p>
                    <motion.p onClick={() => {
                        router.push('/dashboard/withdraw')
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
                    <motion.p onClick={() => {
                        router.push('/dashboard/bind')
                    }}
                        whileTap={{ background: '#ac915fd2', scale: '1.05' }}
                        whileHover={{ background: '#ac915fd2' }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '8px', background: 'grey', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
                        BIND WALLETS</motion.p>
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

    //start of bets
    function Bets() {
        return (
            <Stack style={{ width: '100%' }} justifyContent='start' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }} spacing={1}>
                    <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
                        <Icon icon="material-symbols:casino-outline-sharp" width={24} height={24} style={{ color: 'white' }} />
                        <p style={{ fontWeight: '500', fontSize: '15px', color: '#C61F41' }}>Bets</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                <Stack className='accountinfo'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="mdi:receipt-text-pending" style={{ color: 'white' }} />
                            <p>Pending Bets</p></Stack>
                        <p style={{ color: 'rgba(245,186,79,1)' }}>0</p>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="mdi:store-complete-outline" style={{ color: 'white' }} />
                            <p>Settled Bets</p></Stack>
                        <p style={{ color: 'green' }}>0</p>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="mdi:cup-full" style={{ color: 'white' }} />
                            <p>Total Bets</p></Stack>
                        <p style={{ color: 'grey' }}>0</p>
                    </Stack>
                    <Divider sx={{ background: 'rgba(245,186,79,1)', color: 'rgba(245,186,79,1)' }} />
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <p>Total Wins</p>
                        <p style={{ color: 'blue' }}>0</p>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <p>Total Lost</p>
                        <p style={{ color: 'red' }}>0</p>
                    </Stack>
                </Stack>
            </Stack>
        );
    }
    //end of bets

    //start of referral
    function Referral() {
        return (
            <Stack style={{ width: '100%' }} justifyContent='start' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }} spacing={1}>
                    <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
                        <Icon icon="mdi:invite" width={24} height={24} style={{ color: 'white' }} />
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>Referrals</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                <Stack className='accountinfo'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="tdesign:link" style={{ color: 'white' }} />
                            <Stack direction='column'>
                                <p>Referral Link</p>
                                <p style={{ color: '#ad1c39', fontSize: '10px', fontWeight: '200' }}>https://sfcsports01.com/register/{users.newrefer}</p>
                                <p style={{ color: 'grey', fontSize: '10px', fontWeight: '200' }}>copy the above link and share to get more rewards</p>
                            </Stack>
                        </Stack>
                        <motion.div
                            whileHover={{ scale: 1.1, color: '#C61F41' }} whileTap={{ scale: 0.8, color: '#C61F41' }} style={{ color: '#FFFFFF' }}
                        >
                            <Icon icon="solar:copy-bold-duotone" width={24} height={24} onClick={() => {
                                navigator.clipboard.writeText('TLqT2eGy3t18wbmjTvhg3Up95oiC6VA54z');
                                toast.success('Referral link copied to clipboard');
                            }} />
                        </motion.div>
                    </Stack>
                    <Link href='/dashboard/referral/'>
                        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}
                        >
                            <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                                <Icon icon="mingcute:celebrate-line" style={{ color: 'white' }} />
                                <p>See All Referrals</p></Stack>
                            <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                        </Stack>
                    </Link>


                </Stack>
            </Stack>

        )
    }
    //end of referrals
    //start of security
    function Security() {
        return (
            <Stack style={{ width: '100%' }} justifyContent='start' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }} spacing={1}>
                    <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
                        <Icon icon="mdi:security" width={24} height={24} style={{ color: 'white' }} />
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>Security</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                <Stack className='accountinfo'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="ic:baseline-password" style={{ color: 'white' }} />
                            <p>Change Password</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>

                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}
                        onClick={() => {
                            router.push('/dashboard/codesetting')
                        }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="solar:key-broken" style={{ color: 'white' }} />
                            <p>Change Transaction Password</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>
                </Stack>
            </Stack>

        )
    }
    //end of security

    //start of vip
    function Vip() {
        return (
            <Stack style={{ width: '100%' }} justifyContent='center' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }}>
                    <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
                        <Icon icon="tabler:vip" width={24} height={24} style={{ color: 'white' }} />
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>VIP</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                <Stack className='accountinfo' justifyContent='center' alignItems='center' spacing={1}>
                    <Stack justifyContent='center' alignItems='center' direction='column' sx={{ minHeight: 'auto', padding: '8px' }}>

                        <DiamondIcon sx={{ width: '200px', height: '200px', color: viproyal[viplevel], backdropFilter: 'blur(10px)' }} />
                        <p variant='h3' sx={{ fontFamily: 'Poppins,sans-serif', color: viproyal[viplevel], opacity: 0.7 }}>VIP {viplevel}</p >

                        <Stack justifyContent='left' alignItems='left'>
                            <Stack>
                                <p style={{ fontFamily: 'Poppins,sans-serif' }}>Total Deposit</p >
                                <Stack direction='row' justifyContent='left' alignItems='center' spacing={2}>
                                    <BorderLinearProgress variant="determinate" value={(Number(rprogress.toFixed(2)) > 100) ? 100 : Number(rprogress.toFixed(2))} sx={{ width: '230px' }} />
                                    <p style={{ fontFamily: 'Poppins,sans-serif' }}>{(Number(rprogress.toFixed(2)) > 100) ? 100 : Number(rprogress.toFixed(2))}%</p >
                                </Stack>
                            </Stack>

                            <Stack>
                                <p style={{ fontFamily: 'Poppins,sans-serif' }}>Referrals</p >
                                <Stack direction='row' justifyContent='left' alignItems='center' spacing={2}>
                                    <BorderLinearProgress variant="determinate" value={(Number(cprogress.toFixed(2)) > 100) ? 100 : Number(cprogress.toFixed(2))} sx={{ width: '230px' }} />
                                    <p style={{ fontFamily: 'Poppins,sans-serif' }}>{(Number(cprogress.toFixed(2)) > 100) ? 100 : Number(cprogress.toFixed(2))}%</p >
                                </Stack>
                            </Stack>

                            <Stack>
                                <p style={{ fontFamily: 'Poppins,sans-serif' }}>Total</p >
                                <Stack direction='row' justifyContent='left' alignItems='center' spacing={2}>
                                    <BorderLinearProgress variant="determinate" value={(r1 + c1) / 2} sx={{ width: '230px' }} />
                                    <p style={{ fontFamily: 'Poppins,sans-serif' }}>{(r1 + c1) / 2}%</p >
                                </Stack>
                            </Stack>
                        </Stack>

                    </Stack>

                </Stack>
            </Stack>
        )
    }
    //end of vip

    //start of socials
    function Social() {
        return (
            <Stack style={{ width: '100%' }} justifyContent='start' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }} spacing={1}>
                    <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
                        <Icon icon="mdi:security" width={24} height={24} style={{ color: 'white' }} />
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>Socials & Support</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                <Stack className='accountinfo'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="ph:telegram-logo-light" style={{ color: 'white' }} />
                            <p>Telegram Group</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>

                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="mdi:customer-service" style={{ color: 'white' }} />
                            <p> Customer Care</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>

                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}
                        onClick={() => {
                            alert('Contact Customer Care')
                        }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="icons8:advertising" style={{ color: 'white' }} />
                            <p>Promotions</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>

                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}
                        onClick={() => {
                            alert('Contact Customer Care')
                        }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="mdi:faq" style={{ color: 'white' }} />
                            <p>FAQ</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>


                </Stack>
            </Stack>

        )
    }
    //end of socials

    const router = useRouter();
    return (
        <div className='backgrounds'>
            <Head>
                <title>Account</title>
                <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
                <link rel="icon" href="/icon512_rounded.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                        background: '#ad1c39',
                        color: '#fff',
                    },
                    iconTheme: {
                        primary: 'white',
                        secondary: 'rgba(194,127,8,1)',
                    },
                }}
            />
            <Stack direction="row" alignItems='center' sx={{ padding: '12px' }} spacing={1}>
                <p style={{ fontSize: '18px', fontWeight: '600', width: '100%', textAlign: 'center' }}>Account</p>
            </Stack>
            <Stack direction='column' alignItems='center'>
                <Stack className='accountinfo' direction='row' alignItems='center' spacing={2} style={{ padding: '8px' }}>
                    <div className='avatar'>
                        <Image src={users.profile ?? Avatar} alt="profile_pic" width={55} height={50} />
                    </div>
                    {/* textedUserInfo */}
                    <Stack justifyContent='center' className='acctext'>
                        <p style={{ fontWeight: '500', color: 'white' }}>{users.username}</p>
                        <p style={{ fontWeight: '200', color: 'white' }}>{users.email}</p>
                        <p style={{ fontWeight: '200', color: 'white' }}>{users.userId}</p>
                    </Stack>
                    <Stack>
                        <Swapic image={users.profile ?? Avatar} name={users.username} />
                    </Stack>
                </Stack>
                <AccountsBalance />
                <Vip />
                <Referral />
                <Bets />
                <Security />
                <Social />
            </Stack>
            <HomeBottom />
        </div>
    )
}
