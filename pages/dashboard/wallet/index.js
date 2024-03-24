import HomeBottom from "@/pages/UIComponents/bottomNav";
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useRouter } from "next/router";
import React from 'react';
import { Backdrop } from "@mui/material";
import { LOGO } from '../../../public/logo.png'
import Image from 'next/image';
import { useState } from 'react';
export default function Wallet() {
   const router = useRouter();
   const [drop, setDrop] = useState(false);
   const handleToggle = (page) => {
      setDrop(!drop);
      router.push(page);
      setDrop(!drop);
   };

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
               <motion.div>
                  <Icon icon="solar:settings-bold-duotone" width="24" height="24" style={{ color: 'grey' }} />
               </motion.div>
            </div>

            <p className="azabalance"> $ 12 500</p>
            <div className='new-concept'>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/fund') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="icon-park-solid:add-mode" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>deposit</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/withdraw') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="uil:money-withdrawal" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>withdraw</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/transactions') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="grommet-icons:transaction" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>transaction</p></div>
               <div className="icon-con"><motion.div onClick={() => { handleToggle('/dashboard/bind') }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} className='new-icon'><Icon icon="mdi:wallet-plus-outline" width="24" height="24" style={{ color: '#981FC0' }} /></motion.div><p style={{ fontSize:'10px',fontWeight:'200'}}>bind wallet</p></div>
            </div>
         </div>
            )
   }
            return(
            <div style={{ alignItems: 'start', justifyContent: "center", display: 'flex', width: '100vw', padding: '0' }} className="backgrounds">
               <Main />
               <HomeBottom />
            </div>
            )   
}