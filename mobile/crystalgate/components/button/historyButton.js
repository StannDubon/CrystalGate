import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SegmentedControl = ({ options, onChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePress = (index) => {
        setSelectedIndex(index);
        if (onChange) {
            onChange(index);
        }
    };

    return (
        <View style={styles.segmentedControlContainer}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.segmentedControlOption,
                        selectedIndex === index && styles.segmentedControlOptionSelected,
                    ]}
                    onPress={() => handlePress(index)}
                >
                    <Text style={selectedIndex === index ? styles.segmentedControlTextSelected : styles.segmentedControlText}>
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    segmentedControlContainer: {
        flexDirection: 'row',
        backgroundColor: '#D9E4FF',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 20,
        marginTop: 22,
    },
    segmentedControlOption: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    segmentedControlOptionSelected: {
        backgroundColor: '#4292F6',
        borderRadius: 8,
    },
    segmentedControlText: {
        fontFamily: "Poppins-Regular",
        color: '#4292F6',
        fontSize: 16,
    },
    segmentedControlTextSelected: {
        fontFamily: "Poppins-Regular",
        color: '#FFF',
        fontSize: 16,
    },
});

export default SegmentedControl;
