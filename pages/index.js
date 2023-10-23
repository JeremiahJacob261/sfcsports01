import Image from 'next/image'
import Logo from "@/public/Sheffield_FC.svg.png";
import { Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cup1 from '@/public/cup1.png'
export default function Home() {
  const router = useRouter();
  return (
    <Stack style={{ minWidth: '100vh' }} >
      {/* top nav bar */}
      <Stack style={{ background: '#C61F41', width: '100%', height: '56px', padding: '8px', position: 'fixed' }} direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Image src={Logo} width={41} height={36} alt="sfclogo" />
          <p style={{ color: '#D8B16B', fontSize: '15px', fontWeight: '600' }}>SFCSPORTS01</p>
        </Stack>
        <Stack>
          <Icon icon="ic:round-menu" width={39} height={33} style={{ color: '#545454', background: '#D03151', opacity: '0.7' }} />
        </Stack>
      </Stack>
      {/* end of top nav bar */}
      <Stack style={{ minWidth: '100%', minHeight: '100vh' }} justifyContent='center' alignItems='center' spacing={3}>
        <div style={{ width: '100%', height: '100vh', position: 'fixed', zIndex: -1, opacity: '0.3' }}>
          <Image src={Logo}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <Stack direction="column" justifyContent='center' alignItems='center' spacing={3} style={{ padding: '12px', width: '100%', height: '100vh' }}>
          <p style={{ color: '#D8B16B', fontSize: '15px', fontWeight: '700' }}>GET UP TO 100% BONUS DAILY</p>
          <p style={{ width: '300px', color: 'white', fontSize: '24px', fontWeight: '700' }}>BET On Football Games & Win Upto $1 Million</p>
          <p style={{ width: '300px', color: 'white', fontSize: '14px', fontWeight: '300' }}>Build Your Team To  Get Multiple Bonuses and Unlimited Priviledges</p>
          <Link href='/register/000208'>
            <Stack sx={{ background: "linear-gradient(#C61F41, #D13655);", padding: '16px', borderRadius: '10px', width: '191px' }} justifyContent='center' alignItems='center' >
              <p style={{ color: 'white', fontSize: '14px', fontWeight: '300' }}>GET STARTED NOW!</p>
            </Stack>
          </Link>
        </Stack>
        <Stack spacing={5} justifyContent='center' alignItems='center'>
          <p style={{ color: '#D8B16B', fontSize: '15px', fontWeight: '700' }}>Trusted by millions of players</p>
          <p style={{ color: 'white', fontSize: '24px', fontWeight: '600' }}>Why play money winning games</p>
          <p style={{ color: 'white', fontSize: '13px', fontWeight: '400' }}>Register Today to Play and Start Winning Daily Cash Prizes</p>
        </Stack>
        <Stack spacing={3} sx={{padding:'12px'}} justifyContent='center' alignItems='center'>
          <Image src={Cup1} width={154} height={149} alt="trophy1" style={{borderRadius:'100px'}}/>
          <p style={{ fontWeight:'600',fontSize:'20px' }}>500 +</p>
        </Stack>
      </Stack>
    </Stack>
  )
}
