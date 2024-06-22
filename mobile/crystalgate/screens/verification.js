import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import Verification from '../components/verification';

export default function verification() {
  return (
    <View>
      <Verification/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});