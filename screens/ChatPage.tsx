import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

const ChatPage = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    fetchData();
    return () => {
      // Clean up resources
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const fetchData = async () => {
    try {
      const storedImageData = await AsyncStorage.getItem("imageData");
      const storedAudioData = await AsyncStorage.getItem("audioData");

      setImageUri(storedImageData);
      setAudioUri(storedAudioData);
      if (storedAudioData !== null) {
        const audioData = JSON.parse(storedAudioData);
        setAudioUri(audioData.file);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const playAudio = async () => {
    try {
      if (audioUri) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: true }
        );
        setSound(sound);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Chat Page</Text>
      {imageUri && (
        <Image style={{ width: 200, height: 200 }} source={{ uri: imageUri }} />
      )}
      {audioUri && (
        <TouchableOpacity onPress={playAudio} style={{ marginTop: 20 }}>
          <Text>Play Audio</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ChatPage;
