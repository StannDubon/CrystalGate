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

const PermissionRequest = () => {

    // Opciones para las listas desplegables
    const resquests_type = ['Vacations','Special Permission'];
    const send_by = ['Paternity/Maternity','ISSS'];

    // Estado para manejar la opción seleccionada y la visibilidad del modal de éxito
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('Days');

    // Hook de navegación para gestionar la navegación entre pantallas
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

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
