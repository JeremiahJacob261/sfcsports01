// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
export default async  function handler(req, res) {
    const body = req.body;
    const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .match({ 'username': body.name });
                    
                        console.log(data[0].password,body.pass,body.name,body.pin)
                    if(data[0].password === body.password){
                        const { data,error} = await supabase
                        .from('users')
                        .update(
                          {
                            'pin':body.pin,
                            'codeset':true
                          })
                        .eq('username',body.name);
                        if(error){
                            console.log(error)
                        }else{
                            console.log(data)
                        }
                        
                res.status(200).json([{'status':'Accepted','message':'Pin Set successfully'}]);
                    }else{
                        console.log('wrong password')
                        
                res.status(200).json([{'status':'Failed','message':'Wrong password'}]);
                    }
                if (error) {
                    console.log(error);
                    return;
                }
}