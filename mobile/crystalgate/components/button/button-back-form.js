import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
// Import para usar archivos SVG
import Svg, { Path } from "react-native-svg";

// Definición del componente funcional BackButtonForm
const BackButtonForm = ({ onPress, color = "#4292F6"}) => {
    return (
        // TouchableOpacity es un contenedor que puede detectar toques
        <TouchableOpacity onPress={onPress}>
            <Svg
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M18.5318 26.9241C19.3366 26.1391 19.3366 24.8452 18.5316 24.0603L10.7083 16.4319C9.90336 15.647 9.90336 14.353 10.7083 13.5681L18.5316 5.93965C19.3366 5.15478 19.3366 3.86087 18.5318 3.07592L16.7744 1.362C15.9976 0.604354 14.7583 0.604396 13.9815 1.3621L1.46776 13.5683C0.663115 14.3532 0.663116 15.6468 1.46777 16.4317L13.9815 28.6379C14.7583 29.3956 15.9976 29.3956 16.7744 28.638L18.5318 26.9241Z"
                    fill={color}
                />
            </Svg>
        </TouchableOpacity>
    );
};

// Exportar el componente BackButtonForm para su uso en otras partes de la aplicación
export default BackButtonForm;