import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";

// Definición del componente funcional SwitchButton
const SwitchButton = ({ selectedOption, onSelectOption, disabled1, disabled2 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button1,
          selectedOption === 'Days' && styles.selectedButton
        ]}
        onPress={() => onSelectOption('Days')}
        disabled = {disabled1}
      >
        <Text
          style={[
            styles.buttonText,
            selectedOption === 'Days' && styles.selectedButtonText
          ]}
        >
          Days
        </Text>
        <Svg
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.iconButton}
        >
            <Path
                d="M2 20H16C17.103 20 18 19.103 18 18V4C18 2.897 17.103 2 16 2H14V0H12V2H6V0H4V2H2C0.897 2 0 2.897 0 4V18C0 19.103 0.897 20 2 20ZM13 14H5V12H13V14ZM2 5H16V7H2V5Z"
                fill={(selectedOption == "Days" ? "white":"#4292F6")}
            />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button2,
          selectedOption === 'Hours' && styles.selectedButton
        ]}
        onPress={() => onSelectOption('Hours')}
        disabled = {disabled2}
      >
        <Text
          style={[
            styles.buttonText,
            selectedOption === 'Hours' && styles.selectedButtonText
          ]}
        >
          Hours
        </Text>
        <Svg
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.iconButton}
        >
            <Path
                d="M9 0C4.122 0 0 4.122 0 9C0 13.878 4.122 18 9 18C13.879 18 18 13.878 18 9C18 4.122 13.879 0 9 0ZM14 10H8V4H10V8H14V10Z"
                fill={(selectedOption == "Hours" ? "white":"#4292F6")}
            />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

// Estilos definidos usando StyleSheet.create
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row', // Alinear elementos en una fila
    alignItems: 'center', // Alinear verticalmente al centro
    justifyContent: 'center', // Alinear horizontalmente al centro
    paddingVertical: 10, // Espacio vertical dentro del contenedor
    paddingLeft: 30, // Espacio izquierdo del contenedor
    alignSelf: "flex-start", // Alinear el contenedor al inicio del padre
  },
  button1: {
    display: "flex",
    paddingVertical: 10, // Espacio vertical dentro del botón
    paddingHorizontal: 20, // Espacio horizontal dentro del botón
    borderWidth: 1, // Ancho del borde
    borderColor: '#4292F6', // Color del borde
    borderTopLeftRadius: 8, // Radio de borde superior izquierdo
    borderBottomLeftRadius: 8, // Radio de borde inferior izquierdo
    backgroundColor: '#fff', // Color de fondo del botón
    flexDirection: "row", // Alinear elementos en una fila
  },
  button2: {
    display: "flex",
    paddingVertical: 10, // Espacio vertical dentro del botón
    paddingHorizontal: 20, // Espacio horizontal dentro del botón
    borderWidth: 1, // Ancho del borde
    borderColor: '#4292F6', // Color del borde
    borderTopRightRadius: 8, // Radio de borde superior derecho
    borderBottomRightRadius: 8, // Radio de borde inferior derecho
    backgroundColor: '#fff', // Color de fondo del botón
    flexDirection: "row", // Alinear elementos en una fila
  },
  selectedButton: {
    backgroundColor: '#4292F6', // Color de fondo seleccionado
  },
  iconButton: {
    marginLeft: 10, // Margen izquierdo del icono
    color: '#4292F6', // Color del icono
  },
  buttonText: {
    fontSize: 16, // Tamaño de la fuente del texto
    color: '#4292F6', // Color del texto
  },
  selectedButtonText: {
    color: '#fff', // Color del texto seleccionado
  },
});

// Exporta el componente SwitchButton para ser utilizado en otras partes de la aplicación
export default SwitchButton;
