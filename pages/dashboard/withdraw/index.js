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
import Link from 'next/link';
export default function Withdraw() {
    const router = useRouter();
    const [wallet, setWallet] = useState('');
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState(1);
    useEffect(() => { 
        const getRef = async () => { 
            try{
 const { data, error } = await supabase
            .from('wallets')
            .select('*')
            .eq('username', localStorage.getItem('signNames'))
            setUsers(data);
            }catch(e){
console.log(e)
            }
           
        }
        getRef();
    }, [users])
    const testRoute = async () => {
        let test = await fetch('/api/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: users[0].username, pass: password, wallet: wallet, amount: parseFloat((amount * 1.05).toFixed(3)) })
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
        } else if(amount < 20){
            alert('Minimum amount to withdraw is 20 USDT')
            
        }else if(amount > 100){
            alert('Maximum amount to withdraw is 100 USDT')

        }else{
            testRoute();
        }
    }
    return (
        <div className="backgrounds" style={{ minHeight: '99vh', width: '100%' }}>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/account')
                }} />
                <Casing style={{ fontSize: '16px', fontWeight: '600' }}> Withdraw</Casing>
            </Stack>
            <Stack direction='column' alignItems='center' justifyContent='center' spacing={1} sx={{ padding: '12px', width: '100%', height: '100%' }}>
                <Stack direction='column' sx={{ width:'320px'}} spacing={2}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <Casing style={{ fontSize: '12px', fontWeight: '600' }}> Method</Casing>
                        <Casing style={{ fontSize: '12px', fontWeight: '600' }}>USDT(TRC20)</Casing>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <Casing style={{ fontSize: '12px', fontWeight: '600' }}> Amount</Casing>
                        <Casing style={{ fontSize: '12px', fontWeight: '600' }}> {amount ?? 0} USDT</Casing>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <Casing style={{ fontSize: '12px', fontWeight: '600' }}> Charge </Casing>
                        <Casing style={{ fontSize: '12px', fontWeight: '600' }}> {(amount * 0.05).toFixed(3) ?? 0} USDT</Casing>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <Casing style={{ fontSize: '12px', fontWeight: '600' }}> Total </Casing>
                        <Casing style={{ fontSize: '12px', fontWeight: '600' }}> { (amount * 1.05).toFixed(3) ?? 0} USDT</Casing>
                    </Stack>
                </Stack>
                <Stack spacing={2} sx={{ width: '310px' }}>
                    <Casing>Select Payment Method</Casing>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={method}
                            label="Select Payment Method"
                            onChange={(e) => {
                                setMethod(e.target.value);
                            }}
                            sx={{ color: 'black', backgroundColor: 'white' }}
                        >
                            <MenuItem value={1}>USDT (TRC20)</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack spacing={2} sx={{ width: '310px' }}>
                    <Casing>Select Wallet Address</Casing>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Payment Address</InputLabel>
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
                                            <MenuItem key={data.id} value={data.wallet}>{data.wallet}</MenuItem>

                                        )
                                    }

                                })
                            }
                            <MenuItem value={2}>ADD New Wallet Address</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack spacing={1} sx={{ width: '310px' }}>
                    <Casing>Amount(USDT)</Casing>
                    <TextField variant='standard' type='number' placeholder='Amount(USDT)' sx={{ color: 'black', background: 'white', padding: '8px', letterSpacing: '1px', input: { color: 'black', }, borderRadius: '5px' }}
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value)
                        }}
                    />
                </Stack>
                <Stack spacing={1} sx={{ width: '310px' }}>
                    <Casing>Transaction Password</Casing>
                    <TextField variant='standard' type='password' placeholder='Password' sx={{ color: 'black', background: 'white', padding: '8px', letterSpacing: '1px', input: { color: 'black', }, borderRadius: '5px' }}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </Stack>
                <Stack spacing={1} sx={{ width: '310px' }}>
                    <Casing>Confirm Transaction Password</Casing>
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
                    style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#C61F41', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                    WITHDRAW!</motion.p>
                <Link href='/dashboard/codesetting'>
                    <Casing style={{ color: 'greenyellow', fontSize: '12px', fontWeight: 'lighter', textDecoration: 'underline' }}>Set a transaction pin</Casing>

                </Link>
            </Stack>
        </div>
    )
}