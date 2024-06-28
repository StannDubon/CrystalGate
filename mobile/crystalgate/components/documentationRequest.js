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
import SuccessModal from "./modal/alertModal";
import fetchData from './utils/database';

const DocumentationRequest = () => {
    const [resquests_type, setRequestsType] = useState([]);
    const [send_by, setSendBy] = useState(['Presencial','Scanned']);
    const [languages, setLanguages] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(true);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const modalContent = "Use this form to request personal documentation from HR. HR will provide the documents the next Wednesday or Friday after you placed the request.";

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSend = () => {
        setSuccessModalVisible(true);
        setTimeout(() => {
            setSuccessModalVisible(false);
            navigation.navigate('Dashboard');
        }, 4000); 
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const requestTypeResult = await fetchData('tipo-peticion', 'readAll');
                if(requestTypeResult.status){
                    setRequestsType([]);
                    let narray = [];
                    requestTypeResult.dataset.map((item) => {
                        narray.push(item.tipo_peticion);
                    });
                    setRequestsType(narray);
                }

                const languagesResult = await fetchData('idioma', 'readAll');
                if(languagesResult.status){

                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        const resetFields = () => {
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
        };

        loadData();
        resetFields();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <HeaderForms title={"Documentation Request"} href={'Dashboard'} />
            <View style={styles.formContainer}>
                <ComboBox label={"REQUEST TYPE"} options={resquests_type} placeholder={"Select an option"} />
                <ComboBox label={"SEND BY"} options={send_by} placeholder={"Select an option"} />
                <ComboBox label={"DOCUMENT LANGUAGE"} options={languages} placeholder={"Select an option"} />
                <InputText label={"YOUR NAME"} value={name} onChangeText={setName} />
                <InputText label={"EMAIL"} value={email} onChangeText={setEmail} />
                <InputText label={"PHONE NUMBER"} value={phone} onChangeText={setPhone} />
                <TextArea label={"ADDRESS"} value={address} onChangeText={setAddress} />
                <SendButtonForm onPress={handleSend} />
            </View>
            <WelcomeModal visible={isModalVisible} onClose={handleCloseModal} title={"Documentation Request"} content={modalContent} />
            <SuccessModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Request sent successfully"} />
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
