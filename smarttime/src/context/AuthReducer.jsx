const AuthReducer = (state,action) => {
    switch (action.type){
        case "LOGIN_START":
            return {
                user:null,
                loading:true,
                error:null
            };
       case "LOGIN_SUCCESS":
            return {
                user:action.payload,
                loading:false,
                error:null
            }
        case "LOGIN_FAIL":
            return {
                user:null,
                loading:false,
                error:action.payload
            }
        case "LOGOUT":
            return{
                user:null,
                loading:false,
            }  
        case "USER_RESET" :
                return {
                    user:action.payload
                }    
        default:
            return state;    
    }
}

export default AuthReducer;