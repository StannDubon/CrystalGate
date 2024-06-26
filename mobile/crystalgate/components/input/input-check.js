import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const CheckInputForm = ({ onChangeText, value, placeholder }) => {
    return (
        <View style={styles.div}>
            <Svg
                width="25"
                height="19"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                
            >
                <Path
                    d="M4.707 8.293L1.414 5L0 6.414L4.707 11.121L14.414 1.414L13 0L4.707 8.293Z"
                    fill="#4292F6"
                />
            </Svg>

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={"#4292F6"}
                keyboardType="numeric"
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

export default CheckInputForm;
