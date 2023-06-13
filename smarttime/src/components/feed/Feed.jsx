import React from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'


const Feed = () => {
  return (
    <div className='feed'>
      <div className="feed-container">
        <Share/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
    </div>
  )
}

export default Feed