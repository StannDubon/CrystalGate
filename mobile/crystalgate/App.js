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
import fetchData from "./components/utils/database";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Maneja la recepción de notificaciones
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notificación recibida:", notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
  
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      if(finalStatus === 'granted'){
        token = (await Notifications.getExpoPushTokenAsync()).data;
        const FORM = new FormData();
        FORM.append('token',token);
        FORM.append('estado',false);
        await fetchData('gestor-notificacion.php','createRow',FORM);
      }
    }
  
    if (finalStatus === 'granted') {
      localStorage.setItem('tokenNotifaction',token);
    } else {
      alert('¡If you dont allow notification permissions, your not going to be noficated when any update in your procceses!');
    }
  
    return token;
  }


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
