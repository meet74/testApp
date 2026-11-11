import { FETCH_EVENT_DATA, SET_BOOKED_EVENTS } from "../action/EventAction";

const initialState = {
  events: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_DATA:
        
      return {
        ...state,
        events: action.events,
      };
      case SET_BOOKED_EVENTS:
        const tempArr = [...state.bookedEvents]; // Copy the bookedEvents array
        tempArr.push(action.confirmedEvent);
        tempArr.reverse()
      return{
        ...state,
        bookedEvents:tempArr
      }
    default:
      return state;
  }
};
