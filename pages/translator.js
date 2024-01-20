import * as React from 'react';
import { useState } from 'react';
import { Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { i18n } from 'next-i18next';
import { useRouter } from 'next/router';

export default function Translate() { 
  
    const [open, setOpen] = useState(false);
    const startTranslate = () => {
        setOpen(true);
    }
    const router = useRouter();

    const changeLanguageHandler = (lang) => {
      try{
router.push(router.pathname, router.asPath, { locale: lang });
        setOpen(false);
      }catch(e){
console.log(e);
      }
        
        
    };
    return (
        <div>
          <motion.div whileHover={{ scale:1.1 }} whileTap={{ scale:0.7 }}>
              <Icon icon="ph:translate" color="green" width="24" height="24" onClick={startTranslate} />
      </motion.div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack alignItems='center'
         justifyContent='space-evenly'
         spacing={1}
          sx={{
          background: '#E5E7EB', width: '290px', height: '390px', borderRadius: '20px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '12px'
        }}>
            <h1 style={{ color:'#104547',fontWeight:'500',fontSize:'17px'}}>Translate</h1>
            <motion.p onClick={()=>{ changeLanguageHandler('vi') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }}  className='translate-txt'> tiếng Việt VI</motion.p>
            <motion.p onClick={()=>{ changeLanguageHandler('en') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>english EN</motion.p>
            <motion.p onClick={()=>{ changeLanguageHandler('es') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>español ES</motion.p>
            <motion.p onClick={()=>{ changeLanguageHandler('fr') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>français FR</motion.p>
            <motion.p onClick={()=>{ changeLanguageHandler('pl') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>polski PL</motion.p>
            <motion.p onClick={()=>{ changeLanguageHandler('id') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>indonesian IN</motion.p>
            <motion.p onClick={()=>{ changeLanguageHandler('ru') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>русский язык RU</motion.p>
            </Stack>
      </Modal>
        </div>
    )
}