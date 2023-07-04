import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import './profile.css'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import { AuthContext } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'
import instance from '../../axios'
import AlertBox from '../../components/alert/AlertBox'
const Profile = ({others}) => {

  const [showEditProfile,setShowEditProfile] = useState(false)
  const {state,dispatch} = useContext(AuthContext)
  const {user,loading,error} = state.state1
  const {editedProfileData} = state.state3


  const editProfileHandler = () =>{
    setShowEditProfile(!showEditProfile)
  }

  const params = useParams()
  const [otherProfile,setOtherProfile] = useState([])
  const [otherProfilePosts,setOtherProfilePosts] = useState([])
  const [following,setFollowing]= useState(false)
  const [friendData,setFriendData] = useState(null)

  useEffect(() => {
    if(others){
    const otherProfileFetch = async() => {

      const resultOther = await instance.get(`/connect/user/${params.friendId}`)
      setOtherProfile(resultOther.data);
  
      const results = await instance.get(`/connect/post/timeline/${params.friendId}`);
      setOtherProfilePosts(results.data)

      const body = {userId:params.friendId}
      const resOtherfriends = await instance.put(`/connect/user/${params.friendId}/friendlist`,body)
      setFriendData(resOtherfriends.data)
    }
    otherProfileFetch()
    }
}, [params.friendId])

useEffect(() => {
  if(user && !others){
  const userFriendsDetailsFetch = async() => {
    const body = {userId : user._id}
    const resultfriend= await instance.put(`/connect/user/${user._id}/friendlist`,body)
    setFriendData(resultfriend.data)
  }
  userFriendsDetailsFetch()
 }
},[user,params])

useEffect(() => {
  if(others){
  if(user.following){
    const booleanResult = user.following.some(friend => friend.user === otherProfile._id)
    setFollowing(booleanResult)
  }
}
},[user,otherProfile])


const followHandler = async(e) =>{
  e.preventDefault();
  const userInfo = {userId : user._id}
  const resultFollow = await instance.put(`/connect/user/${params.friendId}/follow`,userInfo);
  console.log(resultFollow.data)
  if(resultFollow.data.userName){
  localStorage.setItem('userStorage',JSON.stringify(resultFollow.data))
  dispatch({type:'USER_RESET',payload:resultFollow.data})
  }
}

const unfollowHandler = async(e) =>{
  e.preventDefault()
  const userInfo = {userId : user._id}
  const resultunFollow = await instance.put(`/connect/user/${params.friendId}/unfollow`,userInfo);
  console.log(resultunFollow.data)
  if(resultunFollow.data.userName){
  localStorage.setItem('userStorage',JSON.stringify(resultunFollow.data))
  dispatch({type:'USER_RESET',payload:resultunFollow.data})
  }
}
const [showalert,setShowalert] = useState(false)
const deleteHandler = async() => {
  setShowalert(true)
  try {
    console.log(user._id) 
    const deleteResult = await instance.delete(`/connect/user/${user._id}`,
                         {headers:{
                          'Content-Type':'application/json'},
                          data:{userId : user._id}
                         })
    console.log(deleteResult.data)
    dispatch({type:'LOGOUT'})
    localStorage.removeItem('userStorage');
  } catch (error) {
    console.log('error',error)
  }
  
}

if(others && otherProfile){

  return (
    <>
      <Header/>
      <div className="profile">
        <Sidebar/>
        <div className="profile-right">
            <div className="profile-right-top">
                <div className="profile-photo-container">
                    <img className='cover-photo' 
                      src={otherProfile.coverPic ? otherProfile.coverPic
                         : '/noCover.png'} alt="img" />
                    <div className="top-center-items">
                        <img className='profile-photo' 
                          src={otherProfile.profilePic ? otherProfile.profilePic
                         : '/noProfile.png'} alt="img" />
                        <h4>{otherProfile.userName}</h4>
                        <p>" {otherProfile.about} " </p>
                    </div>
                </div>
            </div>
            <div className="profile-buttons">
              {following ? 
              <button onClick={unfollowHandler}>Unfollow -</button> :
              <button onClick={followHandler}>Follow +</button>
              }
              
            </div>
            <hr />
            <div className="profile-right-bottom">
                <Feed  otherProfilePosts={otherProfilePosts} setShowEditProfile={setShowEditProfile} />
                <Rightbar profile={otherProfile} friendData={friendData}/>
            </div>
        </div>
      </div>
    </>  
  )
  }else {
    return (
      <>
        <Header/>
        <div className="profile">
          <Sidebar/>
          <div className="profile-right">
              <div className="profile-right-top">
                  <div className="profile-photo-container">
                      <img className='cover-photo' src={user.coverPic ? user.coverPic
                           : 'noCover.png'} alt="img" />
                      <div className="top-center-items">
                          <img className='profile-photo' src={user.profilePic ? user.profilePic
                           : 'noProfile.png'} alt="me" />
                          <h4>{user.userName}</h4>
                          <p>" {user.about} " </p>
                      </div>
                  </div>
              </div>
              <div className="profile-buttons">
                <button onClick={editProfileHandler}>Edit Profile</button>
                <button onClick={deleteHandler}>Delete Profile</button>
              </div>
              {showalert && <AlertBox message={'Are you sure to delete..??'}/>}
              <hr />
              <div className="profile-right-bottom">
                  <Feed display={showEditProfile} profile={true} setShowEditProfile={setShowEditProfile} />
                  <Rightbar profile={user} friendData={friendData}/>
              </div>
          </div>
        </div>
      </>  
    )
  }
}

export default Profile