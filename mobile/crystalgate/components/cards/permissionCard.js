import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
// Import Svg de react-native-svg, para agregar archivos svg
import Svg, { Path } from "react-native-svg";

// Definición del componente funcional PermissionCard
const PermissionCard = ({
    title,
    type = 1,
    dateBegin,
    timeBegin = "7:00 a.m",
    dateEnd,
    timeEnd = "4:00 p.m",
}) => {
    // Estado local para manejar el color de fondo de la tarjeta
    const [colorCard, setColorCard] = useState("#8DDA8C");

    // useEffect se utiliza para cambiar el color de fondo basado en el tipo de permiso
    useEffect(() => {
        // Cambia el color de fondo dependiendo del tipo de permiso
        if (type === 1) {
            setColorCard("#8DDA8C");
        } else if (type == 2) {
            setColorCard("#F54C60");
        } else {
            setColorCard("#F2A359");
        }
    }, [type]); // Se ejecuta el efecto cada vez que type cambia

    // Renderizado del componente
    return (
        <View style={[styles.card]}>
            <View style={[styles.cardHeader, { backgroundColor: colorCard }]}>
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <View style={styles.cardBody}>
                <View style={styles.dateContainer}>
                    <View style={styles.dateItem}>
                        <Text style={styles.cardText}>{dateBegin}</Text>
                        <Text style={styles.cardText}>{timeBegin}</Text>
                    </View>
                    <Svg
                        width="27"
                        height="27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={styles.cardIcon}
                    >
                        <Path
                            d="M3.46162 26.319C3.85004 26.6978 4.46969 26.6978 4.85808 26.319L17.2661 14.2158C17.6684 13.8234 17.6684 13.1766 17.2661 12.7842L4.85808 0.681048C4.46969 0.302198 3.85004 0.302176 3.46162 0.680999L0.734113 3.3411C0.331691 3.73358 0.331724 4.38053 0.734185 4.77297L8.94991 12.784C9.35239 13.1765 9.35239 13.8235 8.9499 14.216L0.734184 22.227C0.331723 22.6195 0.331691 23.2664 0.734112 23.6589L3.46162 26.319Z"
                            fill="#737373"
                        />
                    </Svg>
                    <View style={styles.dateItem}>
                        <Text style={styles.cardText}>{dateEnd}</Text>
                        <Text style={styles.cardText}>{timeEnd}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

// Definición de los estilos usando StyleSheet.create
const styles = StyleSheet.create({
    card: {
        marginTop: 20, // Margen superior
        width: 300, // Ancho de la tarjeta
        height: 90, // Alto de la tarjeta
        borderRadius: 10, // Borde redondeado
        marginHorizontal: 10, // Margen horizontal
        backgroundColor: "#EEEEEE", // Color de fondo de la tarjeta
    },
    cardHeader: {
        width: "auto", // Ancho automático
        height: 30, // Alto del encabezado
        borderTopRightRadius: 10, // Borde superior derecho redondeado
        borderTopLeftRadius: 10, // Borde superior izquierdo redondeado
        display: "flex", // Mostrar como flexbox
        flexDirection: "row", // Dirección de los elementos (fila)
    },
    cardBody: {
        margin: 10, // Margen interno del cuerpo de la tarjeta
        display: "flex", // Mostrar como flexbox
        flexDirection: "column", // Dirección de los elementos (columna)
        fontFamily: "Poppins-Regular", // Familia de fuente del texto (si aplica)
    },
    cardTitle: {
        alignSelf: "center", // Alineación del título al centro verticalmente
        fontSize: 16, // Tamaño de fuente del título
        fontFamily: "Poppins-Regular", // Familia de fuente del título
        color: "white", // Color del texto del título
        marginLeft: 10, // Margen izquierdo del título
    },
    cardText: {
        alignSelf: "center", // Alineación del texto al centro verticalmente
        fontSize: 16, // Tamaño de fuente del texto
        fontFamily: "Poppins-Regular", // Familia de fuente del texto
        color: "#737373", // Color del texto
        marginLeft: 10, // Margen izquierdo del texto
    },
    dateContainer: {
        display: "flex", // Mostrar como flexbox
        flexDirection: "row", // Dirección de los elementos (fila)
        justifyContent: "space-evenly", // Justificación de elementos con espacio uniforme
    },
    dateItem: {
        display: "flex", // Mostrar como flexbox
        flexDirection: "column", // Dirección de los elementos (columna)
    },
    cardIcon: {
        alignSelf: "center", // Alineación del ícono al centro verticalmente
    },
});

// Exportar el componente PermissionCard como componente predeterminado
export default PermissionCard;
