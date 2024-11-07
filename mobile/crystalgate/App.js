import React, { useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Navigation from "../crystalgate/components/navigation";
import Login from "./components/login";
import PasswordRecovery from "./components/password-recovery";
import Verification from "./components/verification";
import NewPassword from "./components/new-password";
import DocumentationDetail from "./components/documentation-detail";
import PermissionDetail from "./components/permission-detail";
import LoadingScreen from "./components/loading-screen";
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('¡Se necesitan permisos para las notificaciones!');
        return;
      }
    })();
  }, []);

  const getToken = async () => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token); // Guarda este token en tu servidor para enviar notificaciones
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });


  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} options={{ headerShown: false }} />
          <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
          <Stack.Screen name="NewPassword" component={NewPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Navigation" component={Navigation} options={{ headerShown: false }} />
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} /> 
          <Stack.Screen name="DocumentationDetail" component={DocumentationDetail} options={{ headerShown: false }} />
          <Stack.Screen name="PermissionDetail" component={PermissionDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
