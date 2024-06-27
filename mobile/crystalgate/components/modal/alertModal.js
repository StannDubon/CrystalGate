import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const SuccessModal = ({ visible, onClose, content, type = 1 }) => {
    let animation = require('../../assets/animations/success-animation.json'); // Por defecto, usaré success-animation.json

    switch (type) {
        case 1:
            animation = require('../../assets/animations/success-animation.json');
            break;
        case 2:
            animation = require('../../assets/animations/error-animation.json');
            break;
        case 3:
            animation = require('../../assets/animations/warning-animation.json');
            break;
        case 4:
            animation = require('../../assets/animations/notice-animation.json');
            break;
        default:
            break;
    }

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
                        source={animation}
                        autoPlay
                        loop={false}
                        style={styles.lottie}
                    />
                    <Text style={styles.modalText}>{content}</Text>
                    {type !== 1 && ( // Mostrar el botón solo si type no es igual a 1
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    )}
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
        fontFamily: "Poppins-Regular",
        marginBottom: 20,
        fontSize: 18,
        textAlign: "center",
    },
    lottie: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#4292F6',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default SuccessModal;
