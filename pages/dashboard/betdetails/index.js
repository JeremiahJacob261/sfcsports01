import { supabase } from "@/pages/api/supabase";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react"; 
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function BetDetails({ datas }) {
    const { t } = useTranslation('betdetails')
    const [resulta, setResulta] = useState('');
    const router = useRouter();
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
    let s = datas;
    let timers = datas.created_at;
    let date = new Date(timers);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let time = `${hours}:${minutes}`;
    let dates = `${day}/${month + 1}/${year}`;
    let fulltime = `${dates} ${time}`;
    let stams = Date.parse(s.date + " " + s.time) / 1000;
    let curren = new Date().getTime() / 1000;
    console.log(datas.won)
    useEffect(() => {
        if (!localStorage.getItem('signNames')) {
            router.push('/login')
        }
        const getRef = async () => {
            try {
                const { data, error } = await supabase
                    .from('bets')
                    .select('results')
                    .eq('match_id', datas.match_id)
                setResulta(data[0].results)
            } catch (e) {
                console.log(e)
            }
        }
        getRef();
    }, [])
    console.log(datas.won)
    return (
        <div className='backgrounds' sx={{ minHeight: '100vh', marginBottom: 0 }}>
            <Head>
                <title>{t("BetsDetails")}: {datas.home} vs {datas.away}</title>
                <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
                <link rel="icon" href="/logo.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/bets')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#981FC0' }}>{t("BetsDetails")}</p>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems='center' sx={{ width: '100%', padding: '8px' }} spacing={3}>
                <Stack direction='column' spacing={1} justifyContent="center" alignItems="center">
                    <Image src={datas.ihome} alt={datas.home} width={50} height={50} />
                    <p className="betd-text">{datas.home}</p>
                </Stack>
                <p>VS</p>
                <Stack direction='column' spacing={1} justifyContent="center" alignItems="center">
                    <Image src={datas.iaway} alt={datas.away} width={50} height={50} />
                    <p className="betd-text">{datas.away}</p>
                </Stack>
            </Stack>
            <Stack direction="column" justifyContent="center" alignItems='center' sx={{ width: '100%', padding: '8px' }} spacing={3}>
                <p className="betd-text">{t("Time")}: {fulltime}</p>
                <p className="betd-text">{t("Stake")}: {datas.stake} USDT</p>
                <p className="betd-text">{t("Odds")}: {datas.odd}</p>
                <p className="betd-text">{t("Betmarket")}: {datas.market}</p><p className="betd-text">Match ID: {datas.match_id}</p>
                <p className="betd-text">{t("Return")}: {datas.aim + datas.stake} USDT</p>
                <p className="betd-text">{t("Profit")}: {datas.profit}</p>
                <p className="betd-text">{t("Status")}: {(datas.won != 'null') ? 'Finished' : (stams+5400 < curren) ? 'Processing' :  (stams < curren) ? 'Ongoing' : 'Not Started'}</p>
                <p className="betd-text">{t("MatchResult")}: {resulta}</p>
                <p className="betd-text">{t("EventDateandTime")}: {datas.date} {datas.time}</p>
                <p className="betd-text" style={{ color: 'goldenrod' }}>Bet Cancellation is currently unavailable: Contact Customer Care To Cancel your Bets</p>
                
            </Stack>
        </div>
    )
}
export async function getServerSideProps(context) {
    
    const { locale } = context;
    try {
        const id = context.query.id;
        const { data, error } = await supabase
            .from('placed')
            .select('*')
            .eq('betid', id)
        let datas = data[0];
        return {
            props: { datas,...(await serverSideTranslations(locale, [
                'all','betdetails'
              ])), }, // will be passed to the page component as props
        }
    } catch (error) {
        let datas = {};
        return {
            props: { datas,...(await serverSideTranslations(locale, [
                'all',
              ])), }, // will be passed to the page component as props
        }
    }
}