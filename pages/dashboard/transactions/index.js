import { Stack, Divider } from '@mui/material'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
export default function Transaction({ transaction }) {
    const router = useRouter();
    const [selected, setSelected] = useState(0);
    const [content, setContent] = useState([]);
    const [user, setUser] = useState({});
    const rate = {
        'usdt': 1,
        'idr': 16250,
        'bca':16250,
        'pkr': 279
    }
    const betSelectLogic = (index) => {
        setSelected(index);
        //return bet desired data
        let typer = {
            0: 'all',
            1: 'deposit',
            2: 'withdraw'
        };

        let usernam = localStorage.getItem('signNames');
        console.log(usernam)
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
            setContent(test.data);
            setUser(test.user)
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
            setContent(test.data);
            setUser(test.user)
        }
        testRoute();
    }, [])
    function ListedTransactions() {
        if (content && content.length > 0) {
            return (
                <Stack alignItems='center' sx={{ minHeight: '80vh' }}>
                    {
                        content.map((m) => {
                            let time = new Date(m.time);
                            let date = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
                            let hour = time.getHours();
                            let minute = time.getMinutes();
                            let sent = date + ' ' + hour + ':' + minute;
                            let stat = m.sent ?? 'pending';
                            let amountc = m.amount ?? 0;
                            let amountx = parseFloat(amountc).toFixed(2);
                            return (
                                <Stack sx={{ width:'100%',padding:'8px' }} direction='row' justifyContent='center' alignItems="center" spacing={3} key={m.uid}
                                 className='transactionrow'
                                 onClick={()=>{ console.log(m)}}
                                 >

                                    <Stack direction='column' spacing={1}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <p>Transaction Status: </p><p style={{ color: 'goldenrod', fontWeight: '500' }}>{(m.address === 'admin') ? m.method : stat}</p>
                                        </Stack>
                                        <Divider sx={{ background: 'grey' }} />
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <p>Transaction Type: </p><p>{m.type ?? 'unknown type'}</p></Stack>
                                        <Divider sx={{ background: 'grey' }} />
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <p>Amount: </p><p>{amountx} {(m.method === 'idr' || m.method === 'bca' || m.method === 'pkr') ? `${(m.method === 'idr' || m.method === 'bca') ? 'IDR' : 'PKR'} (${(parseFloat(amountx)/rate[m.method]).toFixed(2)}USDT)` : "USDT"}</p>
                                        </Stack>
                                        <Divider sx={{ background: 'grey' }} />
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <p>Transaction Currency: </p><p> {(m.method === 'idr' || m.method === 'bca') ? "IDR" : (m.method === 'pkr') ? "PKR" : "USDT"}</p>
                                        </Stack>
                                        <Divider sx={{ background: 'grey' }} />
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                          <p>Time: </p>  <p style={{ color: 'whitesmoke' }}>{sent}</p>
                                        </Stack>
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
        <div className="backgrounds" style={{ width:'100%', display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'center'}}>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.back()
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Transactions</p>
            </Stack>
            <Stack className='betspent' direction="row" justifyContent="space-between">
          <p>Total Deposits<br/>$ {parseFloat(user.totald).toFixed(2)}</p>
          <p>Total Withdraw<br/>$ {parseFloat(user.totalw).toFixed(2)}</p>
      </Stack>
            <Stack direction="row" sx={{ width: '100%', marginTop: '5px', padding: '6px' }} spacing={2} justifyContent='center' alignItems="center">
                <p className={(selected != 0) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(0) }}>All</p>
                <p className={(selected != 1) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(1) }}>Deposits</p>
                <p className={(selected != 2) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(2) }}>Withdrawals</p>
            </Stack>
            <ListedTransactions />
        </div>
    )

}