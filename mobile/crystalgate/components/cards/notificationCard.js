import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path } from "react-native-svg";

const NotificationCard = ({title, type = 1, dateBegin, timeBegin="7:00 a.m", dateEnd, timeEnd="4:00 p.m"}) => {
    const [colorCard, setColorCard] = useState("#8DDA8C");

    useEffect(() => {
        if (type === 1) {
            setColorCard("#8DDA8C");
        } else {
            setColorCard("#F54C60");
        }
    }, [type]);
    return (
      <View style={[styles.card, { backgroundColor: colorCard }]}>
        <View style={styles.cardBody}>
            <Text style={styles.cardText}>{title}</Text>
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
                      fill="white"
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
    marginHorizontal: 10, 
  },
  cardBody:{
    margin: 10,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins-Regular",
  },
  cardText:{
    alignSelf: "flex-start",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: 'white',
  },
  dateContainer:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  dateItem:{
    display: "flex",
    flexDirection: "column",
  },
  cardIcon:{
    alignSelf: "center",
  },
});

export default NotificationCard;
