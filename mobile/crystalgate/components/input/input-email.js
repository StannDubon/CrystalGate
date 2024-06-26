import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const EmailInputForm = ({ onChangeText, value, placeholder }) => {
    return (
        <View style={styles.div}>
            <Svg
                width="24"
                height="19"
                viewBox="0 0 24 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M21.6 0H2.4C1.0764 0 0 1.06519 0 2.375V16.625C0 17.9348 1.0764 19 2.4 19H21.6C22.9236 19 24 17.9348 24 16.625V2.375C24 1.06519 22.9236 0 21.6 0ZM21.6 2.375V2.98181L12 10.3716L2.4 2.983V2.375H21.6ZM2.4 16.625V5.98975L11.2632 12.8119C11.4733 12.9753 11.7328 13.0641 12 13.0641C12.2672 13.0641 12.5267 12.9753 12.7368 12.8119L21.6 5.98975L21.6024 16.625H2.4Z"
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

export default EmailInputForm;
