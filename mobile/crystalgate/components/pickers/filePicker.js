import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Svg, { Path } from "react-native-svg";

const FilePicker = ({ onSelectFile }) => {
    const [buttonColor, setButtonColor] = useState('#CECECE');
    const [buttonText, setButtonText] = useState('Upload');
    const [textColor, setTextColor] = useState('#595959');
    const [svgColor, setSvgColor] = useState('#595959');
    const [documentSelected, setDocumentSelected] = useState(false);
    const pickFile = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ],
            });
            //console.log(res)
            if (res.type = 1) {
                onSelectFile(res);
                
                // Cambia el color del botón basado en el tipo de archivo
                if (res.mimeType = "application/pdf") {
                    setButtonColor('#F54C60'); // Color para PDF
                    setTextColor('#ffffff');
                    setSvgColor('white');
                } if (res.mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                    setButtonColor('#4292F6'); // Color para Word
                    setTextColor('#ffffff');
                    setSvgColor('white');
                }
                setDocumentSelected(true);
            } else {
                console.log("Canceled");
            }
        } catch (err) {
            console.log("Document Picker Error:", err);
        }
    };

    const removeFile = () => {
        setButtonColor('#CECECE');
        setButtonText('Upload');
        setTextColor('#595959');
        setSvgColor('#595959');
        setDocumentSelected(false);
        onSelectFile(null); // Opción para pasar `null` si se necesita
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={pickFile} style={[styles.button, { backgroundColor: buttonColor }]}>
                    <Svg
                        width="33"
                        height="33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={styles.iconFile}
                    >
                        <Path
                            d="M27.9576 10.0411C27.2365 4.38643 22.374 0 16.5 0C11.9526 0 8.0025 2.64664 6.19905 6.81786C2.65485 7.87257 0 11.2043 0 14.7857C0 19.3151 3.70095 23 8.25 23H26.4C30.0399 23 33 20.0527 33 16.4286C32.9975 14.9559 32.4994 13.5266 31.5854 12.3688C30.6714 11.211 29.3942 10.3915 27.9576 10.0411ZM18.15 14.7857V19.7143H14.85V14.7857H9.9L16.5 6.57143L23.1 14.7857H18.15Z"
                            fill={svgColor}
                        />
                    </Svg>
                    <Text style={[styles.buttonText, { color: textColor }]}>{buttonText}</Text>
                </TouchableOpacity>
                {documentSelected && (
                    <TouchableOpacity onPress={removeFile} style={styles.removeButton}>
                        <Svg
                            width="20"
                            height="40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M2 2L18 18M18 2L2 18"
                                stroke="white"
                                strokeWidth="2"
                                
                                
                            />
                        </Svg>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        borderRadius: 10,
        width: 300,
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: "Poppins-Regular",
        marginLeft: 20,
        fontSize: 16,
    },
    iconFile: {
        marginLeft: 10,
    },
    removeButton: {
        marginLeft: 10,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#F54C60', // O el color que prefieras
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FilePicker;
