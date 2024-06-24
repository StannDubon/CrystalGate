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
import { Color } from "../assets/const/color";
import HeaderForms from "./header/headerForms";
import { useNavigation } from '@react-navigation/native';
import InputText from "./input/InputText";
import ComboBox from "./combobox/ComboBox";
import SendButtonForm from "./button/button-send-form";
import TextArea from "./input/textArea";

const DocumentationRequest = () => {

    const resquests_type = ['Document1','Document2','Document3','Document4'];
    const send_by = ['Virtual','Presencial'];
    const languages = ['English','Spanish'];
    const navigation = useNavigation();

    const handleSend = () => {
        // Función para manejar el envío
        navigation.navigate('Dashboard');
    };

    return (
        <View style={styles.container}>
            <HeaderForms title={"Documentation Request"} href={'Dashboard'}/>
            <View style={styles.formContainer}>
                <ComboBox label={"REQUEST TYPE"} options={resquests_type} placeholder={"Select an option"}></ComboBox>
                <ComboBox label={"SEND BY"} options={send_by} placeholder={"Select an option"}></ComboBox>
                <ComboBox label={"DOCUMENT LANGUAGE"} options={languages} placeholder={"Select an option"}></ComboBox>
                <InputText label={"YOUR NAME"}></InputText>
                <InputText label={"EMAIL"}></InputText>
                <InputText label={"PHONE NUMBER"}></InputText>
                <TextArea label={"ADDRESS"}></TextArea>
                <SendButtonForm onPress={handleSend}></SendButtonForm>
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
    formContainer: {
        paddingBottom: 200,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },  
});

export default DocumentationRequest;
