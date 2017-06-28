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

import AppHeader from './components/layout/AppHeader';

import { setPaymentDate, setPaymentTotal, setPaidBy, setPaymentDescription, removeUserSplit, addPaymentTag, clearPaymentForm } from '../actions/forms/addPaymentActions';
import { goBack } from '../actions/navActions';

const PickerItem = Picker.Item;

const AddPaymentContainer = ({ selectedTrip, selectPaidBy, paidByPicker, setPaidByPicker, dateValue, openDatePicker, setPaymentDate, setPaymentTotal, setPaidBy, setPaymentDescription, submitPayment }) => (
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
          onChangeText={setPaymentTotal}
          placeholder="Total" />
      </Item>
      <Picker
        selectedValue={paidByPicker}
        onValueChange={(value) => {
          console.log('Selected', value);
          setPaidByPicker(value);
        }}>
        {map(selectedTrip.users, (option, index) => (
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
  }, { goBack, setPaymentDate, setPaymentTotal, setPaidBy, setPaymentDescription, removeUserSplit, addPaymentTag }),
  withProps(({ addPayment }) => ({
    dateValue: addPayment.date.length === 0 ? new Date() : addPayment.date
  })),
  withState('paidByPicker', 'setPaidByPicker', ({ selectedTrip }) => selectedTrip.users[0].id),
  withHandlers({
    submitPayment: ({ goBack }) => () => {
      console.log('submitting payment');
      goBack();
    },
    openDatePicker: ({ setPaymentDate }) => async () => {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: new Date(),
          mode: 'spinner'
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          setPaymentDate(moment(`${year}-${month+1}-${day}`, "YYYY-M-DD").format("YYYY-MM-DD"))
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    },
    selectPaidBy: () => (paidBySelected) => {
      console.log('selected by', paidBySelected);
    }
  })
)(AddPaymentContainer)
