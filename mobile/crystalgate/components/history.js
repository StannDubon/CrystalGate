import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Clipboard,
    Alert,
    Button,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Color } from "../assets/const/color";
import HeaderSingle from "../components/header/headerSigle";
import FilterButton from "../components/button/filterButton";
import FilterModal from "../components/filter/filterModal";

const History = () => {
    const email = "cm.climber@glassmouantainbbo.com";
    const [visible, setVisible] = useState(false);

    const toggleWidget = () => {
        setVisible(!visible);
    };


    const copyToClipboard = (text) => {
        Clipboard.setString(text);
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
    };

    return (
        <View style={styles.container}>
            <HeaderSingle title={"Your Journey"} subtitle={"History"}/>
            <View style={styles.filterContainer}>
                <FilterButton onPress={toggleWidget}></FilterButton>
            </View>
            <FilterModal visible={visible} setVisible={setVisible} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: Color.colorBackground,
    },
    filterButton:{
        backgroundColor: "#D9E4FF",
        borderCurve: 3,
    },
    filterContainer:{
        display: "flex",
        alignItems: "flex-start",
    },
    filterText:{
        fontSize: 13,
        color: "#4292F6",
    }
});

export default History;
