import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ResetButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 317,
        backgroundColor: "#4292F6",
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    buttonText: {
        fontFamily: "Poppins",
        fontSize: 20,
        fontWeight: "SemiBold",
        color: "#ffffff",
    },
});

export default ResetButton;