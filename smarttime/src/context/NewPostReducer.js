import { CREATE_POST_START,CREATE_POST_SUCCESS,CREATE_POST_FAIL

} from '../constants'

const NewPostReducer = (state,action) => {
    switch(action.type) {
        case CREATE_POST_START :
            return {
                post:null,
                loading:true,
                error:false
            } 
        case CREATE_POST_SUCCESS :
            return {
                post:action.payload,
                loading:false,
                error:false
            }    
        case CREATE_POST_FAIL :
            return {
                post:null,
                loading:false,
                error:action.payload
            }    
        default :
            return state
    }
}
export default NewPostReducer