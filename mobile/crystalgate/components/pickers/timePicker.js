// TimePicker.js
import React, { useState } from "react";
import { View, Platform, StyleSheet, Text } from "react-native";
// Importación del componente DateTimePicker de react-native-community/datetimepicker
import DateTimePicker from "@react-native-community/datetimepicker";
// Importación de Svg y Path desde react-native-svg
import Svg, { Path } from "react-native-svg";
// Importación del archivo de constantes de colores
import { Color } from "../../assets/const/color";

// Componente funcional TimePicker que recibe la propiedad label
const TimePicker = ({ label }) => {
    // Estado para almacenar la hora seleccionada y mostrar el selector de tiempo
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);

    // Función para manejar el cambio en la hora seleccionada
    const onChange = (event, selectedTime) => {
        const currentTime = selectedTime || time; // Si no se selecciona una hora nueva, se usa la hora actual
        setShow(Platform.OS === "ios"); // Si es iOS, muestra el selector de tiempo
        setTime(currentTime); // Actualiza el estado con la nueva hora seleccionada
    };

    // Función para mostrar el selector de tiempo
    const showMode = (currentMode) => {
        // Muestra el selector de tiempo
        setShow(true);
    };

    // Renderizado del componente
    return (
        <View style={styles.container}>
            <View style={styles.txtContainer}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <View style={styles.timeContainer}>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={time}
                        mode="time"
                        display="default"
                        onChange={onChange}
                    />
                )}
                <View style={styles.labelContainer}>
                    <Text style={styles.timeText}>
                        {time.toLocaleTimeString()}
                    </Text>
                </View>
                <View style={styles.btnTime}>
                    <Svg
                        width="20"
                        height="20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onPress={showMode}
                    >
                        <Path
                            d="M9 0C4.122 0 0 4.122 0 9C0 13.878 4.122 18 9 18C13.879 18 18 13.878 18 9C18 4.122 13.879 0 9 0ZM14 10H8V4H10V8H14V10Z"
                            fill="#4292F6"
                        />
                    </Svg>
                </View>
            </View>
        </View>
    );
};

// Estilos del componente utilizando StyleSheet.create
const styles = StyleSheet.create({
    labelContainer: {
        width: 170, // Ancho del contenedor para la etiqueta
    },
    txtContainer: {
        display: "flex", // Mostrar como contenedor flexible
        width: 50, // Ancho del contenedor del texto de la etiqueta
        alignSelf: "center", // Alineación del contenedor del texto al centro
        textAlign: "left", // Alineación del texto a la izquierda
    },
    container: {
        marginTop: 20, // Margen superior del contenedor principal
        paddingRight: 20, // Relleno derecho del contenedor principal
        paddingLeft: 20, // Relleno izquierdo del contenedor principal
        display: "flex", // Mostrar como contenedor flexible
        flexDirection: "row", // Dirección de los elementos en fila
    },
    timeContainer: {
        width: 300, // Ancho del contenedor para el selector de tiempo
        height: 50, // Altura del contenedor para el selector de tiempo
        borderWidth: 1, // Ancho del borde del contenedor
        borderColor: "#4292F6", // Color del borde del contenedor
        borderRadius: 8, // Radio de borde del contenedor
        display: "flex", // Mostrar como contenedor flexible
        flexDirection: "row", // Dirección de los elementos en fila
    },
    label: {
        textAlign: "left", // Alineación del texto a la izquierda
        fontSize: 16, // Tamaño de la fuente del texto
        marginBottom: 10, // Margen inferior del texto
        alignSelf: "center", // Alineación del texto al centro
        color: Color.colorfont5, // Color del texto utilizando la constante 'Color'
    },
    timeText: {
        fontFamily: "Poppins-Regular", // Fuente del texto de la hora seleccionada
        margin: 10, // Margen interno del texto
        fontSize: 16, // Tamaño de la fuente del texto
        color: Color.colorfont1, // Color del texto utilizando la constante 'Color'
    },
    btnTime: {
        alignSelf: "center", // Alineación de los elementos al centro
        alignItems: "flex-end", // Alineación de los elementos al final
        marginLeft: 100, // Margen izquierdo de los elementos
    },
});

// Exporta el componente TimePicker por defecto
export default TimePicker;
