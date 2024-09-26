import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');  // Navega a la siguiente pantalla después de 3 segundos
    }, 2000);  // 3000 milisegundos = 3 segundos
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://www.glassmountainbpo.com/assets/img/logos/GMBPO-BlueLogo_Final-01.png' }}  // Reemplaza con la URL de tu logo
        style={styles.logo}
        resizeMode="contain"  // Asegura que el logo mantenga sus proporciones
      />
      <Text style={styles.title}>Bye Climber!</Text>
      <Text style={styles.subtitle}>See you soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EFFB',  // Color de fondo
  },
  logo: {
    width: '80%',
    height: '30%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',  // Color azul
    marginTop: 20,  // Espacio superior entre el logo y el texto
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',  // Color gris
    marginTop: 10,  // Espacio entre el título y el subtítulo
  },
});

export default LoadingScreen;
