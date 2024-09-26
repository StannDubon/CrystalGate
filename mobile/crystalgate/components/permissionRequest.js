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
import { useFocusEffect } from '@react-navigation/native';

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

    // Variables para capturar los datos del formulario
    const [permissionDescription, setPermissionDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    
    useFocusEffect(
        React.useCallback(() => {
            // Esta función se ejecutará cada vez que el componente esté enfocado
            loadData(); // Llamar a tu función para cargar datos
    
            // Restablecer los valores del formulario y otros estados
            setSelectedType("");
            setSelectedSubType("");
            setPermissionDescription("");
            setSelectedFile(null);
            setStartDate(new Date());
            setEndDate(new Date());
            setStartTime(new Date());
            setEndTime(new Date());
            setSelectedOption("");
            setSubTypeDisabled(true);
            setDisabledDay(true);
            setDisabledHour(true);
    
            // Limpiar cuando el componente pierde el enfoque
            return () => {
                // Opcional: puedes agregar lógica de limpieza aquí si es necesario
            };
        }, [])
    );
    

    const isDisabledSend =
        !selectedType ||
        !selectedSubType ||
        permissionDescription === "" ||
        selectedFile == null ||
        !startDate ||
        !selectedOption ||
        (selectedOption == 'Days' ?
            !endDate
            :
            !startTime ||
            !endTime ||
            endTime<=startTime
        ) ;

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
        setStartDate(getDateTime());
        setEndDate(getDateTime());
        setStartTime(getDateTime());
        setEndTime(getDateTime());
    },[navigation]);

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

    // Función para manejar el envío del formulario
    const handleSend = async () => {
        const formData = new FormData();

        formData.append('idTipoPermiso', selectedSubType);
        formData.append('descripcionPermiso', permissionDescription);
        if (selectedOption == "Days") {
            formData.append('fechaInicio', startDate);
            formData.append('fechaFinal', endDate);
        } else if (selectedOption == "Hours") {
            formData.append('fechaInicio', `${startTime}`);
            formData.append('fechaFinal', `${endTime}`);

        }
        formData.append('fechaEnvio',getDateTime());
        formData.append('estado','1');

        if (selectedFile && selectedFile.assets && selectedFile.assets.length > 0) {
            formData.append('documentoPermiso', {
                uri: selectedFile.assets[0].uri,
                name: selectedFile.assets[0].name,
                type: selectedFile.assets[0].mimeType
            });
        }

        console.log(formData.getAll("documentoPermiso"));

        // Enviar los datos al servicio
        const result = await fetchData('permiso', 'createRow', formData, true);

        // Manejar la respuesta del servicio
        if (result.status) {
            // Mostrar el modal de éxito
            setSuccessModalVisible(true);

            // Ocultar el modal después de 4 segundos y navegar a la pantalla de Dashboard
            setTimeout(() => {
                setSuccessModalVisible(false);
                navigation.navigate('Dashboard');
            }, 4000);
        } else {
            // Manejo de errores
            Alert.alert("Error", "No se pudo enviar la solicitud");
        }
    };

    // Función para manejar la selección de archivos
    const handleFileSelect = (file) => {
        setSelectedFile(file);
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
                <TextArea   label={"Permission description"}
                            value={permissionDescription}
                            onChangeText={setPermissionDescription}
                ></TextArea>
                <SwitchButton   selectedOption={selectedOption} 
                                onSelectOption={setSelectedOption} 
                                disabled1={disabledDay} 
                                disabled2={disabledHour}></SwitchButton>
                <Text style={styles.sectionText}>DATE</Text>
                {
                    selectedOption == "Days" ? 
                    <>
                        <DatePicker label={"From: "}
                                    selectedDateTime={startDate}
                                    onDateChange={setStartDate}></DatePicker>
                        <DatePicker label={"To: "}
                                    selectedDateTime={endDate}
                                    onDateChange={setEndDate}></DatePicker>
                    </>
                    : selectedOption == "Hours" ?
                    <>
                        <DatePicker label={"Of: "}
                                    selectedDateTime={startDate}
                                    onDateChange={setStartDate}></DatePicker>
                        <TimePicker label={"From: "}
                                    date={startDate}
                                    disabled={false}
                                    onTimeChange={setStartTime}></TimePicker>
                        <TimePicker label={"To: "}
                                    date={startDate}
                                    disabled={false}
                                    onTimeChange={setEndTime}></TimePicker>
                    </>
                    :
                    <>
                    </>
                }
                <FilePicker onSelectFile={handleFileSelect}></FilePicker>
                <Text style={styles.sectionText}>{(selectedFile == null ? "":selectedFile.assets[0].name)}</Text>
                <SendButtonForm onPress={handleSend} isDisabled={isDisabledSend}></SendButtonForm>
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
