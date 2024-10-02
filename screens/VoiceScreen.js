import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VoiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Voz</Text>
      <Text>Aquí puedes agregar funcionalidad para reconocimiento de voz.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default VoiceScreen;