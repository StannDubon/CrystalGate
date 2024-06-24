import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from "react-native-svg";

const SwitchButton = ({ selectedOption, onSelectOption }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button1,
          selectedOption === 'Days' && styles.selectedButton
        ]}
        onPress={() => onSelectOption('Days')}
      >
        <Text
          style={[
            styles.buttonText,
            selectedOption === 'Days' && styles.selectedButtonText
          ]}
        >
          Days
        </Text>
        <Svg
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.iconButton}
        >
            <Path
                d="M2 20H16C17.103 20 18 19.103 18 18V4C18 2.897 17.103 2 16 2H14V0H12V2H6V0H4V2H2C0.897 2 0 2.897 0 4V18C0 19.103 0.897 20 2 20ZM13 14H5V12H13V14ZM2 5H16V7H2V5Z"
                fill={(selectedOption == "Days" ? "white":"#4292F6")}
            />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button2,
          selectedOption === 'Hours' && styles.selectedButton
        ]}
        onPress={() => onSelectOption('Hours')}
      >
        <Text
          style={[
            styles.buttonText,
            selectedOption === 'Hours' && styles.selectedButtonText
          ]}
        >
          Hours
        </Text>
        <Svg
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.iconButton}
        >
            <Path
                d="M9 0C4.122 0 0 4.122 0 9C0 13.878 4.122 18 9 18C13.879 18 18 13.878 18 9C18 4.122 13.879 0 9 0ZM14 10H8V4H10V8H14V10Z"
                fill={(selectedOption == "Hours" ? "white":"#4292F6")}
            />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingLeft: 30,
    alignSelf: "flex-start",
  },
  button1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#4292F6',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#fff',
    display: "flex",
    flexDirection: "row",
  },
  button2: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#4292F6',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#fff',
    display: "flex",
    flexDirection: "row",
  },
  selectedButton: {
    backgroundColor: '#4292F6',
  },
  iconButton: {
    marginLeft: 10, 
    color: '#4292F6',
  },
  buttonText: {
    fontSize: 16,
    color: '#4292F6',
  },
  selectedButtonText: {
    color: '#fff',
  },
});

export default SwitchButton;
