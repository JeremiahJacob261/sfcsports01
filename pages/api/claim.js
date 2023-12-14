// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
export default async  function handler(req, res) {
    const body = req.body;
    console.log(body)
    const Depositing = async (damount, dusername) => {
        const { data, error } = await supabase
          .rpc('depositor', { amount: damount, names: dusername })
        console.log(error);
      }
    const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', body.name)
    if(users[0].password !== body.pass){
        console.log('Wrong Password')
    res.status(200).json([{'status':'Failed','message':'Wrong Password'}]);

    }else if(!users[0].claim){
        console.log('Reward Already Claimed')
        res.status(200).json([{'status':'Failed','message':'Reward Already Claimed'}]);

    }else{
    const { data, error } = await supabase
                    .from('claim')
                    .select('*')
                    .match({ 'username': body.name });
                    console.log(data)
                    if (data.length < 1) {
                        
                        console.log('Code for user has not been generated')
                    res.status(200).json([{'status':'Failed','message':'code for user has not been generated, contact Customer Care to get your bonus code'}]);
                    } else {
                        if(data[0].used){
                        console.log('Code has been used')
                    res.status(200).json([{'status':'Failed','message':'Code has been used'}]);
                    }else{
                        if(data[0].code === body.code){
                            const { data, error } = await supabase
                            .from('users')
                            .update(
                              {  claim: true },
                            )
                            .eq('username',body.name)
                            //update claim
                            const { data:claim, error:cerr } = await supabase
                            .from('claim')
                            .update(
                              {  used: true },
                            )
                            .eq({'code':body.code,'username':body.name})
                            if(error){
                                console.log(error)
                            }else{
                                console.log(data)
                    res.status(200).json([{'status':'Accepted','message':'Bonus Claimed Successfully'}]);
                            }
                            Depositing(2,body.name);
                        }else{
                           
                        console.log('Wrong Claim Code')
                        res.status(200).json([{'status':'Failed','message':'Bonus code is wrong'}]);
                            
                        }
                    }
                    }
                    
                    
                if (error) {
                    console.log(error);
                    return;
                }
}
}