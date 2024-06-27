import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";
// Import Color de const, para usar las constantes de colores
import { Color } from "../../assets/const/color";

// Definición del componente funcional HeaderSingle
const HeaderSingle = ({title, subtitle}) => {
    // Renderizado del componente
    return (
        <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle ? (
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    ) : null}
                </View>
                <Svg
                    width="85"
                    height="65"
                    viewBox="0 0 227 177"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <Path
                        d="M187.42 176.944L132.707 88.4718H119.902L93.1279 46.5641L119.902 0L227 176.944H187.42Z"
                        fill="#3F91FD"
                    />
                    <Path
                        d="M0 176.944L39.5795 111.754L79.4754 176.944H0Z"
                        fill="#3229B1"
                    />
                    <Path
                        d="M91.9637 176.944L67.5176 138.528H55.8765L39.5791 111.754L67.5176 65.1897L135.036 176.944H91.9637Z"
                        fill="#3452D3"
                    />
                    <Path
                        d="M135.036 176.944L74.5029 76.8308L93.1286 46.5641L176.944 176.944H135.036Z"
                        fill="#3229B1"
                    />
                </Svg>
        </View>
    );
};

// Definición de los estilos usando StyleSheet.create
const styles = StyleSheet.create({
    headerContainer:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Color.colorHeader, // Color de fondo del encabezado obtenido de Color.colorHeader
        justifyContent: "space-between", // Espacio distribuido uniformemente entre los elementos hijos
        alignItems: "center", // Alinea los elementos al centro verticalmente
        marginTop: 0,
        paddingHorizontal: 20,
        width: 390,
        height: 100,
        paddingTop: 20,
    },
    titleContainer:{
        display: "flex",
        flexDirection: "column", // Los elementos se colocan en una columna
        backgroundColor: Color.colorHeader, // Color de fondo del contenedor del título
        justifyContent: "space-between", // Espacio distribuido uniformemente entre los elementos hijos
        alignItems: "left", // Alinea los elementos a la izquierda
        marginTop: 0,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: "Poppins-Bold", // Fuente en negrita
        fontWeight: "bold", // Peso de la fuente en negrita
        fontSize: 24, // Tamaño de la fuente
        color: Color.colorfont1, // Color del texto obtenido de Color.colorfont1
    },
    subtitle: {
        fontFamily: "Poppins-Regular", // Fuente regular
        fontSize: 24, // Tamaño de la fuente
        fontWeight: "normal", // Peso de la fuente normal
        color: "#4292F6", // Color del subtítulo
        textAlign: "begin", // Alineación del texto al inicio
    }
});

// Exportar el componente HeaderSingle como el componente predeterminado
export default HeaderSingle;
