import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { Color } from "../../assets/const/color";

const Banner = ({ state }) => {
  // Configura los estados "accepted" y "rejected"
  const states = {
    accepted: {
      backgroundColor: Color.colorAccepted,  // Color verde para aceptado
      icon: (
        <Svg width="34" height="27" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M4.707 8.293L1.414 5L0 6.414L4.707 11.121L14.414 1.414L13 0L4.707 8.293Z" fill="#ffffff"/>
        </Svg>
      ),
    },
    rejected: {
      backgroundColor: Color.colorRejected,  // Color gris para rechazado
      icon: (
        <Svg width="34" height="27" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M1 1L14 14M1 14L14 1" stroke="#ffffff" strokeWidth="2"/>
        </Svg>
      ),
    },
  };

  // Selecciona el estilo y el ícono según el estado
  const currentState = states[state] || states.accepted;

  return (
    <View style={styles.contenedor}>
        <View style={[styles.banner, { backgroundColor: currentState.backgroundColor }]}>
            {currentState.icon} {/* Renderiza el icono correspondiente */}
        </View>
        <TouchableOpacity style={styles.info}>
            <Svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M11.4459 0C5.13475 0 0 5.1589 0 11.5C0 17.8411 5.1589 23 11.5 23C17.8411 23 23 17.8411 23 11.5C23 5.1589 17.8169 0 11.4459 0ZM12.65 16.25C12.65 16.8023 12.2023 17.25 11.65 17.25H11.35C10.7977 17.25 10.35 16.8023 10.35 16.25V15.95C10.35 15.3977 10.7977 14.95 11.35 14.95H11.65C12.2023 14.95 12.65 15.3977 12.65 15.95V16.25ZM12.65 11.65C12.65 12.2023 12.2023 12.65 11.65 12.65H11.35C10.7977 12.65 10.35 12.2023 10.35 11.65V6.75C10.35 6.19772 10.7977 5.75 11.35 5.75H11.65C12.2023 5.75 12.65 6.19772 12.65 6.75V11.65Z" fill="#595959"/>
            </Svg>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    contenedor: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        height: 'auto',
        marginTop: 100,
    },

    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 152,
        borderRadius: 10,
        marginHorizontal: 10,
    },

    info:{
        backgroundColor: Color.colorBtnUqload,
    },
});

export default Banner;
