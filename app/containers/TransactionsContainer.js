//@flow
import React from 'react';
import { Container, Button, Text, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import map from 'lodash/map';

import AppHeader from './components/layout/AppHeader';

import { goToPage } from '../actions/navActions';

const TransactionsContainer = ({ selectedTrip, addPayment, transactionList }) => {
  const transactionsListView = transactionList.length !== 0 ? map(transactionList, (transaction, key) => (
    <ListItem key={key}>
      <Text>{transaction}</Text>
    </ListItem>
  )) : <ListItem><Text>NO TRANSACTIONS</Text></ListItem>
  return (
    <Container>
      <AppHeader title={`${selectedTrip.name} Details`} showBackButton={true}/>
      <Button
        block
        onPress={addPayment}>
        <Text>ADD PAYMENT</Text>
      </Button>
      <List>
        {transactionsListView}
      </List>
    </Container>
  )
}

export default compose(
  connect(state => {
    const { selectedTrip } = state.trips;
    return  {
      selectedTrip,
    }
  }, { goToPage }),
  withProps(({ selectedTrip }) => ({
    transactionList: selectedTrip.transactions ? selectedTrip.transactions : []
  })),
  withHandlers({
    addPayment: ({ goToPage }) => () => goToPage('AddPayment'),
  })
)(TransactionsContainer)
