//@flow
import React from 'react';
import { Text, View } from "react-native";
import { connect } from 'react-redux';

const SettingsContainer = () => {
  return (
    <View>
      <Text>settings page</Text>
    </View>
  )
}

export default connect()(SettingsContainer)
