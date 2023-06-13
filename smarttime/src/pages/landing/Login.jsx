import React from 'react'
import './login.css'
const Login = () => {
  return (
    <div className='login'>
        <div className="login-container">
            <div className="login-left">
                <h2>ConnecT</h2>
                <span>Connect you to a new world and dreams...</span>
            </div>
            <div className="login-right">
              <div className="login-box">
                <input type="text" placeholder='Email'/>
                <input type="text" placeholder='Password' />
                <button className='login-button'>Login</button>
                <span>Forgot password..?</span>
                <button className='new-account'>Create a new account</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login