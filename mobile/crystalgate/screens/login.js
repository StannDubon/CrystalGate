import { StyleSheet, View, Text } from "react-native";
import React from "react";
// Importación del componente Login desde la carpeta '../components'
import Login from "../components/login";

// Definición del componente funcional login
export default function login() {
    return (
        // Devuelve un componente ScrollView como contenedor principal
        // Este archivo se encarga de inicializar el componente, promoviendo una estructura organizada, reutilizable y fácil de mantener para la interfaz
        <View style={styles.container}>
            <Login />
        </View>
    );
}

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
