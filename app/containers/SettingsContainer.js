//@flow
import React from 'react';
import { Text, View } from "react-native";
import { connect } from 'react-redux';

const SettingsContainer = () => {
  return (
    <View>
      <Text>settings page - profile, pending invites, notifications, currency default, payout accounts, terms, contact us, logout</Text>
    </View>
  )
}

export default connect()(SettingsContainer)
