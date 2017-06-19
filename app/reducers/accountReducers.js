//@flow
const initialState = {
  phoneNumber: null,
  countryCode: null,
  userProfile: {
    firstName: '',
    lastName: ''
  }
}

export const ACTIONS = {
  SET_PHONE_NUMBER: 'SET_PHONE_NUMBER',
  SET_COUNTRY_CODE: 'SET_COUNTRY_CODE',
  SET_PROFILE: 'SET_PROFILE',
}

export default (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber
      }
    case ACTIONS.SET_COUNTRY_CODE:
      return {
        ...state,
        countryCode: action.countryCode
      }
    case ACTIONS.SET_PROFILE:
      return {
        ...state,
        userProfile: {...state.userProfile, ...action.profile},
      }
    default:
      return state
  }
}
