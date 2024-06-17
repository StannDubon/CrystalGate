import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreatePermission, DocumentationRequest, Dashboard, History, Profile } from './screens/Index';
import React from 'react';


const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name='CreatePermission'
        component={CreatePermission}
        options={{
          tabBarIcon: ({focused}) => {
            return(
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <image style={styles.imageStyle} source={image}/>
              </View>
            )
          }
        }}
      />

      <Tab.Screen
      
      />

      <Tab.Screen
      
      />

      <Tab.Screen
      
      />

      <Tab.Screen
      
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
