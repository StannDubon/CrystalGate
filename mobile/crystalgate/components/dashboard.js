import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Color } from "../assets/const/color";
import HeaderSingle from "./header/headerSigle";
import NotificationCard from "./cards/notificationCard";
import PermissionCard from "./cards/permissionCard";

const Dashboard = () => {

  const data = [
    { id: '1', title: 'Notification 1', type: 1, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
    { id: '2', title: 'Notification 2', type: 1, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
    { id: '3', title: 'Notification 3', type: 2, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
    { id: '4', title: 'Notification 4', type: 1, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
    { id: '5', title: 'Notification 5', type: 2, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
  ];

  const permissions = [
    { id: '1', title: 'Permission 1', type: 3, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
    { id: '2', title: 'Permission 2', type: 3, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
    { id: '3', title: 'Permission 3', type: 3, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
    { id: '4', title: 'Permission 4', type: 3, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
    { id: '5', title: 'Permission 5', type: 3, dateBegin: "31-12-2024", dateEnd: "31-12-2024"},
  ];

  const renderNotification = ({ item }) => (
    <NotificationCard title={item.title} type={item.type} dateBegin={item.dateBegin} dateEnd={item.dateEnd}/>
  );

  const renderPermission = ({ item }) => (
    <PermissionCard title={item.title} type={item.type} dateBegin={item.dateBegin} dateEnd={item.dateEnd}/>
  );

    return (
        <View style={styles.container}>
            <HeaderSingle title={"Hey Climber!"} subtitle={"Dashboard"}/>
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
                            d="M13.5 30C14.4289 30.0012 15.3352 29.7129 16.0927 29.1752C16.8503 28.6376 17.4215 27.8773 17.727 27H9.273C9.57849 27.8773 10.1497 28.6376 10.9073 29.1752C11.6648 29.7129 12.5711 30.0012 13.5 30ZM24 18.879V12C24 7.1745 20.7225 3.1095 16.2825 1.887C15.843 0.78 14.769 0 13.5 0C12.231 0 11.157 0.78 10.7175 1.887C6.2775 3.111 3 7.1745 3 12V18.879L0.439501 21.4395C0.299938 21.5786 0.189256 21.7438 0.113828 21.9259C0.0384002 22.1079 -0.000284174 22.303 1.57151e-06 22.5V24C1.57151e-06 24.3978 0.158037 24.7794 0.439341 25.0607C0.720646 25.342 1.10218 25.5 1.5 25.5H25.5C25.8978 25.5 26.2794 25.342 26.5607 25.0607C26.842 24.7794 27 24.3978 27 24V22.5C27.0003 22.303 26.9616 22.1079 26.8862 21.9259C26.8107 21.7438 26.7001 21.5786 26.5605 21.4395L24 18.879Z"
                            fill="#98ADE3"
                        />
                    </Svg>
                    <Text style={styles.textSection}>NOTIFICATIONS</Text>
                </View>

                <View style={styles.notificationContainer}>
                    <FlatList
                      data={data}
                      renderItem={renderNotification}
                      keyExtractor={item => item.id}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.flatListContainerNotifications}
                    />
                </View>

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
                <ScrollView contentContainerStyle={styles.permissionContainer}>
                {permissions.map((item) => (
                    <PermissionCard
                        key={item.id}
                        title={item.title}
                        type={item.type}
                        dateBegin={item.dateBegin}
                        dateEnd={item.dateEnd}
                    />
                ))}
            </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.colorBackground,
    },
    permissionContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.colorBackground,
        marginBottom: 100,
    },
    flatListContainerNotifications: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20, 
    },
    flatListContainerPermission: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20, 
    },
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: Color.colorBackground,
    },
    dasboardContainer:{
        margin: 20,
        display: "flex",
        flexDirection: "column",
    },  
    sectionContainer:{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-start",
    },
    textSection:{
        color: "#98ADE3",
        marginLeft: 20,
        alignSelf: "center",
    }
});

export default Dashboard;
