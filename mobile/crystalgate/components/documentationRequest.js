import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Button,
    Animated,
} from "react-native";
import { Color } from "../assets/const/color";
import HeaderForms from "./header/headerForms";
import { useNavigation } from '@react-navigation/native';
import InputText from "./input/InputText";
import ComboBox from "./combobox/ComboBox";
import SendButtonForm from "./button/button-send-form";
import TextArea from "./input/textArea";
import WelcomeModal from "./modal/welcomeModal";

const DocumentationRequest = () => {

    const resquests_type = ['Document1','Document2','Document3','Document4'];
    const send_by = ['Virtual','Presencial'];
    const languages = ['English','Spanish'];
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(true);
    const modalContent = "Use this form to request personal documentation from HR. HR will provide the documents the next Wednesday or Friday after you placed the request.";

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        setModalVisible(true);
    }, []);

    const handleSend = () => {
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
            <WelcomeModal visible={isModalVisible} onClose={handleCloseModal} title={"Documentation Request"} content={modalContent}/>
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
