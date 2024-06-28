import React from "react";
import { StyleSheet, View } from "react-native";
// Importación de Svg y Path desde react-native-svg, para usar archivos svg
import Svg, { Path } from "react-native-svg";
import * as Animatable from "react-native-animatable";

// Definimos el componente funcional Loading
const Loading = () => {
    // Renderizado del componente
    return (
        <View style={styles.container}>
            <Animatable.View
                animation={{
                    from: { translateY: 175, opacity: 0.5 }, // Estado inicial de la animación
                    to: { translateY: -50, opacity: 1 },     // Estado final de la animación
                    duration: 2000,                          // Duración de la animación en milisegundos
                    easing: "ease-out",                      // Tipo de suavizado de la animación
                }}
                iterationCount="infinite"                    // La animación se repite infinitamente
                direction="alternate"                        // La dirección de la animación alterna en cada iteración
                style={{ position: "absolute" }}             // Estilo de posición absoluta
            >
                <Svg
                    width="167"
                    height="117"
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
            </Animatable.View>
            <View style={styles.wall}></View>
        </View>
    );
};

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,                           // Ocupa todo el espacio disponible
        justifyContent: "center",          // Centra el contenido verticalmente
        alignItems: "center",              // Centra el contenido horizontalmente
        backgroundColor: "#F1F5FF",        // Color de fondo del contenedor
    },
    wall: {
        width: 200,                        // Ancho de la vista
        height: 200,                       // Alto de la vista
        backgroundColor: "#F1F5FF",        // Color de fondo de la vista
        zIndex: 1,                         // Z-Index para la superposición
        marginTop: 275,                    // Margen superior
    },
});

// Exporta el componente Loading
export default Loading;

// Código comentado que muestra una alternativa de animación
// const Loading = () => {
// return (
// <View style={styles.container}>
// <Animatable.View
// animation={{
// 0: { transform: [{ scale: 1 }] },
// 0.5: { transform: [{ scale: 1.5 }] },
// 1: { transform: [{ scale: 1 }] },
// }}
// iterationCount="infinite"
// duration={1000}
// easing="ease-in-out"
// >
// <Svg
//                  width="167"
//                  height="117"
//                  viewBox="0 0 227 177"
//                  fill="none"
//                  xmlns="http://www.w3.org/2000/svg"
//              >
// <Path
//                      d="M187.42 176.944L132.707 88.4718H119.902L93.1279 46.5641L119.902 0L227 176.944H187.42Z"
//                      fill="#3F91FD"
//                  />
// <Path
//                      d="M0 176.944L39.5795 111.754L79.4754 176.944H0Z"
//                      fill="#3229B1"
//                  />
// <Path
//                      d="M91.9637 176.944L67.5176 138.528H55.8765L39.5791 111.754L67.5176 65.1897L135.036 176.944H91.9637Z"
//                      fill="#3452D3"
//                  />
// <Path
//                      d="M135.036 176.944L74.5029 76.8308L93.1286 46.5641L176.944 176.944H135.036Z"
//                      fill="#3229B1"
//                  />
// </Svg>
// </Animatable.View>
// </View>
// );
// };

// const styles = StyleSheet.create({
// container: {
// flex: 1,
// justifyContent: "center",
// alignItems: "center",
// backgroundColor: "#F1F5FF",
// },
// });

// export default Loading;
