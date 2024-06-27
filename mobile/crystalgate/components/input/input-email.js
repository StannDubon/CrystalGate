import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";

// Componente EmailInputForm que recibe props onChangeText, value y placeholder
const EmailInputForm = ({ onChangeText, value, placeholder }) => {
    // Renderizado del componente
    return (
        <View style={styles.div}>
            <Svg
                width="24"
                height="19"
                viewBox="0 0 24 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M21.6 0H2.4C1.0764 0 0 1.06519 0 2.375V16.625C0 17.9348 1.0764 19 2.4 19H21.6C22.9236 19 24 17.9348 24 16.625V2.375C24 1.06519 22.9236 0 21.6 0ZM21.6 2.375V2.98181L12 10.3716L2.4 2.983V2.375H21.6ZM2.4 16.625V5.98975L11.2632 12.8119C11.4733 12.9753 11.7328 13.0641 12 13.0641C12.2672 13.0641 12.5267 12.9753 12.7368 12.8119L21.6 5.98975L21.6024 16.625H2.4Z"
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

// Exporta el componente EmailInputForm como exportación por defecto
export default EmailInputForm;
