import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Definición del componente funcional BackLogInButton
const BackLogInButton = ({ onPress }) => {
    return (
        // TouchableOpacity es un contenedor que puede detectar toques
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Back to Log In</Text>
        </TouchableOpacity>
    );
};

// Definición de estilos utilizando StyleSheet.create
const styles = StyleSheet.create({
    button: {
        flexDirection: "row",  // Alinear elementos en una fila
        alignItems: "center",  // Alinear verticalmente al centro
        marginTop: 20,  // Ajusta este valor para posicionar más abajo el botón
    },
    buttonText: {
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        fontWeight: "SemiBold",
        color: "#4292F6",  // Color azul original
    },
});

// Exportar el componente BackLogInButton para su uso en otras partes de la aplicación
export default BackLogInButton;
