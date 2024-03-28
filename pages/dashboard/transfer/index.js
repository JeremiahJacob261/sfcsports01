import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'
import { useState, useRef } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { supabase } from '@/pages/api/supabase';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';
import LoadingBar from 'react-top-loading-bar'
import Image from 'next/image'
import Success from '@/public/success.png'
import Warn from '@/public/warn.png'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next'
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

export default function BindWallet() {
    const { t } = useTranslation('all');
    const [method, setMethod] = useState('USDT (TRC20)');
    const router = useRouter();
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [amount,setAmount] = useState("")
    const ref = useRef(null);
    //alerts
    const [ale, setAle] = useState('')
    const [open, setOpen] = useState(false)
    const [aleT, setAleT] = useState(false)
    const Alerted = (m, t) => {
        setOpen(true)
        setAle(m)
        setAleT(t)
    }
    //end of alerts
    const testRoute = async () => {
        ref.current.continuousStart();
        let test = await fetch('/api/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: name, pass: password, amount: amount })
        }).then(data => {
            return data.json();
        })
        console.log(test);
        if (test.status === 'failed') {
            alert(test.message);

            ref.current.complete();
        } else {

            router.push('/dashboard/transfer/success')
        }

    }
    const checkValid = () => {
        if (address === '') {
            Alerted('Please enter uid', false)
        } else if (password === '') {
            Alerted('Please enter password', false)
        } else if (confirmPassword === '') {
            Alerted('Please enter confirm password', false)
        } else if (password !== confirmPassword) {
            Alerted('Password and confirm password must be same', false)
        } else {
            testRoute();
        }
    }
    useEffect(() => {
        setName(localStorage.getItem('signNames'))
    }, [])
    return (
        <div className="backgrounds" style={{ minHeight: '99vh', width: '100%' }}>
            <Head>
                <title>E- Transfer</title>
            </Head>
            <Alerteds />
            <LoadingBar color="#f11946" ref={ref} />
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.back()
                }} />
                <p className="text-sm text-gray-500">{t("BINDWALLET")}</p>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ padding: '8px', width: '100%' }}>

                <Stack direction='column' alignItems='center' justifyContent='center' spacing={3} sx={{ padding: '12px' }}>
                    <p style={{ fontSize:'24px', color:'#F5F5F5'}}>Transfer Funds</p>
                    <form>

                        <div className='arrange-label'>
                            <label className='standard-label'>Recipient User Uid</label>
                            <input className='standard-input' placeholder='Uid' type='text' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                        </div>

                        <div className='arrange-label'>
                            <label className='standard-label'>Amount ($)</label>
                            <input className='standard-input' placeholder='amount' type='number' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                        </div>

                        <div className='arrange-label'>
                            <label className='standard-label'>Transaction Password</label>
                            <input className='standard-input' maxLength="6" placeholder='Transaction Password' type='number' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        <div className='arrange-label'>
                            <label className='standard-label'>Confirm Transaction Password</label>
                            <input className='standard-input' maxLength="6" placeholder='Confirm Transaction Password' type='number' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </div>
            </form>
            <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                <Icon icon="ph:info-light" color="#ad1c39" />
                <p style={{ color: 'greenyellow', fontSize: '12px', fontWeight: '200', maxWidth: '70%' }}>{t("TransactionThePasswordusedforwithdrawsisrequired")}</p>
            </Stack>
            <motion.p onClick={() => {
                //   router.push('/dashboard/fund/success')
                checkValid();
            }}
                whileTap={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 0.9 }}
                whileHover={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 1.1 }}
                style={{ fontWeight: '500',border:'0.6px solid #5f087c', fontSize: '12px', color: 'white', padding: '12px', background: '#981FC0', width: '280px', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
Transfer Funds</motion.p>
            <Link href='/dashboard/codesetting'>
                <p style={{ color: 'greenyellow', fontSize: '12px', fontWeight: 'lighter', textDecoration: 'underline' }}>{t("Setatransactionpin")}</p>

            </Link>
        </Stack>
                
              </Stack >
            </div >
    )
    function Alerteds() {
        return (
            <Modal
                open={open}
                onClose={() => {
                    if (aleT) {
                        setOpen(false)
                    } else {
                        setOpen(false)
                    }
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack alignItems='center' justifyContent='space-evenly' sx={{
                    background: '#E5E7EB', width: '290px', height: '330px', borderRadius: '20px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '12px'
                }}>
                    <Image src={aleT ? Success : Warn} width={120} height={120} alt='widh' />
                    <p id="modal-modal-title" style={{ fontSize: '20px', fontWeight: '500', color: 'black' }}>

                        {aleT ? 'Success' : 'Sorry!'}
                    </p>
                    <p id="modal-modal-description" style={{ mt: 2, color: 'black', fontSize: '16px', textAlign: 'center', fontWeight: '300' }}>
                        {ale}
                    </p>
                    <Divider sx={{ borderBottomWidth: '45px',background:'#5f087c' }} />
                    <p style={{ color: '#5f087c', padding: '8px', width: '100%', textAlign: 'center', cursor: 'pointer' }} onClick={() => {
                        if (aleT) {
                            setOpen(false)
                            router.push('/dashboard')
                        } else {

                            setOpen(false)
                        }
                    }}>OKAY</p>
                </Stack>

            </Modal>

        )
    }
}