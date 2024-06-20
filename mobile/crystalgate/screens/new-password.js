import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import NewPassword from "../components/new-password";

export default function newpassword() {
  return (
    <View>
      <NewPassword/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 2,
  },
});