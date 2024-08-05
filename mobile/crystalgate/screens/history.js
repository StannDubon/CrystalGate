import { View, Text, ScrollView } from "react-native";
import React from "react";
// Importación del componente History desde la carpeta '../components'
import History from "../components/history";

// Definición del componente funcional HistoryScreen
export default function HistoryScreen() {
    return (
        // Devuelve un componente ScrollView como contenedor principal
        // Este archivo se encarga de inicializar el componente, promoviendo una estructura organizada, reutilizable y fácil de mantener para la interfaz
        <ScrollView>
            <History></History>
        </ScrollView>
    );
}
