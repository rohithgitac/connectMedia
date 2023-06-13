import React from 'react'
import './home.css'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'

const Home = () => {
  return (
    <>
      <Header/>
      <div className="body-container">
        <Sidebar/>
        <Feed/>
        <Rightbar/>
      </div>
    </>  
  )
}

export default Home