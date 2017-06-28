//@flow
const initialState = {
  uid: null,
  userProfile: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: null,
  },
  subscribed: false
}

export const ACTIONS = {
  SET_UID: 'SET_UID',
  SET_PROFILE: 'SET_PROFILE',
  SET_SUBSCRIPTION: 'SET_SUBSCRIPTION',
  SET_ALL: 'SET_ALL'
}

export default (state=initialState, action) => {
  switch(action.type) {
    case ACTIONS.SET_UID:
      return {
        ...state,
        uid: action.uid
      }
    case ACTIONS.SET_PROFILE:
      return {
        ...state,
        userProfile: {...state.userProfile, ...action.profile},
      }
    case ACTIONS.SET_SUBSCRIPTION:
      return {
        ...state,
        subscribed: action.subscribed,
      }
    case ACTIONS.SET_ALL:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}
