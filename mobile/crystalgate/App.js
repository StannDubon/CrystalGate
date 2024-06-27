import { StyleSheet, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "../crystalgate/components/navigation";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
//import PasswordRecovery from "../crystalgate/components/password-recovery";
//import Verification from "../crystalgate/components/verification";
import Loading from "./screens/loading";
import Login from "./screens/login";
import NewPassword from "./screens/new-password";
import PasswordRecovery from "./screens/password-recovery";
import Verification from "./screens/verification";
//EL DE PROFILE SE DEBE INGRESAR A PROFILE EL NAVIGATION YA ESTA CONFIGURADO
//import Profile from "../crystalgate/components/profile";

const Stack = createNativeStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        "Poppins-Regular": require("./assets/fonts/Regular.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"), // Agrega otras variantes si es necesario
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PasswordRecovery"
                    component={PasswordRecovery}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Verification"
                    component={Verification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NewPassword"
                    component={NewPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Navigation"
                    component={Navigation}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
