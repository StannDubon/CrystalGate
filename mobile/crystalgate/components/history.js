import React, { useState } from "react";
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
import BottomSheet from "./filter/bottomSheet";
import SegmentedControl from "./button/historyButton";

const History = () => {
    // Estado para controlar la visibilidad de la hoja inferior
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const permissions = [
        { id: '1', title: 'Permission 1', type: 3, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
        { id: '2', title: 'Permission 2', type: 3, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
        { id: '3', title: 'Permission 3', type: 1, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
        { id: '4', title: 'Permission 4', type: 3, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
        { id: '5', title: 'Permission 5', type: 2, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
    ];

    const documents = [
        { id: '1', title: 'Document 1', type: 1, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
        { id: '2', title: 'Document 2', type: 1, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
        { id: '3', title: 'Document 3', type: 2, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
        { id: '4', title: 'Document 4', type: 1, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
        { id: '5', title: 'Document 5', type: 2, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
    ];

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
                            key={item.id}
                            title={item.title}
                            type={item.type}
                            dateBegin={item.dateBegin}
                            dateEnd={item.dateEnd}
                        />
                    ))
                ) : (
                    documents.map((item) => (
                        <NotificationCard
                            key={item.id}
                            title={item.title}
                            type={item.type}
                            dateBegin={item.dateBegin}
                            dateEnd={item.dateEnd}
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
