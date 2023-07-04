import instance from "./axios";
import {CREATE_POST_START,CREATE_POST_SUCCESS,CREATE_POST_FAIL,
        EDIT_PROFILE_START,EDIT_PROFILE_SUCCESS,EDIT_PROFILE_FAIL, GET_TIMELINE_POST_START, GET_TIMELINE_POST_SUCCESS, GET_TIMELINE_POST_FAIL} from './constants'
export const loginCall = async(userCredentials,dispatch) => {
    dispatch({type:"LOGIN_START"});
    try{
        const res = await instance.post('/connect/auth/login',userCredentials);
        localStorage.setItem('userStorage',JSON.stringify(res.data))
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }
    catch(error){
        console.log(error)
        dispatch({type:"LOGIN_FAIL",payload:error.response && error.response.data.msg ?
        error.response.data.msg
        :error.message})
    }
}

export const newPostCall = async(postDatas,dispatch) => {
    dispatch({type:CREATE_POST_START})
    try {
        const res = await instance.post('/connect/post/',postDatas)
        console.log('response data',res.data)
        dispatch({type:CREATE_POST_SUCCESS,payload:res.data})

    } catch (error) {
        console.log(error)
        dispatch({type:CREATE_POST_FAIL,
        payload:error.response && error.response.data.msg ? error.response.data.msg :error.message})
    }
}

export const editProfileAction = async(editedData,userId,dispatch) => {
    dispatch({type: EDIT_PROFILE_START})
    try {
        console.log('inputdata',editedData)
        const result = await instance.put(`/connect/user/${userId}`,editedData)
        console.log('outputdata' , result.data)
        localStorage.setItem('userStorage',JSON.stringify(result.data))
        dispatch({type : EDIT_PROFILE_SUCCESS, payload : result.data})
        dispatch({type:"USER_RESET",payload : result.data})
    
    } catch (error) {
        dispatch({type:EDIT_PROFILE_FAIL,
        payload:error.response && error.response.data.msg ?
         error.response.data.msg :error.message})

    }
}

export const getAllTimeline = async(userId,dispatch) => {
    dispatch({type : GET_TIMELINE_POST_START})
    try {
        const getPost = await instance.get(`/connect/post/timeline/${userId}`);
        dispatch({type : GET_TIMELINE_POST_SUCCESS, payload : getPost.data })
    } catch (error) {
        dispatch({type: GET_TIMELINE_POST_FAIL,
            payload:error.response && error.response.data.msg ?
             error.response.data.msg :error.message})
    }
}