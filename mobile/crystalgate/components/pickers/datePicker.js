// DatePicker.js
import React, { useState, useEffect } from "react";
import { View, Button, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
// Import DateTimePicker de @react-native-community/datetimepicker
import DateTimePicker from "@react-native-community/datetimepicker";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";
// Import Color de const, para usar las constantes de colores
import { Color } from "../../assets/const/color";



// Definición del componente funcional DatePicker
const DatePicker = ({ label, selectedDateTime, onDateTimeChange, disabled = false}) => {
    // Estado local para almacenar la fecha seleccionada y controlar la visibilidad del DatePicker
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    useEffect(() => {
        if (selectedDateTime) {
            setDate(new Date(selectedDateTime));
        }
    }, [selectedDateTime]);

    // Calcula las fechas mínima y máxima
    const minimumDate = new Date();
    minimumDate.setDate(minimumDate.getDate() + 1); // Un día después de la fecha actual

    const maximumDate = new Date();
    maximumDate.setMonth(maximumDate.getMonth() + 3); // Tres meses después de la fecha actual

    // Función para manejar el cambio de fecha seleccionada en el DatePicker
    const onChange = (event, selectedDateTime) => {
        
        setShow(!show);
        if(event.type == 'set' && selectedDateTime){
            const currentDate = selectedDateTime || date;
            setShow(Platform.OS === "ios");
            setDate(currentDate);
            onDateTimeChange(currentDate.toISOString().replace('T', ' ').substring(0, 19)); // Formato YYYY-MM-DD HH:mm:ss
        }
    };

    // Función para mostrar el DatePicker
    const showMode = (currentMode) => {
        setShow(true); // Mostrar el DatePicker al establecer show en true
        setMode(currentMode);
    };

    // Renderizado del componente DatePicker
    return (
        <View style={styles.container}>
            <View style={styles.txtContainer}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TouchableOpacity
                style={[styles.dateContainer, disabled && styles.disabledContainer]}
                onPress={showMode}
                disabled={disabled}
            >
                <View style={styles.labelContainer}>
                    <Text style={styles.dateText}>{date.toDateString()}</Text>
                </View>
                <View style={styles.btnDate}>
                    <Svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M2 20H16C17.103 20 18 19.103 18 18V4C18 2.897 17.103 2 16 2H14V0H12V2H6V0H4V2H2C0.897 2 0 2.897 0 4V18C0 19.103 0.897 20 2 20ZM13 14H5V12H13V14ZM2 5H16V7H2V5Z" fill="#4292F6" />
                    </Svg>
                </View>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                />
            )}
        </View>
    );
};

// Estilos del componente utilizando StyleSheet.create
const styles = StyleSheet.create({
    labelContainer: {
        width: 170,
    },
    txtContainer: {
        display: "flex",
        width: 50,
        alignSelf: "center",
        textAlign: "left",
    },
    container: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
    },
    dateContainer: {
        width: 300,
        height: 50,
        borderWidth: 1,
        borderColor: "#4292F6",
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    disabledContainer: {
        backgroundColor: "#f0f0f0",
        borderColor: "#d0d0d0",
    },
    label: {
        textAlign: "left",
        fontSize: 16,
        marginBottom: 10,
        alignSelf: "center",
        color: Color.colorfont5,
    },
    dateText: {
        fontFamily: "Poppins-Regular",
        margin: 10,
        fontSize: 16,
        color: Color.colorfont1,
    },
    btnDate: {
        alignSelf: "center",
        alignItems: "flex-end",
        marginLeft: 100,
    },
});

// Exporta el componente DatePicker por defecto
export default DatePicker;
