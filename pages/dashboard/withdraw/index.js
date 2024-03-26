import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { supabase } from '@/pages/api/supabase';
import { useState } from 'react';
import { motion } from 'framer-motion'
import { useEffect } from 'react';
import Link from 'next/link'; import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'all',
            ])),
            // Will be passed to the page component as props
        },
    }
}

export default function Withdraw() {
    const { t } = useTranslation('all')
    const router = useRouter();
    const [wallet, setWallet] = useState('');
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('USDT (TRC20)');
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
    const testRoute = async () => {
        let test = await fetch('/api/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: users[0].username, pass: password, wallet: wallet, amount: parseFloat(amount), method: (method === 'USDT (TRC20)') ? 'usdt' : 'bankbri' })
        }).then(data => {
            return data.json();
        })
        console.log(test);
        if (test[0].status === 'Failed') {
            alert(test[0].message);
            if (test[0].message === 'No transaction pin has been set') {
                router.push('/dashboard/codesetting')
            }
        } else {

            router.push('/dashboard/withdraw/success')
        }

    }
    const transaction = async () => {
        if (method === 'USDT (TRC20)') {
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
            } else if (amount < 20) {
                alert('Minimum amount to withdraw is 20 USDT')

            } else if (amount > 100) {
                alert('Maximum amount to withdraw including charges is 100 USDT')

            } else {
                testRoute();
            }
        } else {
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
            } else if (amount < 31000) {
                alert('Minimum amount to withdraw is 20 USDT or 31000 IDR')

            } else if (amount > 155000) {
                alert('Maximum amount including charges to withdraw is 100 USDT or 155000 IDR')

            } else {
                testRoute();
            }
        }
    }
    function MenuShow() {
        if(users && users.length) {
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
                                        <MenuItem key={data.id} value={data.wallet}>{data.wallet} - {(data.method === 'bankbri') ? 'IDR (Bank BRI)' : 'USDT (TRC20)'}</MenuItem>

                                    )
                                }

                            })
                        }
                        <MenuItem value={2}>ADD New Wallet Address</MenuItem>
                    </Select>
                </FormControl>

            )
        } else {
            return(
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
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> {(method === 'USDT (TRC20)') ? amount + " USDT" : amount + " IDR"}</p>
                    </Stack>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> {t("Charge")} </p>
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> {(method === 'USDT (TRC20)') ? (amount * 0.08).toFixed(3) + " USDT" : (amount * 0.08).toFixed(3) + " IDR"}</p>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> Expected Amount </p>
                        <p style={{ fontSize: '12px', fontWeight: '600' }}> {(method === 'USDT (TRC20)') ? (amount * 0.92).toFixed(3) + " USDT" : (amount * 0.92).toFixed(3) + " IDR"}</p>
                    </Stack>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ display: (method === 'USDT (TRC20)') ? 'none' : 'visible' }}>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: 'whitesmoke' }}> Expected Amount in USDT</p>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: 'whitesmoke' }}>{(parseFloat((amount * 0.92).toFixed(3)) / 1550).toFixed(3)} USDT</p>
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
                            sx={{ color: 'black', backgroundColor: 'white' }}
                        >
                            <MenuItem value='USDT (TRC20)'>USDT (TRC20)</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack spacing={2} sx={{ width: '310px' }}>
                    <p>{t("SelectWalletAddress")}</p>
                    <MenuShow />
                </Stack>
                <Stack spacing={1} sx={{ width: '310px' }}>
                    <p>{t("Amount")}</p>
                    <TextField variant='standard' type='parseFloat' placeholder='Amount' sx={{ color: 'black', background: 'white', padding: '8px', letterSpacing: '1px', input: { color: 'black', }, borderRadius: '5px' }}
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value)
                        }}
                    />
                </Stack>
                <Stack spacing={1} sx={{ width: '310px' }}>
                    <p>{t("TransactionPassword")}</p>
                    <TextField variant='standard' type='password' placeholder='Password' sx={{ color: 'black', background: 'white', padding: '8px', letterSpacing: '1px', input: { color: 'black', }, borderRadius: '5px' }}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </Stack>
                <Stack spacing={1} sx={{ width: '310px' }}>
                    <p>{t("ConfirmTransactionPassword")}</p>
                    <TextField variant='standard' type='password' placeholder='Confirm Password' sx={{ color: 'black', background: 'white', padding: '8px', letterSpacing: '1px', input: { color: 'black', }, borderRadius: '5px' }}
                        value={cpassword}
                        onChange={(e) => {
                            setCPassword(e.target.value)
                        }}
                    />
                </Stack>
                <motion.p onClick={() => {
                    //   router.push('/dashboard/fund/success')
                    transaction();
                }}
                    whileTap={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 0.9 }}
                    whileHover={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 1.1 }}
                    style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#981FC0', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                    {t("WITHDRAW")}!</motion.p>
                <Link href='/dashboard/codesetting'>
                    <p style={{ color: 'greenyellow', fontSize: '12px', fontWeight: 'lighter', textDecoration: 'underline' }}>{t("Setatransactionpin")}</p>

                </Link>
            </Stack>
        </div>
    )
}