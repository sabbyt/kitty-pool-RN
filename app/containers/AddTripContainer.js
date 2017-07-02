//@flow
import React from 'react';
import { Container, Form, Item, Input, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import { goToHome } from '../actions/navActions';
import { setAddTripName, clearTripName } from '../actions/forms/addTripActions';
import { addNewTrip, addTripApi } from '../actions/tripActions';

const AddTripContainer = ({ onAddTrip, setAddTripName }) => (
  <Container>
    <Form>
      <Item>
        <Input
          onChangeText={setAddTripName}
          placeholder="Trip Name" />
      </Item>
    </Form>
    <Button
      block
      onPress={onAddTrip}>
      <Text>ADD TRIP</Text>
    </Button>
  </Container>
)

export default compose(
  connect(state => {
    const { addTrip } = state.forms;
    const { uid, userProfile } = state.account;
    return {
      addTrip,
      uid,
      userProfile
    }
  }, { goToHome, setAddTripName, addNewTrip, addTripApi, clearTripName }),
  withHandlers({
    verify: ({ addTrip }) => () => {
      if (addTrip.name === null || addTrip.name.length === 0) return false
      return true
    }
  }),
  withHandlers({
    onAddTrip: ({ addTrip, goToHome, addNewTrip, uid, userProfile, verify, addTripApi, clearTripName }) => () => {
      const verified = verify();
      if (verified) {
        addNewTrip(addTrip.name, uid, userProfile.firstName)
          .then(data => {
            addTripApi(data);
            clearTripName();
            goToHome();
          })
          .catch(err => console.log('Error adding trip', err))
      }
      // TODO: do some sort of error checking that adding trip is not null
    }
  })
)(AddTripContainer)
