//@flow
import React from 'react';
import { Text, View } from "react-native";
import { Button } from 'native-base';
import { connect } from 'react-redux';

import { goToPage } from '../actions/navActions';

const LandingContainer = ({ goToPage }) => {
  return (
    <View>
      <Text>LANDING PAGE</Text>
      <Button
        block
        onPress={() => goToPage('Login')}>
        <Text>LOGIN</Text>
      </Button>
      <Button
        block
        onPress={() => goToPage('SignUp')}>
        <Text>SIGN UP</Text>
      </Button>
    </View>
  )
}

export default connect(null, { goToPage })(LandingContainer)
