// TimePicker.js
import React, { useState, useEffect } from "react";
import { View, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Svg, { Path } from "react-native-svg";
import { Color } from "../../assets/const/color";
import { format } from "date-fns";

const TimePicker = ({ label, selectedTime, onTimeChange, disabled = false }) => {
    const [time, setTime] = useState(() => {
        // Si no hay tiempo seleccionado, inicializamos con la hora actual.
        const initialTime = selectedTime ? new Date(selectedTime) : new Date();
        return new Date(initialTime.setSeconds(0, 0)); // Eliminar los segundos y milisegundos para precisión
    });
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState("time");

    useEffect(() => {
        if (selectedTime) {
            setTime(new Date(selectedTime));
        }
    }, [selectedTime]);

    const showTimePicker = () => {
        setShow(true);
        setMode("time");
    };

    const onChange = (event, selectedTime) => {
        setShow(Platform.OS === "ios");
        if (selectedTime) {
            const updatedTime = new Date(selectedTime);
            updatedTime.setSeconds(0, 0); // Establecer segundos y milisegundos a cero
            const formattedTime = format(updatedTime, "HH:mm:ss");
            setTime(updatedTime);
            onTimeChange(formattedTime); // Enviar la hora formateada
        }
    };

    const formatTimeDisplay = (time) => format(time, "HH:mm");

    return (
        <View style={styles.container}>
            <View style={styles.txtContainer}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TouchableOpacity
                style={[styles.timeContainer, disabled && styles.disabledContainer]}
                onPress={showTimePicker}
                disabled={disabled}
            >
                <View style={styles.labelContainer}>
                    <Text style={styles.timeText}>{formatTimeDisplay(time)}</Text>
                </View>
                <View style={styles.btnTime}>
                    <Svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9 0C4.122 0 0 4.122 0 9C0 13.878 4.122 18 9 18C13.879 18 18 13.878 18 9C18 4.122 13.879 0 9 0ZM14 10H8V4H10V8H14V10Z" fill="#4292F6" />
                    </Svg>
                </View>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={time}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

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
    timeContainer: {
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
    timeText: {
        fontFamily: "Poppins-Regular",
        margin: 10,
        fontSize: 16,
        color: Color.colorfont1,
    },
    btnTime: {
        alignSelf: "center",
        alignItems: "flex-end",
        marginLeft: 100,
    },
});

export default TimePicker;
