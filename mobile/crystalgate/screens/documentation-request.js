import { View, Text, ScrollView } from "react-native";
import React from "react";
// Importación del componente DocumentationRequest desde la carpeta '../components'
import DocumentationRequest from "../components/documentationRequest";

// Definición del componente funcional DocumentationRequestScreen
export default function DocumentationRequestScreen() {
    return (
        // Devuelve un componente ScrollView como contenedor principal
        // Este archivo se encarga de inicializar el componente, promoviendo una estructura organizada, reutilizable y fácil de mantener para la interfaz
        <ScrollView>
            <DocumentationRequest />
        </ScrollView>
    );
}
