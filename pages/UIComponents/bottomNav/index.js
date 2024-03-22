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
      4:`/dashboard/referral?name=${name}`
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
        <Stack direction='row' alignItems="center" className='bottomnav' sx={{ width:'90%',margin:'8px',position:'fixed',bottom:10,height:'70px'}} justifyContent='space-around'>
            {/* home start */}
            <motion.div whileTap={{ color:'#f0e7e9', y:10  }} >
            <Stack direction='column' alignItems='center' justifyContent='center' sx={{ padding:'8px'}} onClick={()=>{selectLogic(0)}}>
              <Icon icon="majesticons:home" width={24} height={24} className={(selected != 0) ? 'homebtn' : 'homebtnselected'}  />
            <p style={{ fontSize:'10px',fontWeight:'200'}}>Home</p>
           
            </Stack>
            </motion.div>
            {/* /* home end */}

         {/* event start */}
            <motion.div whileTap={{ color:'#f0e7e9', y:10  }}>
         <Stack direction='column' alignItems='center' justifyContent='center' sx={{ padding:'8px'}} onClick={()=>{selectLogic(1)}}>
              <Icon icon="material-symbols-light:sports-esports" width={24} height={24} className={(selected != 1) ? 'homebtn' : 'homebtnselected'} />
              <p style={{ fontSize:'10px',fontWeight:'200'}}>Game</p>
           
            </Stack>
            </motion.div>
            {/* /* event end */}

             {/* account start */}
             <motion.div whileTap={{ color:'red', y:10  }}>
         <Stack direction='column' alignItems='center' justifyContent='center' sx={{ padding:'8px'}} onClick={()=>{selectLogic(3)}}>
              <Icon icon="ph:wallet-duotone" width="24" height="24" className={(selected != 3) ? 'homebtn' : 'homebtnselected'} />
              <p style={{ fontSize:'10px',fontWeight:'200',display:(selected === 3) ? 'none' : 'visible'}}>wallet</p>
           
            </Stack>
            </motion.div>
            {/* /* account end */}

             {/* history start */}
             <motion.div whileTap={{ color:'red', y:10  }}>
         <Stack direction='column' alignItems='center' justifyContent='center' sx={{ padding:'8px'}}>
         <Icon icon="ph:microsoft-teams-logo-light" width={24} height={24} className={(selected != 4) ? 'homebtn' : 'homebtnselected'} />
         <p style={{ fontSize:'10px',fontWeight:'200',display:(selected === 4) ? 'none' : 'visible'}}>Teams</p>
           
            </Stack>
            </motion.div>
            {/* /* history end */}
        </Stack>
    )
}