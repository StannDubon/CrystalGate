import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
} from "react-native";
// Importación del archivo de constantes de colores
import { Color } from "../assets/const/color";
// Encabezado para formularios en la aplicación
import HeaderForms from "./header/headerForms";
// Hook para la navegación entre pantallas
import { useNavigation } from '@react-navigation/native';
// Componente de entrada de texto genérico
import InputText from "./input/InputText";
// Componente de cuadro combinado para selección
import ComboBox from "./combobox/ComboBox";
// Botón para enviar formularios
import SendButtonForm from "./button/button-send-form";
// Área de texto para formularios
import TextArea from "./input/textArea";
// Botón de interruptor para selección
import SwitchButton from "./button/switchButton";
// Selector de fecha para formularios
import DatePicker from "./pickers/datePicker";
// Selector de tiempo para formularios
import TimePicker from "./pickers/timePicker";
// Selector de archivo para formularios
import FilePicker from "./pickers/filePicker";
import SuccessModal from "./modal/alertModal";
import fetchData from './utils/database';

const PermissionRequest = () => {
    const [permissionClassification, setPermissionClassification] = useState([]);
    const [permissionTypes, setPermissionTypes] = useState([]);
    const [selectedPermissionClassification, setSelectedPermissionClassification] = useState("");
    const [selectedPermissionType, setSelectedPermissionType] = useState("");
    const [selectedOption, setSelectedOption] = useState('Days');
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        const loadPermissionClassification = async () => {
            try {
                const ClassificationResult = await fetchData('clasificacion-permiso', 'readAll');
                if (ClassificationResult.status) {
                    let narray = [];
                    ClassificationResult.dataset.map((item) => {
                        narray.push({ identifier: item.id_clasificacion_permiso, value: item.clasificacion_permiso });
                    });
                    setPermissionClassification(narray);
                }
            } catch (error) {
                Alert.alert("Fetch Error", error.message || "An error occurred while fetching data");
            }
        };

        loadPermissionClassification();
    }, [navigation]);

    useEffect(() => {
        const loadPermissionTypes = async () => {
            //console.log("id del tipo de permiso "+selectedPermissionClassification);
            const FORM = new FormData();
            FORM.append("idClasificacionPermiso", selectedPermissionClassification);
            try {
                const TypeResult = await fetchData('tipo-permiso', 'readLike', FORM);
                //console.log("TypeResult:", TypeResult); // Verifica la respuesta del fetchData
    
                if (TypeResult.status) {
                    let narray = [];
                    TypeResult.dataset.map((item) => {
                        narray.push({ identifier: item.id_tipo_permiso, value: item.tipo_permiso });
                    });
                    setPermissionTypes(narray);
                } else {
                    console.error("Failed to load permission types.");
                }
            } catch (error) {
                Alert.alert("Fetch Error", error.message || "An error occurred while fetching data");
            }
        };
    
        loadPermissionTypes();
    }, [selectedPermissionClassification]);
    

    const handleSend = () => {
        setSuccessModalVisible(true);
        setTimeout(() => {
            setSuccessModalVisible(false);
            navigation.navigate('Dashboard');
        }, 4000); 
    };

    const handleFileSelect = (file) => {
        console.log("Selected File:", file);
    };

    return (
        <View style={styles.container}>
            <HeaderForms title={"Permission Request"} href={'Dashboard'}/>
            <View style={styles.formContainer}>
                <Text style={styles.sectionText}>Details</Text>
                <ComboBox 
                    label={"Permission Type"} 
                    options={permissionClassification}
                    placeholder={"Select an option"}
                    selectedValue={selectedPermissionClassification}
                    onValueChange={setSelectedPermissionClassification}
                    isDisabled={false}
                />
                <ComboBox 
                    label={"Sub-Permission Type"} 
                    options={permissionTypes}
                    placeholder={"Select an option"}
                    selectedValue={selectedPermissionType}
                    onValueChange={setSelectedPermissionType}
                    isDisabled={false}
                />
                <TextArea label={"Permission description"} />
                <SwitchButton selectedOption={selectedOption} onSelectOption={setSelectedOption} />
                <Text style={styles.sectionText}>DATE</Text>
                {
                    selectedOption === "Days" ? 
                    <>
                        <DatePicker label={"From: "} />
                        <DatePicker label={"To: "} />
                    </>
                    :
                    <>
                        <DatePicker label={"Of: "} />
                        <TimePicker label={"From: "} />
                        <TimePicker label={"To: "} />
                    </>
                }
                <FilePicker onSelectFile={handleFileSelect} />
                <SendButtonForm onPress={handleSend} />
            </View>
            <SuccessModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Permission sent successfully"} />
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
    sectionText: {
        display: "flex",
        alignSelf: "flex-start",
        paddingLeft: 30,
        fontFamily: "Poppins-Regular",
        color: "#98ADE3",
        paddingTop: 20,
    },
});

export default PermissionRequest;
