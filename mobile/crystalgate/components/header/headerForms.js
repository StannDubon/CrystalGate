import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Importación de los colores desde un archivo de constantes
import { Color } from "../../assets/const/color";
// Componente de botón de retroceso
import BackButtonForm from "../button/button-back-form";
// Hook para la navegación en React Navigation
import { useNavigation } from '@react-navigation/native';

// Componente funcional HeaderForms que recibe props 'title' y 'href'
const HeaderForms = ({title, href}) => {
    // Obtenemos el objeto de navegación de React Navigation
    const navigation = useNavigation();
    
    // Función para manejar el botón de retroceso
    const handleBack = () => {
        // Navegamos a la ruta especificada por 'href'
        navigation.navigate(href);
    };

    // Renderizado del componente
    return (
        <View style={styles.header}>
            <BackButtonForm onPress={handleBack}/>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            
        </View>
    );
};

// Estilos definidos utilizando StyleSheet.create
const styles = StyleSheet.create({
    header: {
        display: "flex", // Establece el contenedor como flexible
        flexDirection: "row", // Los elementos hijos se colocan en una fila
        backgroundColor: Color.colorHeader, // Color de fondo obtenido de la constante Color.colorHeader
        justifyContent: "flex-start", // Alinea los elementos al inicio horizontalmente
        alignItems: "center", // Alinea los elementos al centro verticalmente
        marginTop: 0, // Margen superior de 0 unidades
        paddingHorizontal: 20, // Relleno horizontal de 20 unidades
        width: 390, // Ancho del contenedor de 390 unidades
        height: 100, // Altura del contenedor de 100 unidades
        paddingTop: 20, // Relleno superior de 20 unidades
    },
    titleContainer:{
        display: "flex", // Establece el contenedor como flexible
        flexDirection: "row", // Los elementos hijos se colocan en una fila
        backgroundColor: Color.colorHeader, // Color de fondo obtenido de la constante Color.colorHeader
        justifyContent: "flex-start", // Alinea los elementos al inicio horizontalmente
        alignItems: "left", // Alinea los elementos a la izquierda verticalmente
        marginTop: 1, // Margen superior de 1 unidad
        paddingHorizontal: 30, // Relleno horizontal de 30 unidades
    },
    title: {
        fontFamily: "Poppins-Bold", // Fuente del texto en negrita
        fontWeight: "bold", // Peso de la fuente en negrita
        fontSize: 24, // Tamaño de fuente de 24 unidades
        color: Color.colorfont1, // Color del texto obtenido de la constante Color.colorfont1
    },
});

// Exportar el componente HeaderForms como el componente predeterminado
export default HeaderForms;
