import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const BackgroundImage = ({ source, children }) => {
    return (
        <ImageBackground
            source={source}
            resizeMode={"cover"}
            style={styles.background}
        >
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

export default BackgroundImage;
