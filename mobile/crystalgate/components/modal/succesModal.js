import React from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
// Import LottieView de lottie-react-native
import LottieView from 'lottie-react-native';

// Definición del componente funcional SuccessModal
const SuccessModal = ({ visible, onClose, content }) => {
    // Renderizado del componente
    return (
        <Modal
            animationType="slide"                 // Tipo de animación al abrir/cerrar el modal
            transparent={true}                    // Hace el fondo del modal transparente
            visible={visible}                     // Propiedad para mostrar/ocultar el modal
            onRequestClose={onClose}              // Función a ejecutar al intentar cerrar el modal
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <LottieView
                        source={require('../../assets/animations/success-animation.json')} // Ruta de tu animación Lottie
                        autoPlay                        // Reproduce la animación automáticamente
                        loop={false}                    // No repite la animación
                        style={styles.lottie}           // Estilos para el LottieView
                    />
                    <Text style={styles.modalText}>{content}</Text>
                </View>
            </View>
        </Modal>
    );
};

// Definición de estilos utilizando StyleSheet.create
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,                                // Ocupa todo el espacio disponible
        justifyContent: "center",               // Centra verticalmente
        alignItems: "center",                   // Centra horizontalmente
        backgroundColor: "rgba(0,0,0,0.5)",     // Fondo semi-transparente negro
    },
    modalContent: {
        width: 300,                             // Ancho del contenido del modal
        padding: 20,                            // Relleno interior
        backgroundColor: "white",               // Fondo blanco del contenido del modal
        borderRadius: 10,                       // Bordes redondeados
        alignItems: "center",                   // Alineación de contenido al centro
    },
    modalText: {
        fontFamily: "Poppins-Regular",          // Fuente del texto
        marginBottom: 20,                       // Margen inferior
        fontSize: 18,                           // Tamaño de la fuente
        textAlign: "center",                    // Alineación del texto al centro
    },
    lottie: {
        width: 150,                             // Ancho del componente LottieView
        height: 150,                            // Altura del componente LottieView
        marginBottom: 20,                       // Margen inferior
    },
});

// Exporta el componente SuccessModal por defecto
export default SuccessModal;
