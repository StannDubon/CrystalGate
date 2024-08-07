import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Clipboard,
    Alert,
    Button,
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
import fetchData from "./utils/database";

const PermissionRequest = () => {

    // Opciones para las listas desplegables
    const [resquestsType,setRequestsType] = useState([]);
    const [subRequestsType, setSubRequestsType] = useState([]);

    //Validadores de habilitación
    const [subTypeDisabled, setSubTypeDisabled] = useState(true);
    const [disabledDay, setDisabledDay] = useState(true);
    const [disabledHour, setDisabledHour] = useState(true);

    //valores de combo box
    const [selectedType, setSelectedType] = useState("");
    const [selectedSubType, setSelectedSubType] = useState("");


    // Estado para manejar la opción seleccionada y la visibilidad del modal de éxito
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('');

    // Hook de navegación para gestionar la navegación entre pantallas
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    const loadData = async () =>{
        const result = await fetchData('clasificacion-permiso','readAll');
        if(result.status){
            let requestTypes = [];
            result.dataset.map((item) => {
                requestTypes.push({identifier: item.id_clasificacion_permiso, value: item.clasificacion_permiso});
            });
            setRequestsType(requestTypes);
        }
    }

    const changeCategorie = async (itemValue) =>{
        const formData = new FormData();
        formData.append('idClasificacionPermiso',itemValue);
        const result = await fetchData('tipo-permiso','readAllByCategorie',formData);
        if(result.status){
            setSubTypeDisabled(false);
            let subTypes = [];
            result.dataset.map((item) => {
                subTypes.push({identifier:item.id_tipo_permiso, value:item.tipo_permiso})
            });
            setSubRequestsType(subTypes);
            setSelectedSubType(0);
        }
        else{
            setSubTypeDisabled(true);
            setSelectedSubType(0);
            setSelectedOption("");
            setDisabledDay(true);
            setDisabledHour(true);
        }
        setSelectedType(itemValue);
    }

    const changeSubCategorie = async (itemValue) =>{
        setSelectedSubType(itemValue);
        const formData = new FormData();
        formData.append('idTipoPermiso',itemValue);
        const result = await fetchData('tipo-permiso','getLapso',formData);
        console.log(result);
        if(result.status){
            if(result.dataset.lapso == '1'){
                setSelectedOption("Day");
                setDisabledDay(false);
                setDisabledHour(true);
            }
            else if(result.dataset.lapso == '2'){
                setSelectedOption("Hour");
                setDisabledDay(true);
                setDisabledHour(false);
            }
            else{
                console.log("here");
                setSelectedOption("Day");
                setDisabledDay(false);
                setDisabledHour(false);
            }
        }
        else{
            setSelectedOption("");
            setDisabledDay(true);
            setDisabledHour(true);
        }
    }

    useEffect(() => {
        loadData();
    },[navigation]);

    // Función para manejar el envío del formulario
    const handleSend = () => {
        // Mostrar el modal de éxito
        setSuccessModalVisible(true);

        // Ocultar el modal después de 4 segundos y navegar a la pantalla de Dashboard
        setTimeout(() => {
            setSuccessModalVisible(false);
            navigation.navigate('Dashboard');
        }, 4000); 
    };

    // Función para manejar la selección de archivos
    const handleFileSelect = (file) => {
        // Aquí podrías implementar lógica adicional para manejar el archivo seleccionado
        console.log("Selected File:", file);
    };

    // Renderizado del componente
    return (
        <View style={styles.container}>
            <HeaderForms title={"Permission Request"} href={'Dashboard'}/>
            <View style={styles.formContainer}>
                <Text style={styles.sectionText}>Details</Text>
                <ComboBox   label={"Permission Type"} 
                            options={resquestsType} 
                            selectedValue={selectedType}
                            placeholder={"Select an option"} 
                            onValueChange={changeCategorie}/>
                <ComboBox   label={"Sub-Permission Type"} 
                            options={subRequestsType} 
                            selectedValue={selectedSubType}
                            onValueChange={changeSubCategorie}
                            placeholder={"Select an option"} 
                            isDisabled={subTypeDisabled}
                            ></ComboBox>
                <TextArea label={"Permission description"}></TextArea>
                <SwitchButton   selectedOption={selectedOption} 
                                onSelectOption={setSelectedOption} 
                                disabled1={disabledDay} 
                                disabled2={disabledHour}></SwitchButton>
                <Text style={styles.sectionText}>DATE</Text>
                {
                    selectedOption == "Days" ? 
                    <>
                        <DatePicker label={"From: "}></DatePicker>
                        <DatePicker label={"To: "}></DatePicker>
                    </>
                    : selectedOption == "Hours" ?
                    <>
                        <DatePicker label={"Of: "}></DatePicker>
                        <TimePicker label={"From: "}></TimePicker>
                        <TimePicker label={"To: "}></TimePicker>
                    </>
                    :
                    <>
                    </>
                }
                <FilePicker onSelectFile={handleFileSelect}></FilePicker>
                <SendButtonForm onPress={handleSend}></SendButtonForm>
            </View>
            <SuccessModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Permission sent successfully"} />
        </View>
    );
};

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1, // Flex 1 para ocupar todo el espacio disponible
        display: "flex", // Mostrar como contenedor flexible
        flexDirection: "column", // Dirección de los elementos en columna
        backgroundColor: Color.colorBackground, // Color de fondo definido en la constante Color
    },
    formContainer: {
        paddingBottom: 200, // Espacio adicional en la parte inferior para evitar que los elementos finales se superpongan con el teclado
        flex: 1, // Flex 1 para que ocupe todo el espacio vertical disponible
        display: "flex", // Mostrar como contenedor flexible
        flexDirection: "column", // Dirección de los elementos en columna
        justifyContent: "center", // Centrar verticalmente los elementos hijos
        alignItems: "center", // Centrar horizontalmente los elementos hijos
    },
    sectionText:{
        display: "flex", // Mostrar como contenedor flexible
        alignSelf: "flex-start", // Alinear el texto al inicio del contenedor
        paddingLeft: 30, // Espacio de relleno a la izquierda
        fontFamily: "Poppins-Regular", // Fuente de texto
        color: "#98ADE3", // Color del texto
        paddingTop: 20, // Espacio adicional en la parte superior
    },
});

// Exporta el componente PermissionRequest como el predeterminado
export default PermissionRequest;
