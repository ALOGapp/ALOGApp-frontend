import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import logo from '../assets/images/logo.png'; // Asegúrate de que la ruta sea correcta

const ChatScreen = ({ navigation }) => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Actualiza la hora cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(intervalId); // Limpieza del intervalo
  }, []);

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      const newMessages = [...messages, { sender: 'user', text: userMessage }];
      setMessages(newMessages);
      setUserMessage('');

      // Obtener respuesta del chatbot en Python
      const aiResponse = await getChatbotResponse(userMessage);
      setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: aiResponse }]);
    }
  };

  const getChatbotResponse = async (message) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/chat', { // Cambia 'localhost' por la IP de tu servidor si es necesario
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.response; // Asumiendo que la respuesta del chatbot tiene la clave 'response'
      } else {
        console.error('Error en la respuesta del chatbot');
        return "Lo siento, no pude obtener una respuesta.";
      }
    } catch (error) {
      console.error('Error al comunicarse con el chatbot:', error);
      return "Lo siento, hubo un error de conexión.";
    }
  };

  const handleStartListening = () => {
    setIsListening(true);
    // Implementa aquí la lógica de reconocimiento de voz
  };

  const handleStopListening = () => {
    setIsListening(false);
    // Implementa aquí la lógica para detener el reconocimiento de voz
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con la flecha de atrás, el logo y la hora */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Pantalla de chat */}
      <ScrollView style={styles.chatContainer} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}
          >
            <Text style={[styles.messageText, message.sender === 'user' ? styles.userText : styles.aiText]}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input de chat */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={isListening ? handleStopListening : handleStartListening} style={styles.voiceButton}>
          <Text style={styles.voiceButtonText}>{isListening ? "Detener reconocimiento de voz" : "Hablar"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#ffffff',
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  timeContainer: {
    justifyContent: 'flex-end',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#353535',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
  },
  voiceButton: {
    backgroundColor: '#353535',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  voiceButtonText: {
    color: '#fff',
  },
});

export default ChatScreen;