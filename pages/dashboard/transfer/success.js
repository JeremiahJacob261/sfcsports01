import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import Logo from "@/public/logo.png";
import { Stack } from '@mui/material';
import { useState } from 'react';
export default function BindWalletSuccess() {
    const router = useRouter();
    function t(text) {
      return text;
  }
    const [user,setUser] = useState();
    useEffect(()=>{
        setUser(localStorage.getItem("signNames"))
        console.log(localStorage.getItem("signNames"))
    },[])
    return(
        <div className="backgrounds" >
            <Stack justifyContent='center' alignItems="center" direction="column" spacing={2} sx={{ minHeight:'98vh',width:'100%'}}>
                <Image src={Logo} width={100} height={100} alt="logo"/>
                <p className='text-md text-sheffield-red-deep'>Funds Transferred Successfully</p>
                <p className='text-sm text-grey-500'>Your Funds Transfer request was successful</p>
            <motion.p onClick={() => {
                      router.push('/dashboard/wallet?id='+user)
                    
                    }}
                        whileTap={{ background: '#573b41',color:'rgba(194,127,8,1)', scale: 0.9 }}
                        whileHover={{ background: '#573b41',color:'rgba(194,127,8,1)',scale: 1.1  }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '12px', background: '#981FC0',width:'280px',textAlign: 'center', cursor: 'pointer',borderRadius:'5px' }}>
                    {t("RETURNTODASHBOARD")}!</motion.p>
            </Stack>
            
        </div>
    )
}