import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";
import NewPostReducer from "./NewPostReducer";
import EditProfileReducer from "./EditProfileReducer";
import GetTimelineReducer from "./GetTimelineReducer";
import GetHomePostReducer from "./GetHomePostReducer";

const userDataFromStorage = localStorage.getItem('userStorage') ? 
        JSON.parse(localStorage.getItem('userStorage'))
        :null
const INITIAL_STATE_USER = {
    user:userDataFromStorage,
    loading:false,
    error:false,
}
const INITIAL_STATE_NEWPOST ={
    post:null,
    loading:false,
    error:false
}
const INITIAL_STATE_EDITPROFILE ={
    EditedProfileData:null,
    loading:false,
    error:false
}
const INITIAL_STATE_TIMELINEPOST ={
    allTimelinePost:null,
    loading:false,
    error:false
}
const INITIAL_STATE_HOME_POST ={
    allHomePost:null,
    loading:false,
    error:false
}



export const AuthContext = createContext();

const combinedReducer = ({state1,state2,state3,stateTimeline,stateHome},action) => ({
    state1:AuthReducer(state1,action),
    state2:NewPostReducer(state2,action),
    state3:EditProfileReducer(state3,action),
    stateTimeline:GetTimelineReducer(stateTimeline,action),
    stateHome:GetHomePostReducer(stateHome,action)
})

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(combinedReducer,{
        state1:INITIAL_STATE_USER,
        state2:INITIAL_STATE_NEWPOST,
        state3:INITIAL_STATE_EDITPROFILE,
        stateTimeline:INITIAL_STATE_TIMELINEPOST,
        stateHome:INITIAL_STATE_HOME_POST
    });
    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}> {children}
        </AuthContext.Provider>
    )
}
