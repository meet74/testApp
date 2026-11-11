import { REMOVE_NOTIFICATION, SET_NOTIFICATION, SET_USER, SIGN_OUT } from "../action/userAction";


const initialState = {
    user: {
      id: null,
      email: null,
      name: null,
      mynoti:[]
    },
  };
  

  export default (state = initialState,action) => {
        switch (action.type) {
            case SET_USER:
            const userData = {
                id:action.userData.id,
                email:action.userData.email,
                name:action.userData.name,
                mynoti:action.userData.notification
            }
            console.log("reducer"+userData);
            return{
                user:{
                    id:action.userData.id,
                    email:action.userData.email,
                    name:action.userData.fullName,
                    mynoti:action.userData.mynoti
                }
            }
            case SET_NOTIFICATION:
                const notiArr = [...state.user.mynoti];
                notiArr.push(action.notification)
                return{
                    user:{
                        ...state.user,
                        mynoti:notiArr
                    }
                }
            case SIGN_OUT:
                return{
                    user: {
                        id: null,
                        email: null,
                        name: null,
                        mynoti:[]
                      },
                }
            case REMOVE_NOTIFICATION:
                const oldNoti = [...state.user.mynoti];
                const newNoti = oldNoti.filter(data=>data.id!== action.id)
                return{
                    user:{
                        ...state.user,
                        mynoti:newNoti
                    }
                }

            default:
               
                return state
        }
  }