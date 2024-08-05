import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ComboBox = ({ options, placeholder, onValueChange, label, selectedValue, isDisabled }) => {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.div}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => onValueChange(itemValue)}
                    style={styles.picker}
                    enabled={!isDisabled}
                >
                    <Picker.Item label={placeholder} value="" />
                    {options.map((option, index) => (
                        <Picker.Item
                            key={index}
                            label={option.label}
                            value={option.value}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        paddingTop: 20,
        textAlign: "left",
        alignItems: "left",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins-Regular",
        fontSize: 20,
        fontWeight: "Medium",
        height: 100,
        width: "auto",
        color: "#98ADE3",
    },
    div: {
        marginTop: 10,
        borderColor: "#4292F6",
        borderWidth: 1.5,
        textAlign: "left",
        alignItems: "left",
        paddingStart: 15,
        borderRadius: 8,
        height: 50,
        width: 337,
    },
    inputLabel: {
        color: "#98ADE3",
    },
    picker: {
        color: "#4292F6",
    },
});

export default ComboBox;
