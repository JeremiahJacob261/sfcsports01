// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
export default async  function handler(req, res) {
    const body = req.body;
    const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .match({ 'username': body.name });
                    console.log(data)
                    if(!data[0].codeset){
                   
                        console.log('no transaction pin has been set')
                        res.status(200).json([{'status':'Failed','message':'No transaction pin has been set'}]);
                    }else if(data[0].pin !== body.pass){
                        console.log('wrong password')
                        
                res.status(200).json([{'status':'Failed','message':'Wrong password'}]);
                    }else if(data[0].amount < body.amount){
                        console.log('insufficient funds')
                        res.status(200).json([{'status':'Failed','message':'Insufficient funds'}]);

                    }else{
                        const { data, error } = await supabase
                        .rpc('withdrawer', { amount: amo1, names: dusername })
                        console.log('Success')
                        res.status(200).json([{'status':'Success','message':'Withdrawal Request as been sent'}]);

                    }
                if (error) {
                    console.log(error);
                    return;
                }
}