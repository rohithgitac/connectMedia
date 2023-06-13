import React from 'react'
import './rightbar.css'
import {Cake} from '@mui/icons-material'
import Ads from '../ads/Ads'
const Rightbar = ({profile}) => {
  const Homerightbar =() => {
    return (
      <>
         <div className="birthday">
          <Cake sx={{fontSize:50}} htmlColor='brown'/>
          <span>
            <b> Rohith</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <div className='ads-container'>
          <Ads/>
        </div>
        <h4>Online friends</h4>
        <ul className='friends-list'>
          <li className='friends-list-item'>
            <img src="friend.jpg" alt="" />
            <span className='online'></span>
            <span className='online-name'>Rohith</span>
          </li>
          <li className='friends-list-item'>
            <img src="friend.jpg" alt="" />
            <span className='online'></span>
            <span className='online-name'>Rohith</span>
          </li>
          <li className='friends-list-item'>
            <img src="friend.jpg" alt="" />
            <span className='online'></span>
            <span className='online-name'>Rohith</span>
          </li>
          <li className='friends-list-item'>
            <img src="friend.jpg" alt="" />
            <span className='online'></span>
            <span className='online-name'>Rohith</span>
          </li>
          <li className='friends-list-item'>
            <img src="friend.jpg" alt="" />
            <span className='online'></span>
            <span className='online-name'>Rohith</span>
          </li>
          <li className='friends-list-item'>
            <img src="friend.jpg" alt="" />
            <span className='online'></span>
            <span className='online-name'>Rohith</span>
          </li>
          <li className='friends-list-item'>
            <img src="friend.jpg" alt="" />
            <span className='online'></span>
            <span className='online-name'>Rohith</span>
          </li>
        </ul>
      </>
    )
  }

  const ProfileRightbar =() => {
    return (
      <div className="profile-right">
        <h3>User Informations</h3>
        <div className="profile-right-info">
          <div className="profile-right-info-item">
            <span className='key-name'>City :</span>
            <span className='value-name'>Irinjalakuda</span>
          </div>
          <div className="profile-right-info-item">
            <span className='key-name'>From :</span>
            <span className='value-name'>Kerala</span>
          </div>
          <div className="profile-right-info-item">
            <span className='key-name'>Relationship :</span>
            <span className='value-name'>Married</span>
          </div>
        </div>  
          <h4>Friends</h4>
          <div className="profile-followers">
            <div className="profile-follower">
              <img src="rohith.jpg" alt="img" />
              <span>Rohith</span>
            </div>
            <div className="profile-follower">
              <img src="rohith.jpg" alt="img" />
              <span>Souridh</span>
            </div>
            <div className="profile-follower">
              <img src="friend.jpg" alt="img" />
              <span>Rohith</span>
            </div>
            <div className="profile-follower">
              <img src="rohith.jpg" alt="img" />
              <span>Soumil</span>
            </div>
            <div className="profile-follower">
              <img src="sree.jpg" alt="img" />
              <span>Rohith</span>
            </div>
          </div>  
      </div>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbar-container">
        {profile ? 
          <ProfileRightbar/>
          :
          <Homerightbar/>
        }
      </div>
    </div>
  )
}

export default Rightbar