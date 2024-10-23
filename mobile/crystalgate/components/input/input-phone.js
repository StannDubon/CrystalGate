import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

// Definición del componente funcional InputText que recibe props onChangeText, value y label
const InputPhone = ({ onChangeText, value, label, disabled, placeholder }) => {

    // Función para formatear el número de teléfono
    const formatPhoneNumber = (text) => {
        // Elimina cualquier carácter que no sea un dígito
        let cleaned = text.replace(/\D/g, '');

        // Validación para el primer carácter: debe ser 2, 6, o 7
        if (cleaned.length > 0 && !['2', '6', '7'].includes(cleaned[0])) {
            // Si el primer carácter no es válido, no se actualiza el valor
            return;
        }
        // Limita el número a 8 dígitos (4 antes y 4 después del guion)
        let formatted = cleaned.substring(0, 8);

        // Agrega el guion en la posición correcta (####-####)
        if (formatted.length > 4) {
            formatted = `${formatted.slice(0, 4)}-${formatted.slice(4)}`;
        }

        // Llama a la función onChangeText para actualizar el valor
        onChangeText(formatted);
    };

    // Renderizado del componente
    return (
        <View style={styles.contenedor}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.div}>
                <TextInput
                    style={styles.input}
                    onChangeText={formatPhoneNumber}
                    value={value}
                    maxLength={9} // Limita el input a 9 caracteres incluyendo el guion
                    editable={!disabled}
                    placeholder={disabled ? placeholder : '####-####'}
                    placeholderTextColor="#98ADE3"
                    keyboardType="numeric" // teclado numérico
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

// Exporta el componente InputPhone por defecto
export default InputPhone;
