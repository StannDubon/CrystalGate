import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path } from "react-native-svg";

const PermissionCard = ({title, type = 1, dateBegin, timeBegin="7:00 a.m", dateEnd, timeEnd="4:00 p.m"}) => {
    const [colorCard, setColorCard] = useState("#8DDA8C");

    useEffect(() => {
        if (type === 1) {
            setColorCard("#8DDA8C");
        } else if(type == 2) {
            setColorCard("#F54C60");
        }
        else{
            setColorCard("#F2A359")
        }
    }, [type]);
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

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    width: 300,
    borderRadius: 10,
    marginHorizontal: 10, 
    backgroundColor: "#EEEEEE"
  },
  cardHeader:{
    height: 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    display: "flex",
    flexDirection: "row",
  },
  cardBody:{
    margin: 10,
    fontFamily: "Poppins-Regular",
  },
  cardTitle:{
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: 'white',
    marginLeft: 10,
  },
  cardText:{
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: '#737373',
    marginLeft: 10,
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

export default PermissionCard;
