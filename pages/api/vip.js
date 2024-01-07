import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
export default async function handler(req, res) {
  const body = req.body;
  let username = body.username;
  
   try{
        //all
        const { data:user, error:uerror } = await supabase
        .from('users')
        .select('*')
        .eq('username',username)
        let users = user[0];
        try {

            const viplimit = {
                '1': 50,
                '2': 100,
                '3': 200,
                '4': 300,
                '5': 500,
                '6': 1000,
                '7': 5000
            };
            const vipclimit = {
                '1': 3,
                '2': 5,
                '3': 8,
                '4': 12,
                '5': 15,
                '6': 20,
                '7': 500
            };
            const { count, error } = await supabase
                .from('users')
                .select('*', { count: 'exact', head: true })
                .match({
                    'refer': users.newrefer,
                    'firstd': true
                });
                console.log(count)
            let refCount = count;
            let vipl = (users.totald < 50 || count < 3) ? '1' : (users.totald < 100 || count < 5) ? '2' : (users.totald < 200 || count < 8) ? '3' : (users.totald < 300 || count < 12) ? '4' : (users.totald < 500 || count < 15) ? '5' : (users.totald < 1000 || count < 20) ? '6' : '7';
           
            let viplevel = (users.totald < 50 || count < 3) ? '1' : (users.totald < 100 || count < 5) ? '2' : (users.totald < 200 || count < 8) ? '3' : (users.totald < 300 || count < 12) ? '4' : (users.totald < 500 || count < 15) ? '5' : (users.totald < 1000 || count < 20) ? '6' : '7';
            let rprogress = (parseInt(users.totald) / parseInt(viplimit[vipl])) * 100;
            //tests
// console.log(users.totald)
            //end
            let cprogress = (parseInt(count) / parseInt(vipclimit[vipl])) * 100;
            let c1 = (Number(((parseInt(count) / parseInt(vipclimit[vipl])) * 100).toFixed(2)) > 100) ? 100 : Number(((parseInt(count) / parseInt(vipclimit[vipl])) * 100).toFixed(2));
            let r1 = (Number(((parseInt(users.totald) / parseInt(viplimit[vipl])) * 100).toFixed(2)) > 100) ? 100 : Number(((parseInt(users.totald) / parseInt(viplimit[vipl])) * 100).toFixed(2));
            console.log(rprogress, cprogress, refCount, viplevel)
        res.status(200).json({ status: 'success',refCount:refCount,viplevel:parseFloat(viplevel),rprogress:parseFloat(rprogress.toFixed(2)),cprogress:parseFloat(cprogress.toFixed(2)),c1:parseFloat(c1),r1:parseFloat(r1) })
   
        } catch (e) {
            console.log(e)
        }}catch(e){
    res.status(500).json({ status: 'failed',message:e })
   }
  }