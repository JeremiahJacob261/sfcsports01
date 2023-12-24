import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from 'next/link'
import { Modal, Box, Stack, OutlinedInput, Button, Typography, Divider } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Form as Farm } from 'react-bootstrap'
import LOGO from '../../public/Sheffield_FC.svg.png'
import Image from 'next/image'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { supabase } from '../api/supabase'
import Backdrop from '@mui/material/Backdrop';
import Wig from '../../public/icon/wig.png'
import Big from '../../public/icon/badge.png'
import Warn from '@/public/warn.png'
import Success from '@/public/success.png'
import codes from '../api/codeswithflag.json'
export default function Register({ refer }) {
  const [password, setPassword] = useState("")
  const [cpassword, setcPassword] = useState("")
  const route = useRouter();
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")
  const [age, setAge] = useState("+84");
  const [drop, setDrop] = useState(false);
  const [idR, setidR] = useState(refer);
  const [agecheck, setAgecheck] = useState(false);
  const [lvla, setLvla] = useState('');
  const [lvlb, setLvlb] = useState('');
  const [email, setEmail] = useState('')
  //alerts
  const [ale, setAle] = useState('')
  const [open, setOpen] = useState(false)
  const [aleT, setAleT] = useState(false)
  const Alerts = (m, t) => {
    setAle(m)
    setAleT(t)
    setOpen(true)
  }
  //end
  const nRef = generateRandomSevenDigitNumber().toString();
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  function generateRandomSevenDigitNumber() {
    const min = 1000000; // Smallest 7-digit number (1,000,000)
    const max = 9999999; // Largest 7-digit number (9,999,999)
    const randomSevenDigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomSevenDigitNumber;
  }
  const updateRef = async () => {
    const { data, error } = await supabase
      .from('referral')
      .insert({ refer: nRef, count: 0 })
  }
  const updateRefb = async () => {
    const { data, error } = await supabase
      .rpc('increment', { x: 1, row_id: idR })
  }
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
            let usersinfo = data[0];
            localStorage.setItem('userinfo', usersinfo);
            console.log(data);
          } catch (e) {

          }

        }
        GET();
        const { data:users,error:uerr} = await supabase
        .from('users')
        .select('*')
        .eq('uid',user.id)
        let usersinfo = users[0];
        localStorage.setItem('userinfo', usersinfo);
        localStorage.setItem('signedIns', true);
        localStorage.setItem('signUids', user.id);
        localStorage.setItem('signNames', user.user_metadata.displayName);
        route.push('/dashboard');
      } else {

        console.log('sign out');
        localStorage.removeItem('signedIns');
        localStorage.removeItem('signUids');
        localStorage.removeItem('signNames');
        localStorage.removeItem('signRef');
      }
    }
    // getSe();
    async function lvls() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select()
          .eq('newrefer', refer)
        console.log(data);
        console.log(refer);
        setLvla(data[0].refer);
        setLvlb(data[0].lvla);
      } catch (e) {
        console.log(e);
        setLvla('');
        setLvlb('');
      }

    }
    lvls();
  }, []);

  const signup = async () => {
    setDrop(true);
    const upload = async (user) => {

      try {
        console.log(nRef)
        const regRoute = async (uidl,password,phone,refer,username,age,nref,lvla,lvlb,email) => {
          try{
let test = await fetch('/api/regapi', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                uidl:uidl,
                password:password,
                phone:phone,
                refer:refer,
                username:username,
                age:age,
                nref:nref,
                lvla:lvla,
                lvlb:lvlb,
                email:email
               })
          }).then(data => {
              return data.json();
          })
          console.log(test);
          }catch(e){
            console.log(e)
          }
          
  
      }
      regRoute(user.id,values.password,phone,refer,username,age,nRef,lvla,lvlb,email);
          const testRoute = async (ref,newname) => {
            try{
let test = await fetch('/api/regnotice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newname:newname,ref:ref })
            }).then(data => {
                return data.json();
            })
            console.log(test);
            }catch(e){
              console.log(e)
            }
            
    
        }
        testRoute(refer,username)
        localStorage.setItem('signedIns', true);
        localStorage.setItem('signUids', user.id);
        localStorage.setItem('signNames', username);
        localStorage.setItem('signRef', nRef);
      } catch (e) {
        console.log(e)
      }
    }
    async function signUpWithEmail() {

      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: values.password,
          options: {
            data: {
              displayName: username,
              phoneNumber: phone,
            }
          }
        })
        console.log('User registered successfully:', data.user);


        console.log(data)
        if (error) {
          throw error;
        } else {
          //getlvl2
          upload(data.user);
          updateRef();
          updateRefb();
          setDrop(false);
          Alerts(`Welcome To SFCSPORTS01`, true);
        }
      } catch (error) {
        console.error('Error signing up:', error);
        setDrop(false);
        console.error('Error signing up:', error.message);
        if (error.message === 'User already registered') {
          Alerts('Email already exists!', false)
        } else {
          if (error.message === 'Password should be at least 6 characters') {
            Alerts('For security reasons, please choose a stronger password. It should be at least 8 characters long and include a mix of letters, numbers, and symbols', false)
          } else {
            if (error.message === 'Unable to validate email address: invalid format') {
              Alerts('Please enter a valid email address', false)
            } else {

              Alerts('Please Check Your internet connection and try again, if problem persist please contact support', false)
            }
          }
        }
      }
    }
    signUpWithEmail()


  }


  return (
    <Stack justifyContent="center" alignItems="center"
      spacing={5}
      style={{
        background: "black", width: '100%', minHeight: '100vh'
      }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={drop}
      >
        <SportsSoccerIcon id='balls' sx={{ marginLeft: '8px' }} />
      </Backdrop>
      <Alertz />
      <Head>
        <title>Register</title>
        <meta name="description" content="Register With us to get the latest betting market and fantantic Bonus" />
        <link rel="icon" href="/Sheffield_FC.svg.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box >

        <Stack spacing={5} sx={{ padding: '8px' }}>
          <Stack direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            className="glass"
            sx={{ height: "100%", marginTop: "15px", padding: "10px", backgound: "#495265" }}>
            <Stack direction="column" spacing={4} justifyContent="center" alignItems="center">
              <Link href='/'>
              <Image src={LOGO} width={100} height={120} alt='logo sfcsports' />
              </Link>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography style={{ fontFamily: 'Noto Serif, serif', color: "#E5E7EB", fontWeight: '400', fontSize: '20px' }}>SFCSPORTS01 </Typography>
              </Link>
              <Typography style={{ fontFamily: 'Poppins,sans-serif', color: '#E5E7EB', fontSize: '25px', fontWeight: '400', width: '240px', textAlign: 'center' }}>
                Sign up now and get a welcome bonus!
              </Typography>
              <Typography style={{ opacity: '0.7', fontFamily: 'Poppins,sans-serif', color: '#E5E7EB', fontSize: '14px', fontWeight: '100', width: '292px', textAlign: 'center' }}>
                Enter the correct information provided to create an account
              </Typography>
            </Stack>

            <TextField id="outlined-basic" label="Username" variant="outlined"
              sx={{ padding: 0, fontSize: '14', fontWeight: '300', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif', width: "100%", background: '#D8B16B', input: { color: '#E5E7EB', } }}
              value={username}
              onChange={(e) => {
                setUsername((e.target.value).trim())
              }}
            />
            <TextField id="outlined-basic" label="Email" variant="outlined"
              sx={{ fontSize: '14', fontWeight: '300', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif', width: "100%", background: '#D8B16B', input: { color: '#E5E7EB' } }}
              value={email}
              type='email'
              onChange={(e) => {
                setEmail((e.target.value).trim())
              }}
            />
            <TextField id="outlined-basic" label="Invite Code" variant="outlined"
              value={idR}
              disabled
              sx={{ fontSize: '14', fontWeight: '300', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif', width: "100%",color: '#E5E7EB', background: '#D8B16B', input: { color: '#E5E7EB' } }}
              onChange={(e) => {
                setidR(e.target.value)
              }} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Code</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="+84"
                sx={{ fontSize: '14', color: '#E5E7EB', fontWeight: '300', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif', width: "100%", background: '#D8B16B', input: { color: '#E5E7EB' } }}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              >

                {
                  codes.countries.map((c) => {
                    return (
                      <MenuItem value={c.code} key={c.name} sx={{ color: '#E5E7EB', background: '#D8B16B' }}>
                        <Stack direction='row' spacing={1}>
                          <Image src={c.flag_image_link} alt={c.name} width={25} height={22}/>
                        <Typography sx={{fontFamily: 'Poppins, sans-serif'}}> {c.code} {c.name}</Typography>
                        </Stack>
                       </MenuItem>
                    )
                  })
                }
                {/* {<MenuItem value='+1'>+1</MenuItem>
                <MenuItem value='+255'>+255</MenuItem>
                <MenuItem value='+55'>+55</MenuItem>
                <MenuItem value='+52'>+52</MenuItem>
                <MenuItem value='+54'>+54</MenuItem>
                <MenuItem value='+234'>+234</MenuItem>
                <MenuItem value='+62'>+62</MenuItem> */
                }

              </Select>
            </FormControl>
            <TextField id="outlined-basic" label="Phone"
              type="number"
              variant="outlined"
              sx={{ fontSize: '14', fontWeight: '300', border: '1px solid #E5E7EB', color: '#E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif', width: "100%", background: '#D8B16B', input: { color: '#E5E7EB' } }}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }} />

            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                sx={{ fontSize: '14', fontWeight: '300', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif', width: "100%", background: '#D8B16B', input: { color: '#E5E7EB' } }}
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
                label="Enter Password"
              />
            </FormControl>
            <TextField
              required
              id="outlined-required"
              label="Confirm Password"
              type="password"
              sx={{ fontSize: '14', fontWeight: '300', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif', width: "100%", background: '#D8B16B', input: { color: '#FFFFFF' } }}
              value={cpassword}
              onChange={(e) => {
                setcPassword((e.target.value).trim());
              }}
            />
          </Stack>
          <Stack spacing={3} sx={{ margin: '8px', padding: '8px' }}>
            <Farm.Check
              type="checkbox"
              label=" Accept our Terms and Conditions"
              id="age"
              sx={{ fontSize: '14', fontWeight: '300', border: '1px solid #E5E7EB', borderRadius: '4px', fontFamily: 'Poppins, sans-serif' }}
              value={agecheck}
              onChange={(a) => {
                setAgecheck(a.target.value)
              }}
              style={{ color: "#E5E7EB" }}
            />
            <Button variant="contained" className="authactionbtn" sx={{ fontFamily: 'Poppins, sans-serif', padding: "10px", width: '100%' }}
              onClick={() => {
                if (phone.length >= 9) {

                  const checkDuplicate = async () => {
                    const { count, error } = await supabase
                      .from('users')
                      .select('*', { count: 'exact', head: true })
                      .eq('username', username)
                    console.log(count);
                    if (count > 0) {
                      Alerts("Username Already Exist!", false);
                    } else {
                      if (agecheck === false) {
                        Alerts('Please click the checkBox before you continue', false)
                      } else {
                        if (cpassword === values.password) {

                          signup()
                        } else {
                          Alerts('ensure the passowords are same', false)
                        }

                      }

                    }
                  }
                  checkDuplicate()

                } else {
                  Alerts('Please Input a Complete Phone Number! at least 9 digits', false)
                }
              }}>
              <p style={{  marginLeft: "3px", color: '#D8B16B', fontSize: '14px',fontWeight:'400'}}>Register</p>
            </Button>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: '22px' }} spacing={1}>
              <Typography sx={{ color: "#E5E7EB", fontSize: '14px', fontWeight: '100', opacity: '0.7', fontFamily: 'Poppins,sans-serif' }}>Already have an Account ? </Typography>
              <Typography>
                <Link href="/login" style={{ textDecoration: "none", fontSize: '14px', fontWeight: '100', color: "#E5E7EB", opacity: '1.0', fontFamily: 'Poppins,sans-serif' }}>Login</Link></Typography>

            </Stack>
          </Stack>


        </Stack>
      </Box>
    </Stack>
  )
  function Alertz() {
    return (
      <Modal
        open={open}
        onClose={() => {
          if (aleT) {
            setOpen(false)
            route.push('/dashboard')
          } else {
            setOpen(false)
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack alignItems='center' justifyContent='space-evenly' sx={{
          background: '#E5E7EB', width: '290px', height: '330px', borderRadius: '20px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '12px'
        }}>
          <Image src={aleT ? Success : Warn} width={120} height={120} alt='widh' />
          <p id="modal-modal-title" style={{ fontSize: '20px', fontWeight: '500',color:'black' }}>

            {aleT ? 'Success' : 'Sorry!'}
          </p>
          <p id="modal-modal-description" style={{  mt: 2, color:'black',fontSize: '16px',textAlign:'center', fontWeight: '300' }}>
            {ale}
          </p>
          <Divider sx={{ borderBottomWidth: '45px'}} />
          <p style={{  color: '#D8B16B', padding: '8px', width: '100%',textAlign:'center',cursor: 'pointer' }} onClick={() => {
            if (aleT) {
              setOpen(false)
              route.push('/dashboard')
            } else {

              setOpen(false)
            }
          }}>OKAY</p>
        </Stack>

      </Modal>)
  }
}
export async function getServerSideProps(context) {
  const { refer } = context.query;
  console.log(refer)
  return {
    props: { refer },
  }
}
