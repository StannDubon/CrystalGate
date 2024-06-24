import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const FilePicker = ({ onSelectFile }) => {

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf,text/plain,.doc,.docx',
        copyToCacheDirectory: false,
      });

      if (!res.cancelled) {
        onSelectFile(res);
      } else {
        console.log('Canceled');
      }
    } catch (err) {
      console.log('Document Picker Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickFile} style={styles.button}>
        <Text style={styles.buttonText}>Select PDF or DOCX File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4292F6',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FilePicker;
