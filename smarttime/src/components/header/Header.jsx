import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import {Search,AccountBox,Chat,NotificationsActive} from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
const Header = () => {

  const navigate = useNavigate();
  const {state,dispatch} =useContext(AuthContext)
  const {user} = state.state1
  
  const logoutHandler = () => {
    if(user){
      dispatch({type:'LOGOUT'})
      localStorage.removeItem('userStorage');
      navigate('/login')
    }
  }

  return (
    <nav>
    <div className='topbar'>
        <div className="topbar-left">
          <Link to='/' style={{textDecoration:"none"}}><span className='topbar-logo'>ConnecT</span></Link>
        </div>
      <div className='topbar-center'>
        <div className="topbar-search">
          <Search className='topbar-s'/>
          <input type='text' placeholder='Search for friend, post or video'/>
        </div>
      </div>
      <div className='topbar-right'>
        <span className="topbar-link">Home</span>
        <span className="topbar-link"><Link to='/profile'>Timeline</Link></span>
        <div className="topbar-icons">
          <div className="topbar-icon-item">
          <AccountBox/>
          <span>1</span>
          </div>
         <div className="topbar-icon-item">
          <Chat/>
          <span>4</span>
          </div>
          <div className="topbar-icon-item">
          <NotificationsActive/>
          <span>2</span>
          </div>
       </div>
       <img src={user.profilePic ? user.profilePic:'/noProfile.png'} alt="img" onClick={logoutHandler} />
      </div>
    </div>
    </nav>
  )
}

export default Header