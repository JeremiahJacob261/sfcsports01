// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
let apiKey = 'akpomoshi18+'; // your api key
export default async  function handler(req, res) {
    const body = req.body;
    function generateId() {
        return Math.random().toString(36).substring(2, 12);
     }
     
       
    const { data, error } = await supabase
          .from('users')
          .insert({
            uid:'uid_'+generateId(),
            userId: body.uidl,
            password: body.password,
            phone: body.phone,
            refer: body.refer,
            username: body.username,
            countrycode: body.age,
            newrefer: body.nref,
            lvla: body.lvla,
            lvlb: body.lvlb,
            email: body.email,
          })
                if (error) {
                    console.log(error);
                    return;
                }
               
                res.status(200).json({
                    'Status':'Success',
                    'Message':'Registeration was succesfully sent'
            });
            
}