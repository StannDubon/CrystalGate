import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const StateButton = ({ onPress, icon }) => {
    return (
        <View style={styles.contenedor}>
            <View style={styles.div} onPress={onPress}>
                <Svg
                  width="37"
                  height="37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={styles.btnIcon}
                >
                  <Path
                      d={icon}
                      fill="#4292F6"
                  />
                </Svg>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor:{
        paddingTop: 20,
        fontFamily: "Poppins-Regular",
        fontSize: 20,
        fontWeight: "Medium",
        height: 100,
        with: "auto",
        color: "#98ADE3",
    },  
    div: {
        marginTop: 10,
        borderColor: "#4292F6",
        borderWidth: 1.5,
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 8,
        height: 50,
        width: 100,
        marginHorizontal: 10,
    },
    btnIcon:{
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",
        textAlign: "center",
        alignItems: "center",
        marginTop: 8,
    },
});

export default StateButton;
