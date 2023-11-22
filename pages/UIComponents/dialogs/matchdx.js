import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Icon, InlineIcon } from '@iconify/react';
import ball from '../../../public/ball.png'
import Image from 'next/image';
import { motion } from 'framer-motion';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { supabase } from '@/pages/api/supabase.js';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { useRouter } from 'next/router';
export default function MatchDx({ data }) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const handleOpen = () => setOpen(true);
    const [info, setInfo] = React.useState({});
    const handleClose = () => setOpen(false);
    const [picked, setPicked] = React.useState('');
    const [bottom, setBottom] = React.useState(false);
    const markets = {
        "nilnil": "0 - 0",
        "onenil": "1 - 0",
        "nilone": "0 - 1",
        "oneone": "1 - 1",
        "twonil": "2 - 0",
        "niltwo": "0 - 2",
        "twoone": "2 - 1",
        "onetwo": "1 - 2",
        "twotwo": "2 - 2",
        "threenil": "3 - 0",
        "nilthree": "0 - 3",
        "threeone": "3 - 1",
        "onethree": "1 - 3",
        "twothree": "2 - 3",
        "threetwo": "3 - 2",
        "threethree": "3 - 3",
        "otherscores": "Other"
    }
    const vip = {
        0: 0,
    };
    let viplevel = 0;
    let date = new Date(data.date);
    let month = date.toLocaleString('default', { month: 'short' });
    let year = date.getFullYear();
    let today = date.getDate();
    let fullDate = `${today} ${month}`;
    let time = data.time;
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', localStorage.getItem('signNames'))
            setInfo(data[0]);
            setBalance(data[0].balance);
        }

    }, []);


    function Draw() {
        const [stake, setStake] = useState(0);
        let tofal = Number((parseFloat(data[picked]) + vip[viplevel]).toFixed(3));
        let profit = parseFloat((stake * tofal) / 100);
        let expext = Number((parseFloat(stake) + profit).toFixed(3));
        console.log(profit)
        let ballx = parseFloat(balance.toFixed(3));
        return (
            <Drawer
                anchor='bottom'
                open={bottom}
                onClose={() => {
                    setBottom(false)
                }}
            >
                <Stack direction='column' spacing={2} style={{ background: '#E5E7EB', padding: '8px', minHeight: '100vh', paddingBottom: '12px' }}>
                    <Stack direction='row' sx={{ padding: '5px' }}>
                        <KeyboardArrowLeftOutlinedIcon onClick={() => {
                            setBottom(false)
                        }} />
                        <Typography sx={{ width: '100%', fontFamily: 'Poppins,sans-serif', textAlign: 'center' }}>Stake your bet</Typography>
                    </Stack>
                    <Stack direction='column' alignItems='center' justifyContent='center'>
                        <Typography style={{ color: 'black', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}>{(data.league === 'others') ? data.otherl : data.league} </Typography>
                        <Divider sx={{ background: 'black' }} />
                    </Stack>
                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={3}>
                        <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                            <Image src={data.ihome ? data.ihome : ball} width={50} height={50} alt='home' />
                            <Typography sx={{ textAlign: 'center', fontFamily: 'Poppins,sans-serif', color: 'black', fontSize: '12px', fontWeight: '100' }}>{data.home}</Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                            <Typography sx={{ textAlign: 'center', fontFamily: 'Poppins,sans-serif', color: 'black', fontSize: '14px', fontWeight: '100' }}>{time}</Typography>
                            <p>|</p>
                            <Typography sx={{ textAlign: 'center', fontFamily: 'Poppins,sans-serif', color: 'black', fontSize: '14px', fontWeight: '100' }}>{fullDate}</Typography>
                        </Stack>
                        <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                            <Image src={data.iaway ? data.iaway : ball} width={50} height={50} alt='away' />
                            <Typography sx={{ textAlign: 'center', fontFamily: 'Poppins,sans-serif', color: 'black', fontSize: '12px', fontWeight: '100' }}>{data.away}</Typography>
                        </Stack>

                    </Stack>
                    <Divider sx={{ background: 'black' }} />
                    <Stack direction='column' spacing={3}>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: 'bold', color: 'black' }}>Match ID</Typography>
                            <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: '500', color: 'black' }}>{data.match_id}</Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: 'bold', color: 'black' }}>Market</Typography>
                            <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: '500', color: 'black' }}>{markets[picked]}</Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: 'bold', color: 'black' }}>Odds</Typography>
                            <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: '500', color: 'black' }}>{tofal}</Typography>
                        </Stack>
                    </Stack>
                    <Divider sx={{ background: 'black' }} />
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: '300', color: 'black', width: '210px' }}>Enter the amount you wish to stake</Typography>
                        <Image src={ball} alt="deposit" width={87} height={32} onClick={() => {
                            router.push('/user/deposit')
                        }} />
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: '300', color: 'black' }}>Account Balance</Typography>
                        <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: '500', color: 'black' }}>{ballx} USDT</Typography>
                    </Stack>
                    <TextField variant="outlined" label='stake' type='number' sx={{ fontFamily: 'Poppins, sans-serif', padding: "10px", width: '100%', background: '#E5E7EB', color: '#03045E' }}
                        value={stake}
                        onChange={(e) => {
                            setStake(e.target.value)
                        }}
                    />
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: '300', color: 'black' }}>Profit</Typography>
                        <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: '500', color: 'black' }}>{profit} USDT</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: '600', color: 'black' }}>Expected Profit</Typography>
                        <Typography sx={{ fontFamily: 'Poppins,sans-serif', fontSize: '16', fontWeight: '600', color: 'black' }}>{expext} USDT</Typography>
                    </Stack>
                    <Button sx={{ fontFamily: 'Poppins,sans-serif', margin: '8px', fontSize: '16', fontWeight: '300', color: '#E5E7EB', background: "#03045E", padding: '10px' }}
                        onClick={() => {
                            if (stake - 1 < info.balance) {
                                if (stake < 1) {
                                    alert('You do not have sufficient balance for this transaction')
                                } else {
                                    handleClose()
                                    let balls = ballx - stake;
                                    const deductBet = async () => {
                                        const { error } = await supabase
                                            .from('users')
                                            .update({ balance: balls })
                                            .eq('username', info.username)
                                        console.log(error)
                                        setMessages("Bet Successful")
                                        handleClick();
                                    }
                                    const saveToDB = async () => {
                                        const { error } = await supabase
                                            .from('placed')
                                            .upsert({
                                                'match_id': data.match_id,
                                                'market': markets[picked],
                                                'username': info.username,
                                                'started': false,
                                                'stake': Number(stake),
                                                'profit': Number(((tofal * stake) / 100)).toFixed(2),
                                                'aim': profit,
                                                "home": data.home,
                                                "away": data.away,
                                                "time": data.time,
                                                "date": data.date,
                                                "odd": tofal,
                                                "ihome": data.ihome,
                                                "iaway": data.iaway
                                            })
                                        console.log(error)
                                    }
                                    const saveToUser = async () => {
                                        const { error } = await supabase
                                            .from('useractivity')
                                            .upsert({
                                                'type': 'bets',
                                                'amount': stake + (tofal * stake) / 100,
                                                'user': info.username,
                                                'match_id': display.matchId,
                                                'stake': Number(stake),
                                                'profit': Number(((tofal * stake) / 100)),
                                                'market': markets[picked]
                                            })
                                        console.log(error)
                                    }
                                    saveToUser();
                                    deductBet();
                                    saveToDB();
                                    Reads('readbet', stake);

                                    router.push('/user/matches');
                                }
                            } else {
                                alert("You do not have Enough USDT to Complete this BET");
                            }
                        }}
                    >
                        Place Bet
                    </Button>
                </Stack>
            </Drawer>
        )
    }
    return (
        <div>
            <Stack direction="column" key={data.match_id} sx={{ minWidth: '90vw', maxWidth: '310px' }} className='rowsofdata' justifyContent='center' spacing={1}
                onClick={() => {
                    handleOpen();
                }}>
                <Stack direction="row" style={{ color: 'grey' }}>{data.time} ID {data.match_id} {data.league}</Stack>
                <Stack direction="row" alignItems='center'>

                    <Stack direction='column' sx={{ width: '50%' }} spacing={1}>
                        <Stack direction='row' spacing={1}><Image src={data.ihome ?? ball} alt='home' width={20} height={20} /><p style={{ color: 'white' }} >{data.home}</p></Stack>
                        <Stack direction='row' spacing={1}><Image src={data.iaway ?? ball} alt="away" width={20} height={20} /><p style={{ color: 'white' }}>{data.away}</p></Stack>
                    </Stack>

                    <Stack direction="row" sx={{ width: '50%', height: '100%' }} spacing={2} alignItems='center' justifyContent='center'>
                        <p className='odds'>{data.onenil}</p>
                        <p className='odds'>{data.nilnil}</p>
                        <p className='odds'>{data.nilone}</p>
                    </Stack>
                </Stack>
                <Stack direction="row"></Stack>
            </Stack>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box className='history'>
                        <Draw />
                        <Stack direction="column" sx={{ width: '100vw', padding: '12px' }} justifyContent='center' alignItems="center">
                            {/* start of information stack */}
                            <p style={{ width: '100%', textAlign: 'center', color: 'greenyellow', background: 'grey' }}>{data.league}</p>
                            <Stack direction="row" spacing={2} sx={{ background: 'white', width: '100%', padding: '12px', color: 'black', borderRadius: '10px' }}>
                                <Stack direction="column" sx={{ width: '30%' }} spacing={1} className="homecolumn" justifyContent='center' alignItems="center">
                                    <Image src={data.ihome ?? ball} width={70} height={70} alt="home" />
                                    <p style={{ textAlign: 'center', color: 'black' }}>{data.home}</p>
                                </Stack>

                                <Stack direction="column" spacing={2} sx={{ width: '30%' }} className="timedisplaycolumn" justifyContent='center' alignItems="center">
                                    <p style={{ textAlign: 'center', color: 'black' }}>{time}</p>
                                    <p style={{ textAlign: 'center', color: 'black' }}>{fullDate}</p>
                                </Stack>

                                <Stack direction="column" sx={{ width: '30%' }} spacing={1} className="awaycolumn" justifyContent='center' alignItems="center">
                                    <Image src={data.iaway ?? ball} width={70} height={70} alt="away" />
                                    <p style={{ textAlign: 'center', color: 'black' }}>{data.away}</p>
                                </Stack>
                            </Stack>
                            {/* /end of information stack */}
                            {/* start of odds stack */}
                            <Stack direction='column' spacing={3} sx={{ height: 'auto' }}>
                                <Stack direction='row' alignItems='center' spacing={2}>
                                    <Image src={ball} width={24} height={24} alt='balls' />
                                    <Typography style={{ color: 'black', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}>Home Picks</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction='row' spacing={2} justifyContent='space-around'>
                                    <Stack direction='row' justifyContent='space-around' alignItems='center'
                                        sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}
                                        onClick={() => {
                                            setPicked('onenil')
                                            setBottom(true)
                                        }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>1-0</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.onenil) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                    <Stack direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }} onClick={() => {
                                        setPicked('twonil')
                                        setBottom(true)
                                    }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>2-0</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.twoone) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction='row' spacing={2} >
                                    <Stack direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}
                                        onClick={() => {
                                            setPicked('threenil')
                                            setBottom(true)
                                        }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>3-0</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.threenil) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                    <Stack direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}
                                        onClick={() => {
                                            setPicked('twoone')
                                            setBottom(true)
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>2-1</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.twoone) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction='row' spacing={2} >
                                    <Stack direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}
                                        onClick={() => {
                                            setPicked('threeone')
                                            setBottom(true)
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>3-1</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.threeone) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                    <Stack direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}
                                        onClick={() => {
                                            setPicked('threetwo')
                                            setBottom(true)
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>3-2</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.threetwo) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction='row' alignItems='center' spacing={2}>
                                    <Image src={ball} width={24} height={24} alt='balls' />
                                    <Typography style={{ color: 'black', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}>Away Picks</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction='row' spacing={2} justifyContent='space-around'>
                                    <Stack onClick={() => {
                                        setPicked('nilone')
                                        setBottom(true)
                                    }}
                                        direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>0-1</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.nilone) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                    <Stack direction='row' onClick={() => {
                                        setPicked('niltwo')
                                        setBottom(true)
                                    }} justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>0-2</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.niltwo) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction='row' spacing={2} >
                                    <Stack direction='row' onClick={() => {
                                        setPicked('nilthree')
                                        setBottom(true)
                                    }} justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>0-3</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.nilthree) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                    <Stack direction='row' onClick={() => {
                                        setPicked('onetwo')
                                        setBottom(true)
                                    }} justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>1-2</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.onetwo) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction='row' spacing={2} >
                                    <Stack onClick={() => {
                                        setPicked('onethree')
                                        setBottom(true)
                                    }} direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>1-3</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.onethree) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                    <Stack onClick={() => {
                                        setPicked('twothree')
                                        setBottom(true)
                                    }} direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>2-3</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.twothree) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction='row' alignItems='center' spacing={2}>
                                    <Image src={ball} width={24} height={24} alt='balls' />
                                    <Typography style={{ color: 'black', fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}>Draw Picks</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction='row' spacing={2} justifyContent='space-around'>
                                    <Stack onClick={() => {
                                        setPicked('nilnil')
                                        setBottom(true)
                                    }} direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>0-0</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(vip[viplevel] + parseFloat(data.nilnil)).toFixed(3)}</Typography>
                                    </Stack>
                                    <Stack onClick={() => {
                                        setPicked('oneone')
                                        setBottom(true)
                                    }} direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>1-1</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.oneone) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction='row' spacing={2} >
                                    <Stack onClick={() => {
                                        setPicked('twotwo')
                                        setBottom(true)
                                    }} direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>2-2</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.twotwo) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                    <Stack onClick={() => {
                                        setPicked('threethree')
                                        setBottom(true)
                                    }} direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>3-3</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.threethree) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction='row' spacing={2} >
                                    <Stack onClick={() => {
                                        setPicked('otherscores')
                                        setBottom(true)
                                    }} direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '5px', width: '96px', height: '40px', background: '#E6E8F3' }}>
                                        <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>Others</Typography>
                                        <Typography sx={{ fontSize: '16px', fontFamily: 'Poppins,sans-serif', fontWeight: '400', color: 'black' }}>{(parseFloat(data.otherscores) + vip[viplevel]).toFixed(3)}</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            {/* end of odds stack */}
                        </Stack>
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className='cancelbrnmatch'>
                            <Icon icon="iconoir:cancel" onClick={handleClose} width={24} height={24} style={{ color: 'white' }} />

                        </motion.div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}