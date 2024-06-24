import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color } from "../../assets/const/color";
import BackButtonForm from "../button/button-back-form";
import { useNavigation } from '@react-navigation/native';

const HeaderForms = ({title, href}) => {
    const navigation = useNavigation();
    
    const handleBack = () => {
        // Función para manejar el envío
        navigation.navigate(href);
    };
    return (
        <View style={styles.header}>
            <BackButtonForm onPress={handleBack}/>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Color.colorHeader,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 0,
        paddingHorizontal: 20,
        width: 390,
        height: 97,
    },
    titleContainer:{
        display: "flex",
        flexDirection: "row",
        backgroundColor: Color.colorHeader,
        justifyContent: "flex-start",
        alignItems: "left",
        marginTop: 1,
        paddingHorizontal: 30,
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontWeight: "bold",
        fontSize: 24,
        color: Color.colorfont1,
    },
});

export default HeaderForms;
