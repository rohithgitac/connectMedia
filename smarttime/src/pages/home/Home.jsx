import React, { useContext, useEffect } from 'react'
import './home.css'
import '../../components/header/header.css'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { AuthContext } from '../../context/AuthContext'
import { GET_HOME_POST_FAIL, GET_HOME_POST_START, GET_HOME_POST_SUCCESS } from '../../constants'
import instance from '../../axios'

const Home = () => {
  
  const {state,dispatch} = useContext(AuthContext)
  const {user,loading,error} =state.state1
  const {post} = state.state2
  const {allHomePost,loading:loadHomePost,error:errorHomePost} =state.stateHome

  useEffect(() => {
    const fetchHomePost = async() => {
      dispatch({type:GET_HOME_POST_START})
      try {
        const homePost = await instance.get(`/connect/post/homepost/${user._id}`)
        dispatch({type:GET_HOME_POST_SUCCESS,payload:homePost.data})
      } catch (error) {
        console.log(error)
        dispatch({type:GET_HOME_POST_FAIL,payload:error.response && error.response.data.msg ?
          error.response.data.msg :error.message})
      }
    }
    fetchHomePost()
     
  }, [post,user,dispatch])
  
  useEffect(() => {
    const toggleButton = document.getElementById('toggleButton');
    const leftSidebar = document.querySelector('.left-sidebar');

    const toggleSidebars = () => {
      leftSidebar.classList.toggle('sidebarA');
    };

    toggleButton.addEventListener('click', toggleSidebars);

    return () => {
      toggleButton.removeEventListener('click', toggleSidebars);
    };
  }, []);

  return (
    <>
      <div  className='main-header'><Header/></div>
      <button id="toggleButton" >^</button>
      <div className="body-container">
        <div className='sidebarA left-sidebar'><Sidebar/></div>
        <div className='main-content'><Feed home={true}  /></div>
        <div className='sidebarB right-sidebar'><Rightbar/></div>
      </div>
    </>  
  )
}

export default Home