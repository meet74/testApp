import { ADD_BOOKINGS, REMOVE_BOOK, SET_BOOKINGS, UPDATE_BOOK } from "../action/bookingAction";


const initialState = {
    books:[]
}

export default  (state = initialState,action) => {
    switch (action.type) {
        case SET_BOOKINGS:
            
            return{
                books:action.booksArr
            }
        case ADD_BOOKINGS:
            

            return{
                books:booksArr
            }
        case UPDATE_BOOK:
            return{
                books:action.books
            }
        case REMOVE_BOOK:
          
            return{
                books:action.booksArr
            }
        default:
            return state;
    }
}