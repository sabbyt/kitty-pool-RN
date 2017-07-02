//@flow
import React from 'react';
import { Container, Button, Text, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import withHandlers from 'recompose/withHandlers';
import map from 'lodash/map';

import AppHeader from './components/layout/AppHeader';

import { goToPage } from '../actions/navActions';

const TripSummaryContainer = ({ selectedTrip, addUser, showDetails }) => {
  return (
    <Container>
      <AppHeader title={`${selectedTrip.name} Summary`} showBackButton={true}/>
      <Button
        block
        onPress={addUser}>
        <Text>ADD A USER</Text>
      </Button>
      <List>
        {map(selectedTrip.users, (user, key) => (
          <ListItem key={key}>
            <Text>{user.userName} - {selectedTrip.currency} {user.amount}</Text>
          </ListItem>
        ))}
      </List>
      <Button
        block
        onPress={showDetails}>
        <Text>DETAILS</Text>
      </Button>
    </Container>
  )
}

export default compose(
  connect(state => {
    const { selectedTrip, fetchingData } = state.trips;
    return  {
      selectedTrip,
      fetchingData
    }
  }, { goToPage }),
  branch(
    props => props.fetchingData,
    renderComponent(() => <Text>LOADING</Text>),
  ),
  withHandlers({
    addUser: () => () => {
      // TODO: add new user
      console.log('adding user');
    },
    showDetails: ({ goToPage }) => () => {
      goToPage('Transactions');
    }
  })
)(TripSummaryContainer)
