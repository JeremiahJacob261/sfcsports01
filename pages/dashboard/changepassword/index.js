import { Icon } from '@iconify/react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useEffect,useState } from 'react';
import { supabase } from '@/pages/api/supabase';
export default function ChangePassword() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [users,setUser ] = useState({});
    const [oldpassword, setOldPassword] = useState('');
    const [ confirmOldPassword, setConfirmOldPassword] = useState('');
    useEffect(() => { 
        try{
            const get = async () => { 
                 const { data: { user } } = await supabase.auth.getUser()
            console.log(user);
            setUser(user);
            }
           get();
        }catch(err){
            console.log(err);
        }
    }, []);
    //func for change pasword
    const ChangePasswordFunc = async ()=>{ 
        if(password === ''){
            alert('Please enter new password');
            return;
    }else if(confirmPassword === ''){ 
        alert('Please enter confirm password');
        return;
    } else if(password !== confirmPassword){ 
        alert('Password does not match');
        return;
    }else if(oldpassword === ''){
        alert('Please enter old password');
        return;
    }else if(confirmOldPassword === ''){ 
        alert('Please enter confirm old password');
        return;
    } else if(oldpassword !== confirmOldPassword){
        alert('Old password does not match');
        return;
     }else{
        try{
            const get = async () => { 
const { data, error } = await supabase.auth.updateUser({password: password})
console.log(data);
if(error){
    alert(error.message);
    if(error.message === 'New password should be different from the old password.'){
        alert('New password should be different from the old password.');
        return;
    }else if(error.message === 'Password should be at least 6 characters.'){
        alert('Password should be at least 6 characters.');
        return;
    
    }
}
if(data.user){
 alert('Password changed successfully');
 const updateOnSQL = async () => {
    try{
 const { data,error} = await supabase
    .from('users')
    .update({ 'password':password})
    .eq('username',users.user_metadata.displayName)
    }catch(e){
        console.log(e)
    }
   
 }
 updateOnSQL();
    }

            }
           get();
        }catch(err){
            console.log(err);
        }
    }
}
    return(
        <div className="backgrounds" style={{ height:'99vh'}}>
             <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.back()
                }} />
                <p className="text-sm text-gray-500">ChangePassword</p>
            </Stack>
            <Stack sx={{ width:'99%',height:'100%'}} spacing={3} direction="column" justifyContent='center' alignItems='center'>
                <p>Change Password</p>
                {/* input pass components */}
                <div className='arrange-label'>
                            <label className='standard-label'>Old Password</label>
                <input className='standard-input' placeholder='Password' type='password' value={ oldpassword} onChange={(e)=>{ setOldPassword(e.target.value)}}/>
                        </div>

                        <div className='arrange-label'>
                            <label className='standard-label'>Confirm Old Password</label>
                <input className='standard-input' placeholder='Password' type='password' value={confirmOldPassword} onChange={(e)=>{ setConfirmOldPassword(e.target.value)}}/>
                        </div>

                        <div className='arrange-label'>
                            <label className='standard-label'>New Password</label>
                <input className='standard-input' placeholder='Password' type='password' value={password} onChange={(e)=>{ setPassword(e.target.value)}}/>
                        </div>

                        <div className='arrange-label'>
                            <label className='standard-label'>Confirm New Password</label>
                <input className='standard-input' placeholder='Password' type='password' value={confirmPassword} onChange={(e)=>{ setConfirmPassword(e.target.value)}}/>
                        </div>
                <motion.p onClick={() => {
                  ChangePasswordFunc();
                }}
                whileTap={{ background: '#981FC0', color: '#3F1052', scale: 0.9 }}
                whileHover={{ background: '#981FC0', color: '#3F1052', scale: 1.1 }}
                style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#3F1052', border: '0.6px solid #3F1052', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                Change Password</motion.p>
            </Stack>
        </div>
    )
}
  