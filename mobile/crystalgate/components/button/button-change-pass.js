import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
// Import para usar archivos SVG
import Svg, { Path } from "react-native-svg";

// Definición del componente funcional ChangePassButton
const ChangePassButton = ({ onPress }) => {
    return (
        // TouchableOpacity es un contenedor que puede detectar toques
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Change Password</Text>
            <Svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1.41373 1.59109C0.632905 2.37215 0.632969 3.63827 1.41388 4.41925L5.5801 8.58585C6.36106 9.36689 6.36106 10.6331 5.5801 11.4141L1.41388 15.5808C0.632969 16.3617 0.632906 17.6279 1.41373 18.4089L1.58983 18.5851C2.37097 19.3664 3.6377 19.3664 4.41878 18.585L11.5867 11.4139C12.3673 10.6329 12.3673 9.36707 11.5867 8.58609L4.41878 1.41504C3.6377 0.633617 2.37097 0.633574 1.58983 1.41494L1.41373 1.59109Z" fill="white"/>
            </Svg>
        </TouchableOpacity>
    );
};

// Definición de estilos utilizando StyleSheet.create
const styles = StyleSheet.create({
    button: {
        flexDirection: "row", // Alinear elementos en una fila
        alignContent: "space-between", // Distribuir elementos en el espacio disponible
        height: 54, // Altura del botón
        width: 222, // Ancho del botón
        backgroundColor: "#4292F6", // Color de fondo del botón, azul original
        borderRadius: 8, // Borde redondeado del botón
        marginTop: 40, // Espacio superior de 40 puntos
        justifyContent: "center", // Alinear contenido al centro horizontalmente
        alignItems: "center", // Alinear contenido al centro verticalmente
    },
    buttonText: {
        fontFamily: "Poppins-Regular", // Fuente del texto
        fontSize: 16, // Tamaño de fuente
        fontWeight: "SemiBold", 
        color: "#ffffff", // Color del texto, blanco
        marginRight: 20, // Margen derecho para separación del ícono
    },
});

// Exportar el componente ChangePassButton para su uso en otras partes de la aplicación
export default ChangePassButton;
