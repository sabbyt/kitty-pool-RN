//@flow
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import startsWith from 'lodash/startsWith';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Landing'));

export const ACTIONS = {
  GO_TO_LANDING: 'Landing',
  GO_TO_SIGNUP: 'SignUp',
  GO_TO_LOGIN: 'Login',
  GO_TO_HOME: 'Home',
}

export function nav(state:any=initialState, action:any) {
  let nextState;
  if (startsWith(action.type, 'Navigation/')) {
    nextState = AppNavigator.router.getStateForAction(action, state);
  }

  return nextState || state;
}
