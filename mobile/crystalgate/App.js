import { StyleSheet, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../crystalgate/components/navigation";
//import PasswordRecovery from "../crystalgate/components/password-recovery";
//import Verification from "../crystalgate/components/verification";
import Loading from "../crystalgate/components/loading";
import Login from "./components/login";
import NewPassword from "./components/new-password";
import PasswordRecovery from "./components/password-recovery";
import Verification from "./components/verification";
//EL DE PROFILE SE DEBE INGRESAR A PROFILE EL NAVIGATION YA ESTA CONFIGURADO
//import Profile from "../crystalgate/components/profile";

export default function App() {
    return (
        <View style={styles.container}>
            <Login/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
