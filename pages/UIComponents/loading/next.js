import { Backdrop } from "@mui/material";
import { LOGO } from '../../../public/logo.png'
import Image from 'next/image';
import { useState } from 'react';
import Button from '@mui/material/Button';

   
export default function Loader() {
 const [drop, setDrop] = useState(false); 
     const handleToggle = () => {
        setDrop(!drop);
        console.log("hello world")
    };
    
    return(
        <div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={drop}
      >
        <div className="loadingimg">
          <Image src={LOGO}  width={50} height={50} alt="logo"/>
        </div>
 
      </Backdrop>
        </div>
    )
    return { drop, handleToggle };
}