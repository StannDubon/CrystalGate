import { StyleSheet, View, Text } from "react-native";
import React from "react";
// Importación del componente NewPassword desde la carpeta '../components'
import NewPassword from "../components/new-password";

// Definición del componente funcional newpassword
export default function newpassword({ route }) {
    return (
        // Devuelve un componente ScrollView como contenedor principal
        // Este archivo se encarga de inicializar el componente, promoviendo una estructura organizada, reutilizable y fácil de mantener para la interfaz
        <View style={styles.container}>
            <NewPassword 
            route={route}/>
        </View>
    );
}

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
});
