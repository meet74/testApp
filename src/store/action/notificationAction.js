export const SET_NOTIFICATION = "SET_NOTIFICATION"


export const add_notification = (notificationObj) => {
    return{
        type:SET_NOTIFICATION,
        notification:notificationObj
    }
}