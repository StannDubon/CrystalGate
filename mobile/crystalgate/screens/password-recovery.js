import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import PasswordRecovery from "../components/password-recovery";

export default function passwordrecovery() {
  return (
    <View style={styles.container}>
      <PasswordRecovery/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 2,
  },
});