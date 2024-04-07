import React from 'react'
import LOGO from '../../public/logo.png'
import Image from 'next/image'
import Bud from '@/public/bud.webp'
import Bar from '@/public/bar.webp'
import Ea from '@/public/ea.webp'
import Hub from '@/public/hub.webp'
import { Stack }  from '@mui/material'
import Nike from '@/public/nike.webp'
import Oracle from '@/public/oracle.webp'
export default function Foooter() {
    return (
        <div className="footer-div">
           
            <div className="pages"> 
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <Image src={LOGO} alt='logo' width={25} height={25} style={{ background: 'white', padding: '6px', borderRadius: '50%' }} />
                </div>
                <p style={{ padding: '8px' }}>EPLSPORTS</p>
            </div>
                <p>HOME</p>
                <p>LOGIN</p>
                <p>REGISTER</p>
                <p>FAQ</p>
                <p>ABOUT</p>
            </div>

            <div className='pges'>
                <p>OUR SPONSORS</p>
                <Image src={Bud} alt='sponsors' width={100} height={50}/>
                <Image src={Hub} alt='sponsors' width={100} height={50}/>
                <Image src={Bar} alt='sponsors' width={100} height={50}/>
                <Image src={Nike} alt='sponsors' width={100} height={50}/>
                <Image src={Oracle} alt='sponsors' width={100} height={50}/>
                <Image src={Ea} alt='sponsors' width={100} height={50}/>
            </div>
            <div classNmae="linerx" style={{ width:'100%',height:'3px',background:'#9506ce'}}></div>
            <div className='hphes'>
            <p>@ Premier League 2024</p>
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
            <p>Cookie policy</p>
            </div>
            <Stack sx={{width:'100%'}} direction={"row"} spacing={2} justifyContent={"end"} alignItems={"center"}>
                <p style={{ fontSize:'18px'}}>Premier</p>
                <Image src={LOGO} alt="logo" width={24} height={24}  style={{ background:'whitesmoke',borderRadius:'50%',padding:'4px'}}/>
                <p style={{ fontSize:'18px'}}>League</p>
                </Stack>
        </div>
    )
}