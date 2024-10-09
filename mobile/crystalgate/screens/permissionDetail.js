import { View, Text, ScrollView } from "react-native";
import React from "react";
// Importación del componente Dashboard desde la carpeta '../components'
import PermissionDetail from "../components/permission-detail";

// Definición del componente funcional DashboardScreen
export default function PermissionDetailScreen() {
    return (
        <ScrollView>
            <PermissionDetail></PermissionDetail>
        </ScrollView>
    );
}
