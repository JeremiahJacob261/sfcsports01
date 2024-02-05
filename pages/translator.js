import * as React from 'react';
import { useState } from 'react';
import { Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { i18n } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { parseCookies, setCookie } from "nookies";

const COOKIE_NAME = "googtrans";

export default function Translate() { 
  
    const [open, setOpen] = useState(false);
    const startTranslate = () => {
        setOpen(true);
    }
    const router = useRouter();

    const changeLanguageHandler = (lang) => {
      try{
// router.push(router.pathname, router.asPath, { locale: lang });
//disabled for now
// setCookie(null, COOKIE_NAME, "/auto/" + lang)
// window.location.reload();
alert("Translation is disabled for now, please use the browser's translation feature");
        setOpen(false);
      }catch(e){
console.log(e);
      }
        
        
    };

 const [currentLanguage, setCurrentLanguage] = useState();
 const [languageConfig, setLanguageConfig] = useState();

 useEffect(() => {
    const cookies = parseCookies()
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
 try{
  if (existingLanguageCookieValue) {
    const sp = existingLanguageCookieValue.split("/");
    if (sp.length > 2) {
      languageValue = sp[2];
    }
  }
  if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
    languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
  }
  if (languageValue) {
    setCurrentLanguage(languageValue);
  }
  if (global.__GOOGLE_TRANSLATION_CONFIG__) {
    setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
  }
 }catch(e){
console.log(e);
 }
 }, []);

 if (!currentLanguage || !languageConfig) {
    return null;
 }

//  const switchLanguage = (lang) => () => {
   
//  };
    return (
        <div className='notranslate'>
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
          background: '#E5E7EB', width: '290px', height: '490px', borderRadius: '20px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '12px'
        }}
        className='notranslate'
        >
            <h1 style={{ color:'#104547',fontWeight:'500',fontSize:'17px'}}>Translate</h1>
<motion.p onClick={()=>{ changeLanguageHandler('en') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>English EN</motion.p>
<motion.p onClick={()=>{ changeLanguageHandler('de') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>Deutsch DE</motion.p>
<motion.p onClick={()=>{ changeLanguageHandler('es') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>Español ES</motion.p>
<motion.p onClick={()=>{ changeLanguageHandler('fr') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>Français FR</motion.p>
<motion.p onClick={()=>{ changeLanguageHandler('ru') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>Русский RU</motion.p>
<motion.p onClick={()=>{ changeLanguageHandler('in') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>Indonesian IN</motion.p>
<motion.p onClick={()=>{ changeLanguageHandler('pl') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>Polski PL</motion.p>
<motion.p onClick={()=>{ changeLanguageHandler('vi') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>Vietnamese VI</motion.p>
<motion.p onClick={()=>{ changeLanguageHandler('fa') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>فارسی FA</motion.p>
<motion.p onClick={()=>{ changeLanguageHandler('pt') }} whileHover={{ scale:1.05 }} whileTap={{ scale:0.9 }} className='translate-txt'>Português PT</motion.p>

           </Stack>
      </Modal>
        </div>
    )
}