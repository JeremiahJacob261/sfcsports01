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
import Translate from '@/pages/translator';

export default function Account({ vips }) {
    function t(text){
        return text;
       }

    const [users, setUser] = useState({});
    const [placed, setPlaced] = useState([]);
    useEffect(() => {

        if (!localStorage.getItem('signedIns')) {
            router.push('/login')
        }
        const GET = async () => {
            console.log('hello world')
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('username', localStorage.getItem('signNames'))
                setUser(data[0] ?? {});
                console.log(data)
            } catch (e) {
                console.log(e)
            }

        }
        GET();
        const Plc = async () => {
            try {
                const { data: place, error: perr } = await supabase
                    .from('placed')
                    .select()
                    .eq('username', localStorage.getItem('signNames'))
                    .limit(10)
                    .order('id', { ascending: false });
                setPlaced(place);
            } catch (e) {
                console.log(e)
            }
        }
        Plc();
    }, [])
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
                        setViplevel((users.totald < 50 || count < 3) ? '1' : (users.totald < 100 || count < 5) ? '2' : (users.totald < 200 || count < 8) ? '3' : (users.totald < 300 || count < 12) ? '4' : (users.totald < 500 || count < 15) ? '5' : (users.totald < 1000 || count < 20) ? '6' : '7');
                        let vipl = (users.totald < 50 || count < 3) ? '1' : (users.totald < 100 || count < 5) ? '2' : (users.totald < 200 || count < 8) ? '3' : (users.totald < 300 || count < 12) ? '4' : (users.totald < 500 || count < 15) ? '5' : (users.totald < 1000 || count < 20) ? '6' : '7';
                        setRProgress((parseInt(users.totald) / parseInt(viplimit[vipl])) * 100);
                        setCProgress((parseInt(count) / parseInt(vipclimit[vipl])) * 100);
                        setC1((parseFloat(((parseInt(count) / parseInt(vipclimit[vipl])) * 100).toFixed(2)) > 100) ? 100 : parseFloat(((parseInt(count) / parseInt(vipclimit[vipl])) * 100).toFixed(2)));
                        setR1((parseFloat(((parseInt(users.totald) / parseInt(viplimit[vipl])) * 100).toFixed(2)) > 100) ? 100 : parseFloat(((parseInt(users.totald) / parseInt(viplimit[vipl])) * 100).toFixed(2)));
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
        // GET();
        console.log(users.totald)

    }, [rprogress, cprogress, refCount, viplevel])
    //end of vip logics
    //wallets-balanace
    function AccountsBalance() {
        let balanace = users.balance ?? 0;
        return (
            <Stack style={{ width: '100%' }} justifyContent='center' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }}>
                    <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
                        <Icon icon="mdi:cash" width={24} height={24} style={{ color: 'white' }} />
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>{t("Wallet")}</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                {/* accountinfoandBalance */}
                <Stack className='accountinfo' justifyContent='center' alignItems='center' spacing={1}>
                    <p style={{ fontWeight: '600', fontSize: '24px', color: '#ac915fd2' }}>$ {balanace.toFixed(2)}</p>
                    <p style={{ fontWeight: '300', fontSize: '12px' }}>Account Balance</p>
                    <div className='new-concept'>
                        <motion.div onClick={()=>{   router.push('/dashboard/fund')   }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.7 }} className='new-icon'><Icon icon="icon-park-solid:add-mode" width="24" height="24"  style={{color: '#981FC0'}} /></motion.div>
                        <motion.div onClick={()=>{   router.push('/dashboard/withdraw')   }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.7 }} className='new-icon'><Icon icon="uil:money-withdrawal" width="24" height="24"  style={{color:  '#981FC0'}} /></motion.div>
                        <motion.div onClick={()=>{   router.push('/dashboard/transactions')   }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.7 }} className='new-icon'><Icon icon="grommet-icons:transaction" width="24" height="24"  style={{color:  '#981FC0'}} /></motion.div>
                        <motion.div onClick={()=>{   router.push('/dashboard/bind')   }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.7 }} className='new-icon'><Icon icon="mdi:wallet-plus-outline" width="24" height="24"  style={{color:  '#981FC0'}} /></motion.div>
                    </div>
                   
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
        const [betcount, setBetCount] = useState({});
        useEffect(() => {
            const betting = async () => {
                let test = await fetch('/api/bount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: localStorage.getItem('signNames') })
                }).then(data => {
                    return data.json();
                })
                if (test.status === 'success') {
                    setBetCount(test)
                } else {
                    console.log(test.message)
                }
            }
            betting();
        }, []);
        return (
            <Stack style={{ width: '100%' }} justifyContent='start' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }} spacing={1}>
                    <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
                        <Icon icon="material-symbols:casino-outline-sharp" width={24} height={24} style={{ color: 'white' }} />
                        <p style={{ fontWeight: '500', fontSize: '15px', color: '#981FC0' }}>Bets</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                <Stack className='accountinfo'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="mdi:receipt-text-pending" style={{ color: 'white' }} />
                            <p>Pending Bets</p></Stack>
                        <p style={{ color: 'rgba(245,186,79,1)' }}>{betcount.pending ?? 0}</p>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="mdi:store-complete-outline" style={{ color: 'white' }} />
                            <p>Settled Bets</p></Stack>
                        <p style={{ color: 'green' }}>{betcount.settled ?? 0}</p>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="mdi:cup-full" style={{ color: 'white' }} />
                            <p>Total Bets</p></Stack>
                        <p style={{ color: 'grey' }}>{betcount.all ?? 0}</p>
                    </Stack>
                    <Divider sx={{ background: 'rgba(245,186,79,1)', color: 'rgba(245,186,79,1)' }} />
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <p>Total Wins</p>
                        <p style={{ color: 'blue' }}>{betcount.wins ?? 0}</p>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <p>Total Lost</p>
                        <p style={{ color: 'red' }}>{betcount.lost ?? 0}</p>
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
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>{t("Referrals")}</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                <Stack className='accountinfo'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="tdesign:link" style={{ color: 'white' }} />
                            <Stack direction='column'>
                                <p>Referral Link</p>
                                <p style={{ color: '#981FC0', fontSize: '10px', fontWeight: '200' }}>https://Eplsports.com/register?refer={users.newrefer}</p>
                                <p style={{ color: 'grey', fontSize: '10px', fontWeight: '200' }}>{t("copytheabovelinkandsharetogetmorerewards")}</p>
                            </Stack>
                        </Stack>
                        <motion.div
                            whileHover={{ scale: 1.1, color: '#981FC0' }} whileTap={{ scale: 0.8, color: '#981FC0' }} style={{ color: '#FFFFFF' }}
                        >
                            <Icon icon="solar:copy-bold-duotone" width={24} height={24} onClick={() => {
                                navigator.clipboard.writeText('https://Eplsports.com/register?refer=' + users.newrefer);
                                toast.success('Referral link copied to clipboard');
                            }} />
                        </motion.div>
                    </Stack>
                    <Link href={'/dashboard/referral/?name=' + users.username}>
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
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}
                        onClick={() => {
                            router.push('/dashboard/changepassword')
                        }}
                    >
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1} onClick={() => {
                            router.push('/dashboard/changepassword')
                        }}>
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

        // const [vipcount, setVipcount] = useState({});
        let vipcount = vips;
        console.log(vips)
      

        return (
            <Stack style={{ width: '100%' }} justifyContent='center' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }}>
                    <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
                        <Icon icon="tabler:vip" width={24} height={24} style={{ color: 'white' }} />
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>{t("VIP")}</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                <Stack className='accountinfo' justifyContent='center' alignItems='center' spacing={1}>
                    <Stack justifyContent='center' alignItems='center' direction='column' sx={{ minHeight: 'auto', padding: '8px' }}>

                        <DiamondIcon sx={{ width: '200px', height: '200px', color: viproyal[vipcount.viplevel], backdropFilter: 'blur(10px)' }} />
                        <p variant='h3' sx={{ fontFamily: 'Poppins,sans-serif', color: viproyal[vipcount.viplevel], opacity: 0.7 }}>{t("VIP")} {vipcount.viplevel}</p >

                        <Stack justifyContent='left' alignItems='left'>
                            <Stack>
                                <p style={{ fontFamily: 'Poppins,sans-serif' }}>{t("TotalDeposit")}</p >
                                <Stack direction='row' justifyContent='left' alignItems='center' spacing={2}>
                                    <BorderLinearProgress variant="determinate" value={(parseFloat(vipcount.rprogress) > 100) ? 100 : parseFloat(vipcount.rprogress ?? 0)} sx={{ width: '230px' }} />
                                    <p style={{ fontFamily: 'Poppins,sans-serif' }}>{(parseFloat(vipcount.rprogress) > 100) ? 100 : parseFloat(vipcount.rprogress ?? 0)}%</p >
                                </Stack>
                            </Stack>

                            <Stack>
                                <p style={{ fontFamily: 'Poppins,sans-serif' }}>{t("Referrals")}</p >
                                <Stack direction='row' justifyContent='left' alignItems='center' spacing={2}>
                                    <BorderLinearProgress variant="determinate" value={(parseFloat(vipcount.cprogress) > 100) ? 100 : parseFloat(vipcount.cprogress) ?? 0} sx={{ width: '230px' }} />
                                    <p style={{ fontFamily: 'Poppins,sans-serif' }}>{(parseFloat(vipcount.cprogress)) > 100 ? 100 : parseFloat(vipcount.cprogress) ?? 0}%</p >
                                </Stack>
                            </Stack>

                            <Stack>
                                <p style={{ fontFamily: 'Poppins,sans-serif' }}>{t("Total")}</p >
                                <Stack direction='row' justifyContent='left' alignItems='center' spacing={2}>
                                    <BorderLinearProgress variant="determinate" value={parseFloat((vipcount.r1 + vipcount.c1).toFixed(2)) / 2} sx={{ width: '230px' }} />
                                    <p style={{ fontFamily: 'Poppins,sans-serif' }}>{parseFloat((vipcount.r1 + vipcount.c1).toFixed(2)) / 2}%</p >
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
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>{t("SocialsSupport")}</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                <Stack className='accountinfo'>
                    <Link href='https://t.me/+zuEJOr2THctiMzQ1'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="ph:telegram-logo-light" style={{ color: 'white' }} />
                            <p>{t("TelegramGroup")}</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>
                    </Link>

                    <Link href='https://t.me/sfc_customerservice'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="mdi:customer-service" style={{ color: 'white' }} />
                            <p> {t("CustomerCare")}</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>
                    </Link>

                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}
                        onClick={() => {
                            router.push('/dashboard/promotion')
                        }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}
                        >
                            <Icon icon="icons8:advertising" style={{ color: 'white' }} />
                            <p>{t("Promotions")}</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>

                        <Link href='/faq'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}
                        >
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="mdi:faq" style={{ color: 'white' }} />
                            <p>FAQ</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>
                        </Link>

                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}
                        onClick={async () => {
                            //prompt the user to install pwa
                            let deferredPrompt;

                            window.addEventListener('beforeinstallprompt', (e) => {
                                e.preventDefault();
                                deferredPrompt = e;
                                showInstallPromotion();
                            });

                            //
                            if (!deferredPrompt) {
                                return;
                            }
                            const result = await deferredPrompt.prompt();
                            console.log(`Install prompt was: ${result.outcome}`);
                            deferredPrompt = null;

                        }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="material-symbols:install-mobile" color="wheat" width="24" height="24" />
                            <p>Install</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>

                </Stack>
            </Stack>

        )
    }
    //end of socials
    //start of exit
    function Exit() {
        return (
            <Stack style={{ width: '100%' }} justifyContent='start' alignItems='center'>
                <Stack sx={{ width: '100%', padding: '8px' }} spacing={1}>
                    <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
                        <Icon icon="mdi:security" width={24} height={24} style={{ color: 'white' }} />
                        <p style={{ fontWeight: '500', fontSize: '15px' }}>Exit</p>
                    </Stack>
                    <Divider sx={{ background: 'white', color: 'white' }} />
                </Stack>
                <Stack className='accountinfo'>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }} onClick={() => {
                        const { data, error } = supabase.auth.signOut();
                        localStorage.clear();
                        console.log('sign out')
                        router.push('/login')
                    }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1} onClick={() => {
                            const { data, error } = supabase.auth.signOut();
                            localStorage.clear();
                            console.log('sign out')
                            router.push('/login')
                        }}>
                            <Icon icon="solar:exit-bold-duotone" style={{ color: 'white' }} />
                            <p>{t("LOGOUT")}</p></Stack>
                        <Icon icon="mdi:chevron-right" width={24} height={24} style={{ color: 'white' }} />
                    </Stack>
                </Stack>
            </Stack>

        )
    }
    //end of exit
    const router = useRouter();
    return (
        <Stack alignItems="center" className='backgrounds'>
            <Head>
                <title>{t("Account")}</title>
                <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
                <link rel="icon" href="/logo.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                        background: '#981FC0',
                        color: '#fff',
                    },
                    iconTheme: {
                        primary: 'white',
                        secondary: 'rgba(194,127,8,1)',
                    },
                }}
            />
            <Stack direction="row" alignItems='center' sx={{ padding: '12px' }} spacing={1}>
                <p style={{ fontSize: '18px', fontWeight: '600', width: '100%', textAlign: 'center' }}>{t("Account")}</p>
            </Stack>
            <Stack direction='column' alignItems='center'>
                <Stack className='accountinfo' direction='row' alignItems='center' spacing={2} style={{ padding: '8px' }}>
                    <div className='avatar'>
                        <Image src={users.profile ?? Avatar} alt="profile_pic" width={60} height={60} style={{ borderRadius: "10px" }} />
                    </div>
                    {/* textedUserInfo */}
                    <Stack justifyContent='center' className='acctext'>
                        <p style={{ fontWeight: '500', color: 'white' }}>{users.username}</p>
                        <p style={{ fontWeight: '200', color: 'white' }}>{users.email}</p>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <p style={{ fontWeight: '200', color: 'white' }}>{users.uid}</p>
                            <motion.div
                                whileHover={{ scale: 1.1, color: '#981FC0' }} whileTap={{ scale: 0.8, color: '#981FC0' }} style={{ color: '#FFFFFF' }}
                            >
                                <Icon icon="solar:copy-bold-duotone" width={15} height={15} onClick={() => {
                                    navigator.clipboard.writeText(users.uid);
                                    toast.success('UID copied to clipboard');
                                }} />
                            </motion.div>
                        </Stack>
                    </Stack>
                    <Translate/>
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
                <Exit />
            </Stack>
            <HomeBottom />
        </Stack>
    )
}
export async function getServerSideProps(context) {
    const id = context.query.id;
    const { locale } = context;
   
    try {
        const { data: user, error: uerror } = await supabase
        .from('users')
        .select('*')
        .eq('username', id)
    let users = user[0];
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
        const { count, error } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .match({
                'refer': user[0].newrefer,
                'firstd': true
            });
        console.log(count)
        let refCount = count;
        let vipl = (users.totald < 50 || count < 3) ? '1' : (users.totald < 100 || count < 5) ? '2' : (users.totald < 200 || count < 8) ? '3' : (users.totald < 300 || count < 12) ? '4' : (users.totald < 500 || count < 15) ? '5' : (users.totald < 1000 || count < 20) ? '6' : '7';

        let viplevel = (users.totald < 50 || count < 3) ? '1' : (users.totald < 100 || count < 5) ? '2' : (users.totald < 200 || count < 8) ? '3' : (users.totald < 300 || count < 12) ? '4' : (users.totald < 500 || count < 15) ? '5' : (users.totald < 1000 || count < 20) ? '6' : '7';
        let rprogress = (parseInt(users.totald) / parseInt(viplimit[vipl])) * 100;
        //tests
        // console.log(users.totald)
        //end
        let cprogress = (parseInt(count) / parseInt(vipclimit[vipl])) * 100;
        let c1 = (parseFloat(((parseInt(count) / parseInt(vipclimit[vipl])) * 100).toFixed(2)) > 100) ? 100 : parseFloat(((parseInt(count) / parseInt(vipclimit[vipl])) * 100).toFixed(2));
        let r1 = (parseFloat(((parseInt(users.totald) / parseInt(viplimit[vipl])) * 100).toFixed(2)) > 100) ? 100 : parseFloat(((parseInt(users.totald) / parseInt(viplimit[vipl])) * 100).toFixed(2));
        console.log(rprogress, cprogress, refCount, viplevel)
        let test = { status: 'success', refCount: parseFloat(refCount) ?? 0, viplevel: parseFloat(viplevel) ?? 0, rprogress: parseFloat(rprogress.toFixed(2)), cprogress: parseFloat(cprogress.toFixed(2)), c1: parseFloat(c1), r1: parseFloat(r1) }
        return {
            props: {
                vips: test,
               
            }
        }
    } catch (e) {
        console.log(e)
        return {
            props: {
                vips: {},
                
            }
        }
    }
}