import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Color } from "../assets/const/color";
import HeaderSingle from "./header/headerSigle";
import PermissionCard from "./cards/permissionCard";
import NotificationCard from "./cards/notificationCard";
import fetchData from "./utils/database";
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation();
    const [permissions, setPermissions] = useState([]);
    const [notifications, setNotifications] = useState([]); // Estado de notificaciones
    const [refreshing, setRefreshing] = useState(false);

    const getData = async () => {
        try {           
            const permissionsData = await fetchData("permiso", "readAllByCostumerPending");
            if (permissionsData.status) {
                setPermissions(permissionsData.dataset);
            } else {
                setPermissions([]);
            }

            // Obtener notificaciones (ejemplo de fetchData)
            const notificationsData = await fetchData("notificacion", "readAllByUser");
            console.log(notificationsData);
            if (notificationsData.status) {
                setNotifications(notificationsData.dataset);
            } else {
                setNotifications([]);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };

    const firstFiveNotifications = notifications.slice(0, 5);

    return (
        <View style={styles.container}>
            <HeaderSingle title={"Hey Climber!"} subtitle={"Dashboard"} />
            
            {/* Sección de Notificaciones */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionLeft}>
                    <Svg    width="30"
                            height="30"
                            fill="#98ADE3"
                            xmlns="http://www.w3.org/2000/svg"
                            style={styles.iconFile}
                            >
                    <Path d="M12 23a2 2 0 0 0 2-2H10A2 2 0 0 0 12 23zM4 19H20a1 1 0 0 0 .707-1.707L19 15.586V10a7.006 7.006 0 0 0-6-6.92V2a1 1 0 0 0-2 0V3.08A7.006 7.006 0 0 0 5 10v5.586L3.293 17.293A1 1 0 0 0 4 19zm2.707-2.293A1 1 0 0 0 7 16V10a5 5 0 0 1 10 0v6a1 1 0 0 0 .293.707l.293.293H6.414z"
                    fill="#98ADE3"/>
                    </Svg>
                    <Text style={styles.textSection}>Notifications</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AllNotifications')}>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            </View>

            {notifications.length === 0 ? (
                <Text style={styles.noNotificationsText}>
                    You don't have any notifications
                </Text>
            ) : (
                <ScrollView 
                    horizontal
                    contentContainerStyle={styles.notificationsContainer}
                    style={styles.notificationsScrollView}
                    showsHorizontalScrollIndicator={false}>
                    {firstFiveNotifications.map((notification) => (
                        <NotificationCard
                            type={notification.tipo_notificacion}
                            message={notification.descripcion}
                            datetime={notification.fecha_envio}
                            id={notification.detalles}
                            onPress={
                                notification.tipo_notificacion === "1" || notification.tipo_notificacion === "2"?
                                () => navigation.navigate('PermissionDetail', { id: notification.detalles }) :
                                () => navigation.navigate('DocumentationDetail', { id: notification.detalles })
                            }
                        ></NotificationCard>
                    ))}
                </ScrollView>
            )}

            {/* Sección de Permisos */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionLeft}>
                    <Svg
                        width="30"
                        height="30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={styles.iconFile}
                    >
                        <Path
                            d="M13.5021 2.34121C6.71696 2.34121 0.983411 7.98808 0.983411 14.6706C0.983411 21.3531 6.71696 27 13.5021 27C20.2886 27 26.0208 21.3531 26.0208 14.6706C26.0208 7.98808 20.2886 2.34121 13.5021 2.34121ZM20.4569 14.6706C20.4569 15.4272 19.8436 16.0405 19.087 16.0405H14.1111C13.0066 16.0405 12.1111 15.1451 12.1111 14.0405V9.21191C12.1111 8.4437 12.7339 7.82094 13.5021 7.82094C14.2703 7.82094 14.893 8.4437 14.893 9.21191V11.3007C14.893 12.4052 15.7885 13.3007 16.893 13.3007H19.087C19.8436 13.3007 20.4569 13.914 20.4569 14.6706ZM26.0031 5.09508C25.4666 5.62534 24.6038 5.62682 24.0655 5.0984L21.8494 2.92305C21.2994 2.38321 21.2979 1.49764 21.846 0.955911C22.3825 0.425652 23.2453 0.424172 23.7836 0.952588L25.9997 3.12794C26.5497 3.66779 26.5512 4.55335 26.0031 5.09508ZM3.19048 0.959784C3.72704 0.429572 4.58975 0.427938 5.12832 0.956113C5.67896 1.49613 5.68064 2.38248 5.13205 2.92458L2.93879 5.0919C2.40196 5.62238 1.53872 5.62371 1.00026 5.09489C0.450271 4.55475 0.448905 3.66894 0.997225 3.1271L3.19048 0.959784Z"
                            fill="#98ADE3"
                        />
                    </Svg>
                    <Text style={styles.textSection}>PENDING</Text>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={styles.permissionContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {permissions.length === 0 ? (
                    <Text style={styles.noPermissionsText}>
                        You don't have pending permissions
                    </Text>
                ) : (
                    permissions.map((item) => (
                        <PermissionCard
                            key={item.id_permiso}
                            title={item.tipo_permiso}
                            type={item.estado}
                            dateBegin={item.fecha_inicio}
                            dateEnd={item.fecha_final}
                            onPress={() => navigation.navigate('PermissionDetail', { id: item.id_permiso })}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Color.colorBackground,
    },
    sectionContainer: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    textSection: {
        color: "#98ADE3",
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    seeAllText: {
        color: "#98ADE3",
        fontSize: 14,
        fontWeight: "bold",
    },
    iconBell: {
        marginRight: 10,
    },
    notificationsContainer: {
        flexDirection: "row", // Colocar las notificaciones en fila
        paddingHorizontal: 20,
    },
    notificationsScrollView: {
        marginLeft: 20, // Desplazar el ScrollView a la derecha
    },
    noNotificationsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#98ADE3",
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    permissionContainer: {
        alignItems: 'center',
        backgroundColor: Color.colorBackground,
        paddingBottom: 100,
    },
    noPermissionsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#98ADE3",
        textAlign: 'center',
        marginTop: 10,
    },
    notificationItem: {
        backgroundColor: "#f0f0f0",
        marginRight: 15,
        padding: 10,
        borderRadius: 8,
        width: 120,
    },
    notificationText: {
        fontSize: 12,
        color: "#333",
    },
});

export default Dashboard;
