import { Stack } from '@mui/material'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
export default function Transaction({ transaction }) {
    const router = useRouter();
    const [selected, setSelected] = useState(0);
    const [content, setContent] = useState([]);
    const betSelectLogic = (index) => {
        setSelected(index);
        //return bet desired data
        let typer = {
            0: 'all',
            1: 'deposit',
            2: 'withdraw'
        };
        let usernam = localStorage.getItem('signNames');
        const testRoute = async () => {
            let test = await fetch('/api/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: usernam, type: typer[index], key: 'akpomoshi18+' })
            }).then(data => {
                return data.json();
            })
            console.log(test)
            setContent(test);
        }
        testRoute();
    }
    useEffect(() => {
        let usernam = localStorage.getItem('signNames');
        const testRoute = async () => {
            let test = await fetch('/api/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: usernam, type: 'all', key: 'akpomoshi18+' })
            }).then(data => {
                return data.json();
            })
            console.log(test)
            setContent(test);
        }
        testRoute();
    }, [])
    function ListedTransactions() {
        if (content && content.length > 0) {
            return (
                <Stack alignItems='center' sx={{ minHeight:'80vh'}}>
                    {
                        content.map((m) => {
                            let time = new Date(m.time);
                            let date = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
                            let hour = time.getHours();
                            let minute = time.getMinutes();
                            let sent = date + ' ' + hour + ':' + minute ;
                            let stat = m.sent ?? 'pending';
                            return (
                                <Stack direction='row' alignItems="center" spacing={3} key={m.uid} className='transactionrow'>
                                    <Icon width={45} height={45} icon={(m.type === 'deposit') ? "solar:arrow-down-broken" :'solar:arrow-up-broken'} 
                                    style={{color:(m.type === 'deposit') ? "green" :'red'}}/>
                                    <Stack direction='column'>
                                        <p style={{ color:'goldenrod',fontWeight:'500'}}>{(m.address === 'admin') ? "Reason: "+m.method : "Status: "+stat}</p>
                                        <p>{m.type ?? 'unknown type'}</p>
                                        <p>{(m.method === 'bankbri') ? (m.amount/1550).toFixed(3)  : m.amount} USDT</p>
                                        <p>Transaction Type: {(m.method === 'bankbri') ? "IDR"  : "USDT"}</p>
                                        <p style={{color:'grey'}}>{sent}</p> 
                                    </Stack>
                                </Stack>
                            )
                        })
                    }
                </Stack>
            )
        } else {
            return (
                <Stack justifyContent='center' alignItems='center' sx={{ width: '100%', minHeight: '80vh' }}>
                    <p style={{ fontSize: '20px' }}>No Data Avaliable</p>
                    <p style={{ color: 'grey' }}>Please Check your internet connection</p>
                </Stack>
            )
        }
    }
    return (
        <div className="backgrounds">
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.back()
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Transactions</p>
            </Stack>
            <Stack direction="row" sx={{ width: '100%', marginTop: '5px', padding: '6px', background: 'rgb(27, 5, 9)' }} spacing={2} justifyContent='center' alignItems="center">
                <p className={(selected != 0) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(0) }}>All</p>
                <p className={(selected != 1) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(1) }}>Deposits</p>
                <p className={(selected != 2) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(2) }}>Withdrawals</p>
            </Stack>
            <ListedTransactions />
        </div>
    )

}