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
    const [method, setMethod] = useState('');
    const [met, setMet] = useState('none');

    return (
        <div className="backgrounds" style={{ height: '100vh', width: 'auto' }}>

            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/account')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>{t("FundAccount")}</p>
            </Stack>

            <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{ padding: '12px', margin: '8px', width: '100%', height: '100%' }}>
                <Stack direction='column' alignItems='center' justifyContent='center' spacing={3}>
                    
                    <p style={{ fontSize: '18px', fontWeight: '600px', color: 'rgba(194,127,8,1)' }}>{t("SelectPaymentMethod")}</p>
                    <p className='amun'>Amount in USDT: ${(method === 'bankbri') ?  (amount/1550).toFixed(3)  : amount}</p>
                    <Stack direction='row' alignItems='center' justifyContent='center' spacing={2}>
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.04 }}
                        >
                            <Image src={Tether} width={100} height={100} alt="payment_method" onClick={() => {
                                setMet('visible');
                                setMethod('usdt')
                            }} />
                        </motion.div>
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.04 }}
                        >
                            <Image src={Bankbri} width={100} height={150} alt="payment_method" onClick={() => {
                                // setMet('visible');
                                // setMethod('bankbri')
                                alert("Bank BRI Indonesia is not available at the moment")
                            }} />
                        </motion.div>
                    </Stack>
                </Stack>
                <Stack direction='column' spacing={2} alignItems='center' justifyContent='center' sx={{ display: met }}>
                    <p style={{ fontSize: '18px', display: met, fontWeight: '600px', color: 'rgba(194,127,8,1)' }}>{t("Amount")}</p>
                    <Stack direction='row' alignItems='center' justifyContent='center' sx={{ display: met }} spacing={2}>
                        <TextField variant='standard' type='parseFloat' placeholder='Amount' sx={{ display: met, color: 'white', background: '#ad1c39', padding: '8px', borderRadius: '5px', letterSpacing: '1px', input: { color: 'white', } }} value={amount} onChange={(e) => {
                            setAmount(e.target.value);
                        }} />
                        <p sx={{ display: met }}> {(method === 'bankbri') ? " IDR" : " USDT"}</p>
                    </Stack>

                    <Alertz amount={amount} method={method} sx={{ display: met }} />
                </Stack>
            </Stack>

        </div>
    )
}