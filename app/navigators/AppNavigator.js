//@flow
import React from 'react';
import { Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import last from 'lodash/last';

import LandingScreen from '../containers/LandingContainer';
import LoginScreen from '../containers/LoginContainer';
import SignUpScreen from '../containers/SignUpContainer';
import AddTripScreen from '../containers/AddTripContainer';
import TripSummaryScreen from '../containers/TripSummaryContainer';
import TransactionsScreen from '../containers/TransactionsContainer';
import AddPaymentScreen from '../containers/AddPaymentContainer';
import TransactionDetailScreen from '../containers/TransactionDetailContainer';
import ProfileScreen from '../containers/ProfileContainer';
import PendingInvitesScreen from '../containers/PendingInvitesContainer';
import NotificationsScreen from '../containers/NotificationsContainer';
import CurrencyScreen from '../containers/CurrencyDefaultContainer';
import ContactUsScreen from '../containers/ContactUsContainer';

import HomeTabNavigator from './HomeTabNavigator';

export const AppNavigator = StackNavigator(
  {
    Landing: { screen: LandingScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    Home: { screen: HomeTabNavigator },
    AddTrip: { screen: AddTripScreen },
    TripSummary: { screen: TripSummaryScreen },
    Transactions: { screen: TransactionsScreen },
    AddPayment: { screen: AddPaymentScreen },
    TransactionDetail: { screen: TransactionDetailScreen },
    Profile: { screen: ProfileScreen },
    PendingInvites: { screen: PendingInvitesScreen },
    Notifications: { screen: NotificationsScreen },
    Currency: { screen: CurrencyScreen },
    ContactUs: { screen: ContactUsScreen },
  },
  {
    headerMode: 'none',
    // Quick fix - however this takes away ALL animation from navigator - open issue on github
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step
      }
    })
  }
);

export const AppWithNavigationState = ({ dispatch, nav }) => {
  return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
