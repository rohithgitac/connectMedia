import React, { useContext, useEffect, useState } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import instance from '../../axios'
import { AuthContext } from '../../context/AuthContext'
import EditProfile from '../editProfile/EditProfile'
import { getAllTimeline } from '../../apiCalls'
import LinearProgress from '@mui/material/LinearProgress';
import { CircularProgress } from '@mui/material'
import { GET_HOME_POST_FAIL, GET_HOME_POST_START, GET_HOME_POST_SUCCESS, GET_TIMELINE_POST_FAIL, GET_TIMELINE_POST_START, GET_TIMELINE_POST_SUCCESS } from '../../constants'


const Feed = ({display,profile,setShowEditProfile,home,otherProfilePosts}) => {

  const {state,dispatch}= useContext(AuthContext)
  const {user} = state.state1
  const {post} = state.state2

  const {allTimelinePost,loading,error} = state.stateTimeline
  const {allHomePost,loading:loadHomePost,error:errorHomePost} =state.stateHome

  useEffect(() => {
  if(profile){
  const postFetch = async () => {
    dispatch({type : GET_TIMELINE_POST_START})
    try {
        const getPost = await instance.get(`/connect/post/timeline/${user._id}`);
        dispatch({type : GET_TIMELINE_POST_SUCCESS, payload : getPost.data })
    } catch (error) {
        dispatch({type: GET_TIMELINE_POST_FAIL,
            payload:error.response && error.response.data.msg ?
             error.response.data.msg :error.message})
    }
  } 
  postFetch();
  }
  }, [post,user,dispatch])
  
  return (
    <div className='feed'>
      <div className="feed-container">
        {
          display 
                ? <EditProfile setShowEditProfile={setShowEditProfile}/>
          :profile ? (
                <>  
                  <Share />
                  <> 
                  { loading ? (<div className='newPostLoading'><CircularProgress/></div> )
                  :
                  <>{
                   allTimelinePost && allTimelinePost.map((post) =>
                  (<Post key={post._id} postDetails={post}/>)
                   )
                  }</>
                  }  
                  {error && <p>{error}</p>}
                  </>
                </>)
          :home ?(
              <>  
               <Share />
               
               <>{
               loadHomePost ?
               <LinearProgress 
               color='secondary' style={{marginTop:'20px',height:'20px',borderRadius:'20px'}}/> :
               allHomePost && allHomePost.map((post) =>
               (<Post key={post._id} postDetails={post}/>)
               )
               }
                </>
              </>)
        :otherProfilePosts &&
              (
              <>
                {otherProfilePosts.map((everyPost) => 
                  <Post key={everyPost._id} postDetails={everyPost}/> )}
              </>  
              )
        }
      </div>
    </div>
  )
}


export default Feed