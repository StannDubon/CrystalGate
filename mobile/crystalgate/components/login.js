import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import BackgroundImage from '../components/background/background-mountain'; // Asegúrate de ajustar la ruta si es necesario
import UsernameInputForm from './input/input-username';
import PasswordInputForm from './input/input-password';
import LoginButton from './button/button-login';
import ForgotButton from './button/button-forgot';

const fondo = require('../assets/img/background/background.png');

const Login = () => {
  const [text, onChangeText] = React.useState("");

  const handleSend = () => {
    // Función para manejar el envío
  };

  return (
    <View style={styles.container}>
        <BackgroundImage source={fondo}>
            <View style={styles.header}>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Hey Climber!</Text>
                <Text style={styles.subTitle}>
                    Welcome Back
                </Text>
                <View style={styles.form}>
                    <SafeAreaView>
                        <UsernameInputForm onChangeText={onChangeText} value={text} placeholder="Username"/>
                    </SafeAreaView>
                    <SafeAreaView>
                        <PasswordInputForm onChangeText={onChangeText} value={text} placeholder="Password"/>
                    </SafeAreaView>
                    <View style={styles.ContentButton}>
                        <ForgotButton/>
                    </View>
                    </View>
                    <View style={styles.ContentButton}>
                        <LoginButton/>
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
    ContentButton:{
        display: "flex",
        alignItems: "center",
        marginBottom: 70
    },
});

export default Login;
