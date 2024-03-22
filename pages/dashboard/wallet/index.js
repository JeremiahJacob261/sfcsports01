import HomeBottom from "@/pages/UIComponents/bottomNav";
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useRouter } from "next/router";
import { use } from "react";
export default function Wallet() {
   const router = useRouter();
   function Main() {
      return(
         <div className="main-account">
            <div className="main-header">
                     <p className="main-title">Balance</p>
                     <motion.div>
                     <Icon icon="solar:settings-bold-duotone" width="24" height="24"  style={{color: 'grey'}} />
               </motion.div>
            </div>
           
            <p className="azabalance"> $ 12 500</p>
            <div className='new-concept'>
                        <motion.div onClick={()=>{   router.push('/dashboard/fund')   }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.7 }} className='new-icon'><Icon icon="icon-park-solid:add-mode" width="24" height="24"  style={{color: '#981FC0'}} /></motion.div>
                        <motion.div onClick={()=>{   router.push('/dashboard/withdraw')   }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.7 }} className='new-icon'><Icon icon="uil:money-withdrawal" width="24" height="24"  style={{color:  '#981FC0'}} /></motion.div>
                        <motion.div onClick={()=>{   router.push('/dashboard/transactions')   }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.7 }} className='new-icon'><Icon icon="grommet-icons:transaction" width="24" height="24"  style={{color:  '#981FC0'}} /></motion.div>
                        <motion.div onClick={()=>{   router.push('/dashboard/bind')   }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.7 }} className='new-icon'><Icon icon="mdi:wallet-plus-outline" width="24" height="24"  style={{color:  '#981FC0'}} /></motion.div>
                    </div>
         </div>
      )
   }
 return(
    <div style={{ alignItems:'center',justifyContent:"start",display:'flex',width:'100vw',padding:'0'}} className="backgrounds">
      <Main/>
        <HomeBottom/>
    </div>
 )   
}