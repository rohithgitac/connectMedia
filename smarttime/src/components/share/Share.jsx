import React, { useContext, useEffect, useRef, useState } from 'react'
import './share.css'
import {PermMedia,Label,Room,EmojiEmotions, Close} from '@mui/icons-material'
import { CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material'
import { newPostCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import instance from '../../axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
const Share = () => {
    const {state,dispatch}= useContext(AuthContext)
    const{user} = state.state1
    const{post,loading:loadingPost ,error:errorPost} = state.state2
    const postText = useRef()

    const [file,setFile] = useState(undefined)
    const [filePercentage,setFilePercentage] = useState(0)
    const [input,setInput] = useState({})

    useEffect(() => {
        file && uploadFile(file,'fileUrl')
    }, [file])
    
    const uploadFile= (file,fileType) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        console.log('file is name',fileName)
        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(progress)
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
            console.log('Upload is paused');
            break;
            case 'running':
            console.log('Upload is running');
            break;
        }
        }, 
        (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
            case 'storage/canceled':
            // User canceled the upload
            break;

            // ...

            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
        }, 
        () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setInput(downloadURL)
        });
        }
        );
    }
    
    const newPostHandler = async(e) => {
        e.preventDefault();
      const newPost = {
          postDesc:postText.current.value,
          user:user._id,
      }
      if(file){
          newPost.img = input ;
      }
      try {
          console.log(newPost)
          await newPostCall(newPost,dispatch)
          postText.current.value=''
          setFile(null)
          setFilePercentage(0)
      } catch (error) {
          console.log(error)
      }
    }

    return (
        <div className='share'>
        {errorPost && (<p>{errorPost}</p>)}
        <form className="share-container" encType='multipart/form-data' onSubmit={newPostHandler}>
            <div className="share-top">
                <img src={user.profilePic ? user.profilePic : 'noProfile.png'} alt="img" />
                <input type="text" required ref={postText} maxLength='500' placeholder="What's in your mind ?" />
            </div>
            <hr />{file &&
             (<div className="shareImg">
                <div className="shareImgContainer">
                    <img className='selectedImg' src={URL.createObjectURL(file)} alt="error" />
                    <Close className='closeImg' onClick={() => setFile(null)}/>
                </div>
            </div>)}
            {filePercentage>0 && (<div>Uploading {filePercentage}%...</div>)}
            <div className="share-bottom">
                <div className="share-options">
                    <label htmlFor='file' className="share-option">
                        <IconButton >
                        <PermMedia htmlColor='tomato'/>
                        </IconButton>
                        <span className='addFile'>Photo/video</span>
                        <input style={{display:'none'}} type="file"
                         id='file'
                         accept='.png,.jpeg,.jpg'
                         onChange={(e) => setFile(e.target.files[0])} />
                    </label>
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
                    <button type='submit'>{loadingPost?(<CircularProgress size={18} sx={{color:'whitesmoke'}} />):'Share'}</button>
                </div>
            </div>
        </form>
    </div>
  )
  // const newPostHandler = async(e) => {
  //     e.preventDefault();
  //     const newPost = {
  //         postDesc:postText.current.value,
  //         user:user._id,
  //     }
  //     if(file){
  //         const formdata = new FormData()
  //         const fileName = Date.now() + file.name;
  //         formdata.append("name",fileName)
  //         formdata.append("file",file,);
  //         newPost.img = fileName ;
  //         try {
  //         const res =   await instance.post('/connect/upload',formdata)
         
  //         } catch (error) {
  //             console.log(error)
  //         }
  //     }
  //     try {
  //         await newPostCall(newPost,dispatch)
  //         postText.current.value=''
  //         setFile(null)
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  //   return (
//     <div className='share'>
//         {errorPost && (<p>{errorPost}</p>)}
//         <form className="share-container" encType='multipart/form-data' onSubmit={newPostHandler}>
//             <div className="share-top">
//                 <img src={user.profilePic ? user.profilePic : 'noProfile.png'} alt="img" />
//                 <input type="text" ref={postText} maxLength='500' placeholder="What's in your mind ?" />
//             </div>
//             <hr />{file &&
//              (<div className="shareImg">
//                 <div className="shareImgContainer">
//                     <img className='selectedImg' src={URL.createObjectURL(file)} alt="error" />
//                     <Close className='closeImg' onClick={() => setFile(null)}/>
//                 </div>
//             </div>)}
//             <div className="share-bottom">
//                 <div className="share-options">
//                     <label htmlFor='file' className="share-option">
//                         <IconButton >
//                         <PermMedia htmlColor='tomato'/>
//                         </IconButton>
//                         <span className='addFile'>Photo/video</span>
//                         <input style={{display:'none'}} type="file"
//                          id='file'
//                         accept='.png,.jpeg,.jpg'
//                         onChange={(e) => setFile(e.target.files[0])} />
//                     </label>
//                     <div className="share-option">
//                     <IconButton><Label htmlColor='blue'/>
//                         </IconButton>
//                         <span>Tag</span>
//                     </div>
//                     <div className="share-option">
//                     <IconButton><Room htmlColor='green'/></IconButton>
//                         <span>Location</span>
//                     </div>
//                     <div className="share-option">
//                     <IconButton><EmojiEmotions htmlColor='goldenrod'/></IconButton>
//                         <span>Feelings</span>
//                     </div>
//                     <button type='submit'>{loadingPost?(<CircularProgress size={18} sx={{color:'whitesmoke'}} />):'Share'}</button>
//                 </div>
//             </div>
//         </form>
//     </div>
//   )
}


export default Share