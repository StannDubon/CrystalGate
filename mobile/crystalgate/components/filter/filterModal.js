// MyWidget.js
import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const FilterModal = ({ visible, setVisible }) => {
    const slideAnim = useRef(new Animated.Value(300)).current;  // Initial value for sliding

    const handleOutsidePress = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    return (
        visible && (
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.widget, { transform: [{ translateY: slideAnim }] }]}>
                            <Text style={styles.widgetText}>This is my widget!</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        )
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "relative",
        flex: "column",
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    widget: {
        width: '100%',
        height: '15%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderWidth: 1,
        borderColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    widgetText: {
        fontSize: 16,
        color: 'black',
    },
});

export default FilterModal;
