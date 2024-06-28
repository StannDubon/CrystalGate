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
// Importación del archivo de constantes de colores
import { Color } from "../assets/const/color";
// Importa el componente HeaderForms para el encabezado
import HeaderForms from "./header/headerForms";
// Importa useNavigation para manejar la navegación
import { useNavigation } from '@react-navigation/native';
// Importa el componente InputText para los campos de texto
import InputText from "./input/InputText";
// Importa el componente ComboBox para las listas desplegables
import ComboBox from "./combobox/ComboBox";
// Importa el botón SendButtonForm para enviar el formulario
import SendButtonForm from "./button/button-send-form";
// Importa el componente TextArea para áreas de texto
import TextArea from "./input/textArea";
// Importa el modal de bienvenida
import WelcomeModal from "./modal/welcomeModal";
import SuccessModal from "./modal/alertModal";

const DocumentationRequest = () => {

    // Opciones para el tipo de solicitud
    const resquests_type = ['Document1','Document2','Document3','Document4'];
    // Opciones para el método de envío
    const send_by = ['Scanned','Printed'];
    // Opciones para el idioma del documento
    const languages = ['English','Spanish'];
    // Obtiene la función de navegación desde el hook useNavigation
    const navigation = useNavigation();
    // Estado para controlar la visibilidad del modal de bienvenida
    const [isModalVisible, setModalVisible] = useState(true);
    // Estado para controlar la visibilidad del modal de éxito
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    // Contenido del modal de bienvenida
    const modalContent = "Use this form to request personal documentation from HR. HR will provide the documents the next Wednesday or Friday after you placed the request.";

    // Función para cerrar el modal de bienvenida
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    // Efecto de montaje para mostrar el modal de bienvenida al inicio
    useEffect(() => {
        setModalVisible(true);
    }, []);

    // Función para manejar el envío del formulario
    const handleSend = () => {
        // Muestra el modal de éxito
        setSuccessModalVisible(true);
        setTimeout(() => {
            // Oculta el modal de éxito después de 4 segundos
            setSuccessModalVisible(false);
            // Navega al Dashboard después de ocultar el modal de éxito
            navigation.navigate('Dashboard');
        }, 4000); 
    };

    // Renderizado del componente
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
            <SuccessModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Request sent successfully"} />
        </View>
    );
};

// Estilos para el componente
const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa todo el espacio disponible
        display: "flex",
        flexDirection: "column",
        backgroundColor: Color.colorBackground, // Color de fondo usando una constante de color
    },
    formContainer: {
        paddingBottom: 200, // Espacio adicional en la parte inferior del contenedor
        flex: 1, // Ocupa todo el espacio disponible dentro del contenedor principal
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centra verticalmente los elementos del formulario
        alignItems: "center", // Centra horizontalmente los elementos del formulario
    },  
});

// Exporta el componente DocumentationRequest
export default DocumentationRequest;
