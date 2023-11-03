import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import Image from "next/image";
export default function Swapic({image,name}) {
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
        <Image src={image} width={100} height={100} alt="image_profile"/>
        <p style={{ fontSize:'24px',fontFamily:"Poppins,sans-serif",color:'#ac915fd2'}}>{name}</p>
        <motion.p 
                whileTap={{ background: '#573b41', scale: '1.05' }}
                whileHover={{ background: '#573b41' }}
                style={{ fontWeight: '500', fontSize: '12px', color: '#C61F41', padding: '8px', background: 'white', width: '100%', textAlign: 'center', cursor: 'pointer' }}>
                Change Picture</motion.p>
            </Stack>
        </Box>
      </Modal>
</Stack>
        )
}