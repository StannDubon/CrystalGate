import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, Button } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { Color } from "../../assets/const/color";

const Banner = ({ state, description }) => {
    const [modalVisible, setModalVisible] = useState(false);

    // Configura los estados "accepted" y "rejected"
    const states = {
        1: {
            backgroundColor: Color.colorPending,  // Color naranja para aceptado
            icon: (
                <Svg width="34" height="27" viewBox="0 1 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M15.5024 2.77477C7.71207 2.77477 1.1291 9.46735 1.1291 17.3874C1.1291 25.3074 7.71207 32 15.5024 32C23.2943 32 29.8757 25.3074 29.8757 17.3874C29.8757 9.46735 23.2943 2.77477 15.5024 2.77477ZM23.4876 17.3874C23.4876 18.2841 22.7606 19.011 21.8639 19.011H15.9054C14.8008 19.011 13.9054 18.1156 13.9054 17.011V10.8663C13.9054 9.98429 14.6204 9.26927 15.5024 9.26927C16.3844 9.26927 17.0994 9.98428 17.0994 10.8663V13.7638C17.0994 14.8683 17.9949 15.7638 19.0994 15.7638H21.8639C22.7606 15.7638 23.4876 16.4907 23.4876 17.3874ZM29.8912 6.0021C29.2613 6.6448 28.2269 6.64657 27.5947 6.00604L25.0506 3.42809C24.4331 2.80243 24.4314 1.79723 25.0467 1.16945C25.6766 0.526748 26.711 0.524973 27.3432 1.16551L29.8874 3.74346C30.5048 4.36912 30.5065 5.37432 29.8912 6.0021ZM3.62747 1.17391C4.25742 0.531327 5.29163 0.529369 5.92401 1.16956C6.54219 1.79537 6.5441 2.80136 5.92829 3.42951L3.40986 5.99843C2.7796 6.64134 1.74477 6.64293 1.11252 6.00197C0.495099 5.37604 0.49355 4.37067 1.10904 3.74284L3.62747 1.17391Z" fill="#ffffff" />
                </Svg>
            ),
            title: 'Pending',
            description: 'The request is currently pending approval.',
        },
        2: {
            backgroundColor: Color.colorAccepted,  // Color verde para aceptado
            icon: (
                <Svg width="34" height="27" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M4.707 8.293L1.414 5L0 6.414L4.707 11.121L14.414 1.414L13 0L4.707 8.293Z" fill="#ffffff" />
                </Svg>
            ),
            title: 'Accepted',
            description: 'The request has been accepted.',
        },
        3: {
            backgroundColor: Color.colorRejected,  // Color gris para rechazado
            icon: (
                <Svg width="34" height="27" viewBox="-5 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M1 1L14 14M1 14L14 1" stroke="#ffffff" strokeWidth="2.3" />
                </Svg>
            ),
            title: 'Rejected',
            description: 'The request has been rejected.',
        },
    };

    // Selecciona el estilo y el ícono según el estado
    const currentState = states[state] || states[2];

    return (
        <View style={styles.contenedor}>
            <View style={[styles.banner, { backgroundColor: currentState.backgroundColor }]}>
                {currentState.icon}
            </View>
            <TouchableOpacity style={styles.info} onPress={() => setModalVisible(true)}>
                <Svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M11.4459 0C5.13475 0 0 5.1589 0 11.5C0 17.8411 5.1589 23 11.5 23C17.8411 23 23 17.8411 23 11.5C23 5.1589 17.8169 0 11.4459 0ZM12.65 16.25C12.65 16.8023 12.2023 17.25 11.65 17.25H11.35C10.7977 17.25 10.35 16.8023 10.35 16.25V15.95C10.35 15.3977 10.7977 14.95 11.35 14.95H11.65C12.2023 14.95 12.65 15.3977 12.65 15.95V16.25ZM12.65 11.65C12.65 12.2023 12.2023 12.65 11.65 12.65H11.35C10.7977 12.65 10.35 12.2023 10.35 11.65V6.75C10.35 6.19772 10.7977 5.75 11.35 5.75H11.65C12.2023 5.75 12.65 6.19772 12.65 6.75V11.65Z" fill="#595959" />
                </Svg>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{currentState.title}</Text>
                        <Text style={styles.modalDescription}>{currentState.description}</Text>
                        <TouchableOpacity style={styles.buttom} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalClose}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        height: 'auto',
        marginTop: 80,
    },

    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 122,
        paddingVertical: 15,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginLeft: 10,
    },

    info: {
        backgroundColor: Color.colorBtnUqload,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginRight: 10,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
        width: 300,
        padding: 20,
        backgroundColor: Color.colorHeader,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalDescription: {
        fontSize: 16,
        marginBottom: 20,
      },
      buttom: {
        width: 300,
        height: 50,
        backgroundColor: Color.colorBtnClose,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom:-20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        
      },
      modalClose: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Color.colorfont4,
      },
});

export default Banner;