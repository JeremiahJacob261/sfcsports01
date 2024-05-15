import { Icon } from '@iconify/react';
import { Stack, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'
import { useState, useRef } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { supabase } from '@/pages/api/supabase';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';
import LoadingBar from 'react-top-loading-bar'
import Image from 'next/image'
import Success from '@/public/success.png'
import Warn from '@/public/warn.png'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import Link from 'next/link';


export default function BindWallet() {
  function t(text) {
    return text;
}
  const [method, setMethod] = useState('USDT (TRC20)');
  const router = useRouter();
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const ref = useRef(null);
  const [bank, setBank] = useState("");
  //alerts
  const [ale, setAle] = useState('')
  const [accountname, setAccountName] = useState("");
  const [open, setOpen] = useState(false)
  const [aleT, setAleT] = useState(false)
  const Alerted = (m, t) => {
    setOpen(true)
    setAle(m)
    setAleT(t)
  }
  //end of alerts
  const testRoute = async () => {
    ref.current.continuousStart();
    let test = await fetch('/api/bind', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, pass: password, wallet: address, method: (method === 'USDT (TRC20)') ? 'usdt' : (method === 'PKR') ? 'pkr' : 'idr', bank: bank, accountname: accountname })
    }).then(data => {
      return data.json();
    })
    console.log(test);
    if (test[0].status === 'Failed') {
      alert(test[0].message);

      ref.current.complete();
    } else {

      router.push('/dashboard/bind/success')
    }

  }
  const checkValid = () => {
   if(method === 'IDR'){
      if(bank === ''){
        Alerted('Please enter bank name', false)
      }else if(accountname === ''){
        Alerted('Please enter account name', false)
      }else if(address === ''){
        Alerted('Please enter account number', false)
      }else if(password === ''){
        Alerted('Please enter password', false)
      }else if (password !== confirmPassword) {
        Alerted('Password and confirm password must be same', false)
      } else {
        testRoute();
      }
   }else{
    if (address === '') {
      Alerted('Please enter address', false)
    } else if (password === '') {
      Alerted('Please enter password', false)
    } else if (confirmPassword === '') {
      Alerted('Please enter confirm password', false)
    } else if (password !== confirmPassword) {
      Alerted('Password and confirm password must be same', false)
    } else {
      testRoute();
    }
   }
  }
  useEffect(() => {
    const check = async () => {

      try {
        const { data, error } = await supabase
          .from('wallet')
          .select('*')
          .eq('username', localStorage.getItem('signNames'))
        setUsers(data[0])
      } catch (error) {
        console.log(error);
      }

    }
    check()
    setName(localStorage.getItem('signNames'))
  }, [])
  return (
    <div className="backgrounds" style={{ minHeight: '99vh', width: '100%' }}>
      <Alerteds />
      <LoadingBar color="#f11946" ref={ref} />
      <Stack className='headers' direction="row" alignItems='center' sx={{ padding: '8px', width: '100%' }} spacing={1}>
        <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={24} height={24} onClick={() => {
          router.back()
        }} />
        <p className="text-sm text-gray-500">BIND WALLET</p>
      </Stack>
      <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ padding: '8px', width: '100%' }}>

        <Stack direction='column' alignItems='center' justifyContent='center' sx={{ background: '#573b41', padding: '12px', borderRadius: '8px', margin: '8px', maxWidth: '310px' }}>
          <p style={{ color: 'rgba(194,127,8,1)', fontSize: '18px' }} >Existing Wallets</p>
          {
            users.map((m) => {
              let date = new Date(m.created_at);
              let month = date.getMonth() + 1;
              let day = date.getDate();
              let year = date.getFullYear();
              let hours = date.getHours();
              let minutes = date.getMinutes();
              let seconds = date.getSeconds();
              let created_at = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
              return (
                <Stack key={m.id} direction='row' alignItems='center' spacing={2}>
                  <Stack direction='column'>
                    <p style={{ fontSize: '15px', color: '#981FC0', fontWeight: '600' }}>{m.wallet}</p>
                    <p style={{ fontSize: '12px', color: '#FFFFFF' }}>{created_at}</p>
                  </Stack>
                  <Icon icon="akar-icons:edit" width={24} height={24} onClick={() => {
                    router.push('/dashboard/bind')
                  }} />
                </Stack>
              )
            })
          }
        </Stack>
        <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{ padding: '12px' }}>
          <p>BIND WALLET</p>
          <form>
            <Stack direction='column' spacing={3}>
              <Stack spacing={2} sx={{ width: '310px' }}>
                <p>Select Payment Method</p>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={method}
                    label="Select Payment Method"
                    defaultValue='USDT (TRC20)'
                    onChange={(e) => {
                      setMethod(e.target.value);

                    }}
                    sx={{ color: 'black', backgroundColor: 'white' }}
                  >
                    <MenuItem value='USDT (TRC20)'>USDT (TRC20)</MenuItem>
                    <MenuItem value='IDR'>IDR (Indonesia)</MenuItem>
                    <MenuItem value='PKR'>PKR (Pakistani)</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              {
                (method != 'USDT (TRC20)') &&
                <div className='arrange-label'>
                  <label className='standard-label'>Bank Name</label>
                  <input className='standard-input' placeholder='Bank Name' type='text' value={bank} onChange={(e) => { setBank(e.target.value) }} />
                </div>
              }

              {
                (method != 'USDT (TRC20)') &&
                <div className='arrange-label'>
                  <label className='standard-label'>Account Name</label>
                  <input className='standard-input' placeholder='Account Name' type='text' value={accountname} onChange={(e) => { setAccountName(e.target.value) }} />
                </div>
              }
              <div className='arrange-label'>
                <label className='standard-label'>{(method === "IDR" || method === "PKR") ? "Account Number" : "Wallet Address"}</label>
                <input className='standard-input' placeholder={(method === "IDR" || method === "PKR") ? "Account Number" : "Wallet Address"} type='text' value={address} onChange={(e) => { setAddress(e.target.value) }} />
              </div>

              <div className='arrange-label'>
                <label className='standard-label'>Transaction PIN</label>
                <input className='standard-input' placeholder='Transaction PIN' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </div>

              <div className='arrange-label'>
                <label className='standard-label'>Confirm Transaction PIN</label>
                <input className='standard-input' placeholder='Confirm Transaction PIN' type='password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
              </div>

            </Stack>
          </form>
          <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
            <Icon icon="ph:info-light" color="#3F1052" />
            <p style={{ color: 'greenyellow', fontSize: '12px', fontWeight: '200', maxWidth: '90%' }}>TRANSACTION PIN IS REQUIRED FOR WITHDRAWALS TOO</p>
          </Stack>
          <motion.p onClick={() => {
            //   router.push('/dashboard/fund/success')
            checkValid();
          }}
            whileTap={{ background: '#981FC0', color: '#3F1052', scale: 0.9 }}
            whileHover={{ background: '#981FC0', color: '#3F1052', scale: 1.1 }}
            style={{ fontWeight: '500', fontSize: '12px', color: 'white', padding: '10px', background: '#3F1052', border: '0.6px solid #3F1052', width: '30vh', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}>
           Bind Wallet </motion.p>
          <Link href='/dashboard/codesetting'>
            <p style={{ color: 'greenyellow', fontSize: '12px', fontWeight: 'lighter', textDecoration: 'underline' }}>Set a transaction pin</p>

          </Link>
        </Stack>

      </Stack>
    </div>
  )
  function Alerteds() {
    return (
      <Modal
        open={open}
        onClose={() => {
          if (aleT) {
            setOpen(false)
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
          <p id="modal-modal-title" style={{ fontSize: '20px', fontWeight: '500', color: 'black' }}>

            {aleT ? 'Success' : 'Sorry!'}
          </p>
          <p id="modal-modal-description" style={{ mt: 2, color: 'black', fontSize: '16px', textAlign: 'center', fontWeight: '300' }}>
            {ale}
          </p>
          <div style={{ width:'90%', height:'1px',background:'grey'}}></div>
          <p style={{ color: 'red', padding: '8px', width: '100%', textAlign: 'center', cursor: 'pointer' }} onClick={() => {
            if (aleT) {
              setOpen(false)
              router.push('/dashboard')
            } else {

              setOpen(false)
            }
          }}>OKAY</p>
        </Stack>

      </Modal>

    )
  }
}