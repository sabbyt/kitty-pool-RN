//@flow
const initialState = {
  username: null,
  password: null
}

export const ACTIONS = {
  SET_LOGIN_USERNAME: 'SET_FORM_LOGIN_USERNAME',
  SET_LOGIN_PASSWORD: 'SET_FORM_LOGIN_PASSWORD',
  SET_CLEAR: 'LOGIN_FORM_CLEAR',
}

export default (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.SET_LOGIN_USERNAME:
      return {
        ...state,
        username: action.username
      }
    case ACTIONS.SET_LOGIN_PASSWORD:
      return {
        ...state,
        password: action.password
      }
    case ACTIONS.SET_CLEAR:
      return initialState
    default:
      return state
  }
}
