import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";

// Componente funcional LogOutButton que recibe una función onPress
const LogOutButton = ({ onPress }) => {
    return (
        // TouchableOpacity envuelve el contenido para hacerlo interactivo al toque
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Svg
                width="23"
                height="21"
                viewBox="0 0 23 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M15 11.625C15.5523 11.625 16 11.1773 16 10.625V10.375C16 9.82272 15.5523 9.375 15 9.375H6.71429C6.162 9.375 5.71429 8.92728 5.71429 8.375V8.06035C5.71429 7.22541 4.75156 6.75815 4.0956 7.27472L0.997633 9.71436C0.489218 10.1147 0.489218 10.8853 0.997633 11.2856L4.0956 13.7253C4.75156 14.2419 5.71429 13.7746 5.71429 12.9396V12.625C5.71429 12.0727 6.162 11.625 6.71429 11.625H15Z"
                    fill="white"
                />
                <Path
                    d="M20.6923 0H10.3077C9.035 0 8 1.0465 8 2.33333V6C8 6.55229 8.44772 7 9 7H9.30769C9.85998 7 10.3077 6.55228 10.3077 6V3.33333C10.3077 2.78105 10.7554 2.33333 11.3077 2.33333H19.6923C20.2446 2.33333 20.6923 2.78105 20.6923 3.33333V17.6667C20.6923 18.219 20.2446 18.6667 19.6923 18.6667H11.3077C10.7554 18.6667 10.3077 18.219 10.3077 17.6667V15C10.3077 14.4477 9.85998 14 9.30769 14H9C8.44771 14 8 14.4477 8 15V18.6667C8 19.9535 9.035 21 10.3077 21H20.6923C21.965 21 23 19.9535 23 18.6667V2.33333C23 1.0465 21.965 0 20.6923 0Z"
                    fill="white"
                />
            </Svg>
        </TouchableOpacity>
    );
};

// Estilos definidos usando StyleSheet.create
const styles = StyleSheet.create({
    button: {
        flexDirection: "row", // Alinea elementos en una fila
        alignContent: "space-between", // Espacio entre contenidos
        height: 54, // Altura del botón
        width: 54, // Ancho del botón
        backgroundColor: "#CECECE", // Color de fondo del botón
        borderRadius: 8, // Borde redondeado
        marginTop: 40, // Margen superior de 40 puntos
        justifyContent: "center", // Alinear contenido al centro horizontalmente
        alignItems: "center", // Alinear contenido al centro verticalmente
        paddingRight: 7, // Ajuste del margen derecho
    },
});

// Exporta el componente LogOutButton para ser utilizado en otras partes de la aplicación
export default LogOutButton;
