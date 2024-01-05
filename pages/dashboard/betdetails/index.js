import { supabase } from "@/pages/api/supabase";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Head from "next/head";
 
import { useEffect, useState } from "react"; 
export default function BetDetails({ datas }) {
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
                <title>Bets Details: {datas.home} vs {datas.away}</title>
                <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
                <link rel="icon" href="/Sheffield_FC.svg.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/bets')
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#C61F41' }}>Bets Details</p>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems='center' sx={{ width: '100vw', padding: '8px' }} spacing={3}>
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
            <Stack direction="column" justifyContent="center" alignItems='center' sx={{ width: '100vw', padding: '8px' }} spacing={3}>
                <p className="betd-text">Time: {fulltime}</p>
                <p className="betd-text">Stake: {datas.stake} USDT</p>
                <p className="betd-text">Odds: {datas.odd}</p>
                <p className="betd-text">Bet market: {datas.market}</p><p className="betd-text">Match ID: {datas.match_id}</p>
                <p className="betd-text">Return: {datas.aim + datas.stake} USDT</p>
                <p className="betd-text">Profit: {datas.profit}</p>
                <p className="betd-text">Status: {(datas.won != 'null') ? 'Finished' : (stams+7200 < curren) ? 'Processing' :  (stams < curren) ? 'Ongoing' : 'Not Started'}</p>
                <p className="betd-text">Match Result: {resulta}</p>
                <p className="betd-text">Event Date and Time: {datas.date} {datas.time}</p>
                <p className="betd-text" style={{ color: 'goldenrod' }}>Bet Cancellation is currently unavailable: Contact Customer Care To Cancel your Bets</p>
                
            </Stack>
        </div>
    )
}
export async function getServerSideProps(context) {
    try {
        const id = context.query.id;
        const { data, error } = await supabase
            .from('placed')
            .select('*')
            .eq('betid', id)
        let datas = data[0];
        return {
            props: { datas }, // will be passed to the page component as props
        }
    } catch (error) {
        let datas = {};
        return {
            props: { datas }, // will be passed to the page component as props
        }
    }
}