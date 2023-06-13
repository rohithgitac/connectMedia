import React from 'react'
import './register.css'
const Register = () => {
  return (
    <div className='login'>
        <div className="login-container">
            <div className="register-left">
                <h2>ConnecT</h2>
                <span>Connect you to a new world and dreams...</span>
            </div>
            <div className="login-right">
              <div className="login-box">
                <input type="text" placeholder='Username'/>
                <input type="text" placeholder='Email'/>
                <input type="text" placeholder='Password' />
                <input type="text" placeholder='Confirm password' />
                <button className='login-button'>Register</button>
                <span>Forgot password..?</span>
                <button className='new-account'>Already have an account.?</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Register