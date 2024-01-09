import { Icon } from '@iconify/react'
import { Stack, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Translate from '@/pages/translator';

export default function Claim() {
    const { t } = useTranslation('all')
    const router = useRouter();
    const [bonus, setBonus] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    useEffect(() => { 
        if (localStorage.getItem('userinfo') === null) {
            router.push('/login')
        }
        console.log(localStorage.getItem('userinfo'));
    }, [])
    const testRoute = async () => {
        let users = localStorage.getItem('signNames')
        console.log(users);
        let test = await fetch('/api/claim', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: users, pass: password, code: bonus })
        }).then(data => {
            return data.json();
        })
        console.log(test);
        if (test[0].status === 'Failed') {
            alert(test[0].message);

        } else {
            alert(test[0].message);
            router.push('/dashboard/promotion')
        }
    }
    const ClaimFunc = async () => {
        if (bonus === '') {
            alert(t('Pleaseenterbonuscode'));
            return;
        } else if (password === '') {
            alert(t('Pleaseenterpassword'));
            return;
        } else if(password !== confirmPassword){
            alert(t('Passworddoesnotmatch'));
            return;
        } else {
            testRoute();
        }
    }
    return (
        <div className="backgrounds" style={{ height: "99vh" }}>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/promotion')
                }} />
                <p className="text-sm text-gray-500">{t("ClaimSignUpBonus")}</p>
            </Stack>
            <Stack direction="column" justifyContent='center' alignItems="center" sx={{ padding: '8px', minWidth: '90vw' }} spacing={3}>
                <Stack direction="column">
                    <p>{t("BonusClaimCode")}</p>
                    <TextField placeholder="claim code" sx={{ background: 'white', minWidth: '90vw' }} value={bonus} onChange={(event) => {
                        setBonus(event.target.value);
                    }} />
                    <p style={{ fontSize: '10px', color: 'greenyellow' }}>{t("ContactCustomerCaretogetBonusclaimcode")}</p>
                </Stack>
                <Stack >
                    <p>{t("password")}</p>
                    <TextField placeholder={t("password")} sx={{ background: 'white', minWidth: '90vw' }}
                        value={password} onChange={(event) => {
                            setPassword(event.target.value);
                        }} />
                </Stack>
                <Stack>
                    <p>{t("confirmpassword")}</p>
                    <TextField placeholder={t("confirmpassword")} sx={{ background: 'white', minWidth: '90vw' }} value={confirmPassword} onChange={(event) => {
                        setConfirmPassword(event.target.value);
                    }} />
                </Stack>
                <motion.p onClick={() => {
                    ClaimFunc();
                }}
                    whileTap={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 0.9 }}
                    whileHover={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 1.3 }}
                    style={{ fontWeight: '500', fontSize: '14px', color: 'white', padding: '8px', background: '#C61F41', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                    {t("CLAIMBONUS")}</motion.p>
            </Stack>
        </div>
    )
}
export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['all']),
    },
})