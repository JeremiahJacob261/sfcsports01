// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
let apiKey = 'akpomoshi18+'; // your api key
export default async  function handler(req, res) {
    const body = req.body;
    if(body.key !== apiKey){
        return res.status(401).json({message:'unauthorized'})
    }else{
    const { data, error } = await supabase
                    .from('notification')
                    .select('*')
                    .match({ 'username': body.name })
                    .limit(10);
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(data);

                res.status(200).json(data);
            }
}