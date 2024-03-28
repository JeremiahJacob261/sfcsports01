import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion'
import Alertz from '@/pages/UIComponents/dialogs/alertz';
import { Alert } from 'react-bootstrap';
import Image from 'next/image';
import Bankbri from '@/public/bankbri.jpg'
import Tether from '@/public/tether.jpg'
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

    const options = [50,100,200,500,1000,2000,3000,5000];
    return (
        <div className="backgrounds" style={{ height: '100vh', width: 'auto' }}>

            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.push('/dashboard/')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Select Payment Method</p>
            </Stack>
            <Stack direction="column" sx={{ padding: '12px' }} spacing={2}>

                <Image src={Tether} width={100} height={100} alt="usdt" onClick={() => {
                    setMethod('usdt');
                }} />
                <Stack direction="row">
                    <p>Network : </p><p style={{ color: '#3F1052', fontWeight: 700 }}>  TRC20</p>
                </Stack>

                <div className='amount-hold'>
                    <p style={{ color: '#3F1052', fontWeight: 700 }}>Amount :</p>
                   <input 
                   className='amount-txt'
                   type='number'
                   value={amount} onChange={(e)=>{ 
                    setAmount(e.target.value)
                   }}/>
                </div>
                    <p>Note: Minimum Deposit is 10 USDT</p>
                   <div className='mapcontain'>
                    {
                        options.map((i)=>{
                            return <motion.p key={i} whileTap={{ scale:0.7}} className='inmap' onClick={()=>{
                                setAmount(i)
                            }}>{i}</motion.p>;
                        })
                    }
                    </div> 
                    <motion.p onClick={() => {
                      router.push('/dashboard/fund/address?met='+method);
                    // transaction();
                    localStorage.setItem('deposit-amount',amount)
                }}
                    whileTap={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 0.9 }}
                    whileHover={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 1.1 }}
                    style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#981FC0',border:'0.6px solid #3F1052', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                    DEPOSIT</motion.p>
            </Stack>
        </div>
    )
}