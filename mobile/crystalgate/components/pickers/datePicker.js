// DatePicker.js
import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path } from "react-native-svg";

const DatePicker = ({ label }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
        <View style={styles.txtContainer}>
            <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.dateContainer}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
          <View style={styles.labelContainer}>
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </View>
          <View style={styles.btnDate}>
            <Svg
                  width="20"
                  height="20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onPress={showMode}
              >
                  <Path
                      d="M2 20H16C17.103 20 18 19.103 18 18V4C18 2.897 17.103 2 16 2H14V0H12V2H6V0H4V2H2C0.897 2 0 2.897 0 4V18C0 19.103 0.897 20 2 20ZM13 14H5V12H13V14ZM2 5H16V7H2V5Z"
                      fill="#4292F6"
                  />
              </Svg>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer:{
    width: 170,
  },
  txtContainer:{
    display: "flex",
    width: 50,
    alignSelf: "center",
    textAlign: "left",
  },    
  container: {
    margin: 20,
    paddingRight: 20,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "row",
  },
  dateContainer:{
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
  },    
  label: {
    textAlign: "left",
    fontSize: 16,
    marginBottom: 10,
    alignSelf: "center",
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    margin: 10,
    fontSize: 16,
  },
  btnDate:{
    alignSelf: "center",
    alignItems: "flex-end",
    marginLeft: 100,
  },
});

export default DatePicker;
