import { Button } from '@mui/material';
import { useState } from 'react';
import TronWeb from 'tronweb';  
import CryptoUtils from '@tronscan/client/src/utils/crypto';
import TransactionUtils from '@tronscan/client/src/utils/transactionBuilder';
// import TronWeb
import  WalletQRCode  from '@/functions/walletqr';


const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io', // Mainnet
    privateKey: 'dffb7fbdae896c7683016871e3d7e30f037475f9e2048ef0e3d4feaae475ace9' // Uncomment and use if you want to sign transactions
});
export default function Payment(){
    const [address, setAddress] = useState(''); // [1]
    const [privateKey, setPrivateKey] = useState(''); // [2]
    const createWallet = async () => {
        try{
            tronWeb.createAccount().then(account => {
                console.log(`Address: ${account.address.base58}, Private Key: ${account.privateKey}`);
                setAddress(account.address.base58);
                setPrivateKey(account.privateKey);
                // Save the address and private key somewhere
               }).catch(error => {
                console.error('Error creating account:', error);
               });
        }catch(e){
            console.log(e);
        
        }
    }

    const estimateTransactionFee = async () => {

        async function getBandwidthPrice() {
            const response = await fetch('https://api.trongrid.io/wallet/getchainparameters');
            const data = await response.json();
            const bandwidthPrice = data.chainParameter[3].value / 1000000;
            return bandwidthPrice;
        }
        async function calculateTransactionFee(transaction) {
            const bandwidthPrice = await getBandwidthPrice();
            const txSize = transaction.raw_data.length / 2; // Convert hex to bytes
            const bandwidthPoints = txSize * bandwidthPrice;
            const totalFee = bandwidthPoints;
            return totalFee;
        }
                
        const transaction = await tronWeb.transactionBuilder.sendTrx("TLqT2eGy3t18wbmjTvhg3Up95oiC6VA54z", 200000);
        const fee = await calculateTransactionFee(transaction);
        // Sign the transaction
        console.log('Estimated fee:', fee);
        const signedTransaction = await tronWeb.trx.sign(transaction);

        // Broadcast the transaction
        // Broadcast the transaction
        try {
        const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
            console.log('Transaction broadcasted:', result);
        } catch (error) {
            console.error('Error broadcasting transaction:', error);
        }
    }
    // Example usage // 1 TRX
    
    return(
        <div>
            <h1>Payment</h1>
            <WalletQRCode address={address}/>
            <Button onClick={createWallet}>Create Wallet</Button>
            <Button onClick={()=>{
                
    estimateTransactionFee();
            }}>Checkfees Wallet</Button>

            </div>
    )
} 

// export async function getServerSideProps(context){

//     return{
//         props:{
//             address: 'address',
//             privateKey: 'privateKey'
//         }
//     }
// }