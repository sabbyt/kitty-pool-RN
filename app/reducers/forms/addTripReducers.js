//@flow
const initialState = {
  name: null
}

export const ACTIONS = {
  SET_TRIP_NAME: 'SET_TRIP_NAME',
  SET_CLEAR: 'ADD_TRIP_CLEAR'
}

export default (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.SET_TRIP_NAME:
      return {
        ...state,
        name: action.name
      }
    case ACTIONS.SET_CLEAR:
      return initialState
    default:
      return state
  }
}
