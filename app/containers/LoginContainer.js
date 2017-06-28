//@flow
import React from 'react';
import { Container, Form, Item, Input, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import AppHeader from './components/layout/AppHeader';

import { goToHome } from '../actions/navActions';
import { setLoginUsername, setLoginPassword, clearLoginForm } from '../actions/forms/loginActions';
import { setUserUID } from '../actions/accountActions';
import { loginApi } from '../actions/authActions';

const LoginContainer = ({ goToHome, onLogin, setLoginUsername, setLoginPassword }) => (
  <Container>
    <AppHeader title='Login' showBackButton={true}/>
    <Form>
      <Item>
        <Input
          onChangeText={setLoginUsername}
          placeholder="Username" />
      </Item>
      <Item last>
        <Input
          onChangeText={setLoginPassword}
          placeholder="Password" />
      </Item>
    </Form>
    <Button
      block
      onPress={onLogin}>
      <Text>LOGIN</Text>
    </Button>
  </Container>
)

export default compose(
  connect(state => {
    const { login } = state.forms;
    return {
      login
    }
  }, { goToHome, setLoginUsername, setLoginPassword, loginApi, setUserUID, clearLoginForm }),
  withHandlers({
    verify: ({ login }) => () => {
      if (login.username === null || login.username.length === 0) return false
      if (login.password === null || login.password.length === 0) return false
      return true
    }
  }),
  withHandlers({
    onLogin: ({ login, verify, loginApi, setUserUID, goToHome, clearLoginForm }) => () => {
      const verified = verify();
      if (verified) {
        loginApi(login)
          .then(data => {
            console.log('Signed in', data);
            setUserUID(data.uid);
            clearLoginForm()
            goToHome();
          });
      } else {
        console.log('Could not login user');
      }
    }
  })
)(LoginContainer)
