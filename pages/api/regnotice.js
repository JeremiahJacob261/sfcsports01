// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
let apiKey = 'akpomoshi18+'; // your api key
export default async  function handler(req, res) {
    const body = req.body;
    const { data,error } = await supabase
    .from('users')
    .select()
    .eq('newrefer',body.ref)
    let user = data[0];
    const { error : arr } = await supabase
    .from('activa')
    .insert({
      'code':'refer',
      'username':user.username,
      'amount':0,
      'type':body.newname
    })
                if (error) {
                    console.log(error);
                    return;
                }
                if(arr){
                    console.log(arr)
                }
                res.status(200).json({
                    'Status':'Success',
                    'Message':'Notification was succesfully sent'
            });
            
}