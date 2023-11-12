import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'
import { useState } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { supabase } from '@/pages/api/supabase';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';
import Image from 'next/image'
import Success from '@/public/success.png'
import Warn from '@/public/warn.png'
export default function BindWallet({name,users}) {
    const router = useRouter();
    const [address , setAddress] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('');
    //alerts
    const [ale, setAle] = useState('')
    const [open, setOpen] = useState(false)
    const [aleT, setAleT] = useState(false)
    const Alerted = (m, t) => {
      setOpen(true)
      setAle(m)
      setAleT(t)
    }
    //end of alerts
    const testRoute = async ()=>{
      let test = await fetch('/api/bind', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: name,pass:password,wallet:address })
        }).then(data => {
          return data.json();
          })
          console.log(test);
          if(test[0].status === 'Failed'){
            alert('Wrong Password !')
          }else{
            
            router.push('/dashboard/bind/success')
          }

    }
    const checkValid = () => {
        if(address === ''){
            Alerted('Please enter address',false)
        }else if(password === ''){
            Alerted('Please enter password',false)
        }else if(confirmPassword === ''){
            Alerted('Please enter confirm password',false)
        }else if(password !== confirmPassword){
            Alerted('Password and confirm password must be same',false)
        }else{
          testRoute();
        }
    }
    return(
        <div className="backgrounds" style={{ minHeight:'99vh',width:'100%'}}>
            <Alerteds />
           <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={() => {
                    router.push('/dashboard/account')
                }} />
                <p className="text-sm text-gray-500">BIND WALLET</p>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ padding: '8px', width: '100%' }}>
             
            <Stack direction='column' alignItems='center' justifyContent='center' sx={{ background:'#573b41',padding:'12px',borderRadius:'8px',margin:'8px',maxWidth:'310px'}}>
              <p style={{ color:'rgba(194,127,8,1)' ,fontSize:'18px'}} >Existing Wallets</p>
                {
                  users.map((m)=>{
                    let date = new Date(m.created_at);
                    let month = date.getMonth()+1;
                    let day = date.getDate();
                    let year = date.getFullYear();
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    let seconds = date.getSeconds();
                    let created_at = month+'/'+day+'/'+year+' '+hours+':'+minutes+':'+seconds;
                    return(
                      <Stack key={m.id} direction='row' alignItems='center' spacing={2}>
                        <Stack direction='column'>
                           <p style={{ fontSize:'15px',color:'#C61F41',fontWeight:'600' }}>{m.wallet}</p>
                        <p style={{ fontSize:'12px',color:'#FFFFFF' }}>{created_at}</p>
                        </Stack>
                       <Icon icon="akar-icons:edit" width={24} height={24} onClick={()=>{
                          router.push('/dashboard/bind/edit')}}/>
                      </Stack>
                    )
                  })
                }
            </Stack>
                <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{ padding:'12px'}}>
                <p>BIND WALLET</p>
                <form>
                    <Stack direction='column' spacing={3}>
                        <div className='arrange-label'>
                            <label className='standard-label'>Wallet Address</label>
                <input className='standard-input' placeholder='Address' type='text'  value={address} onChange={(e)=>{ setAddress(e.target.value)}}/>
                        </div>
                        
                        <div className='arrange-label'>
                            <label className='standard-label'>Password</label>
                <input className='standard-input' placeholder='Password' type='password' value={password} onChange={(e)=>{ setPassword(e.target.value)}}/>
                        </div>
                        
                        <div className='arrange-label'>
    <label className='standard-label'>Confirm Password</label>
                <input className='standard-input' placeholder='Confirm Password' type='password' value={confirmPassword} onChange={(e)=>{ setConfirmPassword(e.target.value)}}/>
                        </div>
                    
                </Stack>
                </form>
               <motion.p onClick={() => {
                    //   router.push('/dashboard/fund/success')
                    checkValid();
                    }}
                        whileTap={{ background: '#573b41',color:'rgba(194,127,8,1)', scale: 0.9 }}
                        whileHover={{ background: '#573b41',color:'rgba(194,127,8,1)',scale: 1.1  }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '12px', background: '#C61F41',width:'280px',textAlign: 'center', cursor: 'pointer',borderRadius:'5px' }}>
                    Bind Wallet</motion.p>
                </Stack>
              </Stack>
            </div>
    )
    function Alerteds() {
        return(
            <Modal
            open={open}
            onClose={() => {
              if (aleT) {
                setOpen(false)
              } else {
                setOpen(false)
              }
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Stack alignItems='center' justifyContent='space-evenly' sx={{
              background: '#E5E7EB', width: '290px', height: '330px', borderRadius: '20px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '12px'
            }}>
              <Image src={aleT ? Success : Warn} width={120} height={120} alt='widh' />
              <p id="modal-modal-title" style={{ fontSize: '20px', fontWeight: '500',color:'black' }}>
    
                {aleT ? 'Success' : 'Sorry!'}
              </p>
              <p id="modal-modal-description" style={{  mt: 2, color:'black',fontSize: '16px',textAlign:'center', fontWeight: '300' }}>
                {ale}
              </p>
              <Divider sx={{ borderBottomWidth: '45px'}} />
              <p style={{  color: '#D8B16B', padding: '8px', width: '100%',textAlign:'center',cursor: 'pointer' }} onClick={() => {
                if (aleT) {
                  setOpen(false)
                  router.push('/dashboard')
                } else {
    
                  setOpen(false)
                }
              }}>OKAY</p>
            </Stack>
    
          </Modal>
       
        )
    }
}
export async function getServerSideProps({ req }) {
  const refreshToken = req.cookies['my-refresh-token']
  const accessToken = req.cookies['my-access-token']
  console.log(accessToken)
  if (refreshToken && accessToken) {
      console.log('sign insss')
      let sess = await supabase.auth.setSession({
          refresh_token: refreshToken,
          access_token: accessToken,
      })
      console.log(sess)
  } else {
      // make sure you handle this case!
      throw new Error('User is not authenticated.')
  }
  // returns user information


  try {
      let { data: user, error: err } = await supabase.auth.getUser()
      console.log(user.user.user_metadata)
    let name = user.user.user_metadata.displayName;

    const { data, error } = await supabase
            .from('wallets')
            .select('*')
            .eq('username', name)
        let users = data;
      return {
          props: { name,users }, // will be passed to the page component as props
      }
  } catch (error) {
      console.log(error)
      let name = null;
      let users = [];
      return {
          props: { name,users }, // will be passed to the page component as props
      }
  }

}