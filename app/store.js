import { AsyncStorage } from 'react-native';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import createReducer from './reducers';

function configureStore() {
  const composers = [
    applyMiddleware(
      thunkMiddleware
    ),
    // other store enhancers if any
  ];

  if (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__) {
    // avoid pushing undefined to list of composers
    composers.push(
      window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  const store = createStore(createReducer, undefined, compose(
    ...composers
  ));
  return store
}

export default configureStore;
