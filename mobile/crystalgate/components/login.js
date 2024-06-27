import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import BackgroundImage from '../components/background/background-mountain'; // Asegúrate de ajustar la ruta si es necesario
import UsernameInputForm from './input/input-username';
import PasswordInputForm from './input/input-password';
import LoginButton from './button/button-login';
import ForgotButton from './button/button-forgot';
import { useNavigation } from '@react-navigation/native';
import AlertModal from './modal/alertModal';
import fetchData from './utils/database';

const fondo = require('../assets/img/background/background.png');

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const navigation = useNavigation();
  const service = "cliente";

  const handleSendNav = async () => {
    let action = "logIn";

    const FORM = new FormData();
    FORM.append("correoUsuario", username);
    FORM.append("claveUsuario", password);
    try{
      const result = await fetchData(service,action,FORM);
      console.log(result);
      if(result.status == 1){
        setSuccessModalVisible(true);
        setTimeout(() => {
          setSuccessModalVisible(false);
          navigation.navigate('Navigation');
        }, 3000); 
      }
      else{
        setErrorModalVisible(true);
      }
    }
    catch (error){
      console.log(result);
      console.error("Error: ",error);
    }
  };
  const handleSendPas = () => {
    // Función para manejar el envío
    navigation.navigate('PasswordRecovery');
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
              <UsernameInputForm onChangeText={setUsername} value={username} placeholder="Username"/>
            </SafeAreaView>
            <SafeAreaView>
              <PasswordInputForm onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true}/>
            </SafeAreaView>
            <View style={styles.ContentButton}>
              <ForgotButton onPress={handleSendPas}/>
            </View>
          </View>
          <View style={styles.ContentButton}>
              <LoginButton onPress={handleSendNav}/>            
          </View>
        </View>
      </BackgroundImage>
      <AlertModal visible={isSuccessModalVisible} onClose={() => setSuccesModalVisible(false)} content={"Log In successfully"} />
      <AlertModal visible={isErrorModalVisible} type={3} onClose={() => setErrorModalVisible(false)} content={"Incorrect Credentials"} />
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
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    fontWeight: "bold",
    color: "#4292F6",
    textAlign: "right",
    marginRight: 20,
  },
  subTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    fontWeight: "medium",  // Cambiado a "medium" en lugar de "Medium"
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
    paddingHorizontal: 20, // Añadido para dar un espacio horizontal a los bordes del formulario
  },
  ContentButton: {
    marginVertical: 20, // Ajustado para asegurar espacio entre los botones y el contenido
    alignItems: "center",
  },
});


export default Login;

