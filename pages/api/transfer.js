import { NextResponse } from "next/server"
import { supabase } from "./supabase";
export default async function handler(req, res) {
    const body = req.body;
    try {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('username', body.username)
        if (data[0].balance < parseFloat(body.amount + 1)) {
            res.status(200).json({ status: 'failed', message: 'Insuffient Funds' })
        } else if (data[0].pin != body.pass) {
            res.status(200).json({ status: 'failed', message: 'Wrong Transaction Pin' })

        } else {
            const { data: uu, error: euu } = await supabase
                .from('users')
                .select('*')
                .eq('uid', body.uid)
            if (uu.length < 1) {

                res.status(200).json({ status: 'failed', message: 'Wrong Uid Please Check and Try Again' })
            } else {
                const Depositing = async (damount, dusername) => {
                    const { data, error } = await supabase
                        .rpc('depositor', { amount: damount - 1, names: dusername })
                    console.log(error);
                }
                const Withdrawer = async (damount, dusername) => {
                    const { data, error } = await supabase
                        .rpc('withdrawer', { names: dusername, amount: damount })
                    console.log(error);
                }
                Depositing(parseFloat(body.amount - 1), uu[0].username);
                Withdrawer(parseFloat(body.amount), body.username);
                const { error: srr } = await supabase
                .from('activa')
                .insert({
                  'code': 'transfersend',
                  'username': body.username,
                  'amount': parseFloat(body.amount - 1),
                  'type':uu[0].username
                })
                const { error: rrr } = await supabase
                .from('activa')
                .insert({
                  'code': 'transfercollect',
                  'username': uu[0].username,
                  'amount': parseFloat(body.amount - 1),
                  'type':body.username
                })
                res.status(200).json({ status: 'success', message: 'Transfer Successful' })
            }
        }
    } catch (e) {
        res.status(200).json({ status: 'failed', message: 'Wrong Uid Please Check and Try Again' })

    }
}
