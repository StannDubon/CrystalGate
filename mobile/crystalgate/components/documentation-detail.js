import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import { Color } from "../assets/const/color";
import HeaderForms from "./header/headerForms";
import InputText from "./input/InputText";
import TextArea from "./input/textArea";
import Banner from "./banner/banner-state";
import fetchData from './utils/database';

const DocumentationDetail = ({ route }) => {
    const { id } = route.params;

    const [document, setDocument] = useState([]);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const getDocument = async () => {
        try {
            //console.log(id);
            const form = new FormData();
            form.append("idPeticion", id);
            const DATA = await fetchData("peticion", "readOne", form);

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
    }, [document]);

    return (

        <View style={styles.container}>
            <HeaderForms title={"Documentation Detail"} href={'History'} />
            <ScrollView
                contentContainerStyle={styles.formContainer}
            >
                <InputText label={"REQUEST TYPE"} disabled={true} placeholder={document.tipo_peticion} />
                <InputText label={"SEND BY"} disabled={true} placeholder={document.estado === 1 ? "Virtual" : "In-person"} />
                <InputText label={"DOCUMENT LANGUAGE"} disabled={true} placeholder={document.idioma} />
                <InputText label={"DELIVERY CENTER"} disabled={true} placeholder={document.centro_entrega} />
                <InputText label={"YOUR NAME"} disabled={true} placeholder={`${document.nombre} ${document.apellido}`} />
                <InputText label={"EMAIL"} disabled={true} placeholder={document.correo} />
                <InputText label={"PHONE NUMBER"} disabled={true} placeholder={document.telefono_contacto} />
                <TextArea label={"ADDRESS"} disabled={true} placeholder={document.direccion} />
                <InputText label={"SHIPPING DATE"} disabled={true} placeholder={fecha} />
                <InputText label={"SHIPPING TIME"} disabled={true} placeholder={hora} />
                <Banner state={document.estado} description={document.motivo}/>
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
});

export default DocumentationDetail;
