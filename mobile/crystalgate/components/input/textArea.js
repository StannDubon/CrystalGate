import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

const TextArea = ({ onChangeText, value, label }) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.div}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          multiline={true}
          numberOfLines={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    paddingTop: 20,
    textAlign: "left",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    fontWeight: "500",
    height: 150,
    width: "auto",
    color: "#98ADE3",
  },
  div: {
    marginTop: 10,
    borderColor: "#4292F6",
    borderWidth: 1.5,
    textAlign: "left",
    alignItems: "flex-start",
    borderRadius: 8,
    height: 100,
    width: 337,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    fontWeight: "400",
    color: "#4292F6",
    paddingLeft: 15,
    alignContent: "flex-start",
    textAlign: "left",
    width: 290,
    height: 90, // Adjusted height to accommodate 3 lines of text
    textAlignVertical: "top", // Ensure text starts from the top
  },
  inputLabel: {
    color: "#98ADE3",
  },
});

export default TextArea;
