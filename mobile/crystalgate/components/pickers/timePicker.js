// TimePicker.js
import React, { useState } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path } from "react-native-svg";


const TimePicker = ({ label }) => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.timeContainer}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode="time"
            display="default"
            onChange={onChange}
          />
        )}
        <View style={styles.labelContainer}>
          <Text style={styles.timeText}>{time.toLocaleTimeString()}</Text>
        </View>
        <View style={styles.btnTime}>
          <Svg
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onPress={showMode}
          >
            <Path
              d="M9 0C4.122 0 0 4.122 0 9C0 13.878 4.122 18 9 18C13.879 18 18 13.878 18 9C18 4.122 13.879 0 9 0ZM14 10H8V4H10V8H14V10Z"
              fill="#4292F6"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    width: 170,
  },
  txtContainer: {
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
  timeContainer: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#4292F6',
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
  timeText: {
    fontFamily: "Poppins-Regular",
    margin: 10,
    fontSize: 16,
  },
  btnTime: {
    alignSelf: "center",
    alignItems: "flex-end",
    marginLeft: 100,
  },
});

export default TimePicker;
