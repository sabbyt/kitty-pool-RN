//@flow
import firebase from '../firebase';
import { ACTIONS } from '../reducers/accountReducers';
import { goToHome } from './navActions';
import { setUserProfile } from './accountActions';

export const loginApi = ({ username, password }) => {
  return async (dispatch) => {
    return await firebase.auth()
      .signInWithEmailAndPassword(username, password)
      .then(data => data)
      .catch(err => console.log(err));
  }
}

export const createUser = (userId, firstName, lastName, email, phoneNumber) => {
  const profile = {
    firstName,
    lastName,
    email,
    phoneNumber
  }
  return (dispatch) => {
    firebase.database()
      .ref('users/' + userId)
      .set({
        profile,
        trips: {}
      })
      .then(data => {
        console.log('Added new user');
        console.log(data);
        dispatch(setUserProfile(profile));
      })
      .catch(err => console.log(err));
  }
}
