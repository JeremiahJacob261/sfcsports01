import HomeBottom from "@/pages/UIComponents/bottomNav";
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useRouter } from "next/router";
import { supabase } from "@/pages/api/supabase";
import React, { useEffect } from 'react';
import { Backdrop,Stack } from "@mui/material";
import '@/functions/notifications.js';
import Translate from "@/pages/translator";
import toast, { Toaster } from 'react-hot-toast';
import LOGO  from '../../../public/logo.png'
import Image from 'next/image';
import { useState } from 'react';
export default function Wallet({user}) {
   const router = useRouter();
   const [drop, setDrop] = useState(false);
   const handleToggle = (page) => {
      setDrop(!drop);
      router.push(page);
      setDrop(!drop);
   };
   function showNotification(title, options) {
      if (Notification.permission === "granted") {
         new Notification(title, options);
      }
     }
     
     // Example usage
    
     
   useEffect(()=> {
      
   },[])
   function Main() {
      return (
         <div className="main-account">
            <Backdrop
               sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
               open={drop}
            >
               <div className="loadingimg">
                  <Image src={LOGO} width={50} height={50} alt="logo" />
               </div>

            </Backdrop>
            <div className="main-header">
               <p className="main-title">Balance</p>
            </div>

        
            <div className='new-concept' style={{ flexDirection:'column'}}>
            <Stack direction='row' spacing={1} justifyContent='start'>
                            <p style={{ fontWeight: '200', color: 'white' }}>UID: {user.uid}</p>
                            <motion.div
                                whileHover={{ scale: 1.1, color: '#981FC0' }} whileTap={{ scale: 0.8, color: '#981FC0' }} style={{ color: '#FFFFFF' }}
                            >
                                <Icon icon="solar:copy-bold-duotone" width={15} height={15} onClick={() => {
                                    navigator.clipboard.writeText(user.uid);
                                    toast.success('UID copied to clipboard');
                                }} />
                            </motion.div>
                        </Stack>
                   <p className="azabalance"
            > $ {user.balance}</p>
             
            </div>
            <div style={{ height:'30px',width:'1px'}}></div>
            <div className='new-concept'>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/fund') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="icon-park-solid:add-mode" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>deposit</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/withdraw') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="uil:money-withdrawal" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>withdraw</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/transactions') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="grommet-icons:transaction" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>transaction</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/bind') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="mdi:wallet-plus-outline" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>bind wallet</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/transfer') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="tdesign:undertake-transaction" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>e- transfer</p></div>
               <div className="icon-con" style={{ width:'90px'}}><motion.div onClick={() => { handleToggle('/dashboard/codesetting') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="carbon:security" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>transaction pin</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/changepassword') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="tabler:password-fingerprint" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>password</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/promotion') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="material-symbols:rewarded-ads-outline-rounded" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>rewards</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/bind') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="mdi:customer-service" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>support</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/bind') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="fluent:people-community-16-filled" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>community</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/faq') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="mingcute:question-fill" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>FAQ</p></div>
               { 
               //translate goes here
               }
               <Translate/>
            </div>
            <div style={{ height:'20px'}}>

            </div>
            <motion.div 
            onClick={()=>{ 
               const { data, error } = supabase.auth.signOut();
               localStorage.clear();
               console.log('sign out')
               router.push('/login')
             }}
            whileTap={{ scale:0.8 }} className="new-concept" style={{ marginBottom:'50px',border:'0.6px solid #3F1052'}}>
                  <p style={{ fontSize:'10px',fontWeight:'200',margin:'8px'}}>LOGOUT</p>
            </motion.div>
         </div>
            )
   }
            return(
            <div style={{ alignItems: 'start', justifyContent: "center", display: 'flex', width: '100%', padding: '0',paddingBottom:'100px' }} className="backgrounds">
                     <div style={{ width: '100%', height: '100%', position: 'fixed', zIndex: -1, opacity: '0.3', background: 'white' }}>
        <Image src={LOGO}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <Toaster/>
               <Main />
               <HomeBottom />
            </div>
            )   
}

export async function getServerSideProps(context) { 
   try{
   const { id } = context.query;
      const { data: user, error: uerror } = await supabase
      .from('users')
      .select('*')
      .eq('username', id);
      return { props: { user: user[0] } }
   }catch(e){
      return {
         redirect: {
            destination: '/login',
            permanent: false,
         },
      }
   }
}