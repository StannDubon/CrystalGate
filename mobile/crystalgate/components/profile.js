import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Clipboard,
    Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Color } from "../assets/const/color";
import HeaderSingle from "../components/header/headerSigle";
import { useNavigation } from '@react-navigation/native';
import LogOutButton from "./button/logOutButton";
import AlertModal from './modal/alertModal';
import fetchData from "./utils/database";
// Botón para cambiar la contraseña en el perfil del usuario
import ChangePassButton from "../components/button/button-change-pass";

const Profile = () => {
    const [email, setEmail] = useState("");
    const [iniciales, setIniciales] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cargo, setCargo] = useState("");
    const [id, setId] = useState("");
    const navigation = useNavigation();
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    const getUser = async () => {
        const result = await fetchData('cliente', 'readOne');
        if (result.status) {
            setEmail(result.dataset.correo);
            setApellido(result.dataset.apellido);
            setNombre(result.dataset.nombre);
            setCargo(result.dataset.cargo);
            setIniciales(result.dataset.nombre[0] + result.dataset.apellido[0]);
            setId(result.dataset.id_usuario);
        }
    }

    useEffect(() => {
        getUser();
    }, [navigation]);

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
    };

    const handleLogOut = async () => {
        let action = "logOut";
        try {
            const result = await fetchData('cliente', action);
            console.log(result);
            if (result.status == 1) {
                setSuccessModalVisible(true);
                setTimeout(() => {
                    setSuccessModalVisible(false);
                    // Navegar a la pantalla de carga
                    navigation.navigate('LoadingScreen');
                    // Mostrar la pantalla de carga durante 5 segundos
                    setTimeout(() => {
                        // Redirigir a la pantalla de Login después de 5 segundos
                        navigation.navigate('Login');
                    }, 5000);
                }, 3000);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const handleRecovery = async () => {

        try {
            // Creamos un FormData con el correo electrónico del usuario.
            const form = new FormData();
            form.append("correoUsuario", email);
            
            // Hacemos una solicitud usando fetchData para enviar el correo electrónico y recibir una respuesta.
            const DATA = await fetchData("cliente", "emailPasswordSender", form);
            // Si la solicitud es exitosa (DATA.status es verdadero), limpiamos el correo, mostramos una alerta y navegamos a la siguiente pantalla.
            if (DATA.status) {
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

    return (
        <View style={styles.container}>
            <HeaderSingle title={"Profile"} />
            <View style={styles.body}>
                <View style={styles.topContrast}>
                    <View style={styles.circle}>
                        <Text style={styles.initials}>{iniciales}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.name}>{nombre + " " + apellido}</Text>
                    <Text style={styles.id}>ID: {id}</Text>
                    <Text style={styles.label}>EMAIL</Text>
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => copyToClipboard(email)}
                    >
                        <Text style={styles.email}>{email}</Text>
                        <Svg
                            style={styles.svg}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M18 0H8C7.46957 0 6.96086 0.210714 6.58579 0.585786C6.21071 0.960859 6 1.46957 6 2V4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V14H18C18.5304 14 19.0391 13.7893 19.4142 13.4142C19.7893 13.0391 20 12.5304 20 12V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0Z"
                                fill="#4292F6"
                            />
                            <Path
                                d="M2 20H12C13.103 20 14 19.103 14 18V8C14 6.897 13.103 6 12 6H2C0.897 6 0 6.897 0 8V18C0 19.103 0.897 20 2 20ZM4 10H10V12H4V10ZM4 14H10V16H4V14Z"
                                fill="#4292F6"
                            />
                        </Svg>
                    </TouchableOpacity>

                    <Text style={styles.label}>CHARGE</Text>
                    <Text style={styles.charge}>{cargo}</Text>

                    <View style={styles.ContentButton}>
                        <ChangePassButton onPress={handleRecovery}/>
                        <LogOutButton onPress={handleLogOut} />
                    </View>
                </View>
            </View>
            <AlertModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Log Out successfully"} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        fontFamily: "Poppins-Regular",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: Color.colorBackground,
    },
    body: {
        width: "100%",
        backgroundColor: "red"
    },
    topContrast: {
        display: "flex",
        backgroundColor: Color.colorContrast,
        width: 390,
        height: 110,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: "#dcdcdc",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 110,
    },
    initials: {
        color: "#4285F4",
        fontSize: 48,
        fontWeight: "bold",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        width: 390,
        height: 110,
        justifyContent: "center",
        marginTop: 240,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4285F4",
        textAlign: "center",
    },
    id: {
        fontSize: 16,
        color: "#777777",
        textAlign: "center",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#777777",
        marginTop: 20,
        textAlign: "left",
        marginHorizontal: 40,
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginHorizontal: 40,
        flexDirection: "row",
    },
    email: {
        fontSize: 16,
        color: "#4285F4",
        textAlign: "left",
        flexDirection: "row",
        width: 280,
    },
    svg: {
        marginRight: 10,
    },
    charge: {
        fontSize: 16,
        color: "#4285F4",
        marginTop: 10,
        textAlign: "left",
        marginLeft: 40,
    },
    ContentButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 30,
    },
});

export default Profile;
