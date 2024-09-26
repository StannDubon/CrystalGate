import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Alert
} from "react-native";
import Svg, { Path } from "react-native-svg";
// Importa el componente EmailInputForm
import EmailInputForm from "../components/input/input-email";
// Importa el componente SendButton
import SendButton from "../components/button/button-send";
// Importa el componente BackButton
import BackButton from "../components/button/button-back";
// Importa el componente BackgroundImage (ajusta la ruta si es necesario)
import BackgroundImage from "../components/background/background-mountain";
// Importa el hook useNavigation
import { useNavigation } from '@react-navigation/native';

import fetchData from './utils/database';

// Requiere la imagen de fondo
const fondo = require("../assets/img/background/background.png");

const PasswordRecovery = () => {
    // Estado para manejar el texto del formulario
    const [text, onChangeText] = React.useState("");
    // Hook de navegación
    const navigation = useNavigation();

    const handleSend = async () => {
        try {
          // Creamos un FormData con el correo electrónico del usuario.
          const form = new FormData();
          form.append("correoUsuario", text);
          
          // Hacemos una solicitud usando fetchData para enviar el correo electrónico y recibir una respuesta.
          const DATA = await fetchData("cliente", "emailPasswordSender", form);
          // Si la solicitud es exitosa (DATA.status es verdadero), limpiamos el correo, mostramos una alerta y navegamos a la siguiente pantalla.
          if (DATA.status) {
            onChangeText("");
            Alert.alert("Éxito", "Un código de verificación ha sido enviado a su correo electrónico");
            const token = DATA.dataset;
            navigation.replace("Verification", { token });
          } else {
            // En caso de error, mostramos un mensaje de error en una alerta.
            console.log(DATA);
            Alert.alert("Error sesión", DATA.error);
          }
        } catch (error) {
          // Capturamos y manejamos errores que puedan ocurrir durante la solicitud.
          console.error(error, "Error desde Catch");
          Alert.alert("Error", "Ocurrió un error al iniciar sesión");
        }
      };

    const handleBack = () => {
        // Navega a la pantalla de inicio de sesión
        navigation.navigate('Login');
    };

    // Renderizado del componente
    return (
        <View style={styles.container}>
            <BackgroundImage source={fondo}>
                <View style={styles.header}>
                <BackButton onPress={handleBack} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Your email</Text>
                    <Text style={styles.subTitle}>
                        Enter the email of the account that you want to recover the password
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

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    },
    header: {
        flex: 0.6, // Ocupa el 60% del espacio del contenedor padre
        justifyContent: "flex-start", // Alinea el contenido al principio del eje principal
        alignItems: "flex-start", // Alinea el contenido al principio del eje transversal
        marginTop: 35, // Añade un margen superior de 35
        marginLeft: 20, // Añade un margen izquierdo de 20
    },
    content: {
        flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    },
    title: {
        fontFamily: "Poppins-Bold", // Establece la familia de fuentes
        fontSize: 32, // Establece el tamaño de la fuente
        fontWeight: "bold", // Establece el peso de la fuente
        color: "#4292F6", // Establece el color del texto
        textAlign: "right", // Alinea el texto a la derecha
        marginRight: 20, // Añade un margen derecho de 20
    },
    subTitle: {
        fontFamily: "Poppins-Regular", // Establece la familia de fuentes
        fontSize: 20, // Establece el tamaño de la fuente
        fontWeight: "Medium", // Establece el peso de la fuente
        color: "#66A0E9", // Establece el color del texto
        textAlign: "right", // Alinea el texto a la derecha
        marginRight: 20, // Añade un margen derecho de 20
        marginLeft: 20, // Añade un margen izquierdo de 20
        marginTop: 10, // Añade un margen superior de 10
    },
    form: {
        flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
        justifyContent: "center", // Centra el contenido en el eje principal
        alignItems: "center", // Centra el contenido en el eje transversal
    },
});

// Exporta el componente PasswordRecovery como el predeterminado
export default PasswordRecovery;