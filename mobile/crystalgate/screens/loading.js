import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import Loading from "../components/loading";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Loading/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});