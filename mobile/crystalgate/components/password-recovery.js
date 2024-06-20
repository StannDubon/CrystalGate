import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import EmailInputForm from "../components/input/input-email";
import SendButton from "../components/button/button-send";
import BackButton from "../components/button/button-back";
import BackgroundImage from "../components/background/background-mountain"; // Asegúrate de ajustar la ruta si es necesario

const fondo = require("../assets/img/background/background.png");

const PasswordRecovery = () => {
    const [text, onChangeText] = React.useState("");

    const handleSend = () => {
        // Función para manejar el envío
    };
    const handleBack = () => {
        // Función para manejar el envío
    };

    return (
        <View style={styles.container}>
            <BackgroundImage source={fondo}>
                <View style={styles.header}>
                <BackButton onPress={handleBack} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>New Password</Text>
                    <Text style={styles.subTitle}>
                        Enter the new password for your account
                    </Text>
                    <View style={styles.form}>
                        <SafeAreaView>
                            <EmailInputForm onChangeText={onChangeText} value={text} placeholder="Email"/>
                        </SafeAreaView>

                        <SendButton onPress={handleSend} />
                    </View>
                </View>
            </BackgroundImage>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.6,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 35,
        marginLeft: 20,
    },
    content: {
        flex: 1,
    },
    title: {
        fontFamily: "Poppins",
        fontSize: 32,
        fontWeight: "bold",
        color: "#4292F6",
        textAlign: "right",
        marginRight: 20,
    },
    subTitle: {
        fontFamily: "Poppins",
        fontSize: 20,
        fontWeight: "Medium",
        color: "#66A0E9",
        textAlign: "right",
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
    },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default PasswordRecovery;
