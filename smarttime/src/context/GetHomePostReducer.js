import { GET_HOME_POST_FAIL, GET_HOME_POST_START, GET_HOME_POST_SUCCESS } from "../constants";

const GetHomePostReducer = (state,action) => {
    switch(action.type){
        case GET_HOME_POST_START :
            return {
                loading:true,
                allHomePost:null,
                error:false
            }
        case GET_HOME_POST_SUCCESS :
            return {
                loading:false,
                allHomePost:action.payload,
                error:false
            }
        case GET_HOME_POST_FAIL :
            return {
                loading:false,
                allHomePost:null,
                error:action.payload
            }
        default :
            return state
    }
}

export default GetHomePostReducer