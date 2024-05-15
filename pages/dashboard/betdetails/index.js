import { supabase } from "@/pages/api/supabase";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Head from "next/head";
import Tether from '@/public/tether.jpg'
import { useEffect, useState } from "react";

export default function BetDetails({ datas }) {
    function t(text){
        return text;
       }
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
        "otherscores": "Other",
        "hd": "Home or Draw",
        "ha": "Home or Away",
        "da": "Draw or Away"
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
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
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

            <div style={{ width:"100%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Stack direction="column" alignItems='center' justifyContent="space-between" spacing={3} className="betcover">
                <Stack direction="row" alignItems='center' justifyContent="space-between" spacing={3} sx={{ width: '340px' }}>

                    <Stack direction="column">
                        <p style={{ color:'#9506ce' }}>Bet Market</p>
                        <p style={{ color:'#9506ce' }}>Market Result</p>
                        <p style={{ color:'#9506ce' }}>Odds</p>
                        <p style={{ color:'#9506ce' }}>Time</p>
                        <p style={{ color:'#9506ce' }}>Match ID</p>
                    </Stack>
                    <Stack direction="column">
                        <p>{datas.market}</p>
                        <p>{resulta ?? 'unavailable'}</p>
                        <p>{parseFloat(datas.odd).toFixed(2)}</p>
                        <p>{fulltime}</p>
                        <p>{datas.match_id}</p>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems='center' justifyContent="space-between" spacing={2} sx={{ width: '340px' }}>
                    <Stack direction="column">
                        <p style={{ color:'#9506ce' }}>Stake</p>
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems={"center"}>
                           <p>$</p>
                              <p>{parseFloat(datas.stake).toFixed(2)}</p>
                        </Stack>
                      
                    </Stack>


                    <Stack direction="column">
                        <p style={{ color:'#9506ce' }}>Profit</p>
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems={"center"}>
                           <p>$</p>
                        <p>{parseFloat(datas.profit).toFixed(2)}</p>
                        </Stack>
                    </Stack>


                    <Stack direction="column">
                        <p style={{ color:'#9506ce' }}>Return</p>
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems={"center"}>
                           <p>$</p>
                        <p>{parseFloat(datas.stake + datas.aim).toFixed(2)}</p>
                        </Stack>
                    </Stack>

                    <Stack direction="column">
                        <p style={{ color:'#9506ce' }}>Status</p>
                        <p style={{ fontSize:'13px',padding:0}}>{(datas.won != 'null') ? 'Finished' : (stams + 5400 < curren) ? 'Pending' : (stams < curren) ? 'Ongoing' : 'Not Started'}</p>
                    </Stack>
                </Stack>
            </Stack>
            </div>
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
            props: {
                datas,
            }, // will be passed to the page component as props
        }
    } catch (error) {
        let datas = {};
        return {
            props: {
                datas,
            }, // will be passed to the page component as props
        }
    }
}