// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
export default async function handler(req, res) {
    const body = req.body;
    const amountx = ( ) => {
         if(body.method === 'idr' || body.method === 'bca'){
           return parseFloat((parseFloat(body.amount)/16250).toFixed(3));
    }else{
            return body.amount;
    }
    }
   
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .match({ 'username': body.name });
    console.log(data)
    const { data: bets, error: err } = await supabase
        .from('placed')
        .select('*')
        .eq('username', body.name)
        if(body.name === "Hamza98"){
            res.status(200).json([{ 'status': 'Failed', 'message': 'Wrong password' }]);
        }else{
            
            if (bets.length > 5 ) {
                if (!data[0].codeset) {
        
                    console.log('no transaction pin has been set')
                    res.status(200).json([{ 'status': 'Failed', 'message': 'No transaction pin has been set' }]);
                } else if (data[0].pin != body.pass) {
                    console.log('wrong password')
        
                    res.status(200).json([{ 'status': 'Failed', 'message': 'Wrong password' }]);
                } else if (data[0].balance < amountx) {
                    console.log('insufficient funds')
                    res.status(200).json([{ 'status': 'Failed', 'message': 'Insufficient funds' }]);
        
                } else {
                    const { error } = await supabase
                        .from('notification')
                        .insert({ address: body.wallet, username: body.name, amount: (body.method === 'idr' || body.method === 'bca') ? parseFloat(parseFloat(body.amount / 16250).toFixed(3)) * 0.92 : parseFloat(body.amount) * 0.92, sent: 'pending', type: "withdraw", method: body.method,bank:body.bank,accountname:body.accountname })
                    try {
        
                        const { data, error } = await supabase
                            .rpc('withdrawer', { amount: amountx(), names: body.name })
                    } catch (e) {
                        console.log(e)
                    }
                    console.log('Success')
                    res.status(200).json([{ 'status': 'Success', 'message': 'Withdrawal Request as been sent' }]);
                    //08125733375
                }
                if (error) {
                    console.log(error);
                    return;
                }
            } else {
                console.log('You have not placed up to 5 bets')
                res.status(200).json([{ 'status': 'Failed', 'message': 'You have not placed up to 5 bets' }]);
            }

        }
}