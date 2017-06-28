//@flow
import { ACTIONS } from '../../reducers/forms/loginReducers';

export const setLoginUsername = (username) => {
  return {
    type: ACTIONS.SET_LOGIN_USERNAME,
    username
  }
}

export const setLoginPassword = (password) => {
  return {
    type: ACTIONS.SET_LOGIN_PASSWORD,
    password
  }
}

export const clearLoginForm = () => {
  return {
    type: ACTIONS.SET_CLEAR,
  }
}
