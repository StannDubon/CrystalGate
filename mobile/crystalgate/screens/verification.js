import { StyleSheet, View, Text } from "react-native";
import React from "react";
// Importación del componente Verification desde la carpeta '../components'
import Verification from "../components/verification";

// Definición del componente funcional verification
export default function verification() {
    return (
        // Devuelve un componente ScrollView como contenedor principal
        // Este archivo se encarga de inicializar el componente, promoviendo una estructura organizada, reutilizable y fácil de mantener para la interfaz
        <View style={styles.container}>
            <Verification />
        </View>
    );
}

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
