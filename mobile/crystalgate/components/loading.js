import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import * as Animatable from "react-native-animatable";

const Loading = () => {
    return (
        <View style={styles.container}>
            <Animatable.View
                animation={{
                    from: { translateY: 175, opacity: 0.5 },
                    to: { translateY: -50, opacity: 1 },
                    duration: 2000,
                    easing: "ease-out",
                }}
                iterationCount="infinite"
                direction="alternate"
                style={{ position: "absolute" }}
            >
                <Svg
                    width="167"
                    height="117"
                    viewBox="0 0 227 177"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <Path
                        d="M187.42 176.944L132.707 88.4718H119.902L93.1279 46.5641L119.902 0L227 176.944H187.42Z"
                        fill="#3F91FD"
                    />
                    <Path
                        d="M0 176.944L39.5795 111.754L79.4754 176.944H0Z"
                        fill="#3229B1"
                    />
                    <Path
                        d="M91.9637 176.944L67.5176 138.528H55.8765L39.5791 111.754L67.5176 65.1897L135.036 176.944H91.9637Z"
                        fill="#3452D3"
                    />
                    <Path
                        d="M135.036 176.944L74.5029 76.8308L93.1286 46.5641L176.944 176.944H135.036Z"
                        fill="#3229B1"
                    />
                </Svg>
            </Animatable.View>
            <View style={styles.wall}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1F5FF",
    },
    wall: {
        width: 200,
        height: 200,
        backgroundColor: "#F1F5FF",
        zIndex: 1,
        marginTop: 275,
    },
});

export default Loading;

// const Loading = () => {
// return (
// <View style={styles.container}>
// <Animatable.View
// animation={{
// 0: { transform: [{ scale: 1 }] },
// 0.5: { transform: [{ scale: 1.5 }] },
// 1: { transform: [{ scale: 1 }] },
// }}
// iterationCount="infinite"
// duration={1000}
// easing="ease-in-out"
// >
// <Svg
//                  width="167"
//                  height="117"
//                  viewBox="0 0 227 177"
//                  fill="none"
//                  xmlns="http://www.w3.org/2000/svg"
//              >
// <Path
//                      d="M187.42 176.944L132.707 88.4718H119.902L93.1279 46.5641L119.902 0L227 176.944H187.42Z"
//                      fill="#3F91FD"
//                  />
// <Path
//                      d="M0 176.944L39.5795 111.754L79.4754 176.944H0Z"
//                      fill="#3229B1"
//                  />
// <Path
//                      d="M91.9637 176.944L67.5176 138.528H55.8765L39.5791 111.754L67.5176 65.1897L135.036 176.944H91.9637Z"
//                      fill="#3452D3"
//                  />
// <Path
//                      d="M135.036 176.944L74.5029 76.8308L93.1286 46.5641L176.944 176.944H135.036Z"
//                      fill="#3229B1"
//                  />
// </Svg>
// </Animatable.View>
// </View>
// );
// };

// const styles = StyleSheet.create({
// container: {
// flex: 1,
// justifyContent: "center",
// alignItems: "center",
// backgroundColor: "#F1F5FF",
// },
// });

// export default Loading;
