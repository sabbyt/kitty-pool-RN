//@flow
import filter from 'lodash/filter';
import clone from 'lodash/clone';

const initialState = {
  trips: {},
  selectedTrip: null,
  fetchingData: false
}

export const ACTIONS = {
  SET_TRIPS: 'SET_TRIPS',
  ADD_TRIP: 'ADD_NEW_TRIP',
  UPDATE_TRIP: 'UPDATE_TRIP',
  SELECT_TRIP: 'SELECT_TRIP',
  FETCHING_TRIP_DATA: 'FETCHING_TRIP_DATA'
}

export default (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.FETCHING_TRIP_DATA:
      return {
        ...state,
        fetchingData: action.fetching
      }
    case ACTIONS.SET_TRIPS:
      const trips = action.trips;
      return {
        ...state,
        trips
      }
    case ACTIONS.SELECT_TRIP:
      return {
        ...state,
        selectedTrip: action.selectedTrip
      }
    case ACTIONS.ADD_TRIP:
      let stateTrips = clone(state.trips);
      stateTrips[action.trip.id] = action.trip.data.name;
      return {
        ...state,
        trips: stateTrips
      }
    case ACTIONS.UPDATE_TRIP:
      var updatedTrips = filter(state.trips, (trip) => trip.name !== action.trip.name);
      updatedTrips.push(action.trip);
      return {
        ...state,
        trips: updatedTrips
      }
    default:
      return state
  }
}
