import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";

// CheckInputForm component receives props onChangeText, value, and placeholder
const CheckInputForm = ({ onChangeText, value, placeholder }) => {
    // Renderizado del componente
    return (
        <View style={styles.div}>
            <Svg
                width="25"
                height="19"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                
            >
                <Path
                    d="M4.707 8.293L1.414 5L0 6.414L4.707 11.121L14.414 1.414L13 0L4.707 8.293Z"
                    fill="#4292F6"
                />
            </Svg>

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={"#4292F6"}
                keyboardType="numeric"
            />
        </View>
    );
};

// Definición de los estilos usando StyleSheet.create
const styles = StyleSheet.create({
    div: {
        display: "flex",
        flexDirection: "row",  // Organiza los componentes hijos horizontalmente
        fontFamily: "Poppins-Regular",  // Fuente de texto para el componente
        fontSize: 20,  // Tamaño de fuente para el texto
        fontWeight: "Medium",  // Peso de la fuente para el texto
        marginTop: 40,  // Margen superior
        borderColor: "#4292F6",  // Color del borde para el componente View
        borderWidth: 1.5,  // Ancho del borde para el componente View
        textAlign: "center",  // Alineación del texto dentro del componente View
        alignItems: "center",  // Alinea los elementos al centro horizontalmente
        paddingStart: 15,  // Relleno en el lado de inicio (izquierda)
        borderRadius: 8,  // Radio de borde para esquinas redondeadas
        height: 50,  // Altura del componente View
        width: 337,  // Ancho del componente View
    },
    input: {
        fontFamily: "Poppins-Regular",  // Fuente de texto para el input
        fontSize: 16,  // Tamaño de fuente para el input
        fontWeight: "Regular",  // Peso de la fuente para el input
        color: "#4292F6",  // Color del texto para el input
        paddingLeft: 15,  // Relleno en el lado izquierdo del input
        alignContent: "flex-end",  // Alinea el contenido al final (derecha) dentro del input
        width: 290,  // Ancho del input
        height: 40,  // Altura del input
    },
});

// Exporta el componente CheckInputForm como exportación por defecto
export default CheckInputForm;