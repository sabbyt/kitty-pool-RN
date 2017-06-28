//@flow
import firebase from '../firebase';
import { ACTIONS } from '../reducers/accountReducers';

export const setUserUID = (uid) => {
  return {
    type: ACTIONS.SET_UID,
    uid
  }
}

export const setUserProfile = (profile) => {
  return {
    type: ACTIONS.SET_PROFILE,
    profile
  }
}

export const setUserSubscription = (subscribed) => {
  return {
    type: ACTIONS.SET_SUBSCRIPTION,
    subscribed
  }
}

export const getUserProfile = (uid) => {
  return async (dispatch) => {
    return await firebase.database()
      .ref(`/users/${uid}`)
      .once('value')
      .then(data => data.val())
      .catch(err => console.log(err));
  }
}
