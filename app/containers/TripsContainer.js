//@flow
import React from 'react';
import { Text, View } from "react-native";
import { connect } from 'react-redux';

const TripsContainer = () => {
  return (
    <View>
      <Text>trips page</Text>
    </View>
  )
}

export default connect()(TripsContainer)
