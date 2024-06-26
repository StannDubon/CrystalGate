import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Color } from "../../assets/const/color";

const StateButton = ({ icon, defaultSvgColor, selectedSvgColor, defaultBgColor, selectedBgColor }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handlePress = () => {
        setIsSelected(!isSelected);
    };

    return (
        <View style={styles.contenedor}>
        <TouchableOpacity onPress={handlePress} style={[styles.div, { backgroundColor: isSelected ? selectedBgColor : defaultBgColor, borderColor: isSelected ? Color.colorBtnIcon3 : Color.colorBtnAction }]}>
            <Svg
              width="37"
              height="37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={styles.btnIcon}
            >
              <Path
                  d={icon}
                  fill={isSelected ? selectedSvgColor : defaultSvgColor}
              />
            </Svg>
        </TouchableOpacity>
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
    }, 
    div: {
        marginTop: 10,
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
