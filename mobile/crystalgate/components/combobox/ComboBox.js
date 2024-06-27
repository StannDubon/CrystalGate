// ComboBox.js
// Importación de React y useState para manejar el estado local
import React, { useState } from "react";
// Importación de componentes necesarios de React Native
import { View, Text, StyleSheet } from "react-native";
// Importación del componente Picker de '@react-native-picker/picker'
import { Picker } from "@react-native-picker/picker";

// Definición del componente funcional ComboBox
const ComboBox = ({ options, placeholder, onSelect, label }) => {
    // Estado local para manejar el valor seleccionado
    const [selectedValue, setSelectedValue] = useState("");

    // Función para manejar el cambio de valor seleccionado
    const handleChange = (itemValue) => {
        // Actualiza el estado con el nuevo valor seleccionado
        setSelectedValue(itemValue);
        if (onSelect) {
            // Llama a la función onSelect pasando el nuevo valor seleccionado
            onSelect(itemValue);
        }
    };
    // Renderizado del componente
    return (
        <View style={styles.contenedor}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.div}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={handleChange}
                    style={styles.picker}
                >
                    <Picker.Item label={placeholder} value="" />
                    {options.map((option, index) => (
                        <Picker.Item
                            key={index}
                            label={option}
                            value={option}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

// Estilos del componente usando StyleSheet.create
const styles = StyleSheet.create({
    contenedor: {
        paddingTop: 20, // Espacio superior
        textAlign: "left", // Alineación del texto a la izquierda
        alignItems: "left", // Alineación de los elementos a la izquierda
        display: "flex", // Mostrar como flexbox
        flexDirection: "column", // Dirección de los elementos (columna)
        fontFamily: "Poppins-Regular", // Familia de fuente del texto (si aplica)
        fontSize: 20, // Tamaño de fuente
        fontWeight: "Medium", // Peso de la fuente
        height: 100, // Altura del contenedor
        with: "auto", // Ancho automático (debería ser 'width' en lugar de 'with')
        color: "#98ADE3", // Color del texto
    },
    div: {
        marginTop: 10, // Margen superior
        borderColor: "#4292F6", // Color del borde
        borderWidth: 1.5, // Ancho del borde
        textAlign: "left", // Alineación del texto a la izquierda
        alignItems: "left", // Alineación de los elementos a la izquierda
        paddingStart: 15, // Relleno izquierdo
        borderRadius: 8, // Borde redondeado
        height: 50, // Altura del campo de entrada
        width: 337, // Ancho del campo de entrada
    },
    input: {
        fontFamily: "Poppins-Regular", // Familia de fuente del texto del input (si aplica)
        fontSize: 16, // Tamaño de fuente del input
        fontWeight: "Regular", // Peso de la fuente del input
        color: "#4292F6", // Color del texto del input
        paddingLeft: 15, // Relleno izquierdo
        alignContent: "flex-end", // Alineación del contenido a la derecha
        width: 290, // Ancho del input
        height: 40, // Altura del input
    },
    inputLabel: {
        color: "#98ADE3", // Color del texto de la etiqueta
    },
    picker: {
        color: "#4292F6", // Color del texto seleccionado del picker
    },
});

// Exportar el componente ComboBox como el componente predeterminado
export default ComboBox;
