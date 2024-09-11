import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path } from "react-native-svg";

const DocumentCard = ({title, dateSend, Language, type}) => {
    // Split dateSend to remove time
    const [dateOnly] = dateSend.split(' ');



    return (
      <View style={[styles.card]}>
        <View style={[styles.cardHeader, { backgroundColor: "#3452D3"}]}>
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <View style={styles.cardBody}>
        <View style={styles.dateContainer}>
                <View style={styles.dateItem}>
                    <Text style={styles.dateText}>{dateOnly}</Text>
                </View>                
                <View style={styles.infoItem}>
                    <Text style={styles.cardText}>{Language}</Text>
                    <Text style={styles.cardText}>{type}</Text>
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
    height: 100,
    borderRadius: 10,
    marginHorizontal: 10, 
    backgroundColor: "#EEEEEE"
  },
  cardHeader:{
    width: 301,
    height: 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    display: "flex",
    flexDirection: "row",
  },
  cardBody:{
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins-Regular",
  },
  cardTitle:{
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: 'white',
    marginLeft: 10,
  },
  dateItem:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 25,
    marginRight: 30,
  },
  infoItem:{
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E6E6E6",
    justifyContent: "center",
    width: 145,
    height: 70,
    borderBottomEndRadius: 10,
  },
  cardText:{
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: '#737373',
  },
  dateText:{
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: '#737373',
    marginLeft: 10,
  },
  dateContainer:{
    display: "flex",
    flexDirection: "row",
  },


});

export default DocumentCard;