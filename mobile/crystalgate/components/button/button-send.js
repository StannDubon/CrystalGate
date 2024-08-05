import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Definición del componente funcional SendButton
const SendButton = ({ onPress }) => {
    return (
        // TouchableOpacity es un contenedor que puede detectar toques
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
    );
};

// Definición de estilos utilizando StyleSheet.create
const styles = StyleSheet.create({
    button: {
        height: 50, // Altura del botón
        width: 317, // Ancho del botón
        backgroundColor: "#4292F6", // Color de fondo del botón, azul original
        marginTop: 50, // Espacio superior de 50 puntos
        justifyContent: "center", // Alinear contenido al centro horizontalmente
        alignItems: "center", // Alinear contenido al centro verticalmente
        borderRadius: 20, // Borde redondeado del botón
    },
    buttonText: {
        fontFamily: "Poppins-Regular", // Fuente del texto
        fontSize: 20, // Tamaño de fuente
        fontWeight: "SemiBold",
        color: "#ffffff", // Color del texto, blanco
    },
});

// Exportar el componente SendButton para su uso en otras partes de la aplicación
export default SendButton;