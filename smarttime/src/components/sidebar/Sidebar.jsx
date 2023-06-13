import React from 'react'
import './sidebar.css'
import {RssFeed,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,WorkOutline,Event,School} from '@mui/icons-material'
const Sidebar = () => {
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
            <ul className='sidebar-friendslist'>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Friend name</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
                <li className='sidebar-friends'>
                    <img src="rohith.jpg " alt="img" />
                    <span>Rohith</span>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar