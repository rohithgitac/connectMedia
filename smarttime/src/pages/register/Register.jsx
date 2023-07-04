import React, { useRef, useState } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import {Visibility,VisibilityOff} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import instance from '../../axios'
const Register = () => {

  const navigate = useNavigate()

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confPassword = useRef();

  const [showPassword,setShowPassword] = useState(false)

  const registerHandler = async(e) => {
    e.preventDefault();
    if(password.current.value !== confPassword.current.value){
      console.log(password,confPassword)
      confPassword.current.setCustomValidity('Passwords do not match')
    }else{
      const newUser = {
        userName:name.current.value,
        email:email.current.value,
        password:password.current.value
      }
      try{
        const result = await instance.post('/connect/auth/register',newUser);
        alert('Your account created ,please login to continue')
        navigate('/login');
      }
      catch(err){
        console.log(err)
      }
    }
  }

  const visibilityHandler = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='login'>
        <div className="login-container">
            <div className="register-left">
                <h2>ConnecT</h2>
                <span>Connect you to a new world and dreams...</span>
            </div>
            <div className="login-right">
              <form className="login-box" onSubmit={registerHandler}>
                <input required ref={name} minLength='3' type="text" placeholder='Username'/>
                <input required ref={email} type="email" placeholder='Email'/>
                <div className='input-container'>
                <input required ref={password} minLength='4' type={showPassword ? 'text' : 'password'} placeholder='Password' />
                <IconButton className='eye' onClick={visibilityHandler}>{showPassword ?<VisibilityOff fontSize='small'/>:<Visibility fontSize='small'/>}</IconButton>
                </div>
                <div className='input-container'>
                <input required ref={confPassword} type={showPassword ? 'text' : 'password'} placeholder='Confirm password' />
                <IconButton className='eye' onClick={visibilityHandler}>{showPassword ?<VisibilityOff fontSize='small'/>:<Visibility fontSize='small'/>}</IconButton>
                </div>
                <button type='submit' className='login-button'>Register</button>
                <button className='new-account'><Link to='/login' style={{textDecoration:'none',color:'white'}} >Already have an account.?</Link></button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default Register