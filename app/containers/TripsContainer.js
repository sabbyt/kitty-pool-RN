//@flow
import React from 'react';
import { Container, Button, Text, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withHandlers from 'recompose/withHandlers';
import map from 'lodash/map';
import toUpper from 'lodash/toUpper';

import AppHeader from './components/layout/AppHeader';

import { getUserProfile, setUserProfile, setUserSubscription } from '../actions/accountActions';
import { setTrips, selectTripAndFetchData } from '../actions/tripActions';
import { goToPage } from '../actions/navActions';

const TripRow = ({ name, seeTripDetails }) => {
  return (
    <ListItem
      onPress={seeTripDetails}>
      <Text>{toUpper(name)}</Text>
    </ListItem>
  )
}

const TripsContainer = ({ trips, addTrip, seeTripDetails }) => (
  <Container>
    <AppHeader title='Trips'/>
    <Button
      block
      onPress={addTrip}>
      <Text>ADD A TRIP</Text>
    </Button>
    <List>
      {trips ? map(trips, (trip, key) => (
        <TripRow
          key={key}
          seeTripDetails={() => seeTripDetails(key)}
          name={trip} />
      )) : null }
    </List>
  </Container>
)

export default compose(
  connect(state => {
    const { trips } = state.trips;
    const { uid } = state.account;
    return {
      trips,
      uid
    }
  }, { getUserProfile, setUserProfile, setUserSubscription, setTrips, goToPage, selectTripAndFetchData }),
  lifecycle({
    componentWillMount() {
      // Get user profile and trips
      this.props.getUserProfile(this.props.uid)
        .then(data => {
          // Setting user profile from db
          this.props.setUserProfile(data.profile);
          this.props.setUserSubscription(data.subscribed);
          if (data.trips) {
            // If user has trips, sets user trip data from db
            this.props.setTrips(data.trips);
          }
        })
        .catch(err => console.log('Error getting user profile', err));
    }
  }),
  withHandlers({
    addTrip: ({ goToPage }) => () => goToPage('AddTrip'),
    seeTripDetails: ({ goToPage, selectTripAndFetchData }) => (tripId) => {
      selectTripAndFetchData(tripId);
      goToPage('TripSummary');
    }
  })
)(TripsContainer)
