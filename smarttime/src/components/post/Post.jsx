import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import { MoreVert,ThumbUpAltOutlined,Comment,ThumbUpAltRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { AuthContext } from '../../context/AuthContext'
import instance from '../../axios'

const Post = ({postDetails}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {user }= state.state1
    const [likePost,setLikePost] = useState(false)
    const [countLike,setCountLike] = useState(postDetails.likes.length)

    useEffect(() => {
      setLikePost(postDetails.likes.includes(user._id))
    }, [postDetails.likes,user._id])
    
    const likeHandler = async(postId) => {
        
        try {
            const result = await instance.put(`/connect/post/${postId}/like`,{user:user._id})
            setCountLike(likePost ? countLike-1 : countLike+1)
            setLikePost(!likePost)
            
        } catch (error) {
            console.log(error)
        }

    }
    

  return (
    <div className='post'>
        <div className="post-container">
            <div className="post-top">
                <div className="post-top-left">
                    <Link to={(postDetails.user && user) ? ((postDetails.user._id === user._id) ? '/profile' : `/profile/${postDetails.user._id}`)
                                : '/'} 
                    style={{textDecoration:'none'}}> 
                    <IconButton>
                    {(postDetails.user && postDetails.user.profilePic)  
                        ? (<img className='post-top-img' src={postDetails.user.profilePic} alt="img" />)
                        :    
                    <Stack direction="row" spacing={2}>
                        <Avatar sx={{ bgcolor: deepPurple[500],width:35,height:35 }}>{(postDetails.user && postDetails.user.userName) ? postDetails.user.userName[0] : '!'}</Avatar>
                    </Stack>
                    }
                    </IconButton>
                    <span style={{color:'black'}} className='post-owner'>{(postDetails.user && postDetails.user.userName) ? postDetails.user.userName : 'Deleted account'}</span>
                    </Link>
                    <span className='post-time'>{format(postDetails.createdAt)}</span>
                </div>
                <div className="post-top-right">
                    <IconButton>
                    <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="post-center">
                <span>{postDetails.postDesc}</span>
                <div className='img'>{postDetails.img && (<img src={`${postDetails.img}`} alt="img" />) }</div>
            </div>
            <div className="post-bottom">
                <div className="post-bottom-left">
                    <IconButton onClick={()=>likeHandler(postDetails._id)}>
                        {likePost ?
                         <ThumbUpAltRounded htmlColor='blue'/>
                        :
                        <ThumbUpAltOutlined htmlColor='blue'/>
                        }
                    </IconButton>
                    <span><b>{countLike}</b> people like's</span>
                </div>
                <div className="post-bottom-right">
                    <IconButton>
                    <Comment htmlColor='gray'/>
                    </IconButton>
                    <span>{postDetails.comments.length} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post