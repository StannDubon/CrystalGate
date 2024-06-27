import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import { Color } from "../assets/const/color";
import HeaderSingle from "../components/header/headerSigle";
import FilterButton from "../components/button/filterButton";
import PermissionCard from "./cards/permissionCard";
import NotificationCard from "./cards/notificationCard";
import BottomSheet from "./filter/bottomSheet";
import SegmentedControl from "./button/historyButton";

const History = () => {
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

    const toggleWidget = () => {
        setVisible(!visible);
    };

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: Color.colorBackground,
        marginBottom: 100,
    },
    filterButton:{
        backgroundColor: "#D9E4FF",
        borderCurve: 3,
    },
    filterContainer:{
        display: "flex",
        alignItems: "flex-start",
    },
    filterText:{
        fontSize: 13,
        color: "#4292F6",
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
        paddingVertical: 20, 
    },
});

export default History;
