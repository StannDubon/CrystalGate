import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
// Import para usar archivos SVG
import Svg, { Path } from "react-native-svg";

// Definición del componente funcional BackButton
const BackButton = ({ onPress, color = "white"}) => {
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
                    d="M17.557 25.0485L8.27583 16.0874H29V11.9126H8.27583L17.557 2.95154L14.5 0L0 14L14.5 28L17.557 25.0485Z"
                    fill={color}
                />
            </Svg>
        </TouchableOpacity>
    );
};


export default BackButton;
