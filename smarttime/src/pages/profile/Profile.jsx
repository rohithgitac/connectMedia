import React from 'react'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import './profile.css'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
const Profile = () => {
  return (
    <>
      <Header/>
      <div className="profile">
        <Sidebar/>
        <div className="profile-right">
            <div className="profile-right-top">
                <div className="profile-photo-container">
                    <img className='cover-photo' src="friend.jpg" alt="img" />
                    <div className="top-center-items">
                        <img className='profile-photo' src="sree.jpg" alt="me" />
                        <h4>Sreelakshmi</h4>
                        <p>This is some description </p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="profile-right-bottom">
                <Feed/>
                <Rightbar profile/>
            </div>
        </div>
      </div>
    </>  
  )
}

export default Profile