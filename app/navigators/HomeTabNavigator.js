//@flow
import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'native-base';

import TripsScreen from '../containers/TripsContainer';
import SettingsScreen from '../containers/SettingsContainer';

export default TabNavigator(
  {
    Trips: {
      screen: TripsScreen,
      navigationOptions: {
        tabBarLabel: 'My Trips',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-paper-plane-outline' style={{...styles.icon, color: tintColor}}/>
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-settings' style={{...styles.icon, color: tintColor}}/>
        ),
      },
    }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: 'rgba(241, 101, 33, 1.0)',
      inactiveTintColor: 'rgba(0, 0, 0, 0.3)',
      activeBackgroundColor: '#ffffff',
      inactiveBackgroundColor: '#ffffff',
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: '#ffffff'
      },
      labelStyle: {
        fontSize: 11
      }
    }
  }
);

const styles = {
  icon: {
    fontSize: 30
  },
};
