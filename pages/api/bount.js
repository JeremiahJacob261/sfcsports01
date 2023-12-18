import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
export default async function handler(req, res) {
  const body = req.body;
  let username = body.username;
  
   try{
        //all
        const { data:dall, count:all } = await supabase
        .from('placed')
        .select('*', { count: 'exact', head: true })
        .eq('username',username)
        //settled
        const { data:det, count:cet } = await supabase
        .from('placed')
        .select('*', { count: 'exact', head: true })
        .eq('username',username)
        .neq('won',null)
        //pending
        const { data:dending, count:cending } = await supabase
        .from('placed')
        .select('*', { count: 'exact', head: true })
        .eq('username',username)
        .match({ 'username': username,'won':null })
         //total-wins
         const { data:wata, count:wount } = await supabase
         .from('placed')
         .select('*', { count: 'exact', head: true })
         .eq('username',username)
         .match({ 'username': username,'won':'true' })
          //total-lost
        const { data:lata, count:lount } = await supabase
        .from('placed')
        .select('*', { count: 'exact', head: true })
        .eq('username',username)
        .match({ 'username': username,'won':'false' })
        res.status(200).json({ status: 'success',all:all,settled:cet,pending:cending,wins:wount,lost:lount })
   }catch(e){
    res.status(500).json({ status: 'failed',message:e })
   }
  }