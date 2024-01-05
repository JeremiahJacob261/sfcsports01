import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import Logo from "@/public/Sheffield_FC.svg.png";
import { Stack } from '@mui/material';
import { useState } from 'react';
export default function BindWalletSuccess() {
    const router = useRouter();
    return(
        <div className="backgrounds" >
            <Stack justifyContent='center' alignItems="center" direction="column" spacing={2} sx={{ minHeight:'98vh',width:'100%'}}>
                <Image src={Logo} width={100} height={100} alt="logo"/>
                <Casing className='text-md text-sheffield-red-deep'>Withdrawal Request Success</Casing>
                <Casing className='text-sm text-grey-500'>Your Withdrawal Request has been sent successfully</Casing>
            <motion.p onClick={() => {
                      router.push('/dashboard/account')
                    
                    }}
                        whileTap={{ background: '#573b41',color:'rgba(194,127,8,1)', scale: 0.9 }}
                        whileHover={{ background: '#573b41',color:'rgba(194,127,8,1)',scale: 1.1  }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '12px', background: '#C61F41',width:'280px',textAlign: 'center', cursor: 'pointer',borderRadius:'5px' }}>
                    RETURN TO DASHBOARD!</motion.p>
            </Stack>
            
        </div>
    )
}