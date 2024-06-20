import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const BackLogInButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Back to Log In</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    loginButton: {
        marginBotton: 20,
    },
    loginButtonText: {
        fontFamily: "Poppins",
        fontSize: 16,
        fontWeight: "Medium",
        color: "#66A0E9",
        textAlign: "center",
    },

});

export default BackLogInButton;