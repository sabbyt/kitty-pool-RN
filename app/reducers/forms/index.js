//@flow
import { combineReducers } from 'redux';
import login from './loginReducers';
import addTrip from './addTripReducers';
import addPayment from './addPaymentReducers';

export default combineReducers({
  login,
  addTrip,
  addPayment
});
