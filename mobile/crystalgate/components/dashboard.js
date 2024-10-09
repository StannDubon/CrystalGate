import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Color } from "../assets/const/color";
import HeaderSingle from "./header/headerSigle";
import PermissionCard from "./cards/permissionCard";
import fetchData from "./utils/database";
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation();
    const [permissions, setPermissions] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Estado para el refresco

    const getData = async () => {
        try {           
            // Fetch permisos
            const permissionsData = await fetchData("permiso", "readAllByCostumerPending");
            if (permissionsData.status) {
                setPermissions(permissionsData.dataset);
            } else {
                alert("You don't have pending permissions ");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Función de refresco
    const onRefresh = async () => {
        setRefreshing(true);
        await getData(); // Refrescar los datos
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <HeaderSingle title={"Hey Climber!"} subtitle={"Dashboard"} />
            <View style={styles.dasboardContainer}>
                <View style={styles.sectionContainer}>
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
                <ScrollView
                    contentContainerStyle={styles.permissionContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {permissions.map((item) => (
                        <PermissionCard
                            key={item.id_permiso}
                            title={item.tipo_permiso}
                            type={item.estado}
                            dateBegin={item.fecha_inicio}
                            dateEnd={item.fecha_final}
                            onPress={() => navigation.navigate('PermissionDetail', { id: item.id_permiso })}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Color.colorBackground,
    },
    dasboardContainer: {
        margin: 20,
        flexDirection: "column",
    },  
    sectionContainer: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    textSection: {
        color: "#98ADE3",
        marginLeft: 20,
    },
    permissionContainer: {
        alignItems: 'center',
        backgroundColor: Color.colorBackground,
        paddingBottom: 100, // Añade un espacio inferior para evitar que quede muy ajustado al final
    },
});

export default Dashboard;