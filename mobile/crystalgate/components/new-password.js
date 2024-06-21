import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import BackButton from "../components/button/button-back";
import BackgroundImage from "../components/background/background-mountain"; // Asegúrate de ajustar la ruta si es necesario
import NewInputForm from "./input/input-new";
import PasswordInputForm from "./input/input-password";
import ResetButton from "./button/button-reset";
import BackLogInButton from "./button/button-backLG";
import { useNavigation } from '@react-navigation/native';

const fondo = require("../assets/img/background/background.png");

const NewPassword = () => {
    const [text, onChangeText] = React.useState("");
    const navigation = useNavigation();

    const handleSendRes = () => {
        // Función para manejar el envío
        navigation.navigate('Login');
    };
    const handleSendLog = () => {
        // Función para manejar el envío
        navigation.navigate('Login');
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
                            <NewInputForm onChangeText={onChangeText} value={text} placeholder="New Password"/>
                        </SafeAreaView>
                        <SafeAreaView>
                            <PasswordInputForm onChangeText={onChangeText} value={text} placeholder="Confirm Password"/>
                        </SafeAreaView>
                        <View style={styles.ContentButton}>
                            <ResetButton onPress={handleSendRes}/>
                        </View>
                        <View style={styles.ContentButton}>
                            <BackLogInButton onPress={handleSendLog}/>
                        </View>
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
        marginBottom: 80,

    },
    ContentButton:{
        display: "flex",
        alignItems: "center",
    },
});

export default NewPassword;