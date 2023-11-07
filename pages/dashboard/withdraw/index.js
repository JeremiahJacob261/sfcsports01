import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Withdraw() {
    const router = useRouter();
    const [wallet, setWallet] = useState('')
    return (
        <div className="backgrounds" style={{ minHeight: '99vh', width: '100%' }}>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/account')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}> Withdraw</p>
            </Stack>
            <Stack direction='column' alignItems='center' justifyContent='center' spacing={1} sx={{ padding: '12px', width: '100%', height: '100%' }}>
                <p className='payment-options'>
                    USDT
                </p>
                <Stack spacing={1} sx={{ minWidth: '60vw' }}>
                    <p>Select Wallet Address</p>
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
                            <MenuItem value={2}>ADD New Wallet Address</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack spacing={1} sx={{ minWidth: '60vw' }}>
                    <p>Transaction Password</p>
                    <TextField variant='standard' type='password' placeholder='Password' sx={{ color: 'black', background:'white',padding:'8px',letterSpacing: '1px', input: { color: 'black', } }} />  
                </Stack>
            </Stack>
        </div>
    )
}