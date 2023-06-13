import React from 'react'
import './share.css'
import {PermMedia,Label,Room,EmojiEmotions} from '@mui/icons-material'
import { IconButton } from '@mui/material'
const Share = () => {
  return (
    <div className='share'>
        <div className="share-container">
            <div className="share-top">
                <img src="sree.jpg" alt="img" />
                <input type="text" placeholder="What's in your mind ?" />
            </div>
            <hr />
            <div className="share-bottom">
                <div className="share-options">
                    <div className="share-option">
                        <IconButton>
                        <PermMedia htmlColor='tomato'/>
                        </IconButton>
                        <span>Photo or video</span>
                    </div>
                    <div className="share-option">
                    <IconButton><Label htmlColor='blue'/>
                        </IconButton>
                        <span>Tag</span>
                    </div>
                    <div className="share-option">
                    <IconButton><Room htmlColor='green'/></IconButton>
                        <span>Location</span>
                    </div>
                    <div className="share-option">
                    <IconButton><EmojiEmotions htmlColor='goldenrod'/></IconButton>
                        <span>Feelings</span>
                    </div>
                    <button>Share</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Share