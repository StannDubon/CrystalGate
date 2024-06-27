import React from 'react';
import { View, Text, StyleSheet, Modal, Button, Touchable, TouchableOpacity } from 'react-native';
// Importación de Svg y Path de react-native-svg
import Svg, { Path } from "react-native-svg";

// Definición del componente funcional WelcomeModal
const WelcomeModal = ({ visible, onClose, title, content}) => {
    // Renderizado del componente
    return (
        // Modal que se muestra sobre la pantalla principal
        <Modal
            animationType="slide"             // Tipo de animación al abrir/cerrar el modal
            transparent={true}               // Hace el fondo del modal transparente
            visible={visible}                // Propiedad para mostrar/ocultar el modal
            onRequestClose={onClose}         // Función a ejecutar al intentar cerrar el modal
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Svg
                        width="39"
                        height="39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M4 0C2.93913 0 1.92172 0.410891 1.17157 1.14228C0.421427 1.87368 0 2.86566 0 3.9V35.1C0 36.1343 0.421427 37.1263 1.17157 37.8577C1.92172 38.5891 2.93913 39 4 39H28C29.0609 39 30.0783 38.5891 30.8284 37.8577C31.5786 37.1263 32 36.1343 32 35.1V12.1216C32 11.852 31.8911 11.5939 31.6981 11.4056L20.2913 0.284C20.1045 0.101912 19.854 0 19.5932 0H4ZM20 13.65H19C18.4477 13.65 18 13.2023 18 12.65V6.27165C18 5.38683 19.0646 4.93796 19.6981 5.55565L26.24 11.934C26.8823 12.5602 26.4389 13.65 25.5419 13.65H20Z"
                                fill="#6B81B9"
                            />
                        </Svg>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Text style={styles.modalText}>{content}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.btnClose}>
                        <Text style={styles.btnText}>Close</Text>
                    </TouchableOpacity>
                </View>
                
            </View>   
        </Modal>
    );
};

// Estilos utilizando StyleSheet.create
const styles = StyleSheet.create({
    header:{
        display: "flex",
        flexDirection: "row",               // Dirección del contenedor en fila
    },
    title:{
        fontFamily: "Poppins-Bold",         // Fuente del título
        fontSize: 16,                       // Tamaño de la fuente
        color: "#64759D",                   // Color del texto del título
        alignSelf: "center",                // Alineación automática centrada
        marginLeft: 5,                      // Margen izquierdo
    },
    btnClose:{
        width: 300,                         // Ancho del botón
        height: 50,                         // Altura del botón
        backgroundColor: "#64759D",         // Color de fondo del botón
        borderBottomRightRadius: 10,        // Radio de borde inferior derecho
        borderBottomLeftRadius: 10,         // Radio de borde inferior izquierdo
        alignItems: "center",               // Alineación de elementos al centro
    },
    btnText: {
        fontFamily: "Poppins-Bold",         // Fuente del texto del botón
        color: "white",                     // Color del texto del botón
        marginTop: 15,                      // Margen superior
    },
    modalContainer: {
        flex: 1,                            // Ocupa todo el espacio disponible
        justifyContent: "center",           // Centra verticalmente
        alignItems: "center",               // Centra horizontalmente
        backgroundColor: "rgba(0,0,0,0.5)", // Fondo semi-transparente negro
    },
    modalContent: {
        width: 300,                         // Ancho del contenido del modal
        paddingTop: 20,                     // Relleno superior
        paddingHorizontal: 20,              // Relleno horizontal
        backgroundColor: "#D9E4FF",         // Fondo del contenido del modal
        borderRadius: 10,                   // Bordes redondeados
        alignItems: "center",               // Alineación de contenido al centro
    },
    modalText: {
        marginTop: 20,                      // Margen superior
        marginBottom: 20,                   // Margen inferior
        fontSize: 18,                       // Tamaño de la fuente
        textAlign: "center",                // Alineación del texto al centro
        fontFamily: "Poppins-Regular",      // Fuente del texto
    },
});

// Exporta el componente WelcomeModal por defecto
export default WelcomeModal;
