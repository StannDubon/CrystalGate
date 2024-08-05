import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";

// Componente UsernameInputForm que recibe props onChangeText, value y placeholder
const UsernameInputForm = ({ onChangeText, value, placeholder }) => {
    // Renderizado del componente
    return (
        <View style={styles.div}>
            <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg" 
            >
                <Path
                    d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
                    fill="#4292F6"
                />
            </Svg>

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={"#4292F6"}
            />
        </View>
    );
};

// Hoja de estilos para definir estilos del componente
const styles = StyleSheet.create({
    div: {
        display: "flex",                    // Utiliza el modelo de caja flexible
        flexDirection: "row",               // Organiza los elementos en una fila horizontal
        fontFamily: "Poppins-Regular",      // Define la fuente para el texto dentro del contenedor
        fontSize: 20,                       // Tamaño de la fuente para el texto dentro del contenedor
        fontWeight: "Medium",               // Peso de la fuente para el texto dentro del contenedor
        marginTop: 40,                      // Margen superior de 40 unidades
        borderColor: "#4292F6",             // Color del borde del contenedor
        borderWidth: 1.5,                   // Ancho del borde del contenedor
        textAlign: "center",                // Centra el contenido del texto horizontalmente
        alignItems: "center",               // Centra los elementos verticalmente dentro del contenedor
        paddingStart: 15,                   // Relleno en el inicio del contenedor
        borderRadius: 8,                    // Radio de borde para esquinas redondeadas
        height: 50,                         // Altura del contenedor
        width: 337,                         // Ancho del contenedor
    },
    input: {
        fontFamily: "Poppins-Regular",      // Define la fuente para el texto dentro del TextInput
        fontSize: 16,                       // Tamaño de la fuente para el texto dentro del TextInput
        fontWeight: "Regular",              // Peso de la fuente para el texto dentro del TextInput
        color: "#4292F6",                   // Color del texto dentro del TextInput
        paddingLeft: 15,                    // Relleno en el inicio del TextInput
        alignContent: "flex-end",           // Alinea el contenido del TextInput hacia el extremo inferior
        width: 290,                         // Ancho del TextInput
        height: 40,                         // Altura del TextInput
    },
});

 // Exporta el componente UsernameInputForm como exportación por defecto
export default UsernameInputForm;