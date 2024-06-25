import React from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import LottieView from 'lottie-react-native';

const SuccessModal = ({ visible, onClose, content }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <LottieView
                        source={require('../../assets/animations/success-animation.json')} // Ruta de tu animación Lottie
                        autoPlay
                        loop={false}
                        style={styles.lottie}
                    />
                    <Text style={styles.modalText}>{content}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: "center",
    },
    lottie: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
});

export default SuccessModal;
