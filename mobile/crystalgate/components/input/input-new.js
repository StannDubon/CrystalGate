import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const NewInputForm = ({ onChangeText, value, placeholder }) => {
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
                    d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2z"
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

export default NewInputForm;
