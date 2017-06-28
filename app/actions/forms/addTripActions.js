//@flow
import { ACTIONS } from '../../reducers/forms/addTripReducers';

export const setAddTripName = (name) => {
  return {
    type: ACTIONS.SET_TRIP_NAME,
    name
  }
}

export const clearTripName = () => {
  return {
    type: ACTIONS.SET_CLEAR,
  }
}
