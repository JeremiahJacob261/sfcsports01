// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { supabase } from '../../pages/api/supabase';
export default function handler(req, res) {

const email = req.body.email;
const password = req.body.password;
const username = req.body.username;

    const login = async () => {


        //end of firebase
        async function findemail() {
            const { data, error } = await supabase
                .from('users')
                .select('email')
                .eq('username', email)

            async function sign(emailer) {

                const { data, error } = await supabase.auth.signInWithPassword({
                    email: emailer,
                    password: password,
                })
                if (error) {
                    // Handle authentication error
                    console.error(error);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error.message)
                    if (error.message === 'Invalid login credentials') {
                        res.status(200).json({ status: 'failed', 'message': "Please Ensure your Email and Password is correct" })
                    } else {
                        res.status(200).json({ status: 'failed', 'message': error.message })
                    }
                } else {
                    // User successfully signed in
                    let user = data.user;
                    const { data: users, error: uerr } = await supabase
                        .from('users')
                        .select('*')
                        .eq('username', user.user_metadata.displayName)
                    let usersinfo = users[0];
                    console.log(user.user_metadata.displayName)
                    res.status(200).json({ status: 'success', 'uid': user.id, 'name': user.user_metadata.displayName })

                }
            }
            sign(data[0].email);
            //end of supabase sgn in

        }
        if (!email.includes("@")) {
            let usern = username.replace(/^\s+|\s+$/gm, '')
            const { count, error } = await supabase
                .from('users')
                .select('*', { count: 'exact', head: true })
                .eq('username', email)
            console.log(count);
            if (count > 0) {

                findemail()
            } else {
                res.status(200).json({ status: 'failed', 'message': 'username does not exist or check your internet connection' })

            }
        } else {
            async function sign(emailer) {

                const { data, error } = await supabase.auth.signInWithPassword({
                    email: emailer,
                    password: password,
                })
                if (error) {
                    // Handle authentication error
                    console.error(error);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error.message)
                    if (error.message === 'Invalid login credentials') {
                        res.status(200).json({ status: 'failed', 'message': 'Please Ensure your Email and Password is correct' })
                    } else {
                        res.status(200).json({ status: 'failed', 'message': error.message })
                    }
                } else {
                    // User successfully signed in
                    let user = data.user;
                    res.status(200).json({ status: 'success', 'uid': user.id, 'name': user.user_metadata.displayName })
                }
            }

            sign(email);
            //end of supabase sgn in

        }


    }
    login();
    // res.status(200).json({ name: 'Jerry is the flash' })

}
