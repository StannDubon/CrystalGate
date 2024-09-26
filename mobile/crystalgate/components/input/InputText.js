import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

// Definición del componente funcional InputText que recibe props onChangeText, value y label
const InputText = ({ onChangeText, value, label, disabled, placeholder }) => {
    // Renderizado del componente
    return (
        <View style={styles.contenedor}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.div}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                    editable={!disabled}
                    placeholder={disabled ? placeholder : ''}
                    placeholderTextColor="#4292F6"
                />
            </View>
        </View>
    );
};

// Definición de estilos utilizando StyleSheet.create
const styles = StyleSheet.create({
    contenedor:{
        paddingTop: 20,                         // Relleno superior de 20 unidades
        textAlign: "left",                      // Alineación del texto a la izquierda
        alignItems: "left",                     // Alinea los elementos hijos a la izquierda
        display: "flex",                        // Usa flexbox para manejar el diseño
        flexDirection: "column",                // Organiza los elementos en una columna
        fontFamily: "Poppins-Regular",          // Fuente para el texto dentro del contenedor
        fontSize: 20,                           // Tamaño de fuente de 20 unidades
        fontWeight: "Medium",                   // Peso de la fuente como Medium
        height: 100,                            // Altura del contenedor de 100 unidades
        with: "auto",                           // Ancho automático del contenedor (debe ser 'width' en lugar de 'with')
        color: "#98ADE3",                       // Color de texto principal
    },  
    div: {
        marginTop: 10,                          // Margen superior de 10 unidades
        borderColor: "#4292F6",                 // Color del borde del contenedor
        borderWidth: 1.5,                       // Ancho del borde del contenedor
        textAlign: "left",                      // Alineación del texto a la izquierda
        alignItems: "left",                     // Alinea los elementos hijos a la izquierda
        borderRadius: 8,                        // Radio de borde para esquinas redondeadas
        height: 50,                             // Altura del contenedor de TextInput
        width: 337,                             // Ancho del contenedor de TextInput

    },
    input: {
        fontFamily: "Poppins-Regular",          // Fuente para el texto dentro del TextInput
        fontSize: 16,                           // Tamaño de fuente de 16 unidades
        fontWeight: "Regular",                  // Peso de la fuente como Regular
        color: "#4292F6",                       // Color de texto dentro del TextInput
        paddingLeft: 15,                        // Relleno izquierdo de 15 unidades
        alignContent: "flex-end",               // Alinea el contenido del TextInput hacia el extremo inferior
        width: 290,                             // Ancho del TextInput
        height: 40, 
        marginTop: 5,                            // Altura del TextInput
    },
    inputLabel: {
        color: "#98ADE3",                       // Color de texto de la etiqueta
    },  
});

// Exporta el componente InputText por defecto
export default InputText;
