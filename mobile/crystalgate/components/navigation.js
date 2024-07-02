import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    CreatePermission,
    DocumentationRequest,
    Dashboard,
    History,
    Profile,
} from "../screens";
import React from "react";
import Svg, { Path } from "react-native-svg";

const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70,
        backgroundColor: "#D9E4FF",
        borderTopColor: "#4292F6",
        borderTopWidth: 1,
    },
};

const Navigation = () => {
    return (

        <Tab.Navigator screenOptions={screenOptions} initialRouteName="Dashboard">
            <Tab.Screen
                name="CreatePermission"
                component={CreatePermission}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Svg
                                    width="35"
                                    height="33"
                                    viewBox="0 0 35 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M31.5 6.94737H27.25C26.6977 6.94737 26.25 6.49965 26.25 5.94737V3.47368C26.25 1.55795 24.6803 0 22.75 0H12.25C10.3197 0 8.75 1.55795 8.75 3.47368V5.94737C8.75 6.49965 8.30228 6.94737 7.75 6.94737H3.5C1.56975 6.94737 0 8.50532 0 10.4211V29.5263C0 31.4421 1.56975 33 3.5 33H31.5C33.4302 33 35 31.4421 35 29.5263V10.4211C35 8.50532 33.4302 6.94737 31.5 6.94737ZM7 11.4211C7 10.8688 7.44772 10.4211 8 10.4211H9.5C10.0523 10.4211 10.5 10.8688 10.5 11.4211V28.5263C10.5 29.0786 10.0523 29.5263 9.5 29.5263H8C7.44772 29.5263 7 29.0786 7 28.5263V11.4211ZM28 28.5263C28 29.0786 27.5523 29.5263 27 29.5263H25.5C24.9477 29.5263 24.5 29.0786 24.5 28.5263V11.4211C24.5 10.8688 24.9477 10.4211 25.5 10.4211H27C27.5523 10.4211 28 10.8688 28 11.4211V28.5263ZM21.75 3.47368C22.3023 3.47368 22.75 3.9214 22.75 4.47368V5.94737C22.75 6.49965 22.3023 6.94737 21.75 6.94737H13.25C12.6977 6.94737 12.25 6.49965 12.25 5.94737V4.47368C12.25 3.9214 12.6977 3.47368 13.25 3.47368H21.75Z"
                                        fill={focused ? "#3F91FD" : "#6B81B9"}
                                    />
                                </Svg>
                            </View>
                        );
                    },
                }}
            />

            <Tab.Screen
                name="DocumentationRequest"
                component={DocumentationRequest}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Svg
                                    width="27"
                                    height="33"
                                    viewBox="0 0 27 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M3.375 0C2.47989 0 1.62145 0.347677 0.988514 0.966547C0.355579 1.58542 0 2.42479 0 3.3V29.7C0 30.5752 0.355579 31.4146 0.988514 32.0335C1.62145 32.6523 2.47989 33 3.375 33H23.625C24.5201 33 25.3785 32.6523 26.0115 32.0335C26.6444 31.4146 27 30.5752 27 29.7V10.3208C27 10.0517 26.8915 9.79394 26.6991 9.6058L17.1665 0.284993C16.9796 0.102296 16.7287 0 16.4674 0H3.375ZM16.875 11.55H16.1875C15.6352 11.55 15.1875 11.1023 15.1875 10.55V5.67637C15.1875 4.79087 16.2535 4.34229 16.8866 4.96136L21.871 9.83499C22.5119 10.4616 22.0682 11.55 21.1719 11.55H16.875Z"
                                        fill={focused ? "#3F91FD" : "#6B81B9"}
                                    />
                                </Svg>
                            </View>
                        );
                    },
                }}
            />

            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    top: Platform.OS == "ios" ? -10 : -32,
                                    width: Platform.OS == "ios" ? 50 : 74,
                                    height: Platform.OS == "ios" ? 50 : 74,
                                    borderRadius:
                                        Platform.OS == "ios" ? 25 : 60,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#3F91FD",

                                    shadowOpacity: 1.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                            >
                                <Svg
                                    width="41"
                                    height="41"
                                    viewBox="0 0 33 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M32.5723 17.0346L17.7239 0.522604C17.0987 -0.174201 15.8976 -0.174201 15.2723 0.522604L0.423976 17.0346C0.210253 17.2717 0.0699661 17.5658 0.020174 17.8812C-0.0296181 18.1967 0.0132295 18.5198 0.143507 18.8113C0.407478 19.4073 0.998112 19.7904 1.64979 19.7904H4.94942V31.3488C4.94942 31.7867 5.12324 32.2067 5.43264 32.5164C5.74204 32.826 6.16168 33 6.59924 33H11.5487C11.9862 33 12.4059 32.826 12.7153 32.5164C13.0247 32.2067 13.1985 31.7867 13.1985 31.3488V24.744H19.7978V31.3488C19.7978 31.7867 19.9716 32.2067 20.281 32.5164C20.5904 32.826 21.01 33 21.4476 33H26.397C26.8346 33 27.2542 32.826 27.5636 32.5164C27.873 32.2067 28.0468 31.7867 28.0468 31.3488V19.7904H31.3465C31.666 19.7918 31.979 19.7001 32.2473 19.5265C32.5157 19.3529 32.7277 19.1049 32.8577 18.8127C32.9876 18.5206 33.0298 18.1969 32.9792 17.8812C32.9285 17.5654 32.7871 17.2713 32.5723 17.0346Z"
                                        fill="#FFF"
                                    />
                                </Svg>
                            </View>
                        );
                    },
                }}
            />

            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M16 0C24.8368 0 32 7.1632 32 16C32 24.8368 24.8368 32 16 32C13.4088 32 10.961 31.3843 8.7958 30.2908C8.58249 30.183 8.33893 30.1485 8.10564 30.2003L1.5339 31.6594C0.819415 31.8181 0.182151 31.1806 0.340976 30.4662L1.80123 23.8975C1.85309 23.6642 1.8186 23.4207 1.71091 23.2074C0.617174 21.0408 0 18.5928 0 16C0 7.1632 7.1632 0 16 0ZM17.6 9C17.6 8.44772 17.1523 8 16.6 8H15.4C14.8477 8 14.4 8.44772 14.4 9V18.2C14.4 18.7523 14.8477 19.2 15.4 19.2H23C23.5523 19.2 24 18.7523 24 18.2V17C24 16.4477 23.5523 16 23 16H18.6C18.0477 16 17.6 15.5523 17.6 15V9Z"
                                        fill={focused ? "#3F91FD" : "#6B81B9"}
                                    />
                                </Svg>
                            </View>
                        );
                    },
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Svg
                                    width="31"
                                    height="33"
                                    viewBox="0 0 31 33"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M7.75 7.81579C7.75 12.1249 11.2272 15.6316 15.5 15.6316C19.7728 15.6316 23.25 12.1249 23.25 7.81579C23.25 3.50668 19.7728 0 15.5 0C11.2272 0 7.75 3.50668 7.75 7.81579ZM29.2778 33C30.2289 33 31 32.2143 31 31.2632C31 24.5607 25.5905 19.1053 18.9444 19.1053H12.0556C5.40778 19.1053 0 24.5607 0 31.2632C0 32.2224 0.777611 33 1.73684 33H29.2778Z"
                                        fill={focused ? "#3F91FD" : "#6B81B9"}
                                    />
                                </Svg>
                            </View>
                        );
                    },
                }}
            />
        </Tab.Navigator>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F5FF",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Navigation;