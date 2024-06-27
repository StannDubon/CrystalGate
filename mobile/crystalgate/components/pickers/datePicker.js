// DatePicker.js
import React, { useState } from "react";
import { View, Button, Platform, StyleSheet, Text } from "react-native";
// Import DateTimePicker de @react-native-community/datetimepicker
import DateTimePicker from "@react-native-community/datetimepicker";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";
// Import Color de const, para usar las constantes de colores
import { Color } from "../../assets/const/color";

// Definición del componente funcional DatePicker
const DatePicker = ({ label }) => {
    // Estado local para almacenar la fecha seleccionada y controlar la visibilidad del DatePicker
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    // Función para manejar el cambio de fecha seleccionada en el DatePicker
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date; // Si no se selecciona una fecha, se mantiene la actual
        setShow(Platform.OS === "ios"); // Mostrar el DatePicker en iOS
        setDate(currentDate); // Actualizar la fecha seleccionada
    };

    // Función para mostrar el DatePicker
    const showMode = (currentMode) => {
        setShow(true); // Mostrar el DatePicker al establecer show en true
    };

    // Renderizado del componente DatePicker
    return (
        <View style={styles.container}>
            <View style={styles.txtContainer}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <View style={styles.dateContainer}>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
                <View style={styles.labelContainer}>
                    <Text style={styles.dateText}>{date.toDateString()}</Text>
                </View>
                <View style={styles.btnDate}>
                    <Svg
                        width="20"
                        height="20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onPress={showMode}
                    >
                        <Path
                            d="M2 20H16C17.103 20 18 19.103 18 18V4C18 2.897 17.103 2 16 2H14V0H12V2H6V0H4V2H2C0.897 2 0 2.897 0 4V18C0 19.103 0.897 20 2 20ZM13 14H5V12H13V14ZM2 5H16V7H2V5Z"
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
        width: 170, // Ancho del contenedor del texto del label
    },
    txtContainer: {
        display: "flex", // Mostrar como contenedor flexible
        width: 50, // Ancho del contenedor del texto
        alignSelf: "center", // Alineación automática al centro
        textAlign: "left", // Alineación del texto a la izquierda
    },
    container: {
        marginTop: 20, // Margen superior del contenedor principal
        display: "flex", // Mostrar como contenedor flexible
        flexDirection: "row", // Dirección de los elementos en fila
    },
    dateContainer: {
        width: 300, // Ancho del contenedor del DatePicker y botón
        height: 50, // Altura del contenedor del DatePicker y botón
        borderWidth: 1, // Ancho del borde
        borderColor: "#4292F6", // Color del borde
        borderRadius: 8, // Radio de los bordes redondeados
        display: "flex", // Mostrar como contenedor flexible
        flexDirection: "row", // Dirección de los elementos en fila
    },
    label: {
        textAlign: "left", // Alineación del texto a la izquierda
        fontSize: 16, // Tamaño de la fuente
        marginBottom: 10, // Margen inferior del texto
        alignSelf: "center", // Alineación automática al centro
        color: Color.colorfont5, // Color del texto utilizando una constante de color
    },
    dateText: {
        fontFamily: "Poppins-Regular", // Fuente del texto de la fecha
        margin: 10, // Margen del texto de la fecha
        fontSize: 16, // Tamaño de la fuente
        color: Color.colorfont1, // Color del texto utilizando una constante de color
    },
    btnDate: {
        alignSelf: "center", // Alineación automática al centro
        alignItems: "flex-end", // Alineación de los elementos a la derecha
        marginLeft: 100, // Margen izquierdo del botón con ícono
    },
});

// Exporta el componente DatePicker por defecto
export default DatePicker;
