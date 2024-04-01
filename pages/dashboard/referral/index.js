import { Icon } from '@iconify/react';
import { Stack, Divider, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { supabase } from '@/pages/api/supabase';
import { useState } from 'react';
import Avatar from '@/public/avatar.png'
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion'
import { useEffect } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import HomeBottom from '@/pages/UIComponents/bottomNav';
import Image from 'next/image';
import GoogleTranslate from '@/GoogleTranslate';
export default function Referral({ test,vips }) {
    const router = useRouter();
    // const [reforigin, setRefOrigin] = useState([]);
    const [refers, setRefer] = useState([]);
    const [selected, setSelected] = useState(0);
    // const [user, setUser] = useState({});
    // setUser(test.user)
    // setRefOrigin(test.refdata);
    // setRefer(test.refdata);
    let reforigin = test.refdata;
    let user = test.user;
    let totalearnings = test.totalearn;
    let userearnings = test.userearnings;
    const t = (txt) => {
        return txt;
    }
    const betSelectLogic = (index) => {
        setSelected(index);
        //return referral desired data
        let tofill = (index === 0) ? 'all' : (index === 1) ? 'refer' : (index === 2) ? 'lvla' : 'lvlb'
        try {

            if (tofill === 'all') {
                setRefer(reforigin);
            } else {
                const fill = reforigin.filter(i => i[tofill] === user.newrefer);
                setRefer(fill);
                console.log(fill)
            }

        } catch (e) {
            console.log(e)
        }
        console.log(tofill)
    }
    useEffect(() => {
        if (!localStorage.getItem('signedIns')) {
            router.push('/login')
        }
        const testRoute = async () => {
            let users = localStorage.getItem('signNames')
            console.log(users);
            let test = await fetch('/api/referral', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: users })
            }).then(data => {
                return data.json();
            })
            console.log(test);


        }
        // testRoute();
    }, [])
    function RefData() {
        if (refers && refers.length > 0) {
            let months = {
                0: 'Jan',
                1: 'Feb',
                2: 'March',
                3: 'April',
                4: 'May',
                5: 'June',
                6: 'July',
                7: 'Aug',
                8: 'Sept',
                9: 'Oct',
                10: 'Nov',
                11: 'Dec'
            }
            return (
                <Stack direction='column' alignItems='center' sx={{ minHeight: '90vh', padding: '12px' }} spacing={2}>
                    {
                        refers.map((t) => {
                            let date = new Date(t.crdate);
                            let dates = date.getDate() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getFullYear()
                            let month = months[date.getMonth()];
                            let time = date.getHours() + ':' + date.getMinutes()
                            let balance = t.balance ;
                            let username = t.username;
                            // userearnings[username].toFixed(3)
                            return (
                                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems='center' sx={{ padding: '8px',width:'370px' }} key={t.keyf}>
                                    <Image src={t.profile ?? Avatar} width={40} height={40} alt='rounds' />
                                    <Stack direction='column' alignItems='start' sx={{ width: '196px' }}>
                                        <Stack direction='row' alignItems='center' spacing={1} justifyContent='stretch'>
                                            <Typography style={{ color: 'white', fontFamily: 'Poppins,sans-serif', fontSize: '16px', fontWeight: '500' }}>{t.username}
                                            </Typography>
                                            <Typography sx={{ color: '#808080' }}>•</Typography>
                                            <Typography style={{ color: (user.newrefer === t.refer) ? '#793D20' : (user.newrefer === t.lvla) ? '#5E6172' : '#BE6D07', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '300' }}>
                                                {(user.newrefer === t.refer) ? 'Level 1' : (user.newrefer === t.lvla) ? 'Level 2' : 'Level 3'}
                                            </Typography>
                                        </Stack>
                                        <Typography style={{ color: 'white', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '500' }}>{dates} • {time}</Typography>

                                    </Stack>
                                    <Typography style={{ color: 'white', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '500',width:'80px' }}>$ {balance.toFixed(2)}</Typography>
                                </Stack>
                            )
                        })
                    }

                </Stack>
            )
        } else {
            return (

                <Stack justifyContent='center' alignItems='center' sx={{ width: '100%', height: '55vh' }}>
                    <p style={{ fontSize: '20px' }}>{t("No Data Avaliable")}</p>
                    <p style={{ color: 'grey' }}>{t("Please Check your internet connection")}</p>
                </Stack>
            )
        }
    }

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

    }, [rprogress, cprogress, refCount, viplevel])
    //end of vip logics

    //start of vip
    function Vip() {

        // const [vipcount, setVipcount] = useState({});
        let vipcount = vips ?? {};
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

                        <p style={{ fontFamily: 'Poppins,sans-serif',fontSize:'35px',fontWeight:700, color: "white", opacity: 0.7 }}>{t("VIP")} {vipcount.viplevel}</p >

                        <Stack justifyContent='left' alignItems='left'>
                            <Stack>
                                <p style={{ fontFamily: 'Poppins,sans-serif' }}>Total Deposit</p >
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


    return (
        <div className="backgrounds" style={{ width:'100vw', display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'center'}}>
            <Toaster/>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.push('/dashboard/')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>{t("Referral")}</p>
            </Stack>
                <Vip />
                <div className='new-concept' style={{ margin :'5px',width:'330px'}}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ padding: '8px' }}>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Icon icon="tdesign:link" style={{ color: 'white' }} />
                            <Stack direction='column'>
                                <p>Referral Link</p>
                                <p style={{ color: 'white', fontSize: '10px', fontWeight: '200' }}>https://epl-sports.com/register?refer={vips.newrefer}</p>
                                <p style={{ color: 'grey', fontSize: '10px', fontWeight: '200' }}>copy the above link and share to get more rewards</p>
                            </Stack>
                        </Stack>
                        <motion.div
                            whileHover={{ scale: 1.1, color: '#981FC0' }} whileTap={{ scale: 0.8, color: '#981FC0' }} style={{ color: '#FFFFFF' }}
                        >
                            <Icon icon="solar:copy-bold-duotone" width={24} height={24} onClick={() => {
                                navigator.clipboard.writeText('https://epl-sports.com/register?refer=' + vips.newrefer);
                                toast.success('Referral link copied to clipboard');
                            }} />
                        </motion.div>
                    </Stack>
                </div>
            <Stack direction="column" justifyContent="center" alignItems='center'>
            <p style={{ color:'whitesmoke', fontSize:'20px', width:'100%',textAlign:'center'}}>Total Commission : { totalearnings } USDT</p>
                <p style={{ color:'white', fontSize:'15px', width:'100%',textAlign:'center'}}>This is the total earnings made from downlines activities</p>
            </Stack>
            <Stack direction="row" sx={{ width: '100%', marginTop: '5px', padding: '6px' }} spacing={2} justifyContent='center' alignItems="center">
                <p className={(selected != 0) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(0) }}>{t("All Referral")} ({
                reforigin.length ?? 0
                })</p>
                <p className={(selected != 1) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(1) }}>{t("Level One")} {(selected === 1) ? `(${refers.length ?? 0})` : ''}</p>
                <p className={(selected != 2) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(2) }}>{t("Level Two")} {(selected === 2) ? `(${refers.length ?? 0})` : ''}</p>
                <p className={(selected != 3) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(3) }}>{t("Level Three")} {(selected === 3) ? `(${refers.length ?? 0})` : ''}</p>
            </Stack>
            <RefData />
            <HomeBottom/>
        </div>
    )
}
export async function getServerSideProps(context) {
    try {
        let id = context.query.name;
        let test = await fetch('https://www.epl-sports.com/api/referral', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: id })
        }).then(data => {
            return data.json();
        })
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
        let tests = { status: 'success',newrefer:users.newrefer, refCount: parseFloat(refCount) ?? 0, viplevel: parseFloat(viplevel) ?? 0, rprogress: parseFloat(rprogress.toFixed(2)), cprogress: parseFloat(cprogress.toFixed(2)), c1: parseFloat(c1), r1: parseFloat(r1) }
        console.log(tests)
        return {
            props: { test:test, vips:tests },

        };
    } catch (e) {
        console.log(e)
        let test = {};
        return {
            props: { test:test, vips:{} },

        };
    }

}