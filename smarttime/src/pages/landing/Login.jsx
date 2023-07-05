import React, { Component, useContext, useEffect, useRef, useState } from 'react';
import "./Login.css";
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {Visibility,VisibilityOff} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Loading from '../../components/loading/Loading';
import {Link} from 'react-router-dom'
const Login = () => {
  const [showPassword,setShowPassword] = useState(false)

  const email = useRef();
  const password = useRef();
  const {state,dispatch} = useContext(AuthContext)
  const {user,loading,error} =state.state1
  const [errors,setErrors] = useState(null)
  
  const handleLogin = (e) => {
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch)
    if(error)
    setErrors(error)
  }
 
  const visibilityHandler = () => {
    setShowPassword(!showPassword);
  }
  return (
    <div className='login'>
      {loading ? (
        <Loading/>
      )  
    :(
        <div className="login-container">
            <div className="login-left">
                <h2>ConnecT</h2>
                <span>Connect to your social bondings...</span>
            </div>
            <div className="login-right">
              <form className="login-box" onSubmit={handleLogin}>
                <div className={errors?'errorMsg':'noError'}>{errors && errors}</div>
                <input type="email" required placeholder='Email' ref={email}/>
                <div className='input-container'>
                <input required ref={password} minLength='4' type={showPassword ? 'text' : 'password'} placeholder='Password' />
                <IconButton className='eye' onClick={visibilityHandler}>{showPassword ?<VisibilityOff fontSize='small'/>:<Visibility fontSize='small'/>}</IconButton>
                </div>             
                <button type='submit' className='login-button'>Login</button>
                {/* <span>Forgot password..?<a href="">click here..</a></span> */}
                <button type='button' className='new-account'><Link to='/register' style={{textDecoration:'none',color:'white'}}>Create a new account</Link></button>
              </form>
            </div>
        </div>
      )}  
    </div>
  )
}

export default Login