import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Clipboard,
    Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Color } from "../assets/const/color";
import ChangePassButton from "../components/button/button-change-pass";
import HeaderSingle from "../components/header/headerSigle";
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const email = "cm.climber@glassmouantainbbo.com";
    const navigation = useNavigation();

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
    };

    const handleRecovery = () => {
        // Función para manejar el envío
        navigation.navigate('PasswordRecovery');
    };

    return (
        <View style={styles.container}>
            <HeaderSingle title={"Profile"}/>
            <View style={styles.body}>
                <View style={styles.topContrast}>
                    <View style={styles.circle}>
                        <Text style={styles.initials}>CM</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.name}>Carlos Marte</Text>
                    <Text style={styles.id}>ID: 10777</Text>
                    <Text style={styles.label}>EMAIL</Text>
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => copyToClipboard(email)}
                    >
                        <Text style={styles.email}>{email}</Text>
                        <Svg
                            style={styles.svg}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M18 0H8C7.46957 0 6.96086 0.210714 6.58579 0.585786C6.21071 0.960859 6 1.46957 6 2V4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V14H18C18.5304 14 19.0391 13.7893 19.4142 13.4142C19.7893 13.0391 20 12.5304 20 12V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0Z"
                                fill="#4292F6"
                            />
                            <Path
                                d="M2 20H12C13.103 20 14 19.103 14 18V8C14 6.897 13.103 6 12 6H2C0.897 6 0 6.897 0 8V18C0 19.103 0.897 20 2 20ZM4 10H10V12H4V10ZM4 14H10V16H4V14Z"
                                fill="#4292F6"
                            />
                        </Svg>
                    </TouchableOpacity>

                    <Text style={styles.label}>CHARGE</Text>
                    <Text style={styles.charge}>Developer Manager</Text>

                    <View style={styles.ContentButton}>
                        <ChangePassButton onPress={handleRecovery}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        fontFamily: "Poppins-Regular",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: Color.colorBackground,
    },


    topContrast: {
        display: "flex",
        backgroundColor: Color.colorContrast,
        width: 390,
        height: 110,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: "#dcdcdc",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 110,
    },
    initials: {
        color: "#4285F4",
        fontSize: 48,
        fontWeight: "bold",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        width: 390,
        height: 110,
        justifyContent: "center",
        marginTop: 190,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4285F4",
        textAlign: "center",
    },
    id: {
        fontSize: 16,
        color: "#777777",
        textAlign: "center",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#777777",
        marginTop: 20,
        textAlign: "left",
        marginHorizontal: 40,
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginHorizontal: 40,
        flexDirection: "row",
    },
    email: {
        fontSize: 16,
        color: "#4285F4",
        textAlign: "left",
        flexDirection: "row",
        width: 280,
    },
    svg: {
        marginRight: 10,
    },
    charge: {
        fontSize: 16,
        color: "#4285F4",
        marginTop: 10,
        textAlign: "left",
        marginLeft: 40,
    },
    ContentButton:{
        display: "flex",
        alignItems: "center"
    },
});

export default Profile;
