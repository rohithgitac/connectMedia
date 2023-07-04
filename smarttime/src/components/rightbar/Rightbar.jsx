import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import './rightbar.css'
import {Cake} from '@mui/icons-material'
import {format} from 'timeago.js'
import Ads from '../ads/Ads'
import { AuthContext } from '../../context/AuthContext'
const Rightbar = ({profile,friendData}) => {

  const {state,dispatch} = useContext(AuthContext)
  const {user} = state.state1
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
            <img src="half.jpg" alt="" />
            <span className='online'></span>
            <span className='online-name'>Rohith</span>
          </li>
        </ul>
      </>
    )
  }

  const ProfileRightbar =({friendData}) => {
    
    return (
      <div className="profile-right">
        <h3>User Informations</h3>
        <div className="profile-right-info">
          <div className="profile-right-info-item">
            <span className='key-name'>City :</span>
            <span className='value-name'>{profile.city && profile.city}</span>
          </div>
          <div className="profile-right-info-item">
            <span className='key-name'>Joined :</span>
            <span className='value-name'>{format(profile.createdAt)}</span>
          </div>
          <div className="profile-right-info-item">
            <span className='key-name'>Relationship :</span>
            <span className='value-name'>{profile.relationship  && profile.relationship}</span>
          </div>
        </div>  
          <h3>Following</h3>
          <div className="profile-followers">
            {friendData && friendData.map((friend) => 
              ((friend.user && (friend.user._id === user._id)) ?
              <Link key={friend.user._id} to={'/profile'} style={{textDecoration:'none',color:'black'}}>            
                <div  className="profile-follower">
                 <img src={friend.user.profilePic ?
                            friend.user.profilePic :
                            '/noProfile.png'} alt="img" />
                 <span>{friend.user.userName}</span>
              </div>
              </Link>
              :friend.user &&
              (<Link key={friend.user._id} to={`/profile/${friend.user._id}`} style={{textDecoration:'none',color:'black'}}>            
                <div  className="profile-follower">
                 <img src={friend.user.profilePic ?
                            friend.user.profilePic :
                            '/noProfile.png'} alt="img" />
                 <span>{friend.user.userName}</span>
              </div>
              </Link>)
              )
            )}
          </div>  
      </div>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbar-container">
        {profile ? 
          <ProfileRightbar friendData={friendData}/>
          :
          <Homerightbar/>
        }
      </div>
    </div>
  )
}

export default Rightbar