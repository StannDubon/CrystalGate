import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const BackLogInButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Back to Log In</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",  // Alinear elementos en una fila
        alignItems: "center",  // Alinear verticalmente al centro
        marginTop: 20,  // Ajusta este valor para posicionar más abajo el botón
    },
    buttonText: {
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        fontWeight: "600",  // Cambiado a 600 en lugar de "SemiBold" para mejor compatibilidad con fontWeight
        color: "#4292F6",  // Color azul original
    },
});

export default BackLogInButton;
