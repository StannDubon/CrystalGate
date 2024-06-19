import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const BackLogInButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    loginButton: {
        marginTop: 20,
    },
    loginButtonText: {
        fontFamily: "Poppins",
        fontSize: 16,
        fontWeight: "Medium",
        color: "#007bff",
        textAlign: "center",
    },
});

export default BackLogInButton;