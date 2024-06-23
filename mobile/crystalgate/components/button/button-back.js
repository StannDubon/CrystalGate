import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const BackButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Svg
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M17.557 25.0485L8.27583 16.0874H29V11.9126H8.27583L17.557 2.95154L14.5 0L0 14L14.5 28L17.557 25.0485Z"
                    fill="white"
                />
            </Svg>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({});

export default BackButton;
