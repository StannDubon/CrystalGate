import { StyleSheet, View, Text } from "react-native";
import React from "react";
// Importación del componente Profile desde la carpeta '../components'
import Profile from "../components/profile";

// Definición del componente funcional ProfileScreen
export default function ProfileScreen() {
    return (
        // Devuelve un componente ScrollView como contenedor principal
        // Este archivo se encarga de inicializar el componente, promoviendo una estructura organizada, reutilizable y fácil de mantener para la interfaz
        <View>
            <Profile />
        </View>
    );
}

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
