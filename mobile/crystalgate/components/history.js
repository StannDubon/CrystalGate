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
        getData(selectedIndex);
    }, [selectedIndex]);

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
            <View style={styles.scrollViewContainer}>
                <ScrollView 
                    contentContainerStyle={styles.permissionContainer}
                >
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
            </View>
            <BottomSheet visible={visible} onClose={toggleWidget} />
        </View>
    );
};

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorBackground,
    },
    filterContainer: {
        alignItems: "flex-start",
        paddingHorizontal: 10,
    },
    scrollViewContainer: {
        flex: 1,  // Asegura que el contenedor del ScrollView ocupe todo el espacio restante
    },
    permissionContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',  // Cambiado de 'center' para evitar alineación central si hay pocas tarjetas
        alignItems: 'center',
        paddingBottom: 150,
        backgroundColor: Color.colorBackground,
    },
});

// Exporta el componente History
export default History;
