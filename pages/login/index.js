import React, { useState, Suspense } from "react"; 
import Head from "next/head";
import { Modal, Box, Stack, OutlinedInput, Button, Typography, Divider } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { supabase } from '../api/supabase'
import { useContext } from "react"; 
import Link from "next/link";
import { useRouter } from 'next/router'
import generateRandomNumber from '@/functions/generatecodes';
import { motion } from 'framer-motion'
import LOGO from '../../public/logo.png'
import Image from 'next/image'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Backdrop from '@mui/material/Backdrop';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from "react"; 
import Warn from '@/public/warn.png'
import Success from '@/public/success.png'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


export default function Login({ranter}) {
  const { t } = useTranslation("all")
  const [username, setUsername] = useState("")
  const [drop, setDrop] = useState(false)
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code,setCode] = useState('');
  //alerts
  const [ale, setAle] = useState('')
  const [open, setOpen] = useState(false)
  const [aleT, setAleT] = useState(false)
  const Alerts = (m, t) => {
    setAle(m)
    setAleT(t)
    setOpen(true)
  }
  //end of alerts
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    async function getSe() {

      const { data, error } = await supabase.auth.getSession();
      if (data.session != null) {
        console.log(data.session)
        let user = data.session.user;
        async function GET() {
          try {
            const { data, error } = await supabase
              .from('users')
              .select()
              .eq('username', user.user_metadata.displayName);
            localStorage.setItem('signRef', data[0].newrefer);

            localStorage.setItem('userinfo', data[0]);
            console.log(data);
          } catch (e) {

          }

        }
        GET();
        localStorage.setItem('signedIns', true);
        localStorage.setItem('signUids', user.id);
        localStorage.setItem('signNames', user.user_metadata.displayName);
        router.push('/dashboard');
      } else {

        console.log('sign out');
        localStorage.removeItem('signedIns');
        localStorage.removeItem('signUids');
        localStorage.removeItem('signNames');
        localStorage.removeItem('signRef');
        router.push('/login');
      }
    }
    getSe();


  }, [])
  const supabaseMigrate = async (username, uid) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: values.password,
      options: {
        data: {
          displayName: username,
        }
      }
    })
    //update email after migration
    const uidch = async () => {

      const { error } = await supabase
        .from('users')
        .update({ userId: data.user.id })
        .eq('email', email);
    }
    uidch();
    router.push('/dashboard')

  }

  const login = async () => {


    //end of firebase
    async function findemail() {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('username', email)

      async function sign(emailer) {

        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailer,
          password: values.password,
        })
        if (error) {
          // Handle authentication error
          console.error(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error.message)
          if (error.message === 'Invalid login credentials') {
            Alerts("Please Ensure your Email and Password is correct", false)
          } else {
            console.log(error.message)
          }
          setDrop(false)
        } else {
          // User successfully signed in
          let user = data.user;
          const { data: users, error: uerr } = await supabase
            .from('users')
            .select('*')
            .eq('username', user.user_metadata.displayName)
          let usersinfo = users[0];
          localStorage.setItem('userinfo', usersinfo);
          Alerts('You are logged in', true);
          console.log(user)
          // localStorage.setItem('signRef', data[0].newrefer);
          localStorage.setItem('signedIns', true);
          localStorage.setItem('signUids', user.id);
          localStorage.setItem('signNames', user.user_metadata.displayName);
          console.log(user.user_metadata.displayName)
          setDrop(false)
          router.push('/dashboard')
          Notification.requestPermission().then(perms => {
            if(perms === "granted"){
                  new Notification("EPLSPORTS",{ body:"Welcome to EplSports", image:LOGO})
            }
           })
        }
      }
      sign(data[0].email);
      //end of supabase sgn in

      // signInWithEmailAndPassword(auth, data[0].email, values.password)
      //   .then((userCredential) => {
      //     // Signed in 
      //     const user = userCredential.user;
      //     // ...

      //     alert('you are logged in');
      //     localStorage.setItem('signRef', data[0].newrefer);
      //     localStorage.setItem('signedIns', true);
      //     localStorage.setItem('signUids', user.uid);
      //     localStorage.setItem('signNames', user.displayName);
      //     setDrop(false)
      //     router.push('/dashboard');
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.log(error.message)
      //     alert(errorCode);
      //     setDrop(false)
      //   });
    }
    setDrop(true)
    localStorage.clear()
    if (!email.includes("@")) {
      let usern = username.replace(/^\s+|\s+$/gm, '')
      const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('username', email)
      console.log(count);
      if (count > 0) {

        findemail()
      } else {
        Alerts('username does not exist or check your internet connection', false)
        setDrop(false)
      }
    } else {
      async function sign(emailer) {

        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailer,
          password: values.password,
        })
        if (error) {
          // Handle authentication error
          console.error(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error.message)
          if (error.message === 'Invalid login credentials') {
            Alerts("Please Ensure your Email and Password is correct", false)
          } else {
            console.log(error.message)
          }
          setDrop(false)
        } else {
          // User successfully signed in
          let user = data.user;
          Alerts('You are Logged In', true);
          console.log(user)
          // localStorage.setItem('signRef', data[0].newrefer);
          localStorage.setItem('signedIns', true);
          localStorage.setItem('signUids', user.id);
          localStorage.setItem('signNames', user.user_metadata.displayName);
          setDrop(false)
        }
      }
      
         sign(email);
      //end of supabase sgn in
     
    }


  }


  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={10}
      style={{
        padding: "15px",
        overflowX: "hidden",
        maxWidth: "100%",
        minHeight: "100vh",
        background: '#3F1052'
        , position: 'relative'
      }}>
      <Alertz />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={drop}
      >
        <div className="loadingimg">
          <Image src={LOGO}  width={50} height={50} alt="logo"/>
        </div>
        
      </Backdrop>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to your Account to see whats up with your bets" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Stack direction='column' spacing={3}>
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
          <Image src={LOGO} width={100} height={120} alt='logo Eplsports' />
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography style={{ fontFamily: 'Noto Serif, serif', color: "#E5E7EB", fontWeight: '400', fontSize: '20px' }}>Eplsports </Typography>
          </Link>
          <Typography style={{ fontFamily: 'Poppins,sans-serif', color: '#E5E7EB', fontSize: '25px', fontWeight: '400', width: '240px', textAlign: 'center' }}>
            SIGN IN
          </Typography>
          <Typography style={{ opacity: '0.7', fontFamily: 'Poppins,sans-serif', color: '#E5E7EB', fontSize: '14px', fontWeight: '100', width: '292px', textAlign: 'center' }}>
            input your email and password to login
          </Typography>
        </Stack>
        <Stack direction="column" spacing={4} sx={{ width: '343px' }}>
          <TextField id="outlined-basic" label="Email Or Username" variant="filled"
            sx={{ padding: 0, fontSize: '14', fontWeight: '300', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif', width: "100%", background: 'grey', input: { color: 'black', } }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <FormControl
            sx={{ padding: 0, fontSize: '14', fontWeight: '300', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif', width: "100%", background: 'grey', input: { color: 'black', } }}
            variant="filled">
            <InputLabel htmlFor="outlined-adornment-password">{t("Password")}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff sx={{ color: '#E5E7EBsmoke' }} /> : <Visibility sx={{ color: '#E5E7EB' }} />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
            
            <motion.div whileHover={{ scale: 1.02 }}>
                   <Stack sx={{ background:'#1B1B3A',color:'#FFFFFF',borderRadius:'3px'}} className='rant'>
                    <p style={{ letterSpacing:5,padding:'8px',textAlign:'center'}}>{ranter}</p>
                   </Stack>
                   </motion.div>

                   <TextField id="outlined-basic" label="captcha" variant="filled"
            sx={{ padding: 0, fontSize: '14', fontWeight: '300', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif', width: "100%", background: 'grey', input: { color: 'black', } }}
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
            }}
          />
        </Stack>
      </Stack>
      <Stack direction="column" spacing={2} justifyContent='center' alignItems='center' sx={{ width: '343px', marginTop: '200px' }}>
       <motion.div whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }} style={{ width: '343px',}}>
        <Button variant="contained" className="authactionbtn"
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === "Space"
            ) {
              login()
            }
          }}
          sx={{ fontFamily: 'Poppins, sans-serif', padding: "10px", width: '100%', fontWeight: '400' }}
          onClick={()=>{
            if(code != ranter){
              console.log(ranter)
             Alerts('CAPTCHA is wrong', false);
           }else{
            login()
           }
          }}>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif', marginLeft: "3px", color: "#E5E7EB" }}>LOGIN</Typography>
        </Button>
        </motion.div>
        <Link href="/passwordreset" style={{ textDecoration: '#E5E7EB' }}>
          <Typography style={{ color: "#E5E7EB", fontSize: '14px', fontWeight: '200', opacity: '0.7', fontFamily: 'Poppins,sans-serif' }}>{t('login:ForgottenPassword')}</Typography>
          <Divider sx={{ background: '#E5E7EB' }} />
        </Link>
        <Link href="/register?refer=0" style={{ width: '100%', textAlign: 'center', textDecoration: "none", color: "#E5E7EB", fontSize: '15px', fontWeight: '400', fontFamily: 'Poppins,sans-serif' }}>
         Dont have an Account Create Account

        </Link>
      </Stack>
    </Stack>
  )
  function Alertz() {
    return (
      <Modal
        open={open}
        onClose={() => {
          if (aleT) {
            setOpen(false)
            router.push('/dashboard')
          } else {
            setOpen(false)
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack alignItems='center' justifyContent='space-evenly' sx={{
          background: '#3D195B',
          border:"1px solid #981FC0",
           width: '290px', height: '300px', borderRadius: '20px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '12px'
        }}>
          <p id="modal-modal-title" style={{ fontSize: '20px', fontWeight: '500', color: 'white' }}>

            {aleT ? 'SUCCESS' : 'SORRY!'}
          </p>
          <p id="modal-modal-description" style={{ mt: 2, color: 'whitesmoke', fontSize: '16px', textAlign: 'center', fontWeight: '300' }}>
            {ale}
          </p>
          <Divider sx={{ borderBottomWidth: '45px' }} />
          <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:0.8 }} className="classicbtn" 
          onClick={() => {
            if (aleT) {
              setOpen(false)
              router.push('/dashboard')
            } else {

              setOpen(false)
            }
          }}
          >
             <p style={{ color: 'white', padding: '8px', width: '100%', textAlign: 'center', cursor: 'pointer' }} 
             onClick={() => {
            if (aleT) {
              setOpen(false)
              router.push('/dashboard')
            } else {

              setOpen(false)
            }
          }}>OKAY</p>
          </motion.div>
         
        </Stack>

      </Modal>)
  }
}

export async function getServerSideProps({locale}) {
    
  return {
      props: {'ranter':generateRandomNumber(),   ...(await serverSideTranslations(locale, [
        'all','login'
      ])),}, // will be passed to the page component as props
  }
}