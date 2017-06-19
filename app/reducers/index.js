//@flow
import { combineReducers } from 'redux';
import { nav } from './navReducers';
import account from './accountReducers';

export default combineReducers({
  account,
  nav
});
