import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert
} from "react-native";
import Svg, { Path } from "react-native-svg";
import BackButton from "../components/button/button-back";
import BackgroundImage from "../components/background/background-mountain";
import NewInputForm from "./input/input-new";
import PasswordInputForm from "./input/input-password";
import ResetButton from "./button/button-reset";
import BackLogInButton from "./button/button-backLG";
import { useNavigation } from '@react-navigation/native';
import SuccessModal from "./modal/alertModal";

import fetchData from './utils/database';
const fondo = require("../assets/img/background/background.png");

const NewPassword = ({ route }) => {
    const [text, onChangeText] = React.useState("");
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const navigation = useNavigation();

    const { tokenV } = route.params;
    const [npassword, setNpassword] = useState("");
    const [cnpassword, setCNpassword] = useState("");

    const handlerChangePassword = async () => {
        try {
          // Creamos un FormData con el tokenV, nueva contraseña y confirmación de nueva contraseña.
          const form = new FormData();
          form.append("token", tokenV);
          form.append("claveNueva", npassword);
          form.append("confirmarClave", cnpassword);
          
          // Hacemos una solicitud usando fetchData para cambiar la contraseña y recibir una respuesta.
          const DATA = await fetchData("cliente", "changePasswordByEmail", form);
          // Si la solicitud es exitosa (DATA.status es verdadero), limpiamos las contraseñas, mostramos una alerta y navegamos a la pantalla de inicio de sesión.
          if (DATA.status) {
            setNpassword("");
            setCNpassword("");
            Alert.alert("Éxito", "La contraseña se ha cambiado correctamente");
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
          } else {
            // En caso de error, mostramos un mensaje de error en una alerta.
            console.log(DATA);
            Alert.alert("Error sesión", DATA.error);
    
            // Si el error es debido a que el tiempo para cambiar la contraseña ha expirado, navegamos de vuelta a la pantalla de inicio de sesión.
            if(DATA.error == "El tiempo para cambiar su contraseña ha expirado"){
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
            }
          }
        } catch (error) {
          // Capturamos y manejamos errores que puedan ocurrir durante la solicitud.
          console.error(error, "Error desde Catch");
          Alert.alert("Error", "Ocurrió un error al iniciar sesión");
        }
      };

    const handleSendLog = () => {
        navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <BackgroundImage source={fondo} style={styles.backgroundImage}>
                    <View style={styles.header}>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>New Password</Text>
                        <Text style={styles.subTitle}>
                            Enter the new password for your account
                        </Text>
                        <View style={styles.form}>
                            <SafeAreaView>
                                <NewInputForm onChangeText={setNpassword} value={npassword} placeholder="New Password" />
                            </SafeAreaView>
                            <SafeAreaView>
                                <PasswordInputForm onChangeText={setCNpassword} value={cnpassword} placeholder="Confirm Password" />
                            </SafeAreaView>
                            <View style={styles.ContentButton}>
                                <ResetButton onPress={handlerChangePassword} />
                            </View>
                            <View style={styles.ContentButton}>
                                <BackLogInButton onPress={handleSendLog} />
                            </View>
                        </View>
                    </View>
                </BackgroundImage>
            </ScrollView>
            <SuccessModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Password updated successfully"} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
    },
    header: {
        flex: 0.6,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingRight: 20,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontSize: 32,
        fontWeight: "bold",
        color: "#4292F6",
        textAlign: "right",
        marginTop: 300,
        alignSelf: "flex-end",
    },
    subTitle: {
        fontFamily: "Poppins-Regular",
        fontSize: 20,
        fontWeight: "medium",
        color: "#66A0E9",
        textAlign: "right",
        marginTop: 10,
    },
    form: {
        width: '100%',
        alignItems: 'center',
    },
    ContentButton: {
        marginVertical: 20,
        alignItems: "center",
    },
});

export default NewPassword;
