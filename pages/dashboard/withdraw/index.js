import { Icon } from '@iconify/react';
import { Stack, TextField, Backdrop } from '@mui/material';
import { useRouter } from 'next/router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { supabase } from '@/pages/api/supabase';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image'
import LOGO from '@/public/logo.png'
import { motion } from 'framer-motion'
import { useEffect } from 'react';
import Link from 'next/link'; 

export default function Withdraw() {
    function t(text) {
        return text;
    }
    const router = useRouter();
    const [wallet, setWallet] = useState('');
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState('');
    const [walletinfo, setWalletInfo] = useState({});
    const [cpassword, setCPassword] = useState('');
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('USDT (TRC20)');

    const [drop, setDrop] = useState(false);
    const handleToggleOpen = (page) => {
        setDrop(true);


        console.log('open')
    };
    const handleToggleClose = () => {
        setDrop(false);
        console.log('close')
    };
    const methodmin = {
        'USDT (TRC20)': 15,
        'IDR': 243750,
        'PKR': 279 * 15
    }

    const methodmax = {
        'USDT (TRC20)': 100,
        'IDR': 1625000,
        'PKR': 279 * 100
    }

    const rate = {
        'USDT (TRC20)': 1,
        'IDR': 16250,
        'PKR': 279
    }
    let amountlimit = {
        '1': 20,
        '2': 50,
        '3': 100,
        '4': 200,
        '5': 300,
        '6': 500,
        '7': 1000
    }

    let amountlimitx = {
        '1': 16250 * 20,
        '2': 16250 * 50,
        '3': 16250 * 100,
        '4': 16250 * 200,
        '5': 16250 * 300,
        '6': 16250 * 500,
        '7': 16250 * 1000
    }

    let amountlimity = {
        '1': 279 * 20,
        '2': 279 * 50,
        '3': 279 * 100,
        '4': 279 * 200,
        '5': 279 * 300,
        '6': 279 * 500,
        '7': 279 * 1000
    }
    const getVip = async () => {
        let test = await fetch('/api/vipcalculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': localStorage.getItem('signNames') })
        }).then(data => {
            return data.json();
        })
        return test;
    }

    useEffect(() => {
        const getRef = async () => {
            try {
                const { data, error } = await supabase
                    .from('wallets')
                    .select('*')
                    .eq('username', localStorage.getItem('signNames'))
                setUsers(data);
            } catch (e) {
                console.log(e)
            }

        }
        getRef();
    }, [])
    const testRoute = () => {
        const aayncer = async () => {
            try {
                getVip().then(async (data) => {
                    let viplevel = data.viplevel;
                    console.log(amountlimit[viplevel]);
                    //this sends data to the withdraw in backend


                    let test = await fetch('/api/withdraw', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: users[0].username, pass: password, wallet: wallet, amount: parseFloat(amount).toFixed(3), method: (method === 'USDT (TRC20)') ? 'usdt' : (method === 'PKR') ? 'pkr' : 'idr',
                            "bank": walletinfo.bank, "accountname": walletinfo.accountname, vipamount: (method === 'USDT (TRC20)') ? amountlimit[viplevel] : (method === 'PKR') ? amountlimity[viplevel] : amountlimitx[viplevel]
                        })
                    }).then(data => {

                        return data.json();
                    })
                    console.log(test);
                    if (test[0].status === 'Failed') {
                        alert(test[0].message);
                        if (test[0].message === 'No transaction pin has been set') {
                            router.push('/dashboard/codesetting')
                            handleToggleClose();
                        }
                        handleToggleClose();
                    } else {

                        router.push('/dashboard/withdraw/success')
                        handleToggleClose();
                    }
                })
            } catch (e) {
                console.log(e);
                handleToggleClose();
            } 


        }
        aayncer();

    }
    const transaction = () => {

        if (wallet === 1) {
            alert('Please select a wallet address')
        } else if (wallet === 2) {
            alert('Please add a wallet address')
        } else if (password === '') {
            alert('Please enter your password')
        } else if (cpassword === '') {
            alert('Please confirm your password')
        } else if (password !== cpassword) {
            alert('Password does not match')
        } else if (amount === '') {
            alert('Please enter amount')
        } else if (amount < methodmin[method]) {
            alert(`Minimum amount to withdraw is ${methodmin[method]} ${method}`)

        } else if (amount > methodmax[method]) {
            alert(`Maximum amount to withdraw including charges is ${methodmax[method]} ${method}`)

        } else {

            setDrop(true);
            testRoute();
        }
    }
    function MenuShow() {
        if (users && users.length) {
            return (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t("PaymentAddress")}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={wallet}
                        label="Select Payment Address"
                        onChange={(e) => {
                            setWallet(e.target.value);
                            if (e.target.value === 2) {
                                router.push('/dashboard/bind')
                            }

                        }}
                        sx={{ color: 'black', backgroundColor: 'white' }}
                    >
                        <MenuItem value={1}>Select Wallet Address</MenuItem>
                        {
                            users.map((data) => {
                                if (data.wallet !== '' && data.wallet !== null) {
                                    return (
                                        <MenuItem key={data.id} value={data.wallet}
                                            onClick={() => {
                                                setWalletInfo(data);
                                            }}
                                        >{data.wallet} - {(data.method === 'idr' || data.method === 'bca') ? 'IDR (Indonesia)' : (data.method === 'pkr') ? 'PKR (Pakistani)' : 'USDT (TRC20)'}</MenuItem>

                                    )
                                }

                            })
                        }
                        <MenuItem value={2}>ADD New Wallet Address</MenuItem>
                    </Select>
                </FormControl>

            )
        } else {
            return (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t("PaymentAddress")}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={wallet}
                        label="Select Payment Address"
                        onChange={(e) => {
                            setWallet(e.target.value);
                            if (e.target.value === 2) {
                                router.push('/dashboard/bind')
                            }

                        }}
                        sx={{ color: 'black', backgroundColor: 'white' }}
                    >
                        <MenuItem value={1}>Select Wallet Address</MenuItem>
                        <MenuItem value={2}>ADD New Wallet Address</MenuItem>
                    </Select>
                </FormControl>
            )
        }
    }

    return (
        <div className="backgrounds" style={{ minHeight: '99vh', width: '100%' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={drop}
            >
                 <CircularProgress color="inherit" />
            </Backdrop>

            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.push('/dashboard/')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}> {t("Withdraw")}</p>
            </Stack>
            <Stack direction='column' alignItems='center' justifyContent='center' spacing={1} sx={{ padding: '12px', width: '100%', height: '100%' }}>
                <Stack direction='column' sx={{ width: '320px' }} spacing={2}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> {t("Method")}</p>
                        <p style={{ fontSize: '12px', fontWeight: '600' }}>{method}</p>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> {t("Amount")}</p>
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> {(method === 'USDT (TRC20)') ? parseFloat(amount) + " USDT" : amount + " " + method}</p>
                    </Stack>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> {t("Charge")} </p>
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> {(method === 'USDT (TRC20)') ? parseFloat(parseFloat(amount) * 0.08).toFixed(3) + " USDT" : (amount * 0.08).toFixed(3) + " " + method}</p>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> Expected Amount </p>
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> {(method === 'USDT (TRC20)') ? parseFloat(amount * 0.92).toFixed(3) + " USDT" : (amount * 0.92).toFixed(3) + " " + method}</p>
                    </Stack>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ display: (method === 'USDT (TRC20)') ? 'none' : 'visible' }}>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: 'whitesmoke' }}> Expected Amount in USDT</p>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: 'whitesmoke' }}>{(parseFloat((amount * 0.92).toFixed(3)) / rate[method]).toFixed(3)} USDT</p>
                    </Stack>
                </Stack>
                <Stack spacing={2} sx={{ width: '310px' }}>
                    <p>{t("SelectPaymentMethod")}</p>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("PaymentMethod")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={method}
                            label="Select Payment Method"
                            defaultValue='USDT (TRC20)'
                            onChange={(e) => {
                                setMethod(e.target.value);

                            }}
                            sx={{ color: 'black', backgroundColor: 'grey' }}
                        >
                            <MenuItem value='USDT (TRC20)'>USDT (TRC20)</MenuItem>
                            <MenuItem value='IDR'>IDR (Indonesia)</MenuItem>
                            <MenuItem value='PKR'>PKR (Pakistani)</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack spacing={2} sx={{ width: '310px' }}>
                    <p>{t("SelectWalletAddress")}</p>
                    <MenuShow />
                </Stack>
                <Stack spacing={1} sx={{ width: '310px' }}>
                    <p>{t("Amount")}</p>
                    <TextField variant='standard' type='parseFloat' placeholder='Amount' sx={{ color: 'black', background: 'grey', padding: '8px', letterSpacing: '1px', input: { color: 'black', }, borderRadius: '5px' }}
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value)
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                </Stack>
                <Stack spacing={1} sx={{ width: '310px' }}>
                    <p>{t("Transaction Pin")}</p>
                    <TextField variant='standard' type='password' placeholder='Password' sx={{ color: 'black', background: 'grey', padding: '8px', letterSpacing: '1px', input: { color: 'black', }, borderRadius: '5px' }}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                </Stack>
                <Stack spacing={1} sx={{ width: '310px' }}>
                    <p>{t("ConfirmTransaction Pin")}</p>
                    <TextField variant='standard' type='password' placeholder='Confirm Password' sx={{ color: 'black', background: 'grey', padding: '8px', letterSpacing: '1px', input: { color: 'black', }, borderRadius: '5px' }}
                        value={cpassword}
                        onChange={(e) => {
                            setCPassword(e.target.value)
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                </Stack>
                <motion.p onClick={() => {
                    transaction();
                    //   router.push('/dashboard/fund/success')
                }}
                    whileTap={{ background: '#981FC0', color: '#3F1052', scale: 0.9 }}
                    whileHover={{ background: '#981FC0', color: '#3F1052', scale: 1.1 }}
                    style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#3F1052', border: '0.6px solid #3F1052', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                    {t("WITHDRAW")}</motion.p>
                <Link href='/dashboard/codesetting'>
                    <p style={{ color: 'greenyellow', fontSize: '12px', fontWeight: 'lighter', textDecoration: 'underline' }}>{t("Setatransactionpin")}</p>

                </Link>
            </Stack>
        </div>
    )
}