import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button,Stack } from '@mui/material';
import { adapter,tronWeb } from '@/crypto/adaptedwc'
export default function Home() {    
    const [addresst, setAddress] = useState('');
    const [amount, setAmount] = useState(0);
    const [reciept, setReciept] = useState('');
    const [authed, setAuthed] = useState(false);
   
    const sendTRX = async () => {
      console.log('started ...');
try {
   const unSignedTransaction = await tronWeb.transactionBuilder.sendTrx(reciept, amount, adapter.address);
// using adapter to sign the transaction
console.log(unSignedTransaction)
const signedTransaction = await adapter.signTransaction(unSignedTransaction);
// broadcast the transaction
console.log(signedTransaction)
await tronWeb.trx.sendRawTransaction(signedTransaction);
} catch (e) {
  
}

     
     };
     useEffect(() => { 
      
      // const checkAuth = async () => {
      //   try {
      //     const { address } = await wallet.checkConnectStatus();
      //     console.log(address);
      //     setAddress(address)
      //     if(address){
      //       setAuthed(true);
      //       alert("Connected")
      //     }else{
      //       setAuthed(false);
      //     }
      //   } catch (err) {
      //     console.log(err);
      //   }
      // };
      // checkAuth();
     }, [authed]);
    return (
        <Stack direction='column' sx={{padding:'12px',background:'#FFFFFF'}} spacing={3}>
            <h1 style={{color:'black'}}>user address :{addresst}</h1>
            <TextField value={amount} placeholder='amouunt' onChange={(e)=>{ setAmount(e.target.value) }}/>
            <TextField value={reciept} placeholder='reciever' onChange={(e)=>{ setReciept(e.target.value) }}/>
            <Button onClick={()=>{ sendTRX()}}>sendTRX</Button>
            <Button onClick={async()=>{ 
              // connect
              try{
            let as = await adapter.connect();
            console.log(as);
            
console.log(adapter.address);
              }catch(e){
                  console.log(e)
              }

            }}>connect</Button>
        </Stack>
    )
}