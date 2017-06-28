//@flow
import { combineReducers } from 'redux';
import { nav } from './navReducers';
import account from './accountReducers';
import trips from './tripReducers';
import forms from './forms';

export default combineReducers({
  account,
  nav,
  trips,
  forms
});
