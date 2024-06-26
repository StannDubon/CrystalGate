import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

const InputText = ({ onChangeText, value, label }) => {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.div}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor:{
        paddingTop: 20,
        textAlign: "left",
        alignItems: "left",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins-Regular",
        fontSize: 20,
        fontWeight: "Medium",
        height: 100,
        with: "auto",
        color: "#98ADE3",
    },  
    div: {
        marginTop: 10,
        borderColor: "#4292F6",
        borderWidth: 1.5,
        textAlign: "left",
        alignItems: "left",
        borderRadius: 8,
        height: 50,
        width: 337,

    },
    input: {
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        fontWeight: "Regular",
        color: "#4292F6",
        paddingLeft: 15,
        alignContent: "flex-end",
        width: 290,
        height: 40,
    },
    inputLabel: {
        color: "#98ADE3",
    },  
});

export default InputText;
