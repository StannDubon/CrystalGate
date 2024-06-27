import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native";
import Svg, { Path } from "react-native-svg";
import BackButton from "../components/button/button-back";
import BackgroundImage from "../components/background/background-mountain";
import NewInputForm from "./input/input-new";
import PasswordInputForm from "./input/input-password";
import ResetButton from "./button/button-reset";
import BackLogInButton from "./button/button-backLG";
import { useNavigation } from '@react-navigation/native';
import SuccessModal from "./modal/alertModal";

const fondo = require("../assets/img/background/background.png");

const NewPassword = () => {
    const [text, onChangeText] = React.useState("");
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleSendRes = () => {
        setSuccessModalVisible(true);
        setTimeout(() => {
            setSuccessModalVisible(false);
            navigation.navigate('Login');
        }, 4000);
    };

    const handleSendLog = () => {
        navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <BackgroundImage source={fondo} style={styles.backgroundImage}>
                    <View style={styles.header}>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>New Password</Text>
                        <Text style={styles.subTitle}>
                            Enter the new password for your account
                        </Text>
                        <View style={styles.form}>
                            <SafeAreaView>
                                <NewInputForm onChangeText={onChangeText} value={text} placeholder="New Password" />
                            </SafeAreaView>
                            <SafeAreaView>
                                <PasswordInputForm onChangeText={onChangeText} value={text} placeholder="Confirm Password" />
                            </SafeAreaView>
                            <View style={styles.ContentButton}>
                                <ResetButton onPress={handleSendRes} />
                            </View>
                            <View style={styles.ContentButton}>
                                <BackLogInButton onPress={handleSendLog} />
                            </View>
                        </View>
                    </View>
                </BackgroundImage>
            </ScrollView>
            <SuccessModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} content={"Password updated successfully"} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
    },
    header: {
        flex: 0.6,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingRight: 20,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontSize: 32,
        fontWeight: "bold",
        color: "#4292F6",
        textAlign: "right",
        marginTop: 300,
        alignSelf: "flex-end",
    },
    subTitle: {
        fontFamily: "Poppins-Regular",
        fontSize: 20,
        fontWeight: "medium",
        color: "#66A0E9",
        textAlign: "right",
        marginTop: 10,
    },
    form: {
        width: '100%',
        alignItems: 'center',
    },
    ContentButton: {
        marginVertical: 20,
        alignItems: "center",
    },
});

export default NewPassword;
