import React, { useContext, useEffect, useRef, useState } from 'react'
import './editProfile.css'
import { AuthContext } from '../../context/AuthContext'
import { editProfileAction } from '../../apiCalls'
import {Close} from '@mui/icons-material'
import instance from '../../axios'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
const EditProfile = ({setShowEditProfile}) => {

    const {state,dispatch} = useContext(AuthContext)
    const {user} = state.state1
    const {editedProfileData,loading:loadingEdit,error:errorEdit} = state.state3

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const city =useRef()
    const about =useRef()
    const gender =useRef(null)
    const relation =useRef(null)
    const [profilePic,setProfilePic] = useState(null)
    const [coverPic,setCoverPic] = useState(null)

    
    const [profilePercentage,setProfilePercentage] = useState(0)
    
    const [inputProfile,setInputProfile] = useState(null)
    const [inputCover,setInputCover] = useState(null)
    const [uploadOn,setUploadOn] = useState(false)
    const [uploadCoverOn,setUploadCoverOn] = useState(false)
    useEffect(() => {
        if(profilePic && uploadOn)
        {uploadprofileImg(profilePic,'profileImg')
        setUploadOn(false)}
        if(coverPic && uploadCoverOn ){
            uploadprofileImg(coverPic,'coverImg')
            setUploadCoverOn(false)
        }
    }, [inputProfile,profilePic,uploadOn,coverPic,uploadCoverOn,inputCover]);


    const uploadprofileImg= (file,fileType) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        if(fileType ==='profileImg'){
            var storageRef = ref(storage, 'profilePics/' + fileName);
        }
        if(fileType ==='coverImg'){
            var storageRef = ref(storage, 'coverPics/' + fileName);
        }
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProfilePercentage(progress)
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
            if(fileType==='profileImg')
            setInputProfile(downloadURL)
            else
            setInputCover(downloadURL)
        });
        }
        );
    }
    
    const EditProfileHandler = async(e) => {
        e.preventDefault();
        const editedData = {
            userId:user._id,
            userName:name.current.value? name.current.value : user.userName,
            email:email.current.value ? email.current.value : user.email,
            password:password.current.value ? password.current.value : '',
            city:city.current.value ? city.current.value :user.city,
            about:about.current.value ? about.current.value : user.about,
            gender:gender.current.value ? gender.current.value : user.about,
            relationship:relation.current.value ? relation.current.value : user.relationship,
        }
        if(profilePic && inputProfile){
            inputProfile && (editedData.profilePic = inputProfile)
        }
        if(coverPic && inputCover  ){
            inputCover && (editedData.coverPic = inputCover)
        }
        await editProfileAction(editedData,user._id,dispatch)
        setProfilePic(null)
        setCoverPic(null)
        setInputProfile(null)
        setInputCover(null)
        setUploadOn(false)
        setUploadCoverOn(false)
        setShowEditProfile(false)
    }
  return (
    <div className='edit-container'>
        <h3>Edit your Profile Informations</h3>
        {errorEdit && (<div className='errorEdit'>{errorEdit}</div>)}
        <form onSubmit={EditProfileHandler} className='edit-form'>
            <div className='form-element'>
                <label htmlFor="">Name</label>
                <input ref={name} type="text" placeholder={user.userName} />
            </div>  
            <div className='form-element'>
                <label htmlFor="">Email</label>
                <input ref={email} type="text"placeholder={user.email} />
            </div>  
            <div className='form-element'>
                <label htmlFor="">New Password</label>
                <input ref={password} type="text" minLength={4}  />
            </div>  
            <div className='form-element'>
                <label htmlFor="">City</label>
                <input ref={city} type="text" placeholder={user.city}/>
            </div>  
            <div className='form-element'>
                <label htmlFor="">About</label>
                <input ref={about} type="text" placeholder={user.about} />
            </div>  
            <div className='form-element'>
                <label htmlFor="">Gender</label>
                <select ref={gender} defaultValue={user.gender ? user.gender : ''}>
                    <option value="">Select</option>
                    <option  value="male">Male</option>
                    <option  value="female">Female</option>
                </select>
            </div>  
            <div className='form-element'>
                <label htmlFor="">Relationship</label>
                <select ref={relation} defaultValue={user.relationship ? user.relationship : ''}>
                    <option value="">Select</option>
                    <option  value="single">Single</option>
                    <option  value="In a relationship">In a Relationship</option>
                    <option  value="married">Married</option>
                </select>
            </div>  
            <div className='form-photos'>
                <label >Profile Photo</label>
                <div className="photo-container">
                    {user.profilePic ?
                    (<img className='profilePhoto' src={user.profilePic} alt="" />)
                    :
                    (<img className='profilePhoto' src='noProfile.png' alt="nil" />)
                    }
                    <label htmlFor='profileImage'>Change Profile photo</label>
                    <input style={{display:'none'}} 
                        className='profileInput' id='profileImage' 
                        type="file"
                        onChange={(e) => setProfilePic(e.target.files[0])} 
                    />
                    {profilePic && 
                    (<><div className='selectedContainer'><img className='profilePhoto' src={URL.createObjectURL(profilePic)} alt="nil"  />
                    <Close className='buttonClose' onClick={()=> setProfilePic(null)}/>
                    </div>
                    <button type='button' onClick={()=> setUploadOn(true)}>{(profilePercentage>0 && profilePercentage<100) ?
                             profilePercentage :
                             profilePercentage===100 ?
                             'Uploaded ,click update details ' :
                             'verify upload'}
                    </button>
                    </>)
                    }
                </div>
            </div>  
            <div className='form-photos'>
                <label >Cover Photo</label>
                <div className="photo-container">
                    {user.coverPic ?
                    (<img className='coverPhoto' src={user.coverPic} alt="" />)
                    :
                    (<img className='coverPhoto' src='noCover.png' alt="nil" />)
                    }
                    <label htmlFor='coverImage'>Change Cover photo</label>
                    <input style={{display:'none'}} 
                        className='profileInput' id='coverImage' 
                        type="file"
                        onChange={(e) => setCoverPic(e.target.files[0])} 
                    />
                    {coverPic && 
                    (<><div className='selectedCoverContainer'>
                        <img className='coverPhoto' src={URL.createObjectURL(coverPic)} alt="nil"  />
                        <Close className='buttonClose' onClick={()=> setCoverPic(null)}/>
                    </div>
                    <button type='button' onClick={()=> setUploadCoverOn(true)}>{(profilePercentage>0 && profilePercentage<100) ?
                        profilePercentage :
                        profilePercentage===100 ?
                        'Uploaded ,click update details ' :
                        'verify upload'}
                    </button></>)}
                </div>
            </div>  
            <div className="buttons">
            <button onClick={() => (setShowEditProfile(false))}>Back</button>
            <button type='submit'>Update Details</button>    
            </div>
        </form>
    </div>
  )
}

export default EditProfile