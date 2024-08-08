import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl
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
    const [requestsType, setRequestsType] = useState([]);
    const [deliverCenters, setDeliverCenters] = useState([]);
    const [sendBy, setSendBy] = useState([
        { identifier: true, value: 'presencial' },
        { identifier: false, value: 'virtual' }
    ]);
    const [languages, setLanguages] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [selectedRequestType, setSelectedRequestType] = useState("");
    const [selectedSendBy, setSelectedSendBy] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedDeliverCenter, setSelectedDeliverCenter] = useState("");
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(true);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const modalContent = "Use this form to request personal documentation from HR. HR will provide the documents the next Wednesday or Friday after you placed the request.";
    const [modalError, setModalError] = useState("");
    const [isErrorVisible, setErrorVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const getDateTime = () => {
        const date = new Date();
      
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

    const handleSend = async () => {

        // Crear un nuevo FormData
        const formData = new FormData();

        // Agregar los campos necesarios al FormData
        formData.append('nombreEntrega', name);
        formData.append('emailEntrega', email);
        formData.append('telefonoContacto', phone);
        formData.append('direccionPeticion', address);
        formData.append('idTipoPeticion', selectedRequestType);
        formData.append('modoEntrega', selectedSendBy);
        formData.append('idIdioma', selectedLanguage);
        formData.append('EstadoPeticion','1');
        formData.append('fechaEnvio',getDateTime());
        formData.append('idCentroEntrega',selectedDeliverCenter);

        console.log(selectedLanguage);
        console.log(selectedDeliverCenter);
        console.log(address);
        console.log(selectedSendBy);
        console.log(name);
        console.log(email);
        console.log(phone);


        const result = await fetchData('peticion','createRow',formData);
        console.log(result);
        if(result.status){
            setSuccessModalVisible(true);
            setTimeout(() => {
              setSuccessModalVisible(false);
              navigation.navigate('Dashboard');
            }, 3000);
        }
        else{
            setModalError(result.error);
            setErrorVisible(true);
        }

    };

    const loadData = async () => {
        try {
            const requestTypeResult = await fetchData('tipo-peticion', 'readAll');
            if (requestTypeResult.status) {
                let narray = [];
                requestTypeResult.dataset.map((item) => {
                    narray.push({ identifier: item.id_tipo_peticion, value: item.tipo_peticion });
                });
                setRequestsType(narray);
            }

            const languagesResult = await fetchData('idioma', 'readAll');
            if (languagesResult.status) {
                let langArray = [];
                languagesResult.dataset.map((item) => {
                    langArray.push({ identifier: item.id_idioma, value: item.idioma });
                });
                setLanguages(langArray);
            }

            const centersResult = await fetchData('centro-entrega','readAll');
            if(centersResult.status){
                let centerArray = [];
                centersResult.dataset.map((item) =>{
                    centerArray.push({ identifier: item.id_centro_entrega, value: item.centro_entrega });
                });
                setDeliverCenters(centerArray);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        loadData();
        resetFields();
    }, [navigation]);

    const resetFields = () => {
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setSelectedRequestType("");
        setSelectedSendBy("");
        setSelectedLanguage("");
        setSelectedDeliverCenter("");
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadData().then(() => setRefreshing(false));
    }, []);

    const isDisabled =
        !name ||
        !email ||
        !phone ||
        !address ||
        !selectedRequestType ||
        !selectedSendBy ||
        !selectedLanguage;

    return (
        <View style={styles.container}>
            <HeaderForms title={"Documentation Request"} href={'Dashboard'} />
            <ScrollView
                contentContainerStyle={styles.formContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <ComboBox
                    label={"REQUEST TYPE"}
                    options={requestsType}
                    placeholder={"Select an option"}
                    selectedValue={selectedRequestType}
                    onValueChange={setSelectedRequestType}
                    isDisabled={false}
                />
                <ComboBox
                    label={"SEND BY"}
                    options={sendBy}
                    placeholder={"Select an option"}
                    selectedValue={selectedSendBy}
                    onValueChange={setSelectedSendBy}
                    isDisabled={false}
                />
                <ComboBox
                    label={"DOCUMENT LANGUAGE"}
                    options={languages}
                    placeholder={"Select an option"}
                    selectedValue={selectedLanguage}
                    onValueChange={setSelectedLanguage}
                    isDisabled={false}
                />
                <ComboBox
                    label={"DELIVERY CENTER"}
                    options={deliverCenters}
                    placeholder={"Select an option"}
                    selectedValue={selectedDeliverCenter}
                    onValueChange={setSelectedDeliverCenter}
                    isDisabled={false}
                />
                <InputText label={"YOUR NAME"} value={name} onChangeText={setName} />
                <InputText label={"EMAIL"} value={email} onChangeText={setEmail} />
                <InputText label={"PHONE NUMBER"} value={phone} onChangeText={setPhone} />
                <TextArea label={"ADDRESS"} value={address} onChangeText={setAddress} />
                <SendButtonForm onPress={handleSend} isDisabled={isDisabled} />
            </ScrollView>
            <WelcomeModal visible={isModalVisible} onClose={handleCloseModal} title={"Documentation Request"} content={modalContent} />
            <SuccessModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Request sent successfully"} />
            <SuccessModal visible={isErrorVisible} onClose={() => setErrorVisible(false)} content={modalError} type={2}/>
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
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default DocumentationRequest;
