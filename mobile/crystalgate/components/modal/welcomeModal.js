import React from 'react';
import { View, Text, StyleSheet, Modal, Button, Touchable, TouchableOpacity } from 'react-native';
import Svg, { Path } from "react-native-svg";

const WelcomeModal = ({ visible, onClose, title, content}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
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

const styles = StyleSheet.create({
    header:{
        display: "flex",
        flexDirection: "row"
    },
    title:{
        fontFamily: "Poppins-Bold",
        fontSize: 16,
        color: "#64759D",
        alignSelf: "center",
        marginLeft: 5,
    },
    btnClose:{
        width: 300,
        height: 50,
        backgroundColor: "#64759D",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: "center",
    },
    btnText: {
        fontFamily: "Poppins-Bold",
        color: "white",
        marginTop: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: 300,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "#D9E4FF",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 18,
        textAlign: "center",
        fontFamily: "Poppins-Regular"
    },
});

export default WelcomeModal;
