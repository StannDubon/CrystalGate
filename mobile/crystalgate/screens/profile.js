import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import Profile from "../components/profile";

export default function ProfileScreen() {
  return (
    <View>
      <Profile/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});