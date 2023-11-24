// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
let apiKey = 'akpomoshi18+'; // your api key
export default async  function handler(req, res) {
    const body = req.body;
    const { data,error } = await supabase
    .from('users')
    .select()
    .eq('username',body.name)
    let user = data[0];
    const { data: refer, error: errref } = await supabase
    .from('users')
    .select('*')
    .or(`refer.eq.${user.newrefer},lvla.eq.${user.newrefer},lvlb.eq.${user.newrefer}`)
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(refer);

                res.status(200).json({
                    'refdata':refer,
                    'user':data[0]
            });
            
}