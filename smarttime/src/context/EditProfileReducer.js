
import { EDIT_PROFILE_START,EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL} from "../constants"; 

const  EditProfileReducer = (state,action) => {
    switch(action.type) {
        case EDIT_PROFILE_START :
            return {
                loading:true,
                editedProfileData:null,
                error:false
            }
        case EDIT_PROFILE_SUCCESS :
            return {
                loading: false,
                editedProfileData: action.payload,
                error:false
            }
        case EDIT_PROFILE_FAIL :
            return {
                loading : false,
                editedProfileData : null,
                error: action.payload
            }
        default :
           return state
    }
}
export default EditProfileReducer