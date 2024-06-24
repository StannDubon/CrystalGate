import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import PermissionRequest from '../components/permissionRequest';

export default function CreatePermissionScreen() {
  return (
    <ScrollView>
      <PermissionRequest></PermissionRequest>
    </ScrollView>
  )
}