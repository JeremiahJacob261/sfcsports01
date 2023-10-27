import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button,Stack } from '@mui/material';
import { wallet } from '@/crypto/wc'
export default function Home() {    
    const [addresst, setAddress] = useState('');
    const [amount, setAmount] = useState(0);
    const [reciept, setReciept] = useState('');
    const [authed, setAuthed] = useState(false);
    const sendTRX = async () => {
      console.log('started ...')
        let transaction = {
          from:addresst,
            to: reciept,
            amount: amount,
            message: 'Betting'
          };
          
        try {
            const signature = await wallet.signTransaction(transaction);
            console.log(signature);
            alert('Transaction sent successfully');
          } catch (error) {
            console.log(error);
          }
     };
     useEffect(() => { 
      const checkAuth = async () => {
        try {
          const { address } = await wallet.checkConnectStatus();
          console.log(address);
          setAddress(address)
          if(address){
            setAuthed(true);
            alert("Connected")
          }else{
            setAuthed(false);
          }
        } catch (err) {
          console.log(err);
        }
      };
      checkAuth();
     }, [authed]);
    return (
        <Stack direction='column' sx={{padding:'12px',background:'#FFFFFF'}} spacing={3}>
            <h1 style={{color:'black'}}>user address :{addresst}</h1>
            <TextField value={amount} placeholder='amouunt' onChange={(e)=>{ setAmount(e.target.value) }}/>
            <TextField value={reciept} placeholder='reciever' onChange={(e)=>{ setReciept(e.target.value) }}/>
            <Button onClick={()=>{ sendTRX()}}>sendTRX</Button>
        </Stack>
    )
}