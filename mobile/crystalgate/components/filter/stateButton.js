import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";
// Import Color de const, para usar las constantes de colores
import { Color } from "../../assets/const/color";

// Definición del componente funcional StateButton
const StateButton = ({ icon, defaultSvgColor, selectedSvgColor, defaultBgColor, selectedBgColor }) => {
    const [isSelected, setIsSelected] = useState(false);

    // Función para manejar el evento de presionar el botón
    const handlePress = () => {
        // Cambia el estado de isSelected al contrario del estado actual
        setIsSelected(!isSelected);
    };

    // Renderizado del componente
    return (
        <View style={styles.contenedor}>
        <TouchableOpacity onPress={handlePress} style={[styles.div, { backgroundColor: isSelected ? selectedBgColor : defaultBgColor, borderColor: isSelected ? Color.colorBtnIcon3 : Color.colorBtnAction }]}>
            <Svg
              width="37"
              height="37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={styles.btnIcon}
            >
              <Path
                  d={icon}
                  fill={isSelected ? selectedSvgColor : defaultSvgColor}
              />
            </Svg>
        </TouchableOpacity>
        </View>
    );
};

// Definición de los estilos usando StyleSheet.create
const styles = StyleSheet.create({
    contenedor:{
        paddingTop: 20, // Espaciado superior dentro del contenedor
        fontFamily: "Poppins-Regular", // Fuente Poppins regular
        fontSize: 20, // Tamaño de fuente 20
        fontWeight: "Medium", // Peso de la fuente medio
        height: 100, // Altura fija del contenedor (inicialmente se definió pero no se usa)
        with: "auto", // (Tiene un error tipográfico, debería ser "width" en lugar de "with")
    }, 
    div: {
        marginTop: 10, // Margen superior del botón
        borderWidth: 1.5, // Ancho del borde del botón
        textAlign: "center", // Alineación del texto dentro del botón (no se usa para SVG)
        alignItems: "center", // Alineación de los elementos secundarios en el eje principal
        alignContent: "center", // Alineación del contenido dentro del contenedor
        borderRadius: 8, // Radio de borde del botón
        height: 50, // Altura fija del botón
        width: 100, // Ancho fijo del botón
        marginHorizontal: 10, // Margen horizontal del botón
    },
    btnIcon:{
        alignContent: "center", // Alineación del contenido del SVG en el centro
        alignSelf: "center", // Alineación propia del SVG en el centro
        alignItems: "center", // Alineación de los elementos secundarios en el eje principal
        textAlign: "center", // Alineación del texto dentro del SVG (no se usa para SVG)
        marginTop: 8, // Margen superior del SVG dentro del botón
        marginLeft: 7,
    },
});

// Exportar el componente StateButton como el componente predeterminado
export default StateButton;
