import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";

// Componente PasswordInputForm que recibe props onChangeText, value y placeholder
const PasswordInputForm = ({ onChangeText, value, placeholder }) => {
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
                    d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"
                    fill="#4292F6"
                />
            </Svg>

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#4292F6"
                secureTextEntry // Esto hace que el campo sea seguro
            />
        </View>
    );
};

// Hoja de estilos para definir estilos del componente
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
        flex: 1,  // Ocupa el espacio restante disponible
    },
});

 // Exporta el componente PasswordInputForm como exportación por defecto
export default PasswordInputForm;