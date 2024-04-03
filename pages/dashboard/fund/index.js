import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Stack, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion'
import Alertz from '@/pages/UIComponents/dialogs/alertz';
import { Alert } from 'react-bootstrap';
import Image from 'next/image';
import Bankbri from '@/public/bankbri.jpg'
import Tether from '@/public/tether.jpg'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
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
export default function Fund() {
    const { t } = useTranslation('all')
    const router = useRouter();
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('usdt');
    const [met, setMet] = useState('none');
    const [v, setV] = useState('none');

    const options = [50, 100, 200, 500, 1000, 2000, 3000, 5000];
    return (
        <div className="backgrounds" style={{ height: '100vh', width: 'auto' }}>

            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.push('/dashboard/')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Select Payment Method</p>
            </Stack>
            <Stack direction="column" sx={{ padding: '12px' }} spacing={2}>

                <Stack direction='row' justifyContent='center' alignItems='center' sx={{ height: '58px', background: '#FBEFEF', borderRadius: '5px', padding: '16px', maxWidth: '344px' }} spacing={2}>
                    <PriorityHighRoundedIcon sx={{ color: '#E5E7EB', background: '#E94E55', width: '20px', height: '20px', borderRadius: '10px' }} />
                    <Typography sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '300', color: '#E94E55' }}>Please remember to include Transfer charges(gas fee) while making payment to the companys wallet.</Typography>
                </Stack>
                <div style={{ border: '0.6px solid #5f087c' ,width:'auto',padding:'12px'}}>
                    <Image src={Tether} width={100} height={100} alt="usdt" onClick={() => {
                        setMethod('usdt');
                        setV('visible');
                    }} />
                    <Stack direction="row">
                        <p>Network : </p><p style={{ color: '#3F1052', fontWeight: 700 }}>  TRC20</p>
                    </Stack>
                </div>

                    <div className='amount-hold'>
                        <input
                            className='amount-txt'
                            style={{ letterSpacing:2}}
                            type='number'
                            value={amount} onChange={(e) => {
                                setAmount(e.target.value)
                            }} />
                        <p style={{ color: '#3F1052', fontWeight: 700 }}>amount</p>
                    </div>
                    <p>Note: Minimum Deposit is 10 USDT</p>
                    <div className='mapcontain'>
                        {
                            options.map((i) => {
                                return <motion.p key={i} whileTap={{ scale: 0.7 }} className='inmap' onClick={() => {
                                    setAmount(i)
                                }}>{i}</motion.p>;
                            })
                        }
                    </div>
                    <Stack sx={{ width:'100%'}} alignItems="center">
                         <motion.p onClick={() => {
                       if(amount < 10){
                           
                       }else{
                        router.push('/dashboard/fund/address?met=' + method);
                        // transaction();
                        localStorage.setItem('deposit-amount', amount)
                       }
                    }}
                        whileTap={{ background: '#981FC0', color: '#3F1052', scale: 0.9 }}
                        whileHover={{ background: '#981FC0', color: '#3F1052', scale: 1.1 }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#3F1052', border: '0.6px solid #3F1052', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                        DEPOSIT</motion.p>
                    </Stack>
                   
               

            </Stack>
        </div>
    )
}