import { View, Text, ScrollView } from "react-native";
import React from "react";
// Importación del componente Dashboard desde la carpeta '../components'
import DocumentationDetail from "../components/documentation-detail";

// Definición del componente funcional DashboardScreen
export default function DocumentationDetailScreen() {
    return (
        <ScrollView>
            <DocumentationDetail></DocumentationDetail>
        </ScrollView>
    );
}
