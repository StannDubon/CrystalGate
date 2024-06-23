import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const InputText = ({ onChangeText, value, placeholder }) => {
    return (
        <View style={styles.div}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={"#4292F6"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    div: {
        display: "flex",
        flexDirection: "row",
        fontFamily: "Poppins-Regular",
        fontSize: 20,
        fontWeight: "Medium",
        marginTop: 40,
        borderColor: "#4292F6",
        borderWidth: 1.5,
        textAlign: "center",
        alignItems: "center",
        paddingStart: 15,
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
});

export default EmailInputForm;
