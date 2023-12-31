import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { Stack,Button } from '@mui/material';
import Barcode from '@/public/barcode.png'
import { useState } from 'react';
import { motion } from 'framer-motion'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'all',
        ])),
        // Will be passed to the page component as props
      },
    }
  }
export default function Address(){
    const { t } = useTranslation('all')
    const router = useRouter();
    return(
        <div className="backgrounds">
            <Toaster 
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
                style: {
                  fontSize: '14px',
                  background:'#ad1c39',
                  color: '#fff',
                },
                iconTheme: {
                    primary: 'white',
                    secondary: 'rgba(194,127,8,1)',
                  },
            }}          
            />

            <Stack className='headers' direction="row" alignItems='center' sx={{padding:'8px',width:'100%'}} spacing={1}>
                <Icon icon="ic:sharp-arrow-back" width={24} height={24} onClick={()=>{
                    router.push('/dashboard/fund')
                }}/>
           <p style={{ fontSize:'16px',fontWeight:'600'}}>{t("InputAddress")}</p>
            </Stack>
                <Stack direction='column' alignItems='center' justifyContent='center' spacing={1} sx={{ width:'100%',height:'100vh'}}>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.8 }} onClick={()=>{}}>
                    
                <Image src={Barcode} alt='barcode' width={300} height={300}/>
                </motion.div>
                <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                    <p style={{ fontSize:'14px',fontWeight:'400px',color:'rgba(194,127,8,1)'}}>TLqT2eGy3t18wbmjTvhg3Up95oiC6VA54z</p>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Icon icon="solar:copy-bold-duotone" color="#ad1c39" width={30} height={30} onClick={()=>{
        navigator.clipboard.writeText('TLqT2eGy3t18wbmjTvhg3Up95oiC6VA54z');
        toast.success('Copied to clipboard');
                }}/>
                        </motion.div>
                </Stack>
                <p style={{ color:'green',fontSize:'13px',fontWeight:'200',maxWidth:'70vw'}}>Network: USDT (TRC20)</p>
                <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                <Icon icon="ph:info-light" color="#ad1c39" />
                <p style={{ color:'grey',fontSize:'12px',fontWeight:'200',maxWidth:'70vw'}}>{t("Youareexpectedtouploadanimageofthereceiptinthenextpagewithin30minutesofmakingthetransactionelsetransferredfundsmightbelost")}!</p>
                </Stack>
                    <motion.p onClick={() => {
                      router.push('/dashboard/fund/upload')
                    }}
                        whileTap={{ background: '#573b41',color:'rgba(194,127,8,1)', scale: 0.9 }}
                        whileHover={{ background: '#573b41',color:'rgba(194,127,8,1)',scale: 1.1  }}
                        style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '8px', background: '#C61F41', width: '30vh', textAlign: 'center', cursor: 'pointer',borderRadius:'5px' }}>
                        NEXT</motion.p>
                </Stack>
     
        </div>
    )
}