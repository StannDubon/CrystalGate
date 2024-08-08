import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Clipboard,
    Alert,
} from "react-native";
// Importación de Svg y Path desde react-native-svg, para usar archivos svg
import Svg, { Path } from "react-native-svg";
import { Color } from "../assets/const/color";
// Botón para cambiar la contraseña en el perfil del usuario
import ChangePassButton from "../components/button/button-change-pass";
// Encabezado único para la pantalla de perfil
import HeaderSingle from "../components/header/headerSigle";
import { useNavigation } from '@react-navigation/native';
// Botón para cerrar sesión en la aplicación
import LogOutButton from "./button/logOutButton";
import AlertModal from './modal/alertModal';
import fetchData from "./utils/database";

const Profile = () => {
    const [email,setEmail] = useState("");
    const [iniciales,setIniciales] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cargo, setCargo] = useState("");
    const [id, setId] = useState("");
    const navigation = useNavigation();
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    const getInitials = (nombre, apellido) =>{
        return nombre[0]+apellido[0];
    }

    const getUser = async () =>{
        const result = await fetchData('cliente','readOne');
        if(result.status){
            setEmail(result.dataset.correo);
            setApellido(result.dataset.apellido);
            setNombre(result.dataset.nombre);
            setCargo(result.dataset.cargo);
            setIniciales(getInitials(nombre,apellido));
            setId(result.dataset.id_usuario);
        }
    }

    useEffect(() => {
        getUser();

    },[navigation]);

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
    };

    const handleRecovery = () => {
        // Función para manejar el envío
        navigation.navigate('Verification');
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
              navigation.navigate('Login');
            }, 3000);
          } 
        } catch (error) {
          console.error("Error: ", error);
        }
      };

    // Renderizado del componente
    return (
        <View style={styles.container}>
            <HeaderSingle title={"Profile"}/>
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
                    <LogOutButton onPress={handleLogOut}></LogOutButton>
                    <ChangePassButton onPress={handleRecovery}/>
                    </View>
                </View>
            </View>
            <AlertModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Log Out successfully"} />
        </View>
    );
};

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        fontFamily: "Poppins-Regular",
        flex: 1, // Flex 1 para ocupar todo el espacio disponible
        display: "flex", // Mostrar como contenedor flexible
        flexDirection: "column", // Dirección de los elementos en columna
        backgroundColor: Color.colorBackground, // Color de fondo definido en la constante Color
    },


    topContrast: {
        display: "flex", // Mostrar como contenedor flexible
        backgroundColor: Color.colorContrast, // Color de contraste definido en la constante Color
        width: 390, // Ancho del contenedor
        height: 110, // Altura del contenedor
        justifyContent: "center", // Centrar verticalmente los elementos hijos
        alignItems: "center", // Centrar horizontalmente los elementos hijos
    },
    circle: {
        width: 150, // Ancho del círculo
        height: 150, // Altura del círculo
        borderRadius: 100, // Radio de borde para hacerlo circular
        backgroundColor: "#dcdcdc", // Color de fondo del círculo
        justifyContent: "center", // Centrar verticalmente los elementos hijos
        alignItems: "center", // Centrar horizontalmente los elementos hijos
        marginTop: 110, // Margen superior para ajustar la posición
    },
    initials: {
        color: "#4285F4", // Color del texto de las iniciales
        fontSize: 48, // Tamaño de fuente de las iniciales
        fontWeight: "bold", // Peso de la fuente para las iniciales
    },
    content: {
        display: "flex", // Mostrar como contenedor flexible
        flexDirection: "column", // Dirección de los elementos en columna
        width: 390, // Ancho del contenedor
        height: 110, // Altura del contenedor
        justifyContent: "center", // Centrar verticalmente los elementos hijos
        marginTop: 240, // Margen superior para ajustar la posición
    },
    name: {
        fontSize: 24, // Tamaño de fuente para el nombre
        fontWeight: "bold", // Peso de la fuente para el nombre
        color: "#4285F4", // Color del texto del nombre
        textAlign: "center", // Alineación del texto al centro
    },
    id: {
        fontSize: 16, // Tamaño de fuente para el ID
        color: "#777777", // Color del texto del ID
        textAlign: "center", // Alineación del texto al centro
        marginBottom: 20, // Margen inferior para ajustar la posición
    },
    label: {
        fontSize: 16, // Tamaño de fuente para las etiquetas
        fontWeight: "bold", // Peso de la fuente para las etiquetas
        color: "#777777", // Color del texto de las etiquetas
        marginTop: 20, // Margen superior para ajustar la posición
        textAlign: "left", // Alineación del texto a la izquierda
        marginHorizontal: 40, // Margen horizontal para ajustar la posición
    },
    row: {
        display: "flex", // Mostrar como contenedor flexible
        justifyContent: "space-between", // Espacio entre elementos distribuidos uniformemente
        alignItems: "center", // Centrar horizontalmente los elementos hijos
        marginTop: 10, // Margen superior para ajustar la posición
        marginHorizontal: 40, // Margen horizontal para ajustar la posición
        flexDirection: "row", // Dirección de los elementos en fila
    },
    email: {
        fontSize: 16, // Tamaño de fuente para el correo electrónico
        color: "#4285F4", // Color del texto del correo electrónico
        textAlign: "left", // Alineación del texto a la izquierda
        flexDirection: "row", // Dirección de los elementos en fila
        width: 280, // Ancho del correo electrónico
    },
    svg: {
        marginRight: 10, // Margen derecho para ajustar la posición del icono SVG
    },
    charge: {
        fontSize: 16, // Tamaño de fuente para el cargo
        color: "#4285F4", // Color del texto del cargo
        marginTop: 10, // Margen superior para ajustar la posición
        textAlign: "left", // Alineación del texto a la izquierda
        marginLeft: 40, // Margen izquierdo para ajustar la posición
    },
    ContentButton:{
        display: "flex", // Mostrar como contenedor flexible
        flexDirection: "row", // Dirección de los elementos en fila
        justifyContent: "space-around", // Espacio entre elementos distribuidos uniformemente
        alignItems: "center", // Centrar horizontalmente los elementos hijos
        paddingHorizontal: 30, // Relleno horizontal para ajustar la posición
    },
});

// Exporta el componente Profile como el predeterminado
export default Profile;
