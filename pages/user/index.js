import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button,Stack } from '@mui/material';
import { wallet } from '@/crypto/wc'
export default function Home() {    
    const [address, setAddress] = useState(localStorage.getItem('address'));
    const [amount, setAmount] = useState(0);
    const [reciept, setReciept] = useState(null);
    const sendTRX = async () => {
        let transaction = {
            to: reciept,
            amount: amount,
            message: 'Betting'
          };
          
        try {
            const signature = await wallet.signTransaction(transaction);
            console.log(signature);
            alert('Transaction sent successfully');
          } catch (error) {
            console.log('signTransaction:' + error);
          }
     };
    return (
        <Stack direction='column' sx={{padding:'12px',background:'#FFFFFF'}} spacing={3}>
            <h1 style={{color:'black'}}>user address :{address}</h1>
            <TextField value={amount} placeholder='amouunt' onChange={(e)=>{ setAmount(e.target.value) }}/>
            <TextField value={reciept} placeholder='reciever' onChange={(e)=>{ setReciept(e.target.value) }}/>
            <Button onClick={()=>{ sendTRX()}}>sendTRX</Button>
        </Stack>
    )
}