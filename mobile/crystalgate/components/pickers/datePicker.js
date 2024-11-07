// DatePicker.js
import React, { useState, useEffect } from "react";
import { View, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Svg, { Path } from "react-native-svg";
import { Color } from "../../assets/const/color";
import { format } from "date-fns";

const DatePicker = ({ label, selectedDateTime, onDateChange, disabled = false, minDate, maxDate }) => {
    const [date, setDate] = useState(selectedDateTime ? new Date(selectedDateTime) : new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState("date");

    useEffect(() => {
        setDate(new Date(selectedDateTime));
    }, [selectedDateTime]);

    const minimumDate = minDate ? new Date(minDate) : (() => {
        const defaultMinDate = new Date();
        defaultMinDate.setMonth(defaultMinDate.getMonth() - 3);
        return defaultMinDate;
    })();

    const maximumDate = maxDate ? new Date(maxDate) : (() => {
        const defaultMaxDate = new Date();
        defaultMaxDate.setMonth(defaultMaxDate.getMonth() + 4);
        return defaultMaxDate;
    })();

    const showDatePicker = () => {
        setShow(true);
        setMode("date");
    };

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === "ios");
        if (selectedDate) {
            const formattedDate = format(selectedDate, "yyyy-MM-dd HH:mm:ss");
            setDate(selectedDate);
            onDateChange(formattedDate); // Cambia el estado y envía la fecha formateada
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.txtContainer}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TouchableOpacity
                style={[styles.dateContainer, disabled && styles.disabledContainer]}
                onPress={showDatePicker}
                disabled={disabled}
            >
                <View style={styles.labelContainer}>
                    <Text style={styles.dateText}>{format(date, "yyyy-MM-dd")}</Text>
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
                    mode={mode}
                    display="default"
                    onChange={onChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
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

export default DatePicker;
