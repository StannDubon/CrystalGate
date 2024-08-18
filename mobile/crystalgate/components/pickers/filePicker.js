import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// Importación de DocumentPicker de Expo
import * as DocumentPicker from "expo-document-picker";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";

// Definición del componente funcional FilePicker
const FilePicker = ({ onSelectFile }) => {
    // Función para seleccionar un archivo
    const pickFile = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: ["application/pdf","application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            });
            // Si no se cancela la selección del archivo
            if (!res.cancelled) {
                // Llama a la función onSelectFile pasando el resultado res
                onSelectFile(res);
            } else {
                // Mensaje de consola si se cancela la selección del archivo
                console.log("Canceled");
            }
        } catch (err) {
            // Manejo de errores si hay algún problema con DocumentPicke
            console.log("Document Picker Error:", err);
        }
    };

    // Renderizado del componente
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickFile} style={styles.button}>
                <Svg
                    width="33"
                    height="33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={styles.iconFile}
                >
                    <Path
                        d="M27.9576 10.0411C27.2365 4.38643 22.374 0 16.5 0C11.9526 0 8.0025 2.64664 6.19905 6.81786C2.65485 7.87257 0 11.2043 0 14.7857C0 19.3151 3.70095 23 8.25 23H26.4C30.0399 23 33 20.0527 33 16.4286C32.9975 14.9559 32.4994 13.5266 31.5854 12.3688C30.6714 11.211 29.3942 10.3915 27.9576 10.0411ZM18.15 14.7857V19.7143H14.85V14.7857H9.9L16.5 6.57143L23.1 14.7857H18.15Z"
                        fill="#595959"
                    />
                </Svg>
                <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
        </View>
    );
};

// Estilos del componente utilizando StyleSheet.create
const styles = StyleSheet.create({
    container: {
        alignItems: 'center', // Alineación de elementos al centro
        marginTop: 20, // Margen superior
    },
    button: {
        backgroundColor: '#CECECE', // Color de fondo del botón
        padding: 10, // Padding interno del botón
        borderRadius: 10, // Bordes redondeados
        width: 300, // Ancho del botón
        height: 50, // Altura del botón
        display: "flex", // Mostrar como contenedor flexible
        flexDirection: "row", // Dirección de los elementos en fila
    },
    buttonText: {
        fontFamily: "Poppins-Regular", // Fuente del texto del botón
        alignSelf: "left", // Alineación del texto a la izquierda
        marginLeft: 20, // Margen izquierdo del texto
        color: '#595959', // Color del texto
        fontSize: 16, // Tamaño de la fuente
    },
    iconFile: {
        marginLeft: 10, // Margen izquierdo del icono SVG
    },
});

// Exporta el componente FilePicker por defecto
export default FilePicker;
