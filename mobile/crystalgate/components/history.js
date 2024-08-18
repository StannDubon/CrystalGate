import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import { Color } from "../assets/const/color";
// Importa el componente HeaderSingle para el encabezado
import HeaderSingle from "../components/header/headerSigle";
// Importa el botón FilterButton
import FilterButton from "../components/button/filterButton";
// Importa el componente PermissionCard para las tarjetas de permisos
import PermissionCard from "./cards/permissionCard";
import NotificationCard from "./cards/notificationCard";
import DocumentCard from "./cards/documentCard";
import BottomSheet from "./filter/bottomSheet";
import SegmentedControl from "./button/historyButton";
import fetchData from "./utils/database";

const History = () => {
    // Estado para controlar la visibilidad de la hoja inferior
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [permissions, setPermissions] = useState([]);
    const [documents, setDocuments] = useState([]);

    const getData = async () => {
        try {
            
            // Fetch permisos
            const permissionsData = await fetchData("permiso", "readAllByCostumer");
            if (permissionsData.status) {
                setPermissions(permissionsData.dataset);
            } else {
                alert("Error fetching permissions: " + permissionsData.error);
            }

            // Fetch peticiones (documentos)
            const documentsData = await fetchData("peticion", "readAllByCostumer");
            if (documentsData.status) {
                setDocuments(documentsData.dataset);
            } else {
                console.error("Error fetching documents:", documentsData.error);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Función para alternar la visibilidad de la hoja inferior
    const toggleWidget = () => {
        setVisible(!visible);
    };

    // Renderizado del componente
    return (
        <View style={styles.container}>
            <HeaderSingle title={"Your Journey"} subtitle={"History"}/>
            <SegmentedControl 
                options={['Permissions', 'Documents']}
                onChange={(index) => setSelectedIndex(index)}
            />
            <View style={styles.filterContainer}>
                <FilterButton onPress={toggleWidget}></FilterButton>
            </View>
            <ScrollView contentContainerStyle={styles.permissionContainer}>
                {selectedIndex === 0 ? (
                    permissions.map((item) => (
                        <PermissionCard
                            key={item.id_permiso}
                            title={item.tipo_permiso}
                            type={item.estado}
                            dateBegin={item.fecha_inicio}
                            dateEnd={item.fecha_final}
                        />
                    ))
                ) : (
                    documents.map((item) => (
                        <DocumentCard
                            key={item.id_peticion}
                            title={item.tipo_peticion}
                            dateSend={item.fecha_envio}
                            Language={item.idioma}                            
                            type={item.modo_entrega}
                        />
                    ))
                )}
            </ScrollView>
            <BottomSheet visible={visible} onClose={toggleWidget} />
        </View>
    );
};

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa todo el espacio disponible
        display: "flex",
        flexDirection: "column",
        backgroundColor: Color.colorBackground, // Color de fondo usando una constante de color
        marginBottom: 100, // Margen inferior adicional
    },
    filterButton:{
        backgroundColor: "#D9E4FF", // Color de fondo del botón (no parece estar en uso)
        borderCurve: 3, // Estilo del borde del botón (no es una propiedad válida)
    },
    filterContainer:{
        display: "flex",
        alignItems: "flex-start", // Alineación de los elementos hacia la izquierda
    },
    filterText:{
        fontSize: 13, // Tamaño de fuente del texto del filtro
        color: "#4292F6", // Color del texto del filtro
    },
    permissionContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.colorBackground,
        marginBottom: 150,
    },
    flatListContainerPermission: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20, // Espaciado vertical dentro del contenedor de la FlatList
    },
});

// Exporta el componente History
export default History;
