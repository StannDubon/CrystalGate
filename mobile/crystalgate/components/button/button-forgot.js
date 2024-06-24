import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ForgotButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Forgot Password?</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    forgotPassword: {
        color: '#4292F6',
        marginLeft: 'auto',
        marginBottom: 20,
        fontFamily: 'Poppins-Regular'
    },
});
export default ForgotButton;