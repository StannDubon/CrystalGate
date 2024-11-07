import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Svg, { Path} from "react-native-svg"; // Si es necesario usar iconos SVG

const NotificationCard = ({
    message,
    type = 1, // 1: positivo, 2: negativo
    datetime,
    id,
    onPress,
}) => {
    const [colorCard, setColorCard] = useState("#8DDA8C"); // Color por defecto

    useEffect(() => {
        if (type === "1" || type === "3" || type == "5") {
            setColorCard("#8DDA8C"); // Verde para notificaciones positivas
        } else if(type === "2" || type == "4"){
            setColorCard("#F54C60"); // Rojo para notificaciones negativas
        }

    }, [type, id]);

    // Formato para el datetime (si es necesario formatear el datetime, puedes usar librerías como moment.js o date-fns)
    const formattedDateTime = new Date(datetime).toLocaleString();

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: colorCard }]} onPress={onPress}>
            <View style={styles.cardBody}>
                <Text style={styles.cardText}  numberOfLines={3} ellipsizeMode="tail">{message}</Text>
                <View style={styles.datetimeContainer}>
                    <Svg
                        width="27"
                        height="27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={styles.cardIcon}
                    >
                        <Path
                            d="M3.46162 26.319C3.85004 26.6978 4.46969 26.6978 4.85808 26.319L17.2661 14.2158C17.6684 13.8234 17.6684 13.1766 17.2661 12.7842L4.85808 0.681048C4.46969 0.302198 3.85004 0.302176 3.46162 0.680999L0.734113 3.3411C0.331691 3.73358 0.331724 4.38053 0.734185 4.77297L8.94991 12.784C9.35239 13.1765 9.35239 13.8235 8.9499 14.216L0.734184 22.227C0.331723 22.6195 0.331691 23.2664 0.734112 23.6589L3.46162 26.319Z"
                            fill="white"
                        />
                    </Svg>
                    <Text style={styles.cardText}>{formattedDateTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 250,
        height: 120,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 20,
        marginHorizontal: 10,
    },
    cardBody: {
        margin: 10,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins-Regular",
    },
    cardText: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontFamily: "Poppins-Bold",
        color: 'white',
    },
    datetimeContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    cardIcon: {
        marginRight: 10,
    },
});

export default NotificationCard;
