import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import React from "react"; 
 
import { useState, useRef } from 'react';
import Avatar from '@/public/avatar.png';
import Modal from '@mui/material/Modal';
import Image from "next/image";
import { supabase } from '@/pages/api/supabase';
import { v4 as uuidv4 } from 'uuid';
export default function Swapic({image,name}) {
  const [file, setfile] = useState([]);
  //from stackoverflow
  const [ modified, setModified ] = useState('');
  const inputFile = useRef(null);
  //end

  const fileNameMod = (fil) => {
    const uuid = uuidv4();
    const modifieds = uuid + fil.name;
    console.log(modifieds)
    setModified(modifieds);
}
const getURL = async () => {
    try {
        const { data, error } = supabase
            .storage
            .from('trcreceipt/profile')
            .getPublicUrl(modified);
        uploadData(data.publicUrl);
        console.log(data.publicUrl);
    } catch (error) {
        console.log(error)
    }
}
const uploadData = async (address) => {    
  try {
      let name = localStorage.getItem('signNames');
  const { data, error } = await supabase
  .from('users')
  .update({ 
      'profile':address
})
.eq('username', name)
} catch (error) {
console.log(error)
}
}
const uploadImage = async (fil) => {
    try {
        const { data, error } = await supabase
            .storage
            .from('trcreceipt/profile')
            .upload(modified, fil);
        console.log(data)
        getURL();
        if (error) {
            alert('Error uploading file.');
            return;
        }
    } catch (error) {
        console.log(error)
    }


    alert('File uploaded successfully!');
}

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height:'50vh',
        bgcolor: 'rgba(77, 3, 3, 1)',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius:'8px',
        p: 4,
      };
      const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    return (
<Stack>
<Icon icon="basil:edit-outline" onClick={handleOpen} style={{ padding:'8px',width:'32px',height:'32px'}}/>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
        <Image src={image ?? Avatar} width={100} height={100} alt="image_profile" style={{ borderRadius:"10px"}} />
        <p style={{ fontSize:'24px',fontFamily:"Poppins,sans-serif",color:'#ac915fd2'}}>{name}</p>
        <motion.p 
                whileTap={{ background: '#573b41', scale: '1.05' }}
                whileHover={{ background: '#573b41' }}
                onClick={()=>{
                    inputFile.current.click();
                }}
                style={{ fontWeight: '500', fontSize: '12px', color: '#981FC0', padding: '8px', background: 'white', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
                Change Picture</motion.p>
                <input type='file' id='file' ref={inputFile} style={{ display: 'none' }}
                            accept="image/*" onChange={(e) => {
                                setfile(e.target.files[0]);
                                fileNameMod(e.target.files[0]);
                                uploadImage(e.target.files[0]);
                            }} />
            </Stack>
        </Box>
      </Modal>
</Stack>
        )
}