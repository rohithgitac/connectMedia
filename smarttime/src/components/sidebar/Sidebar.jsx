import React, { useContext, useEffect, useState } from 'react'
import './sidebar.css'
import instance from '../../axios'
import {AuthContext} from '../../context/AuthContext'
import {Link} from 'react-router-dom'
import {RssFeed,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,WorkOutline,Event,School} from '@mui/icons-material'
const Sidebar = () => {

    const {state,dispatch} = useContext(AuthContext)
    const {user} = state.state1
    
    const [mayKnow,setMayKnow] = useState(null)
    useEffect(() => {
        const suggestionFetch = async() => {
            const body = {_id:user._id}
            const suggestion = await instance.put(`/connect/user/${user._id}/suggestion`,body)
            setMayKnow(suggestion.data)
        }
        suggestionFetch()
    },[user._id])

  return (
    <div className='sidebar'>
        <div className="sidebar-container">
            <ul className="sidebar-list">
                <li className="sidebar-listitem">
                    <RssFeed/>
                    <span>Feed</span>
                </li>
                <li className="sidebar-listitem">
                    <PlayCircleFilledOutlined/>
                    <span>Videos</span>
                </li>
                <li className="sidebar-listitem">
                    <Group/>
                    <span>Groups</span>
                </li>
                <li className="sidebar-listitem">
                    <Bookmark/>
                    <span>Bookmarks</span>
                </li>
                <li className="sidebar-listitem">
                    <HelpOutline/>
                    <span>Questions</span>
                </li>
                <li className="sidebar-listitem">
                    <WorkOutline/>
                    <span>Jobs</span>
                </li>
                <li className="sidebar-listitem">
                    <Event/>
                    <span>Events</span>
                </li>
                <li className="sidebar-listitem">
                    <School/>
                    <span>Courses</span>
                </li>
            </ul>
            <button>Show more</button>
            <hr/>
            <h4>Friends you may know</h4>
            <ul className='sidebar-friendslist'>
                    {mayKnow && mayKnow.map((person) => 
                <Link key={person._id} to={`/profile/${person._id}`}
                    style={{textDecoration:'none',color:'darkviolet',fontWeight:'550'}}>    
                <li className='sidebar-friends'>
                    <img src={ person.profilePic ? person.profilePic : '/noProfile.png'} alt="img" />
                    <span>{person.userName}</span>
                </li>
                </Link>
                    )}
                
            </ul>
        </div>
    </div>
  )
}

export default Sidebar