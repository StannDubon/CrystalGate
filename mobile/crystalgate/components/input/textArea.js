import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

// Definición del componente funcional TextArea que recibe props onChangeText, value y label
const TextArea = ({ onChangeText, value, label }) => {
  // Renderizado del componente
  return (
    <View style={styles.contenedor}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.div}>
        <TextInput
          style={styles.input}                   // Estilos para el TextInput
          onChangeText={onChangeText}            // Propiedad para manejar cambios en el texto
          value={value}                           // Valor del TextInput
          multiline={true}                        // Permite múltiples líneas de texto
          numberOfLines={3}                       // Número máximo de líneas visibles
        />
      </View>
    </View>
  );
};

// Definición de estilos utilizando StyleSheet.create
const styles = StyleSheet.create({
  contenedor: {
    paddingTop: 20,                           // Relleno superior de 20 unidades
    textAlign: "left",                        // Alineación del texto a la izquierda
    alignItems: "flex-start",                 // Alinea los elementos hijos a la izquierda
    display: "flex",                          // Usa flexbox para manejar el diseño
    flexDirection: "column",                  // Organiza los elementos en una columna
    fontFamily: "Poppins-Regular",            // Fuente para el texto dentro del contenedor
    fontSize: 20,                             // Tamaño de fuente de 20 unidades
    fontWeight: "500",                        // Peso de la fuente como 500
    height: 150,                              // Altura del contenedor de TextArea
    width: "auto",                            // Ancho automático del contenedor
    color: "#98ADE3",                         // Color de texto principal
  },
  div: {
    marginTop: 10,                            // Margen superior de 10 unidades
    borderColor: "#4292F6",                   // Color del borde del contenedor
    borderWidth: 1.5,                         // Ancho del borde del contenedor
    textAlign: "left",                        // Alineación del texto a la izquierda
    alignItems: "flex-start",                 // Alinea los elementos hijos a la izquierda
    borderRadius: 8,                          // Radio de borde para esquinas redondeadas
    height: 100,                              // Altura del contenedor de TextInput
    width: 337,                               // Ancho del contenedor de TextInput
  },
  input: {
    fontFamily: "Poppins-Regular",            // Fuente para el texto dentro del TextInput
    fontSize: 16,                             // Tamaño de fuente de 16 unidades
    fontWeight: "400",                        // Peso de la fuente como 400
    color: "#4292F6",                         // Color de texto dentro del TextInput
    paddingLeft: 15,                          // Relleno izquierdo de 15 unidades
    alignContent: "flex-start",               // Alinea el contenido del TextInput hacia el extremo superior
    textAlign: "left",                        // Alineación del texto a la izquierda
    width: 290,                               // Ancho del TextInput
    height: 90,                               // Altura del TextInput para 3 líneas de texto  
    textAlignVertical: "top",                 // Asegura que el texto comience desde la parte superior
  },
  inputLabel: {
    color: "#98ADE3",                         // Color de texto de la etiqueta
  },
});

// Exporta el componente TextArea por defecto
export default TextArea;
