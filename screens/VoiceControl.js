import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    setTranscript(event.value[0]);
  };

  const onSpeechError = (error) => {
    console.error('Error de reconocimiento de voz:', error);
  };

  const startRecognition = async () => {
    setIsListening(true);
    try {
      await Voice.start('es-ES');
    } catch (error) {
      console.error('Error al iniciar el reconocimiento de voz:', error);
      setIsListening(false);
    }
  };

  const stopRecognition = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Error al detener el reconocimiento de voz:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button
        title={isListening ? "Detener reconocimiento de voz" : "Iniciar reconocimiento de voz"}
        onPress={isListening ? stopRecognition : startRecognition}
      />
      {transcript ? <Text>Transcripción: {transcript}</Text> : null}
    </View>
  );
};

export default VoiceControl;