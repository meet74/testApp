export const FETCH_EVENT_DATA = "FETCH_EVENT_DATA"
export const SET_BOOKED_EVENTS = "SET_BOOKED_EVENTS"



export const storeEventData = (events) => {
    return{
        type:FETCH_EVENT_DATA,
        events
    }
}

export const storeConfirmedData = (confirmedEvent) => {
    console.log("action",confirmedEvent);
    return {
        type:SET_BOOKED_EVENTS,
        confirmedEvent
    }
}

