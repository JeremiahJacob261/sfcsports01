import { NextResponse } from "next/server"
import { supabase } from "./supabase";
export default async function handler(req, res) {
  const body = req.body;
  try{
        const { data,error } = await supabase
        .from('users')
        .select()
        .eq('username',body.username)
        if(data[0].balance < body.amount)   {
            res.status(200).json({ status: 'failed',message:'Insuffient Funds' })
        }else if(data[0].pin === body.pass){
            res.status(200).json({ status: 'failed',message:'Wrong Transaction Pin' })

        }else{
            const { data:uu,error:euu} = await supabase
            .from('users')
            .select()
            .eq('uid',body.uid)
            if(uu.length < 1){
                
            res.status(200).json({ status: 'failed',message:'Wrong Uid Please Check and Try Again' })
            }else{
                const Depositing = async (damount, dusername) => {
                    const { data, error } = await supabase
                        .rpc('depositor', { amount: damount, names: dusername })
                    console.log(error);
                }
                Depositing(body.amount,uu[0].username);
            }
        }
  }catch(e){

  }
    res.status(200).json({ name: 'Jerry is the flash' })
  }
  