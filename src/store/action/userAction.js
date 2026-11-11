export const SET_USER = "SET_USER";
export const SET_NOTIFICATION = "SET_NOTIFICATION"
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION"
export const SIGN_OUT = "SIGN_OUT"


export const set_user = (userData) => {
    // if (!userData) {
    //   return;
    // }
  console.log("action",userData);
    return {
      type: SET_USER,
      userData
    };
  };


  export const sign_out=() => {
    return{
      type:SIGN_OUT
    }
  }




export const add_notification = (notificationObj) => {
    return{
        type:SET_NOTIFICATION,
        notification:notificationObj
    }
}


export const remove_notification = (notiId) => {
  return{
    type:REMOVE_NOTIFICATION,
    id:notiId
  }
}