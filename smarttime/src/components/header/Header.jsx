import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import {Search,AccountBox,Chat,NotificationsActive} from '@mui/icons-material'
const Header = () => {
  return (
    <nav>
    <div className='topbar'>
        <div className="topbar-left">
          <Link to='/'><span className='topbar-logo'>ConnecT</span></Link>
        </div>
      <div className='topbar-center'>
        <div className="topbar-search">
          <Search className='topbar-s'/>
          <input type='text' placeholder='Search for friend, post or video'/>
        </div>
      </div>
      <div className='topbar-right'>
        <span className="topbar-link">Home</span>
        <span className="topbar-link">Timeline</span>
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
       <img src="/sree.jpg" alt="" />
      </div>
    </div>
    </nav>
  )
}

export default Header