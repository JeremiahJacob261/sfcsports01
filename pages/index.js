import Image from 'next/image'
import Logo from "@/public/Sheffield_FC.svg.png";
import { Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

export default function Home() {
  return (
      <Stack sx={{ minWidth: '100vh' }} >
       
        {/* top nav bar */}
        <Stack sx={{ background: '#C61F41', width: '100%', height: '56px', padding: '8px' }} direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Image src={Logo} width={41} height={36} alt="sfclogo" />
            <Typography  sx={{ color: '#D8B16B', fontSize: '15px', fontWeight: '600' }}>SFCSPORTS01</Typography>
          </Stack>

          <Stack>
            <Icon icon="ic:round-menu" width={39} height={33} style={{ color: '#545454', background: '#D03151', opacity: '0.7' }} />
          </Stack>
        </Stack>
        {/* end of top nav bar */}
        <Stack sx={{ width: '100%', height: '100vh' }}>
        <div style={{ width: '100%', height: '100vh', position: 'fixed', zIndex: -1, opacity: '0.3' }}>
          <Image src={Logo}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <Stack direction="column" spacing={3} sx={{ padding: '12px', width: '100%', height: '100vh' }}>
          <Typography sx={{ color: '#D8B16B', fontSize: '15px',  fontWeight: '700' }}>GET UP TO 100% BONUS DAILY</Typography>
          <Typography sx={{ width: '300px', color: 'white', fontSize: '24px',  fontWeight: '700' }}>BET On Football Games & Win Upto $1 Million</Typography>
          <Typography sx={{ width: '300px', color: 'white', fontSize: '14px',  fontWeight: '300' }}>Build Your Team To  Get Multiple Bonuses and Unlimited Priviledges</Typography>
          <Stack sx={{background:'#C61F41',padding:'16px',borderRadius:'10px',width:'191px'}}>
            <Typography sx={{ color: 'white', fontSize: '14px', fontWeight: '300' }}>GET STARTED NOW!</Typography></Stack>
        </Stack>
      </Stack>
      </Stack>
  )
}
