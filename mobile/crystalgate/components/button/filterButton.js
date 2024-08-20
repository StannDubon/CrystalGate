import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
// Importa View de react-native-animatable
import { View } from "react-native-animatable";
// Import Svg de react-native-svg
import Svg, { Path } from "react-native-svg";

// Componente funcional FilterButton que recibe una función onPress como prop
const FilterButton = ({ onPress }) => {
    return (
        // TouchableOpacity es un contenedor que puede detectar toques
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.containerButton}>
                <Svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M24.9222 4.60938C25.0993 5.03646 25.0264 5.40104 24.7034 5.70313L17.0003 13.4063V25C17.0003 25.4375 16.7972 25.7448 16.3909 25.9219C16.2555 25.974 16.1253 26 16.0003 26C15.7191 26 15.4847 25.901 15.2972 25.7031L11.2972 21.7031C11.0993 21.5052 11.0003 21.2708 11.0003 21V13.4063L3.2972 5.70313C2.97428 5.40104 2.90137 5.03646 3.07845 4.60938C3.25553 4.20313 3.56283 4 4.00033 4H24.0003C24.4378 4 24.7451 4.20313 24.9222 4.60938Z" fill="#4292F6"/>
                </Svg>
                <Text style={styles.buttonText}>Filter</Text>
            </View>
        </TouchableOpacity>
    );
};

// Estilos del componente FilterButton
const styles = StyleSheet.create({
    containerButton:{
        margin: 10,
        flexDirection: "row", // Alinea elementos en una fila
        justifyContent: "flex-start", // Alinea contenido al inicio horizontalmente
        alignItems: "flex-start", // Alinea contenido al centro verticalmente
    },
    button: {
        marginLeft: 10, // Margen izquierdo de 10 puntos
        flexDirection: "row", // Alinea elementos en una fila
        alignContent: "flex-start", // Alinea contenido al inicio horizontalmente
        height: 54, // Altura del botón
        width: 150, // Ancho del botón
        backgroundColor: "#D9E4FF", // Color de fondo del botón
        borderRadius: 8, // Borde redondeado
        marginTop: 15, // Margen superior de 40 puntos
        justifyContent: "flex-start", // Alinea contenido al inicio horizontalmente
        alignItems: "center", // Alinea contenido al centro verticalmente
    },
    buttonText: {
        fontFamily: "Poppins-Regular", // Fuente del texto
        fontSize: 16, // Tamaño de la fuente
        fontWeight: "normal", // Peso de la fuente
        color: "#4292F6", // Color del texto
        marginRight: 20, // Margen derecho de 20 puntos
        marginLeft: 10, // Margen izquierdo de 10 puntos
        marginVertical: 3, // Margen vertical de 3 puntos
    },
});

// Exporta el componente FilterButton para ser utilizado en otras partes de la aplicación
export default FilterButton;
