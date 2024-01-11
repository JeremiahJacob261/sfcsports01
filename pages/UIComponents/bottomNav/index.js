import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react"; 
import Translate from "@/pages/translator";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'all','login'
        ])),
        // Will be passed to the page component as props
      },
    }
  }
export default function HomeBottom() {
  const { t } = useTranslation('all')
  const [name,setNames] = useState();
  const router = useRouter();
  const selectPage = {
      0: '/dashboard',
      1:'/dashboard/event',
      2:'/dashboard/bets',
      3:`/dashboard/account?id=${name}`,
      4:`/dashboard/history?id=${name}`
    }
  const [selected, setSelected] = useState(0);
  const selectLogic = (index) => {
    setSelected(index);
    let page = selectPage[index];
    router.push(page);
    localStorage.setItem("selected", index);
    
  }
  useEffect(() => { 
    let selecteds = localStorage.getItem("selected");
    let page = selectPage[selecteds];
    setSelected(selecteds);
    setNames(localStorage.getItem("signNames"));
  }, [selected]);
    return (
        <Stack direction='row' className='bottomnav' sx={{ width:'100vw',position:'fixed',bottom:0}} justifyContent='space-around'>
            {/* home start */}
            <motion.div whileTap={{ color:'#f0e7e9'}} >
            <Stack direction='column' alignItems='center' justifyContent='center' sx={{ padding:'8px'}} onClick={()=>{selectLogic(0)}}>
              <Icon icon="majesticons:home" width={24} height={24} className={(selected != 0) ? 'homebtn' : 'homebtnselected'}  />
            <p style={{ fontSize:'14px',fontWeight:'400'}}className={(selected != 0) ? 'homebtn' : 'homebtnselected'}>{t("Home")}</p>
            </Stack>
            </motion.div>
            {/* /* home end */}

         {/* event start */}
            <motion.div whileTap={{ color:'#f0e7e9'}}>
         <Stack direction='column' alignItems='center' justifyContent='center' sx={{ padding:'8px'}} onClick={()=>{selectLogic(1)}}>
              <Icon icon="uis:chart" width={24} height={24} className={(selected != 1) ? 'homebtn' : 'homebtnselected'} />
            <p style={{ fontSize:'14px',fontWeight:'400'}} className={(selected != 1) ? 'homebtn' : 'homebtnselected'}>{t("Event")}</p>
            </Stack>
            </motion.div>
            {/* /* event end */}

             {/* search start */}
             <motion.div whileTap={{ color:'red'}}>
         <Stack direction='column' alignItems='center' justifyContent='center' sx={{ padding:'8px'}} onClick={()=>{selectLogic(2)}}>
              <Icon icon="bxs:gift" width={24} height={24} className={(selected != 2) ? 'homebtn' : 'homebtnselected'} />
            <p style={{ fontSize:'14px',fontWeight:'400'}} className={(selected != 2) ? 'homebtn' : 'homebtnselected'}>{t("Bets")}</p>
            </Stack>
            </motion.div>
            {/* /* search end */}

             {/* account start */}
             <motion.div whileTap={{ color:'red'}}>
         <Stack direction='column' alignItems='center' justifyContent='center' sx={{ padding:'8px'}} onClick={()=>{selectLogic(3)}}>
              <Icon icon="mingcute:wallet-fill" width={24} height={24} className={(selected != 3) ? 'homebtn' : 'homebtnselected'} />
            <p style={{ fontSize:'14px',fontWeight:'400'}} className={(selected != 3) ? 'homebtn' : 'homebtnselected'}>{t("Account")}</p>
            </Stack>
            </motion.div>
            {/* /* account end */}

             {/* history start */}
             <motion.div whileTap={{ color:'red'}}>
         <Stack direction='column' alignItems='center' justifyContent='center' sx={{ padding:'8px'}}>
<Translate/>
<p style={{ fontSize:'14px',fontWeight:'400',color:'green'}} className={(selected != 3) ? 'homebtn' : 'homebtnselected'}>{t("Translate")}</p>
            </Stack>
            </motion.div>
            {/* /* history end */}
        </Stack>
    )
}