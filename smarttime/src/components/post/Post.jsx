import React from 'react'
import './post.css'
import { MoreVert,ThumbUpAltOutlined,Comment } from '@mui/icons-material'
import { IconButton } from '@mui/material'
const Post = () => {
  return (
    <div className='post'>
        <div className="post-container">
            <div className="post-top">
                <div className="post-top-left">
                    <IconButton>
                    <img className='post-top-img' src="rohith.jpg" alt="img" />
                    </IconButton>
                    <span className='post-owner'>Name</span>
                    <span className='post-time'>5 min ago..</span>
                </div>
                <div className="post-top-right">
                    <IconButton>
                    <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="post-center">
                <span>Hey! It's my first post..</span>
                <img src="rohith.jpg" alt="img" />
            </div>
            <div className="post-bottom">
                <div className="post-bottom-left">
                    <IconButton>
                        <ThumbUpAltOutlined htmlColor='lightblue'/>
                    </IconButton>
                    <span>32 people like's</span>
                </div>
                <div className="post-bottom-right">
                    <IconButton>
                    <Comment htmlColor='gray'/>
                    </IconButton>
                    <span>12 comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post