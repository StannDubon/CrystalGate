import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
    Linking, 
    Platform,
} from "react-native";
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import { Color } from "../assets/const/color";
import { Path } from "./utils/path";
import HeaderForms from "./header/headerForms";
import InputText from "./input/InputText";
import TextArea from "./input/textArea";
import Banner from "./banner/banner-state";
import fetchData from './utils/database';
import { PermissionsAndroid} from 'react-native';

const PermissionDetail = ({ route }) => {
    const { id } = route.params;

    const [document, setDocument] = useState([]);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [horaFinal, setHoraFinal] = useState('');
    const [showEndDate, setShowEndDate] = useState(true); // Nuevo estado para controlar la visibilidad de la fecha final
    const [startDateLabel, setStartDateLabel] = useState("START DATE"); // Nuevo estado para cambiar el label de la fecha de inicio


    const getDocument = async () => {
        try {
            console.log(id);
            const form = new FormData();
            form.append("idPermiso", id);
            const DATA = await fetchData("permiso", "readOneAndDescription", form);

            if (DATA.status) {
                setDocument(DATA.dataset);
            } else {
                alert("Error fetching document request: " + DATA.error);
            }
        } catch (error) {
            console.error("Error fetching request:", error);
        }
    };
    useEffect(() => {
        getDocument();
    }, [id]);

    // Establecer fecha y hora una vez que el documento se haya actualizado
    useEffect(() => {
        if (document.fecha_envio) {
            const [newFecha, newHora] = document.fecha_envio.split(' ');
            setFecha(newFecha);
            setHora(newHora);
        }
        if (document.fecha_inicio) {
            const [newFechaInicio, newHoraInicio] = document.fecha_inicio.split(' ');
            setFechaInicio(newFechaInicio);
            setHoraInicio(newHoraInicio);
        }
        if (document.fecha_final) {
            const [newFechaFinal, newHoraFinal] = document.fecha_final.split(' ');
            setFechaFinal(newFechaFinal);
            setHoraFinal(newHoraFinal);
        }
    }, [document]);

    // Verificar si la fecha de inicio y la fecha final son iguales
    useEffect(() => {
        if (fechaInicio === fechaFinal) {
            setShowEndDate(false); // Ocultar la fecha final
            setStartDateLabel("DATE"); // Cambiar el label de fecha inicio a DATE
        } else {
            setShowEndDate(true); // Mostrar la fecha final si son diferentes
            setStartDateLabel("START DATE"); // Mantener el label de fecha inicio como START DATE
        }
    }, [fechaInicio, fechaFinal]);

    async function downloadFileFromApi() {
        console.log("entra");
        try {
            // Solicitar permiso para acceder al almacenamiento en Android
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Permiso de almacenamiento",
                        message: "La aplicación necesita acceso al almacenamiento para descargar archivos.",
                        buttonNeutral: "Preguntar luego",
                        buttonNegative: "Cancelar",
                        buttonPositive: "Aceptar"
                    }
                );
    
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert("Permiso denegado", "No se puede descargar el archivo sin permiso de almacenamiento.");
                    return;
                }
            }
    
            // Definir la ruta de descarga del archivo
            const downloadDest = `${RNFS.DocumentDirectoryPath}/${document.documento_permiso}`;
    
            // Descargar el archivo desde la API
            const downloadResult = await RNFS.downloadFile({
                fromUrl: `${Path.ruta}api/documents/permiso/${document.documento_permiso}`,
                toFile: downloadDest,
            }).promise;
    
            if (downloadResult.statusCode === 200) {
                Alert.alert("Descarga exitosa", `El archivo se descargó en: ${downloadDest}`);
            } else {
                Alert.alert("Error en la descarga", "No se pudo descargar el archivo.");
            }
        } catch (error) {
            Alert.alert("Error", `Hubo un error al descargar el archivo: ${error.message}`);
        }
    }

    const downloadAndOpenPDF = async () => {
        try {
            const uri = `${Path.ruta}api/documents/permiso/${document.documento_permiso}`;
            const fileUri = FileSystem.documentDirectory + document.documento_permiso;
        
            // Descargar el archivo PDF
            const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);
            Alert.alert('Descarga completada', `Archivo descargado a: ${localUri}`);
        
            // Abrir el archivo dependiendo de la plataforma
            if (Platform.OS === 'android') {
              // Android: Usa IntentLauncher para abrir el archivo con una app compatible
              const cts = await FileSystem.getContentUriAsync(localUri);
              IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                data: cts,
                flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
                type: 'application/pdf',
              });
            } else if (Platform.OS === 'ios') {
              // iOS: Usa Linking para abrir el archivo
              await Linking.openURL(localUri);
            }
          } catch (error) {
            Alert.alert('Error', 'Hubo un problema al descargar o abrir el archivo.');
            console.error(error);
          }
    };

    return (

        <View style={styles.container}>
            <HeaderForms title={"Permission Detail"} href={'History'} />
            <ScrollView
                contentContainerStyle={styles.formContainer}
            >
                <InputText label={"PERMISSION TYPE"} disabled={true} placeholder={document.clasificacion_permiso} />
                <InputText label={"SUB-PERMISSION TYPE"} disabled={true} placeholder={document.tipo_permiso} />
                <TextArea label={"DESCRIPTION"} disabled={true} placeholder={document.descripcion_permiso} />
                <InputText label={startDateLabel} disabled={true} placeholder={fechaInicio} />
                <InputText label={"START TIME"} disabled={true} placeholder={horaInicio} />
                {showEndDate && (
                    <>
                        <InputText label={"END DATE"} disabled={true} placeholder={fechaFinal} />
                    </>
                )}
                <InputText label={"END TIME"} disabled={true} placeholder={horaFinal} />
                <Text style={styles.downloadText}>DOCUMENT</Text>
                <TouchableOpacity onPress={downloadFileFromApi}>
                    <Text style={styles.sectionText}> ARCHIVO ENVIADO
                    </Text>
                </TouchableOpacity>
                <InputText label={"SHIPPING DATE"} disabled={true} placeholder={fecha} />
                <InputText label={"SHIPPING TIME"} disabled={true} placeholder={hora} />
                <Banner state={document.estado} description={document.descripcion} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: Color.colorBackground,
    },
    formContainer: {
        paddingBottom: 70,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    downloadText: {
        paddingTop: 20,  
        marginLeft:-260,
        color: "#98ADE3",
    },
    sectionText: {
        fontFamily: "Poppins-Regular", // Fuente de texto
        color: "#4292F6", // Color del texto
        paddingTop: 20, // Espacio adicional en la parte superior
        marginLeft:-150,
    },
});

export default PermissionDetail;
