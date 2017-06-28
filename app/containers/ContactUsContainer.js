//@flow
import React from 'react';
import { Text, View } from "react-native";
import { connect } from 'react-redux';

const ContactUsContainer = () => {
  return (
    <View>
      <Text>contact us container - send feedback, report bug</Text>
    </View>
  )
}

export default connect()(ContactUsContainer)
