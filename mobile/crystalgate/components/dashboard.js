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
import HeaderSingle from "./header/headerSigle";
import FilterButton from "./button/filterButton";
import FilterModal from "./filter/filterModal";

const Dashboard = () => {
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
            <HeaderSingle title={"Hey Climber!"} subtitle={"Dashboard"}/>
            <View style={styles.filterContainer}>
                
            </View>
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
});

export default Dashboard;
