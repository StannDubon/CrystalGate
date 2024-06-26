import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const UsernameInputForm = ({ onChangeText, value, placeholder }) => {
    return (
        <View style={styles.div}>
            <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg" 
            >
                <Path
                    d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
                    fill="#4292F6"
                />
            </Svg>

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

export default UsernameInputForm;