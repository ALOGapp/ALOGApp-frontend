import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'; // Asegúrate de que la ruta sea correcta
import LoginScreen from './src/screens/LoginScreen'; // Asegúrate de que la ruta sea correcta
import RegisterScreen from './src/screens/RegisterScreen'; // Asegúrate de que la ruta sea correcta
import WelcomeScreen from './src/screens/WelcomeScreen'; // Asegúrate de que la ruta sea correcta
import ChatScreen from './src/screens/ChatScreen'; // Asegúrate de que la ruta sea correcta
import VoiceScreen from './src/screens/VoiceScreen'; // Asegúrate de que la ruta sea correcta
import VoiceControl from './src/screens/VoiceControl'; // Asegúrate de que la ruta sea correcta

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen"> 
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RegisterScreen" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="WelcomeScreen" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ChatScreen" 
          component={ChatScreen} 
          options={{ headerShown: false }} // Cambia a false para ocultar la cabecera
        />
        <Stack.Screen 
          name="VoiceScreen" 
          component={VoiceScreen} 
          options={{ headerShown: true }} 
        />
        <Stack.Screen 
          name="VoiceControl" 
          component={VoiceControl} 
          options={{ headerShown: true }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}