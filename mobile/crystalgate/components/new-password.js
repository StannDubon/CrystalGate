// Importa React y useState para manejar estados locales
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import BackButton from "../components/button/button-back";
// Importa el componente BackgroundImage (ajusta la ruta si es necesario)
import BackgroundImage from "../components/background/background-mountain";
// Importa el componente NewInputForm
import NewInputForm from "./input/input-new";
// Importa el componente PasswordInputForm
import PasswordInputForm from "./input/input-password";
// Importa el componente ResetButton
import ResetButton from "./button/button-reset";
// Importa el componente BackLogInButton
import BackLogInButton from "./button/button-backLG";
// Importa el hook useNavigation
import { useNavigation } from '@react-navigation/native';
import SuccessModal from "./modal/alertModal";

// Requiere la imagen de fondo
const fondo = require("../assets/img/background/background.png");

const NewPassword = () => {
    // Estado para manejar el texto del formulario
    const [text, onChangeText] = React.useState("");
    // Estado para manejar la visibilidad del modal de éxito
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleSendRes = () => {
        // Muestra el modal de éxito
        setSuccessModalVisible(true);
        setTimeout(() => {
            // Oculta el modal de éxito después de 4 segundos
            setSuccessModalVisible(false);
            // Navega a la pantalla de inicio de sesión
            navigation.navigate('Login');
        }, 4000);
    };
    const handleSendLog = () => {
        // Navega a la pantalla de inicio de sesión
        navigation.navigate('Login');
    };

    // Renderizado del componente
    return (
        <View style={styles.container}>
            <BackgroundImage source={fondo}>
                <View style={styles.header}>
                
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
            <SuccessModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Password updated successfully"} />
        </View>
    );
};

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    },
    header: {
        flex: 0.6, // Ocupa el 60% del espacio del contenedor
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
        marginBottom: 80, // Añade un margen inferior de 80
    },
    ContentButton:{
        display: "flex", // Establece un contenedor flexible
        alignItems: "center", // Centra el contenido en el eje transversal
    },
});

// Exporta el componente NewPassword como el predeterminado
export default NewPassword;