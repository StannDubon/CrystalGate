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
import SwitchButton from "./button/switchButton";
import DatePicker from "./pickers/datePicker";
import TimePicker from "./pickers/timePicker";
import FilePicker from "./pickers/filePicker";

const PermissionRequest = () => {

    const resquests_type = ['Vacations','Special Permission'];
    const send_by = ['Paternity/Maternity','ISSS'];
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('Days');


    const handleSend = () => {
        // Función para manejar el envío
        navigation.navigate('Dashboard');
    };

    const handleFileSelect = (file) => {
      console.log("Selected File:", file);
      // Aquí puedes manejar el archivo seleccionado, por ejemplo, guardarlo o procesarlo
    };

    return (
        <View style={styles.container}>
            <HeaderForms title={"Permission Request"} href={'Dashboard'}/>
            <View style={styles.formContainer}>
                <Text style={styles.sectionText}>Details</Text>
                <ComboBox label={"Permission Type"} options={resquests_type} placeholder={"Select an option"}></ComboBox>
                <ComboBox label={"Sub-Permission Type"} options={send_by} placeholder={"Select an option"}></ComboBox>
                <TextArea label={"Permission description"}></TextArea>
                <SwitchButton selectedOption={selectedOption} onSelectOption={setSelectedOption}></SwitchButton>
                <Text style={styles.sectionText}>DATE</Text>
                {
                    selectedOption == "Days" ? 
                    <>
                        <DatePicker label={"From: "}></DatePicker>
                        <DatePicker label={"To: "}></DatePicker>
                    </>
                    :
                    <>
                        <DatePicker label={"Of: "}></DatePicker>
                        <TimePicker label={"From: "}></TimePicker>
                        <TimePicker label={"To: "}></TimePicker>
                    </>
                }
                <FilePicker onSelectFile={handleFileSelect}></FilePicker>
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
    sectionText:{
        display: "flex",
        alignSelf: "flex-start",
        paddingLeft: 30,
        fontFamily: "Poppins-Regular",
        color: "#98ADE3",
        paddingTop: 20,
    },
});

export default PermissionRequest;
