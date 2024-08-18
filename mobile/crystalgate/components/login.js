import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import BackgroundImage from '../components/background/background-mountain';
import UsernameInputForm from './input/input-username';
import PasswordInputForm from './input/input-password';
import LoginButton from './button/button-login';
import ForgotButton from './button/button-forgot';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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

  useFocusEffect(
    React.useCallback(() => {
      // Clear the input fields when the screen is focused
      setUsername("");
      setPassword("");
      checkUserLoggedIn();
    }, [])
  );

  const checkUserLoggedIn = async () => {
    let action = "getUser";
    try {
      const result = await fetchData(service, action);
      if (result.status) {
        navigation.replace('Navigation');
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {

    checkUserLoggedIn();
  }, [navigation]);
  

  const handleSendNav = async () => {
    let action = "logIn";

    const FORM = new FormData();
    FORM.append("correoUsuario", username);
    FORM.append("claveUsuario", password);
    try {
      const result = await fetchData(service, action, FORM);
      if (result.status == 1) {
        setSuccessModalVisible(true);
        setTimeout(() => {
          setSuccessModalVisible(false);
          navigation.replace('Navigation');
        }, 3000);
      } else {
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.log(result);
      console.error("Error: ", error);
    }
  };

  const handleSendPas = () => {
    navigation.navigate('PasswordRecovery');
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
            <Text style={styles.title}>Hey Climber!</Text>
            <Text style={styles.subTitle}>Welcome Back</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.form}>
              <SafeAreaView>
                <UsernameInputForm onChangeText={setUsername} value={username} placeholder="Email" />
              </SafeAreaView>
              <SafeAreaView>
                <PasswordInputForm onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true} />
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
      </ScrollView>
      <AlertModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Log In successfully"} />
      <AlertModal visible={isErrorModalVisible} type={3} onClose={() => setErrorModalVisible(false)} content={"Incorrect Credentials"} />
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
    marginTop: 300,
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

export default Login;
