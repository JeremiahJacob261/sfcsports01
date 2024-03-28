import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
export default async function handler(req, res) {
  const body = req.body;
  let username = body.username;
  let type = body.type;

//   const betObj = {
//     0: 'ongoing',
//     1: 'win',
//     1: 'lose',
//     1: 'cancelled'
//   }
  
   try{
    if(type === 'ongoing'){
        console.log('all')
        const { data,error } = await supabase
        .from('placed')
        .select('*')
        .eq('username',username)
        .eq('won', 'null')
        .order('id', { ascending: false });
        console.log(data)
        res.status(200).json({ status: 'success',type:'ongoing',message:data })
    }else if(type === 'win'){
        console.log('win',username)
        const { data,error } = await supabase
        .from('placed')
        .select('*')
        .match({ won: 'true', username: username })
        .order('id', { ascending: false });
        console.log(data)
        res.status(200).json({ status: 'success',type:'win',message:data })
        
    }else if(type === 'lose'){
        console.log('lose')
        const { data,error } = await supabase
        .from('placed')
        .select('*')
        .eq('username',username)
        .eq('won', 'false')
        .order('id', { ascending: false });
        console.log(data)
        res.status(200).json({ status: 'success',type:'lose',message:data })

    }else{
        console.log('cancelled')
        const { data,error } = await supabase
        .from('placed')
        .select('*')
        .eq('username',username)
        .eq('won', 'cancelled')
        .order('id', { ascending: false });
        console.log(data)
        res.status(200).json({ status: 'success',type:'cancelled',message:data })
    }
   }catch(e){
    res.status(500).json({ status: 'failed',message:e })
   }
  }