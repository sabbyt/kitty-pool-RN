//@flow
import moment from 'moment';
import firebase from '../firebase';
import { ACTIONS } from '../reducers/tripReducers';

export const setTrips = (trips) => {
  return {
    type: ACTIONS.SET_TRIPS,
    trips
  }
}

export const addTripApi = (trip) => {
  return {
    type: ACTIONS.ADD_TRIP,
    trip
  }
}

export const updateTrip = (trip) => {
  return {
    type: ACTIONS.UPDATE_TRIP,
    trip
  }
}

export const isFetchingTripData = (fetching) => {
  return {
    type: ACTIONS.FETCHING_TRIP_DATA,
    fetching
  }
}

export const selectTrip = (selectedTrip) => {
  return {
    type: ACTIONS.SELECT_TRIP,
    selectedTrip
  }
}

export const selectTripAndFetchData = (selectedTrip) => {
  return async (dispatch) => {
    dispatch(isFetchingTripData(true));
    let fetchedData = await firebase.database()
      .ref(`/trips/${selectedTrip}`)
      .once('value')
      .then(data => data.val())
      .catch(err => console.log(err));
    dispatch(selectTrip(fetchedData));
    dispatch(isFetchingTripData(false));
  }
}

export const addNewTrip = (name, uid, userName) => {
  var newTripKey = firebase.database().ref().child('trips').push().key;
  const tripInitData = {
    name,
    transactions: [],
    users: [{id: uid, userName, active: true, amount: 0}],
    total: 0,
    tags: [],
    from: moment().toString(),
    // TODO: pull from default of user preferences
    currency: 'MYR'
  }
  return async (dispatch) => {
    var updates = {};
    // Creates new trip in /trips/
    updates['/trips/' + newTripKey] = tripInitData;
    // Adds trip key to user reference
    updates['/users/' + uid + '/trips/' + newTripKey] = tripInitData.name;
    return await firebase.database()
      .ref()
      .update(updates)
      .then(_ => ({id: newTripKey, data: tripInitData}))
      .catch(err => console.log(err));
  }
}
