//@flow
import React from 'react';
import { Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import last from 'lodash/last';

import LandingScreen from '../containers/LandingContainer';
import LoginScreen from '../containers/LoginContainer';
import SignUpScreen from '../containers/SignUpContainer';

import HomeTabNavigator from './HomeTabNavigator';

export const AppNavigator = StackNavigator(
  {
    Landing: { screen: LandingScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    Home: { screen: HomeTabNavigator },
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
