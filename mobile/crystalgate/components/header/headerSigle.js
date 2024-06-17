import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Color } from "../../assets/const/color";

const HeaderSingle = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <Svg
                width="85"
                height="65"
                viewBox="0 0 227 177"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M187.42 176.944L132.707 88.4718H119.902L93.1279 46.5641L119.902 0L227 176.944H187.42Z"
                    fill="#3F91FD"
                />
                <Path
                    d="M0 176.944L39.5795 111.754L79.4754 176.944H0Z"
                    fill="#3229B1"
                />
                <Path
                    d="M91.9637 176.944L67.5176 138.528H55.8765L39.5791 111.754L67.5176 65.1897L135.036 176.944H91.9637Z"
                    fill="#3452D3"
                />
                <Path
                    d="M135.036 176.944L74.5029 76.8308L93.1286 46.5641L176.944 176.944H135.036Z"
                    fill="#3229B1"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Color.colorHeader,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 0,
        paddingHorizontal: 20,
        width: 390,
        height: 97,
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontWeight: "bold",
        fontSize: 24,
        color: Color.colorfont1,
    },
});

export default HeaderSingle;
