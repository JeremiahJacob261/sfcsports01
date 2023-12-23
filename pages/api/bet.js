import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
export default async function handler(req, res) {
  const body = req.body;
  let username = body.username;
  let type = body.type;
  
   try{
    if(type === 'all'){
        console.log('all')
        const { data,error } = await supabase
        .from('placed')
        .select('*')
        .eq('username',username)
        .eq('won', 'null')
        .order('id', { ascending: false });
        console.log(data)
        res.status(200).json({ status: 'success',message:data })
    }else{
        console.log('null')
        const { data,error } = await supabase
    .from('placed')
    .select('*')
    .eq('username', username)
    .neq('won', 'null')
    .order('id', { ascending: false });
    console.log(data)
    res.status(200).json({ status: 'success',message:data })
    }
   }catch(e){
    res.status(500).json({ status: 'failed',message:e })
   }
  }