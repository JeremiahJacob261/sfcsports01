import { Stack} from '@mui/material'
import { Icon } from '@iconify/react'
import { useState } from 'react'
export default function Transaction({transaction}) {
    const [selected, setSelected] = useState(0);
    const betSelectLogic = (index) => {
        setSelected(index);
        //return bet desired data
    }
    function ListedTransactions(){
    if(transaction){
        return(
            <div>hello world it works</div>
        )
    }else{
        return(
            <Stack justifyContent='center' alignItems='center' sx={{ width:'100%',minHeight:'80vh'}}>
            <p style={{ fontSize:'20px'}}>No Data Avaliable</p>
            <p style={{ color:'grey'}}>Please Check your internet connection</p>
          </Stack>
        )
    }
    }
    return(
        <div className="backgrounds">
            <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px',width:'100%'}} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard/account')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600'}}>Transactions</p>
            </Stack>
            <Stack direction="row" sx={{ width: '100%', marginTop: '5px', padding: '6px', background: 'rgb(27, 5, 9)' }} spacing={2} justifyContent='center' alignItems="center">
                <p className={(selected != 0) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(0) }}>All</p>
                <p className={(selected != 1) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(1) }}>Deposits</p>
                <p className={(selected != 2) ? 'betTab' : 'betTabSelected'} onClick={() => { betSelectLogic(2) }}>Withdrawals</p>
            </Stack>
           <ListedTransactions/>
        </div>
    )

}