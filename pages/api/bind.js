// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
export default async  function handler(req, res) {
    const body = req.body;
    const { data: users, error:warr } = await supabase
    .from('wallets')
    .select()
    .eq('username', body.name);
    if(users.length > 0){
        console.log('already binded')
        res.status(200).json([{'status':'Failed','message':'Wallet already binded'}]);
    }else{
        console.log('not binded')
    const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .match({ 'username': body.name });
                    console.log(data)
                    if(data[0].pin === body.pass){
                        const { data, error } = await supabase
                        .from('wallets')
                        .insert(
                          { username: body.name, wallet: body.wallet },
                        )
                        if(error){
                            console.log(error)
                        }else{
                            console.log(data)
                res.status(200).json([{'status':'Accepted','message':'Wallet binded successfully'}]);
                        }
                        
                    }else{
                        console.log('wrong password')
                        
                res.status(200).json([{'status':'Failed','message':'Wrong Transaction pin or password'}]);
                    }
                if (error) {
                    console.log(error);
                    return;
                }
}
}