//@flow
import { AppNavigator } from '../navigators/AppNavigator';
import startsWith from 'lodash/startsWith';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Landing'));

export function nav(state:any=initialState, action:any) {
  let nextState;
  if (startsWith(action.type, 'Navigation/')) {
    nextState = AppNavigator.router.getStateForAction(action, state);
  }

  return nextState || state;
}
