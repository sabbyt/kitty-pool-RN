//@flow
import React from 'react';
import { DatePickerAndroid, Picker } from 'react-native';
import { Container, Form, Item, Input, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';
import map from 'lodash/map';
import remove from 'lodash/remove';
import forEach from 'lodash/forEach';

import AppHeader from './components/layout/AppHeader';

import { setPaymentDate, setPaymentTotal, setPaidBy, setPaymentDescription, removeUserSplit, addPaymentTag } from '../actions/forms/addPaymentActions';
import { addNewPayment } from '../actions/transactionActions';
import { goBack } from '../actions/navActions';

const PickerItem = Picker.Item;

const AddPaymentContainer = ({ selectPaidBy, paidByPicker, dateValue, openDatePicker, setPaymentTotal, setPaymentDescription, submitPayment, removeUserSplit, filteredUsers }) => (
  <Container>
    <AppHeader title='Add Payment' showBackButton={true}/>
    <Form>
      <Item onPress={openDatePicker}>
        <Input
          disabled
          value={moment(dateValue).format("MMMM Do, YYYY")}
          placeholder={moment().format("MMMM Do, YYYY")} />
      </Item>
      <Item>
        <Input
          keyboardType='numeric'
          onChangeText={setPaymentTotal}
          placeholder="Total" />
      </Item>
      <Picker
        selectedValue={paidByPicker}
        onValueChange={(value) => selectPaidBy(value)}>
        {map(filteredUsers, (option, index) => (
          <Picker.Item
            key={index}
            label={option.userName}
            value={option.id} />
        ))}
      </Picker>
      <Item last>
        <Input
          onChangeText={setPaymentDescription}
          placeholder="Description" />
      </Item>
    </Form>
    {map(filteredUsers, (option, index) => (
      <Button
        key={index}
        onPress={() => removeUserSplit({id: option.id, name: option.userName})}>
        <Text>{option.userName}</Text><Text>X</Text>
      </Button>
    ))}
    <Button
      block
      onPress={submitPayment}>
      <Text>ADD</Text>
    </Button>
  </Container>
)

export default compose(
  connect(state => {
    const { addPayment } = state.forms;
    const { selectedTrip } = state.trips;
    return {
      selectedTrip,
      addPayment
    }
  }, { goBack, setPaymentDate, setPaymentTotal, setPaidBy, setPaymentDescription, removeUserSplit, addPaymentTag, addNewPayment }),
  withProps(({ addPayment, selectedTrip }) => ({
    dateValue: addPayment.date.length === 0 ? new Date() : addPayment.date,
    filteredUsers: selectedTrip.users
  })),
  withProps(props => {
    // Processing filtered array
    forEach(props.addPayment.splitBetween, (splitUser) => remove(props.filteredUsers, (user) => splitUser.id == user.id))
    return props
  }),
  // TODO: check that cannot remove all users from payment
  withState('paidByPicker', 'setPaidByPicker', ({ selectedTrip }) => selectedTrip.users[0].id),
  withHandlers({
    submitPayment: ({ goBack, addPayment, selectedTrip, addNewPayment }) => () => {
      let transactionPostBody = {
        ...addPayment,
        total: Number(addPayment.total)
      };
      // TODO: error checking
      // return error if no Total
      // return error if no description
      if (transactionPostBody.date.length === 0) {
        transactionPostBody.date = moment().toString();
      }
      if (transactionPostBody.paidBy.length === 0) {
        transactionPostBody.paidBy = selectedTrip.users[0].id;
      }
      addNewPayment(selectedTrip, transactionPostBody);
      goBack();
    },
    openDatePicker: ({ setPaymentDate }) => async () => {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: new Date(),
          mode: 'spinner'
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          setPaymentDate(moment(`${year}-${month+1}-${day}`, "YYYY-M-DD").toString())
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    },
    selectPaidBy: ({ setPaidBy, setPaidByPicker }) => (paidBySelected) => {
      // Set redux state
      setPaidBy(paidBySelected);
      // Set local state
      setPaidByPicker(paidBySelected);
    }
  })
)(AddPaymentContainer)
