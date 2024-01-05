import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Icon, InlineIcon } from '@iconify/react';
import { motion } from 'framer-motion';
import Stack from '@mui/material/Stack';

export default function HistoryDx({data}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div >
      <Icon icon="fa6-solid:expand" width={24} height={24} className='iconbtn' style={{ color: 'white' }}
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className='history'>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ width:"100%",textAlign:'center',color:"#e4264c"}}>
              Transaction History
            </Typography>
            <Stack spacing={2} sx={{ width: '100%' }} direction="column" justifyContent='center'>
           
              <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
   <p style={{ color:'rgba(245,186,79,1)'}}>Transaction Type</p>
<p>{data.type ?? ''}</p>
              </Stack>
              <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
  <p style={{ color:'rgba(245,186,79,1)'}}> Status</p>
<p>{data.status}</p>
              </Stack>
              <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
  <p style={{ color:'rgba(245,186,79,1)'}}>Amount</p>
<p>{data.amount} USDT</p>
              </Stack>
              <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
  <p style={{ color:'rgba(245,186,79,1)'}}> Description</p>
<p>{data.description}</p>
              </Stack>
              <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
  <p style={{ color:'rgba(245,186,79,1)'}}>Payment Method</p>
<p>{data.payment}</p>
              </Stack>

              <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding:'8px'}}> 
  <p style={{ color:'rgba(245,186,79,1)'}}>Time</p>
<p>{data.time}</p>
              </Stack>
            </Stack>

            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className='cancelbrn'>
              <Icon icon="iconoir:cancel" onClick={handleClose} width={24} height={24} style={{ color: 'white' }} />

            </motion.div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}