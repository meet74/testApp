export const ADD_BOOKINGS = "ADD_BOOKINGS"
export const SET_BOOKINGS = "SET_BOOKINGS"
export const REMOVE_BOOK = "REMOVE_BOOK"
export const UPDATE_BOOK = "UPDATE_BOOK"


export const add_book = (bookObj) => {
    if(!bookObj){
        return
    }

    return{
        type:ADD_BOOKINGS,
        booking:bookObj
    }
}

export const update_book = (updateBookArr) => {
    return{
        type:UPDATE_BOOK,
        books:updateBookArr
    }
}

export const set_book = (booksArr=[]) => {
   

    return{
        type:SET_BOOKINGS,
        booksArr:booksArr
    }
}

export const remove_book = (booksArr) => {
   

    return{
        type:REMOVE_BOOK,
        booksArr
    }
}