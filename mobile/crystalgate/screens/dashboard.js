import { View, Text, ScrollView } from "react-native";
import React from "react";
// Importación del componente Dashboard desde la carpeta '../components'
import Dashboard from "../components/dashboard";

// Definición del componente funcional DashboardScreen
export default function DashboardScreen() {
    return (
        <ScrollView>
            <Dashboard></Dashboard>
        </ScrollView>
    );
}
