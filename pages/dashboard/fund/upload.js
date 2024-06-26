import { useRouter } from 'next/router';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Icon } from '@iconify/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Stack, Typography, Button } from '@mui/material';
import { useState, useRef } from 'react';
import { supabase } from '@/pages/api/supabase';
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import local from 'next/font/local';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Upload() {
 
    const router = useRouter();
    const [file, setfile] = useState([]);
    const [modified, setModified] = useState('');
    const [drop, setDrop] = useState(false);
    //from stackoverflow
    const inputFile = useRef(null);
    //end
    const uploadData = async (address) => {    
        
        try {
            let amount = localStorage.getItem('deposit-amount');
            let name = localStorage.getItem('signNames');
            let method = localStorage.getItem('deposit-method');
            let adminadd = localStorage.getItem('randomed');
        const { data, error } = await supabase
        .from('notification')
        .insert({ 
            'username':name,
            'amount':amount,
            'type':'deposit',
            'method':method,
            'address':address,
            'adminaddress':adminadd
    })
    localStorage.removeItem('deposit-amount');
    setDrop(false);
} catch (error) {
    setDrop(false);
console.log(error)
}
    }
    const getURL = async (modifiede) => {

        try{
     const { data, error } = supabase
 .storage
 .from('trcreceipt/public')
 .getPublicUrl(modifiede);
uploadData(data.publicUrl);
console.log(data.publicUrl);
        }catch(error){
            setDrop(false);
        console.log(error)    
        }
   

    }
    const fileNameMod = () => {
        const uuid = uuidv4();
        const modifieds = uuid + file.name;
        console.log(modifieds)
     setModified(modifieds);
     return modifieds;
    }
    const uploadImage = async (modifiede) => {
        setDrop(true);
        try {
            const { data, error } = await supabase
        .storage
        .from('trcreceipt/public')
        .upload(modifiede, file);
        console.log(data)
        getURL(modifiede);
 if (error) {
    alert('Error uploading file.');
    setDrop(false);
    console.log(error)
    return;
  }
        } catch (error) {
            console.log(error)
        }
        
 
  alert('File uploaded successfully!');
  router.push('/dashboard/fund/success');
    }
    const checkParams = () => {
        if(file.name){
           
                    uploadImage(fileNameMod());
        }else{
            alert('Please select a file')
        }
        
    }
    
    // const [currentTxt, setCurrentTxt] = useState('receipt');
    // const changingtext = {
    //     1:'receipt',
    //     2:'image of proof',
    //     3:'payment proof',
    //     4:'screenshot transaction'
    // }
    useEffect(()=>{
        console.log(localStorage.getItem('deposit-amount'))
        if(localStorage.getItem('deposit-amount') === null){
            router.push('/dashboard/fund')
        }
        // setInterval(()=>{
        //     setCurrentTxt(changingtext[Math.floor(Math.random() * 3) + 1])
        // },1000);
    },[])
    return (
        <div className="backgrounds" style={{ minHeight: '99vh' }}>
            <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
                <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
                    router.back()
                }} />
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Upload receipt</p>
            </Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={drop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stack direction='column' justifyContent='center' alignItems="center" sx={{ height: '90vh' }} spacing={2}>
                <motion.div
                    whileTap={{ scale: 1.09 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <Stack justifyContent='center' alignItems='center' sx={{ width: '343px', height: '87px', background: '#3F1052', borderStyle: 'dashed', borderRadius: '10px', border: '1.5px dashed rgba(194,127,8,1)' }}
                        onClick={() => {
                            inputFile.current.click();
                        }}>
                        <InsertDriveFileIcon sx={{ color: '#981FC0', fontFamily: 'Poppins,sans-serif' }} />
                        <input type='file' id='file'
                         ref={inputFile} style={{ display: 'none' }}
                            accept="image/*" onChange={(e) => {
                                setfile(e.target.files[0]);
                                console.log(e.target.files[0]);
                            }} />
                        <p sx={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '500', color: 'white' }} onClick={() => {
                            // inputFile.current.click();
                        }}>Browse</p>
                    </Stack>
                </motion.div>

                <motion.div
                whileTap={{  scale: 0.9  }}
                whileHover={{ scale: 1.04 }}
                >
                     <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ height: '58px', background: '#981FC0', borderRadius: '5px',border:'0.5px solid #3F1052', padding: '16px' }} spacing={2}>
                    <InsertDriveFileIcon sx={{ color: 'white', fontFamily: 'Poppins,sans-serif' }} />
                    <Stack alignItems='start' justifyContent='start'>
                        <p style={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '300', color: 'white' }}>{file.name ? file.name : 'No File Selected'}</p>
                        <p style={{ fontSize: '12px', fontFamily: 'Poppins,sans-serif', fontWeight: '300', color: 'white' }}>{file.size ? file.size : '0.0mb'}</p>

                    </Stack>
                    <ClearIcon sx={{ width: '24px', height: '24px', color: '#573b41' }} onClick={() => {
                        setfile([])
                    }} />
                </Stack>
                </motion.div>
                <motion.p onClick={checkParams}
whileTap={{ background: '#981FC0', color: '#3F1052', scale: 0.9 }}
whileHover={{ background: '#981FC0', color: '#3F1052', scale: 1.1 }}
style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#3F1052', border: '0.6px solid #3F1052', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
  COMPLETE !</motion.p>

            </Stack>
        </div>
    )
}