import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Dimensions, Text } from 'react-native';
// Import Color de const, para usar las constantes de colores
import { Color } from "../../assets/const/color";
// Import ComboBox de combobox
import ComboBox from '../combobox/ComboBox';
// Import DatePicker de pickers
import DatePicker from '../pickers/datePicker';
// Import de StateButtom de filter
import StateButton from './stateButton';

const { height } = Dimensions.get('window');

const DocumentFilter = ({ visible, onClose }) => {
    // Declara una animación utilizando useRef y Animated.Value
    const translateY = useRef(new Animated.Value(height)).current;
    // Opciones de permisos y tipos de sub-permisos
    const permissions = ['Vacation','Medical Leave'];
    const sub_permissions = ['ISSS','Private','Vacations'];
    // Iconos para diferentes estados
    const iconCanceled = "M27.0212 0.771429C26.2401 -0.0096203 24.9738 -0.00961962 24.1927 0.771428L16.0391 8.92509C15.258 9.70614 13.9917 9.70614 13.2107 8.92509L5.057 0.77143C4.27595 -0.00961874 3.00962 -0.00961895 2.22857 0.771429L1.3963 1.6037C0.615253 2.38475 0.615253 3.65108 1.3963 4.43213L9.54996 12.5858C10.331 13.3668 10.331 14.6332 9.54996 15.4142L1.3963 23.5679C0.615254 24.3489 0.615253 25.6153 1.3963 26.3963L2.22857 27.2286C3.00962 28.0096 4.27595 28.0096 5.057 27.2286L13.2107 19.0749C13.9917 18.2939 15.258 18.2939 16.0391 19.0749L24.1927 27.2286C24.9738 28.0096 26.2401 28.0096 27.0212 27.2286L27.8534 26.3963C28.6345 25.6153 28.6345 24.3489 27.8534 23.5679L19.6998 15.4142C18.9187 14.6332 18.9187 13.3668 19.6998 12.5858L27.8534 4.43212C28.6345 3.65108 28.6345 2.38475 27.8534 1.6037L27.0212 0.771429Z";
    const iconAccepted = "M12.5374 18.6576C11.752 19.4661 10.4539 19.4661 9.6685 18.6576L4.76982 13.6156C3.98437 12.8072 2.68636 12.8072 1.90091 13.6156L1.35406 14.1785C0.599999 14.9546 0.599998 16.1897 1.35406 16.9658L9.6685 25.5236C10.4539 26.332 11.752 26.332 12.5374 25.5236L32.6459 4.82664C33.4 4.05052 33.4 2.81541 32.6459 2.03929L32.0991 1.47643C31.3136 0.667998 30.0156 0.667998 29.2302 1.47643L12.5374 18.6576Z";
    const iconPending = "M15.5024 2.77477C7.71207 2.77477 1.1291 9.46735 1.1291 17.3874C1.1291 25.3074 7.71207 32 15.5024 32C23.2943 32 29.8757 25.3074 29.8757 17.3874C29.8757 9.46735 23.2943 2.77477 15.5024 2.77477ZM23.4876 17.3874C23.4876 18.2841 22.7606 19.011 21.8639 19.011H15.9054C14.8008 19.011 13.9054 18.1156 13.9054 17.011V10.8663C13.9054 9.98429 14.6204 9.26927 15.5024 9.26927C16.3844 9.26927 17.0994 9.98428 17.0994 10.8663V13.7638C17.0994 14.8683 17.9949 15.7638 19.0994 15.7638H21.8639C22.7606 15.7638 23.4876 16.4907 23.4876 17.3874ZM29.8912 6.0021C29.2613 6.6448 28.2269 6.64657 27.5947 6.00604L25.0506 3.42809C24.4331 2.80243 24.4314 1.79723 25.0467 1.16945C25.6766 0.526748 26.711 0.524973 27.3432 1.16551L29.8874 3.74346C30.5048 4.36912 30.5065 5.37432 29.8912 6.0021ZM3.62747 1.17391C4.25742 0.531327 5.29163 0.529369 5.92401 1.16956C6.54219 1.79537 6.5441 2.80136 5.92829 3.42951L3.40986 5.99843C2.7796 6.64134 1.74477 6.64293 1.11252 6.00197C0.495099 5.37604 0.49355 4.37067 1.10904 3.74284L3.62747 1.17391Z";

    // Efecto de animación para mostrar u ocultar la hoja inferior
    React.useEffect(() => {
        if (visible) {
            Animated.spring(translateY, {
                toValue: height / 2,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(translateY, {
                toValue: height,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    // Renderizado condicional basado en la visibilidad
    return ( visible && 
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
            <TouchableOpacity style={styles.overlay} onPress={onClose}/>
                <View style={styles.bottomSheet}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Filters</Text>
                    </View>
                    <View style={styles.body}>
                        <ComboBox label={"PERMISSION TYPE"} placeholder={"Select an option"} options={permissions}></ComboBox>
                        <ComboBox label={"SUB-PERMISSION TYPE"} placeholder={"Select an option"} options={sub_permissions}></ComboBox>
                        <DatePicker label={"From: "} style={styles.date}></DatePicker>
                        <DatePicker label={"To: "} style={styles.date}></DatePicker>
                        <View style={styles.btnContainer}>
                        <StateButton 
                                icon={iconCanceled} 
                                defaultSvgColor={'#4292F6'} 
                                selectedSvgColor={Color.colorBtnIcon3} 
                                defaultBgColor={'transparent'} 
                                selectedBgColor={Color.colorRejected}
                            />
                            <StateButton 
                                icon={iconAccepted} 
                                defaultSvgColor={'#4292F6'} 
                                selectedSvgColor={Color.colorBtnIcon3} 
                                defaultBgColor={'transparent'} 
                                selectedBgColor={Color.colorAccepted}
                            />
                            <StateButton 
                                icon={iconPending} 
                                defaultSvgColor={'#4292F6'} 
                                selectedSvgColor={Color.colorBtnIcon3} 
                                defaultBgColor={'transparent'} 
                                selectedBgColor={Color.colorPending}
                            />
                        </View>
                    </View>
                </View>
        </Animated.View>
    );
};

// Estilos para el componente BottomSheet
const styles = StyleSheet.create({
    btnContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center", // Centra los elementos horizontalmente
    },
    body: {
        display:"flex",
        flexDirection:"column",
        justifyContent: "center", // Centra los elementos verticalmente
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center", // Centra los elementos horizontalmente
    },
    title:{
        fontFamily: "Poppins-Bold", // Fuente en negrita Poppins
        fontSize: 24, // Tamaño de fuente de 24 unidades
        color: "#4292F6", // Color azul
    },
    btnExit:{
        alignContent: "flex-end", // Alinea el contenido al extremo derecho
    },
    container: {
        position: 'absolute', // Posicionamiento absoluto
        top: 0,
        left: 0,
        right: 0,
        height: '100%', // Ocupa toda la altura disponible
        justifyContent: 'flex-end', // Alinea el contenido al final del contenedor
        zIndex: 1000, // Índice de apilamiento alto para estar sobre otros elementos
        backgroundColor: Color.backgroundColor, // Color de fondo desde una constante de color
    },
    overlay: {
        flex: 1, // Ocupa todo el espacio disponible
        backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo completamente transparente
    },
    bottomSheet: {
        height: '80%', // Altura del 80% de la pantalla
        backgroundColor: 'white', // Fondo blanco
        borderTopLeftRadius: 20, // Esquina superior izquierda redondeada
        borderTopRightRadius: 20, // Esquina superior derecha redondeada
        padding: 20, // Relleno interno de 20 unidades
        marginBottom: 250, // Margen inferior para evitar superposiciones
    },
});

// Exportar el componente BottomSheet como el componente predeterminado
export default DocumentFilter;
