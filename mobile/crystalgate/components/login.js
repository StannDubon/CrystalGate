import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import BackgroundImage from "../components/background/background-mountain"; // Asegúrate de ajustar la ruta si es necesario
import UsernameInputForm from "./input/input-username";
import PasswordInputForm from "./input/input-password";
import LoginButton from "./button/button-login";
import ForgotButton from "./button/button-forgot";
import { useNavigation } from "@react-navigation/native";
import SuccessModal from "./modal/succesModal";

// Importa la imagen de fondo
const fondo = require("../assets/img/background/background.png");

// Definimos el componente funcional Login
const Login = () => {
    // Definición de los estados del componente
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const navigation = useNavigation();

    // Maneja el evento de enviar y navega a la pantalla "Navigation"
    const handleSendNav = () => {
        // Muestra el modal de éxito
        setSuccessModalVisible(true);
        setTimeout(() => {
            // Oculta el modal de éxito
            setSuccessModalVisible(false);
            // Navega a la pantalla "Navigation"
            navigation.navigate("Navigation");
        }, 3000); // Espera 3 segundos antes de navegar
    };

    // Maneja el evento de enviar y navega a la pantalla "PasswordRecovery"
    const handleSendPas = () => {
        // Navega a la pantalla "PasswordRecovery"
        navigation.navigate("PasswordRecovery");
    };

    // Renderizado del componente
    return (
        <View style={styles.container}>
            <BackgroundImage source={fondo}>
                <View style={styles.header}></View>
                <View style={styles.content}>
                    <Text style={styles.title}>Hey Climber!</Text>
                    <Text style={styles.subTitle}>Welcome Back</Text>
                    <View style={styles.form}>
                        <SafeAreaView>
                            <UsernameInputForm
                                onChangeText={setUsername}
                                value={username}
                                placeholder="Username"
                            />
                        </SafeAreaView>
                        <SafeAreaView>
                            <PasswordInputForm
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                        </SafeAreaView>
                        <View style={styles.ContentButton}>
                            <ForgotButton onPress={handleSendPas} />
                        </View>
                    </View>
                    <View style={styles.ContentButton}>
                        <LoginButton onPress={handleSendNav} />
                    </View>
                </View>
            </BackgroundImage>
            <SuccessModal
                visible={isSuccessModalVisible}
                onClose={() => setSuccessModalVisible(false)}
                content={"Log In successfully"}
            />
        </View>
    );
};

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1, // El contenedor ocupa todo el espacio disponible
    },
    header: {
        flex: 0.6, // Ocupa el 60% del espacio disponible
        justifyContent: "flex-start", // Alinea el contenido al inicio en el eje vertical
        alignItems: "flex-start", // Alinea el contenido al inicio en el eje horizontal
        marginTop: 35, // Margen superior
        marginLeft: 20, // Margen izquierdo
    },
    content: {
        flex: 1, // Ocupa todo el espacio restante
    },
    title: {
        fontFamily: "Poppins-Bold", // Fuente Poppins en negrita
        fontSize: 32, // Tamaño de fuente
        fontWeight: "bold", // Peso de fuente negrita
        color: "#4292F6", // Color del texto
        textAlign: "right", // Alinea el texto a la derecha
        marginRight: 20, // Margen derecho
    },
    subTitle: {
        fontFamily: "Poppins-Regular", // Fuente Poppins regular
        fontSize: 20, // Tamaño de fuente
        fontWeight: "medium", // Peso de fuente mediano
        color: "#66A0E9", // Color del texto
        textAlign: "right", // Alinea el texto a la derecha
        marginRight: 20, // Margen derecho
        marginLeft: 20, // Margen izquierdo
        marginTop: 10, // Margen superior
    },
    form: {
        flex: 1, // Ocupa todo el espacio disponible
        justifyContent: "center", // Centra el contenido verticalmente
        alignItems: "center", // Centra el contenido horizontalmente
        paddingHorizontal: 20, // Añadido para dar un espacio horizontal a los bordes del formulario
    },
    ContentButton: {
        marginVertical: 20, // Ajustado para asegurar espacio entre los botones y el contenido
        alignItems: "center", // Centra el contenido horizontalmente
    },
});

// Exporta el componente Login
export default Login;