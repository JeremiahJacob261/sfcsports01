// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
let apiKey = 'akpomoshi18+'; // your api key
export default async function handler(req, res) {
    const body = req.body;
    let userearnings = {};
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('username', body.name)
    let user = data[0];
    const { data: refer, error: errref } = await supabase
        .from('users')
        .select('*')
        .or(`refer.eq.${user.newrefer},lvla.eq.${user.newrefer},lvlb.eq.${user.newrefer}`)

        const { data: earner , error: earnerError } = await supabase
        .from('activa')
        .select('*')
        .eq('code', user.newrefer)
        .or(`type.eq.affbonus, type.eq.depbonus`)

        //get the the total amount of referral earnings
        let total = 0;
    for (let i = 0; i < earner.length; i++) { 
        //loop through the refer data and add up the user's referral earnings
        total += earner[i].amount;
        // this is the total amount of referral earnings
    }
    console.log(total);
    //end of the toatl amount of referrals earinings

    //next - get the total earnings according to each user
    for (let i = 0; i < refer.length; i++) {
        //filter the earner data according to the refer code
       const cuser = earner.filter(v => v.username === refer[i].username);
       console.log(cuser)
       let crefer = refer[i]['username'];
        //now - add up the user's earnings individually
        let ctotal = 0;
       for (let j = 0; j < cuser.length; j++) {
        ctotal += cuser[j].amount;
       }
       console.log(ctotal);
       userearnings = {...userearnings, [crefer]: ctotal};
    }
    //end of the total earnings according to each user
   console.log(userearnings);
    if (error) {
        console.log(error);
        return;
    }
    console.log(refer);

    res.status(200).json({
        'refdata': refer,
        'user': data[0],
        'totalearn': total,
        'userearnings': userearnings
    });

}