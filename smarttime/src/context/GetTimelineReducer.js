

import { GET_TIMELINE_POST_FAIL, GET_TIMELINE_POST_START, GET_TIMELINE_POST_SUCCESS } from "../constants"; 

const  GetTimelineReducer = (state,action) => {
    switch(action.type) {
        case GET_TIMELINE_POST_START :
            return {
                loading:true,
                allTimelinePost:null,
                error:false
            }
        case GET_TIMELINE_POST_SUCCESS :
            return {
                loading: false,
                allTimelinePost: action.payload,
                error:false
            }
        case GET_TIMELINE_POST_FAIL :
            return {
                loading : false,
                allTimelinePost : null,
                error: action.payload
            }
        default :
           return state
    }
}
export default GetTimelineReducer