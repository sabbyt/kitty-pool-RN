//@flow
import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';

// redux config
export const store = configureStore();

// react-navigation config
import AppWithNavigationState from './navigators/AppNavigator';

function App() {
  class Root extends Component {
    async componentDidMount() {
      // To check whether device has internet - will not make api calls and alert user if not connected
      let isConnected = await NetInfo.fetch();
      store.dispatch({
        type: 'INTERNET_CHANGE',
        isConnected: isConnected.toLowerCase() !== 'none'
      });
      NetInfo.isConnected.addEventListener('change', isConnected => store.dispatch({
        type: 'INTERNET_CHANGE',
        isConnected
      }))
    }

    render() {
      return (
          <Provider store={store}>
            <AppWithNavigationState />
          </Provider>
      );
    }
  }
  return Root;
}

export default App;
