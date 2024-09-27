import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    RefreshControl
} from "react-native";
import { Color } from "../assets/const/color";
// Importa el componente HeaderSingle para el encabezado
import HeaderSingle from "../components/header/headerSigle";
// Importa el botón FilterButton
import FilterButton from "../components/button/filterButton";
// Importa el componente PermissionCard para las tarjetas de permisos
import PermissionCard from "./cards/permissionCard";
import DocumentCard from "./cards/documentCard";
import BottomSheet from "./filter/bottomSheetPermission";
import BottomSheetDocument from "./filter/bottomSheetDocument";
import SegmentedControl from "./button/historyButton";
import fetchData from "./utils/database";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const History = () => {
    const navigation = useNavigation();
    // Estado para controlar la visibilidad de la hoja inferior
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [permissions, setPermissions] = useState([]);
    const [documents, setDocuments] = useState([]);
    
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    //Para Documents
    const [selectedRequestType, setSelectedRequestType] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedDeliverCenter, setSelectedDeliverCenter] = useState('');

    //Para Permisos
    const [selectedSubType, setSelectedSubType] = useState('');
    const [selectedStatePending, setSelectedStatePending] = useState('');
    const [selectedStateAccepted, setSelectedStateAccepted] = useState('');
    const [selectedStateRejected, setSelectedStateRejected] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    //Para recargar
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = async () => {
        setIsRefreshing(true);  // Activar la animación de actualización
    
        try {
            // Aquí llamas a tu función para obtener los datos
            await getData();
        } catch (error) {
            console.error("Error refreshing data:", error);
        } finally {
            setIsRefreshing(false);  // Detener la animación de actualización
        }
    };
    

    const getFilteredData = async () => {
        try {
            const formData = new FormData();
            formData.append('idTipoPeticion', selectedRequestType);
            formData.append('idIdioma', selectedLanguage);
            formData.append('idCentroEntrega',selectedDeliverCenter);
            //console.log(formData);
            
            const filteredData = await fetchData("peticion", "searchRowsByCostumer", formData);

            if (filteredData.status) {
                setDocuments(filteredData.dataset);  // Actualiza los datos filtrados
            } else {
                setDocuments([]);

            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getFilteredDataPermission = async () => {
        try {
            const formData = new FormData();
            formData.append('idTipoPermiso', selectedSubType);
            formData.append('fechaInicio', startDate);
            formData.append('fechaFinal', endDate);
            formData.append('estadoPendiente', selectedStatePending);
            formData.append('estadoAceptado', selectedStateAccepted);  // Corregido
            formData.append('estadoRechazado', selectedStateRejected);
            //console.log(formData);
    
            const filteredData2 = await fetchData("permiso", "searchRowsByCostumer", formData);
    
            if (filteredData2.status) {
                setPermissions(filteredData2.dataset);  // Actualiza permisos, no documentos
            } else {
                setPermissions([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    

    const getData = async () => {
        try {
            // Fetch permisos
            const permissionsData = await fetchData("permiso", "readAllByCostumer");
            if (permissionsData.status) {
                setPermissions(permissionsData.dataset);
            } else {
                alert("Error fetching permissions: " + permissionsData.error);
            }

            /* Fetch peticiones (documentos)*/
            const documentsData = await fetchData("peticion", "readAllByCostumer");
            if (documentsData.status) {
                setDocuments(documentsData.dataset);
            } else {
                setDocuments([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (selectedRequestType || selectedLanguage || selectedDeliverCenter) {
            getFilteredData();  // Llama a la función cuando cambian los filtros
        }
    }, [selectedRequestType, selectedLanguage, selectedDeliverCenter]);

    useEffect(() => {
        if(selectedSubType || startDate || endDate || selectedStatePending || selectedStateAccepted || selectedStateRejected){
            getFilteredDataPermission();
        }
    }, [selectedSubType, startDate, endDate, selectedStatePending, selectedStateAccepted, selectedStateRejected]);

    useEffect(() => {
        getData(selectedIndex);
        setVisible(false);
    }, [selectedIndex]);

    // Función para alternar la visibilidad de la hoja inferior
    const toggleWidget = () => {
        setVisible(!visible);
    };


    const handlePageChange = (direction) => {
        if (direction === 'next') {
            setCurrentPage(prevPage => prevPage + 1);
        } else {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const getPaginatedData = (data) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    };

    const paginatedPermissions = getPaginatedData(permissions);
    const paginatedDocuments = getPaginatedData(documents);

    const totalItems = selectedIndex === 0 ? permissions.length : documents.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const showPagination = totalItems > itemsPerPage;


    // Renderizado del componente    
    return (
        <View style={[styles.container, {height}]}>
            <HeaderSingle title={"Your Journey"} subtitle={"History"} />
            <SegmentedControl
                options={['Permissions', 'Documents']}
                onChange={(index) => {
                    setSelectedIndex(index);
                    setCurrentPage(1); // Reset page number when switching tabs
                }}
            />
            <View style={styles.filterContainer}>
                <FilterButton onPress={toggleWidget}></FilterButton>
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView
                    contentContainerStyle={styles.permissionContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}  // Llama a la función de actualización cuando se hace scroll hacia arriba
                        />
                    }
                >
                    {selectedIndex === 0 ? (
                        paginatedPermissions.map((item) => (
                            <PermissionCard
                                key={item.id_permiso}
                                title={item.tipo_permiso}
                                type={item.estado}
                                dateBegin={item.fecha_inicio}
                                dateEnd={item.fecha_final}
                                onPress={() => navigation.navigate('PermissionDetail', { id: item.id_permiso })}
                            />
                        ))
                    ) : (
                        paginatedDocuments.map((item) => (
                            <DocumentCard
                                key={item.id_peticion}
                                title={item.tipo_peticion}
                                dateSend={item.fecha_envio}
                                Language={item.idioma}
                                type={item.centro_entrega}
                                onPress={() => navigation.navigate('DocumentationDetail', { id: item.id_peticion })}
                            />
                        ))
                    )}

                    {showPagination && (
                        <View style={styles.paginationContainer}>
                            <TouchableOpacity
                                onPress={() => handlePageChange('prev')}
                                disabled={currentPage === 1}
                                style={styles.paginationButton}
                            >
                                <Svg
                                    width="17"
                                    height="25"
                                    viewBox="0 0 13 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ transform: [{ rotate: '180deg' }] }} // Rota el SVG 180 grados
                                >
                                    <Path
                                        d="M1.41373 1.59109C0.632905 2.37215 0.632969 3.63827 1.41388 4.41925L5.5801 8.58585C6.36106 9.36689 6.36106 10.6331 5.5801 11.4141L1.41388 15.5808C0.632969 16.3617 0.632906 17.6279 1.41373 18.4089L1.58983 18.5851C2.37097 19.3664 3.6377 19.3664 4.41878 18.585L11.5867 11.4139C12.3673 10.6329 12.3673 9.36707 11.5867 8.58609L4.41878 1.41504C3.6377 0.633617 2.37097 0.633574 1.58983 1.41494L1.41373 1.59109Z"
                                        fill="#4292F6"
                                    />
                                </Svg>
                            </TouchableOpacity>
                            <Text style={styles.pageInfo}>
                                {currentPage} / {totalPages}
                            </Text>
                            <TouchableOpacity
                                onPress={() => handlePageChange('next')}
                                disabled={currentPage === totalPages}
                                style={styles.paginationButton}
                            >
                                <Svg
                                    width="17"
                                    height="25"
                                    viewBox="0 0 13 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M1.41373 1.59109C0.632905 2.37215 0.632969 3.63827 1.41388 4.41925L5.5801 8.58585C6.36106 9.36689 6.36106 10.6331 5.5801 11.4141L1.41388 15.5808C0.632969 16.3617 0.632906 17.6279 1.41373 18.4089L1.58983 18.5851C2.37097 19.3664 3.6377 19.3664 4.41878 18.585L11.5867 11.4139C12.3673 10.6329 12.3673 9.36707 11.5867 8.58609L4.41878 1.41504C3.6377 0.633617 2.37097 0.633574 1.58983 1.41494L1.41373 1.59109Z"
                                        fill="#4292F6"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>

            </View>
            {selectedIndex === 0 ? (
                <BottomSheet visible={visible} onClose={toggleWidget} onFilterChange={(type, inicio, final, pending, accepted, rejected) => {
                    // >>>>>>>>>>>> Aquí se reciben los valores seleccionados del BottomSheet
                    setSelectedSubType(type);
                    setStartDate(inicio);
                    setEndDate(final);
                    setSelectedStatePending(pending);
                    setSelectedStateAccepted(accepted);
                    setSelectedStateRejected(rejected);
                }}/>
            ) : (
                <BottomSheetDocument visible={visible} onClose={toggleWidget} onFilterChange={(type, language, center) => {
                    // >>>>>>>>>>>> Aquí se reciben los valores seleccionados del BottomSheet
                    setSelectedRequestType(type);
                    setSelectedLanguage(language);
                    setSelectedDeliverCenter(center);
                }}/>
            )}
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
        marginBottom: 20,
    },
    scrollViewContainer: {
        flex: 1,  // Asegura que el contenedor del ScrollView ocupe todo el espacio restante
    },
    permissionContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',  // Cambiado de 'center' para evitar alineación central si hay pocas tarjetas
        alignItems: 'center',
        paddingBottom: 100,
        backgroundColor: Color.colorBackground,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 40,
        backgroundColor: "#D9E4FF",
        borderRadius: 10,
    },
    pageInfo: {
        fontSize: 16,
        color: "#4292F6",
        marginHorizontal: 20,
    },
});

// Exporta el componente History
export default History;
