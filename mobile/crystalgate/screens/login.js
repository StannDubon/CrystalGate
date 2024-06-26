import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import Login from "../components/login";

export default function login() {
  return (
    <View style={styles.container}>
      <Login/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});