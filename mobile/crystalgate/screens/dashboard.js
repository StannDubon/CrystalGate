import { View, Text, ScrollView } from "react-native";
import React from "react";
// Importación del componente Dashboard desde la carpeta '../components'
import Dashboard from "../components/dashboard";

// Definición del componente funcional DashboardScreen
export default function DashboardScreen() {
    return (
        // Devuelve un componente ScrollView como contenedor principal
        // Este archivo se encarga de inicializar el componente, promoviendo una estructura organizada, reutilizable y fácil de mantener para la interfaz
        <ScrollView>
            <Dashboard></Dashboard>
        </ScrollView>
    );
}
