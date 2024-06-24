import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const SendButtonForm = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Send</Text>
            <Svg
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M23.2743 10.3427L1.80207 0.121589C1.58585 0.0186756 1.34521 -0.0200846 1.10809 0.00980953C0.870966 0.0397036 0.647091 0.137026 0.462461 0.290474C0.27783 0.443922 0.14002 0.647201 0.0650332 0.876705C-0.00995393 1.10621 -0.0190415 1.35252 0.038826 1.58704L1.56967 7.78231L11.3686 11.499L1.56967 15.2156L0.038826 21.4109C-0.0201303 21.6456 -0.0118012 21.8924 0.0628391 22.1225C0.137479 22.3526 0.275345 22.5564 0.460308 22.7101C0.645271 22.8638 0.869685 22.9611 1.1073 22.9905C1.34491 23.02 1.5859 22.9804 1.80207 22.8763L23.2743 12.6552C23.4912 12.5521 23.6747 12.3885 23.8032 12.1838C23.9318 11.979 24 11.7415 24 11.499C24 11.2564 23.9318 11.0189 23.8032 10.8142C23.6747 10.6094 23.4912 10.4459 23.2743 10.3427Z"
                    fill="white"
                />
            </Svg>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 150,
        backgroundColor: "#4292F6",
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignContent: "space-evenly",
        textAlign: "justify",
        alignSelf: "flex-end",
        marginRight: 25,
    },
    buttonText: {
        fontFamily: "Poppins-Regular",
        fontSize: 20,
        fontWeight: "SemiBold",
        color: "#ffffff",
        marginRight: 30,
    },
});

export default SendButtonForm;
