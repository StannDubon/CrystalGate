import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

// Definición del componente funcional BackgroundImage
const BackgroundImage = ({ source, children }) => {
    return (
        // Se utiliza el componente de ImageBackground que permite agregar una imagen de fondo
        <ImageBackground
            source={source} // Propiedad que indica la fuente de la imagen de fondo
            resizeMode={"cover"} // La imagen se ajusta manteniendo la relación de aspecto y cubriendo todo el contenedor
            style={styles.background}
        >
            {children}
        </ImageBackground>
    );
};

// Definición de estilos utilizando StyleSheet.create
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

// Exportar el componente BackgroundImage para que pueda ser utilizado en otras partes de la aplicación
export default BackgroundImage;