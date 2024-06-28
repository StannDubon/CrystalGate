import { StyleSheet, View, Text } from "react-native";
import React from "react";
// Importación del componente PasswordRecovery desde la carpeta '../components'
import PasswordRecovery from "../components/password-recovery";

// Definición del componente funcional passwordrecovery
export default function passwordrecovery() {
    return (
        // Devuelve un componente ScrollView como contenedor principal
        // Este archivo se encarga de inicializar el componente, promoviendo una estructura organizada, reutilizable y fácil de mantener para la interfaz
        <View style={styles.container}>
            <PasswordRecovery />
        </View>
    );
}

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
});
