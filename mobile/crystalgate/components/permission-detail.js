/*import React, { useEffect, useState } from "react";
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

const PermissionDetail = () => {

    // Opciones para las listas desplegables
    const [resquestsType,setRequestsType] = useState([]);

    //valores de combo box
    const [selectedType, setSelectedType] = useState("");
    const [selectedSubType, setSelectedSubType] = useState("");


    // Estado para manejar la opción seleccionada y la visibilidad del modal de éxito
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('');

    // Variables para capturar los datos del formulario
    const [permissionDescription, setPermissionDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
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

    
    useEffect(() => {
        loadData();
    },[navigation]);

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
                            onValueChange={changeCategorie}
                            isDisabled={true}
                            />
                <ComboBox   label={"Sub-Permission Type"} 
                            options={subRequestsType} 
                            selectedValue={selectedSubType}
                            onValueChange={changeSubCategorie}
                            placeholder={"Select an option"} 
                            isDisabled={true}
                            ></ComboBox>
                <TextArea   label={"Permission description"}
                            value={permissionDescription}
                            onChangeText={setPermissionDescription}
                            isDisabled={true}
                ></TextArea>
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
            </View>
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
export default PermissionDetail;
*/