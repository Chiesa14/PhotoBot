import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { SIZES } from "../constants";
import styles from "./chatPage.styles";

const ChatPage = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const backPressedOnceRef = useRef(false);

  useEffect(() => {
    fetchData();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, [sound]);

  const fetchData = async () => {
    try {
      const storedImageData = await AsyncStorage.getItem("imageData");
      const storedAudioData = await AsyncStorage.getItem("audioData");

      setImageUri(storedImageData);
      setAudioUri(storedAudioData);

      if (storedAudioData !== null) {
        const audioData = JSON.parse(storedAudioData);
        setAudioUri(audioData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onBackPress = () => {
    if (backPressedOnceRef.current) {
      BackHandler.exitApp();
      return true;
    } else {
      ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
      backPressedOnceRef.current = true;

      setTimeout(() => {
        backPressedOnceRef.current = false;
      }, 1000);
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      {imageUri && (
        <Image
          style={{ height: SIZES.height / 2, borderRadius: SIZES.xSmall }}
          source={{ uri: imageUri }}
        />
      )}
      <TouchableOpacity style={styles.audioIcon}>
        <FontAwesome name="microphone" size={34} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatPage;
