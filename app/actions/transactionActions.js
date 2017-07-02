//@flow
import firebase from '../firebase';
import forEach from 'lodash/forEach';
import { clearPaymentForm } from './forms/addPaymentActions';

export const addNewPayment = (trip, newTransactionData) => {
  var newTransactionKey = firebase.database().ref().child(`trips/${trip.id}/transactions`).push().key;
  return async (dispatch) => {
    var updates = {};
    var newUserTotals = [];
    // Creates new transaction in /trips/<tripId>/transactions
    updates[`trips/${trip.id}/transactions/` + newTransactionKey] = newTransactionData;
    // Update total of trip on database
    updates[`trips/${trip.id}/total/`] = trip.total + newTransactionData.total;
    // Update amount of each user on database
    if (newTransactionData.splitBetween.length === 0) {
      // Split evenly between all users
      forEach(trip.users, (user) => {
        let updatedUser = {...user};
        let eachPortion = (newTransactionData.total /trip.users.length).toFixed(2);
        if (user.id == newTransactionData.paidBy) {
          // Paid by user gets positive added to their total
          updatedUser.amount = user.amount += (newTransactionData.total - eachPortion)
        } else {
          // User that didn't pay gets negative removed from their total
          updatedUser.amount = user.amount -= eachPortion;
        }
        newUserTotals.push(updatedUser);
      });
      updates[`trips/${trip.id}/users/`] = newUserTotals;
    } else {
      // TODO: logic if not split evenly between users
    }
    return await firebase.database()
      .ref()
      .update(updates)
      .then(_ => {
        console.log('Added new transaction to firebase');
        // Reset add transaction form
        dispatch(clearPaymentForm());
      })
      .catch(err => console.log(err));
  }
}
