import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import logo from '../assets/images/logo.png';
import mapaIcon from '../assets/images/mapa.png';
import calendarioIcon from '../assets/images/calendario.png';
import iaIcon from '../assets/images/ImagenIA.png';
import saludIcon from '../assets/images/salud.png';
import tareasIcon from '../assets/images/tareas.png';

const WelcomeScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Función para obtener la hora actual
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0'); // Hora en formato de 2 dígitos
      const minutes = now.getMinutes().toString().padStart(2, '0'); // Minutos en formato de 2 dígitos
      setCurrentTime(`${hours}:${minutes}`); // Usar backticks para la plantilla de cadena
    };

    // Actualizar la hora cada minuto
    const intervalId = setInterval(updateTime, 1000);

    // Mostrar la hora actual al cargar
    updateTime();

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Reemplaza el texto "ALOG" con el logo */}
        <Image source={logo} style={styles.logo} />
        
        {/* Mostrar la hora actual */}
        <Text style={styles.clockText}>{currentTime}</Text>
      </View>

      <View style={styles.iconContainer}>
        {/* Botón de Tareas */}
        <TouchableOpacity 
          style={styles.iconBox} 
          onPress={() => navigation.navigate('TareasScreen')}>
          <Image source={tareasIcon} style={styles.icon} />
          <Text style={styles.iconText}>Tareas</Text>
        </TouchableOpacity>

        {/* Botón de Calendario */}
        <TouchableOpacity 
          style={styles.iconBox} 
          onPress={() => navigation.navigate('CalendarioScreen')}>
          <Image source={calendarioIcon} style={styles.icon} />
          <Text style={styles.iconText}>Calendario</Text>
        </TouchableOpacity>

        {/* Botón de Salud */}
        <TouchableOpacity 
          style={styles.iconBox} 
          onPress={() => navigation.navigate('SaludScreen')}>
          <Image source={saludIcon} style={styles.icon} />
          <Text style={styles.iconText}>Salud</Text>
        </TouchableOpacity>

        {/* Botón de Crear Imagen con IA */}
        <TouchableOpacity 
          style={styles.iconBox} 
          onPress={() => navigation.navigate('CrearImagenIAScreen')}>
          <Image source={iaIcon} style={styles.icon} />
          <Text style={styles.iconText}>Crear Imagen con IA</Text>
        </TouchableOpacity>

        {/* Botón de Mapa */}
        <TouchableOpacity 
           style={[styles.iconBox, { marginLeft: '30%' }]}
          onPress={() => navigation.navigate('MapaScreen')}>
          <Image source={mapaIcon} style={styles.icon} />
          <Text style={styles.iconText}>Mapa</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('ChatScreen')}>
        <Text style={styles.chatButtonText}>Iniciar Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909', // Fondo oscuro
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'rgba(41, 41, 41, 0.3)', 
    padding: 10, 
    borderRadius: 10,
  },
  logo: {
    width: 100, // Ajusta el tamaño del logo
    height: 40, // Ajusta la altura del logo
    resizeMode: 'contain', // Ajustar la imagen al contenedor
    marginRight: 20, // Espacio después del logo
  },
  clockText: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'rgba(52, 52, 52, 0.3)', // Fondo transparente
    padding: 10, // Espacio alrededor de la hora
    borderRadius: 5, // Bordes redondeados
    marginLeft: 'auto', // Empuja la hora hacia la derecha
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  iconBox: {
    backgroundColor: '#000000', // Color del fondo del icono
    padding: 20,
    width: '40%', // Ajusta el tamaño según necesites
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  icon: {
    width: 80, // Tamaño de los íconos
    height: 80,
    resizeMode: 'contain', // Ajustar imagen al contenedor
  },
  iconText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  chatButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;