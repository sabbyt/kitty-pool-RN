//@flow
import React from 'react';
import { Text, View } from "react-native";
import { Button } from 'native-base';
import { connect } from 'react-redux';

import { goToHome } from '../actions/navActions';

const SignUpContainer = ({ goToHome }) => {
  return (
    <View>
      <Text>sign up page</Text>
      <Button
        block
        onPress={goToHome}>
        <Text>HOME</Text>
      </Button>
    </View>
  )
}

export default connect(null, { goToHome })(SignUpContainer)
