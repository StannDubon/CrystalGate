import { View, Text, ScrollView } from "react-native";
import React from "react";
// Importación del componente PermissionRequest desde la carpeta '../components'
import PermissionRequest from "../components/permissionRequest";

// Definición del componente funcional CreatePermissionScreen
export default function CreatePermissionScreen() {
    return (
        // Devuelve un componente ScrollView como contenedor principal
        // Este archivo se encarga de inicializar el componente, promoviendo una estructura organizada, reutilizable y fácil de mantener para la interfaz
        <ScrollView>
            <PermissionRequest></PermissionRequest>
        </ScrollView>
    );
}
