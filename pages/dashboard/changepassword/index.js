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
    const [oldpassword, setOldPassword] = useState('');
    const [ confirmOldPassword, setConfirmOldPassword] = useState('');

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
        let user = supabase.auth.user();
        let email = user.email;
        if(email === null){
            alert('Please login again');
            router.push('/login');
     }else{
        let { data, error } = await supabase.auth.update({ email: email, password: password })
        if(error){
            alert('Something went wrong');
            return;
        }else{
            alert('Password changed successfully');
            router.push('/dashboard/account');
        }
     }
    }
}
    return(
        <div className="backgrounds" style={{ height:'99vh'}}>
             <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/account')
                }} />
                <p className="text-sm text-gray-500">ChangePassword</p>
            </Stack>
            <Stack sx={{ width:'99vw',height:'100%'}} spacing={3} direction="column" justifyContent='center' alignItems='center'>
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
                    whileTap={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 0.9 }}
                    whileHover={{ background: '#573b41', color: 'rgba(194,127,8,1)', scale: 1.1 }}
                    style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#C61F41', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                    Change Password</motion.p>
            </Stack>
        </div>
    )
}
  