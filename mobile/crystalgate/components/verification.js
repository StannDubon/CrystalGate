import React from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
} from "react-native";
import Svg, { Path } from "react-native-svg";
// Componente de entrada para el código de verificación
import CheckInputForm from "../components/input/input-check";
// Botón de enviar para enviar el código de verificación
import SendButton from "../components/button/button-send";
// Botón de retroceso para volver a la pantalla anterior
import BackButton from "../components/button/button-back";
// Imagen de fondo para la pantalla de verificación
import BackgroundImage from "../components/background/background-mountain";
// Hook para la navegación entre pantallas
import { useNavigation } from '@react-navigation/native';

// Requiere la imagen de fondo
const fondo = require("../assets/img/background/background.png");

const Verification = () => {
    const [number, onChangeText] = React.useState("");
    const navigation = useNavigation();

    const handleSend = () => {
        // Función para manejar el envío a la pantalla NewPassword
        navigation.navigate('NewPassword');
    };
    const handleBack = () => {
        // Función para manejar el envío a la pantalla PasswordRecovery
        navigation.navigate('PasswordRecovery');
    };

    // Renderizado del componente
    return (
        <View style={styles.container}>
            <BackgroundImage source={fondo}>
                <View style={styles.header}>
                <BackButton onPress={handleBack} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Verification</Text>
                    <Text style={styles.subTitle}>
                    Enter the code we just send to your email 
                    </Text>
                    <View style={styles.form}>
                        <SafeAreaView>
                            <CheckInputForm onChangeText={onChangeText} value={number} placeholder="Code"/>
                        </SafeAreaView>

                        <SendButton onPress={handleSend} />
                    </View>
                </View>
            </BackgroundImage>
        </View>
    );
};

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1, // Flex 1 para ocupar todo el espacio disponible
    },
    header: {
        flex: 0.6, // Flex 0.6 para ajustar el tamaño del encabezado
        justifyContent: "flex-start", // Justificar contenido al inicio
        alignItems: "flex-start", // Alinear elementos al inicio
        marginTop: 35, // Margen superior
        marginLeft: 20, // Margen izquierdo
    },
    content: {
        flex: 1, // Flex 1 para ocupar todo el espacio disponible
    },
    title: {
        fontFamily: "Poppins-Bold", // Fuente en negrita
        fontSize: 32, // Tamaño de fuente
        fontWeight: "bold", // Peso de la fuente
        color: "#4292F6", // Color del texto
        textAlign: "right", // Alineación derecha
        marginRight: 20, // Margen derecho
    },
    subTitle: {
        fontFamily: "Poppins-Regular", // Fuente regular
        fontSize: 20, // Tamaño de fuente
        fontWeight: "Medium", // Peso de la fuente
        color: "#66A0E9", // Color del texto
        textAlign: "right", // Alineación derecha
        marginRight: 20, // Margen derecho
        marginLeft: 20, // Margen izquierdo
        marginTop: 10, // Margen superior
    },
    form: {
        flex: 1, // Flex 1 para ocupar todo el espacio disponible
        justifyContent: "center", // Justificar contenido al centro
        alignItems: "center", // Alinear elementos al centro
    },
});

// Exporta el componente Verification como el predeterminado
export default Verification;