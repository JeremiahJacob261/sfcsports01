import React from 'react'
import LOGO from '../../public/logo.png'
import Image from 'next/image'
export default function Foooter (){
    return(
        <div className="footer-div">
            <div style={{ display:"flex",flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <div>
                 <Image src={LOGO} alt='logo' width={25} height={25} style={{ background:'white',padding:'6px',borderRadius:'50%'}}/>
                </div>
           <p style={{ padding:'8px'}}>EPLSPORTS</p>
            </div>
            <div className="pages">
                <p>HOME</p>
                <p>LOGIN</p>
                <p>REGISTER</p>
                <p>FAQ</p>
                <p>FAQ</p>
            </div>
        </div>
    )
}